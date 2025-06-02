import '@logseq/libs' //https://plugins-doc.logseq.com/
import { AppInfo, LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user'
import { setup as l10nSetup, t } from "logseq-l10n" //https://github.com/sethyuan/logseq-l10n
import CSSExclude from './exclude.css?inline' // CSS
import { openPageTodayDiary, removeProvideStyle } from './lib'
import { settingsTemplate } from './settings'
import af from "./translations/af.json"
import de from "./translations/de.json"
import es from "./translations/es.json"
import fr from "./translations/fr.json"
import id from "./translations/id.json"
import it from "./translations/it.json"
import ja from "./translations/ja.json"
import ko from "./translations/ko.json"
import nbNO from "./translations/nb-NO.json"
import nl from "./translations/nl.json"
import pl from "./translations/pl.json"
import ptBR from "./translations/pt-BR.json"
import ptPT from "./translations/pt-PT.json"
import ru from "./translations/ru.json"
import sk from "./translations/sk.json"
import tr from "./translations/tr.json"
import uk from "./translations/uk.json"
import zhCN from "./translations/zh-CN.json"
import zhHant from "./translations/zh-Hant.json"
import { commandPaletteItems } from './commandPaletteItems'
import { addToolbarButtons } from './addToolbarButtons'
const keyCSSExclude = 'exclude' // CSS

let configPreferredDateFormat: string
export const getConfigPreferredDateFormat = (): string => configPreferredDateFormat
const getUserConfig = async () => {
  const { preferredDateFormat } = await logseq.App.getUserConfigs() as { preferredDateFormat: string }
  configPreferredDateFormat = preferredDateFormat
}
let logseqVersion: string = "" //バージョンチェック用
let logseqVersionMd: boolean = false //バージョンチェック用

/* main */
const main = async () => {

  // バージョンチェック

  logseqVersionMd = await checkLogseqVersion() // MDモデルだった場合はtrue
  if (logseqVersionMd === false) {
    // Logseq ver 0.10.*以下にしか対応していない
    logseq.UI.showMsg("The Single Journal plugin only supports Logseq ver 0.10.* and below.", "warning", { timeout: 5000 })
    return
  }

  await l10nSetup({
    builtinTranslations: {//Full translations
      ja, af, de, es, fr, id, it, ko, "nb-NO": nbNO, nl, pl, "pt-BR": ptBR, "pt-PT": ptPT, ru, sk, tr, uk, "zh-CN": zhCN, "zh-Hant": zhHant
    }
  })

  //100ms待機
  await new Promise(resolve => setTimeout(resolve, 100))

  //ユーザー設定を取得
  await getUserConfig()

  /* user settings */
  logseq.useSettingsSchema(settingsTemplate())
  if (!logseq.settings) setTimeout(() => logseq.showSettingsUI(), 300)


  logseq.App.onRouteChanged(async ({ template }) => {
    // 日誌を開いたときのみ処理する
    if (template !== "/") return

    //一時的解除をした場合に再度CSSを適用する
    if (logseq.settings!.flagExcludeExceptToday as boolean === true)
      provideStyleExcludeExceptToday(logseqVersionMd)
    else
      removeProvideStyle(keyCSSExclude)

    //日誌を開いたら、今日の日記ページを強制的に開く
    if (logseq.settings!.redirectToToday as boolean === true)
      await openPageTodayDiary(logseqVersionMd)//ページが存在しない場合も作成される

    // 除外を解除するボタンを追加する
    if (logseq.settings!.excludeExceptToday as boolean === true)
      addCancelExcludeButton(logseqVersionMd)
  })

  //CSSで除外する場合
  if (logseq.settings!.excludeExceptToday as boolean === true) {
    provideStyleExcludeExceptToday(logseqVersionMd)

    //初回読み込み時 除外を解除するボタンを追加する
    setTimeout(() =>
      addCancelExcludeButton(logseqVersionMd)
      , 2000)
  }


  // ツールバーボタン追加
  addToolbarButtons()

  // コマンド追加
  commandPaletteItems()


  //設定変更時の処理
  logseq.onSettingsChanged(async (newSet: LSPluginBaseInfo['settings'], oldSet: LSPluginBaseInfo['settings']) => {
    if (oldSet.excludeExceptToday !== newSet.excludeExceptToday) {
      if (newSet.excludeExceptToday as boolean === true)
        provideStyleExcludeExceptToday(logseqVersionMd)
      else
        removeProvideStyle(keyCSSExclude)
    }
  })

}/* end_main */


export const openJournalPage = async (pageName: string, checkFlag?: boolean) => {
  if (!checkFlag) {// 昨日と明日、曜日の場合は、ページが存在しない場合は作成する
    logseq.App.pushState('page', { name: pageName })
    return
  }
  if (await logseq.Editor.getPage(pageName) as { name: string } | null) // ページが存在するか確認する
    logseq.App.pushState('page', { name: pageName })//ページが存在する場合は開く
  else
    logseq.UI.showMsg(t("Page not found"), "warning", { timeout: 3000 })//ページが存在しない場合は警告を表示する
}


const provideStyleExcludeExceptToday = (logseqVersionMd: boolean) => {
  if (logseqVersionMd === true)
    logseq.provideStyle({
      key: keyCSSExclude,
      style: CSSExclude
    })
}

const addCancelExcludeButton = (logseqVersionMd: boolean) => {
  if (parent.document.getElementById("cancel-exclude") || logseqVersionMd === false) return //すでにボタンがある場合は処理しない
  // 除外を解除するボタンを追加する
  const diaryEle = parent.document.querySelector('body[data-page="home"]>div#root>div>main div#main-content-container div#journals div.journal-item.content') as HTMLDivElement | null
  if (diaryEle) {
    const buttonEle = document.createElement('button')
    buttonEle.id = "cancel-exclude"
    buttonEle.innerText = "( ➖ " + t("Display before today") + ")"
    buttonEle.title = t("- Single Journal plugin -")
    buttonEle.classList.add('w-full', 'p-4')
    diaryEle.insertAdjacentElement('afterend', buttonEle)

    buttonEle.addEventListener('click', (event) => {
      //ボタン処理を中断する
      event.preventDefault()
      buttonEle.remove()
      removeProvideStyle(keyCSSExclude)
      logseq.updateSettings({ flagExcludeExceptToday: true }) //一時的に除外を解除するフラグを立てる
      logseq.UI.showMsg(t("Temporarily cancel exclusion."), "info", { timeout: 2400 })
    })
  }
}


// MDモデルかどうかのチェック DBモデルはfalse
const checkLogseqVersion = async (): Promise<boolean> => {
  const logseqInfo = (await logseq.App.getInfo("version")) as AppInfo | any
  //  0.11.0もしくは0.11.0-alpha+nightly.20250427のような形式なので、先頭の3つの数値(1桁、2桁、2桁)を正規表現で取得する
  const version = logseqInfo.match(/(\d+)\.(\d+)\.(\d+)/)
  if (version) {
    logseqVersion = version[0] //バージョンを取得
    // console.log("logseq version: ", logseqVersion)

    // もし バージョンが0.10.*系やそれ以下ならば、logseqVersionMdをtrueにする
    if (logseqVersion.match(/0\.([0-9]|10)\.\d+/)) {
      logseqVersionMd = true
      // console.log("logseq version is 0.10.* or lower")
      return true
    } else logseqVersionMd = false
  } else logseqVersion = "0.0.0"
  return false
}

logseq.ready(main).catch(console.error)


