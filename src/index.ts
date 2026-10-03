import '@logseq/libs' //https://plugins-doc.logseq.com/
import { LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user'
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
let logseqVersion: string = "" //バージョン情報用
let isFileGraph: boolean = false //現在のグラフがファイルベースかどうか

/* main */
const main = async () => {

  // グラフ種別チェック(バージョンではなく現在のグラフがファイルベースかどうかで判定)

  const isDbGraph = await checkLogseqDbGraph() // DBグラフだった場合はtrue
  isFileGraph = !isDbGraph
  logseqVersion = await fetchAppVersion() //情報用にバージョンを保持
  if (isFileGraph === false) {
    // ファイルグラフ(非DBグラフ)にのみ対応している
    logseq.UI.showMsg("The Single Journal plugin only supports file-based graphs (DB graphs are not supported).", "warning", { timeout: 5000 })
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
      provideStyleExcludeExceptToday(isFileGraph)
    else
      removeProvideStyle(keyCSSExclude)

    //日誌を開いたら、今日の日記ページを強制的に開く
    if (logseq.settings!.redirectToToday as boolean === true)
      await openPageTodayDiary()//ページが存在しない場合も作成される

    // 除外を解除するボタンを追加する
    if (logseq.settings!.excludeExceptToday as boolean === true)
      addCancelExcludeButton(isFileGraph)
  })

  //CSSで除外する場合
  if (logseq.settings!.excludeExceptToday as boolean === true) {
    provideStyleExcludeExceptToday(isFileGraph)

    //初回読み込み時 除外を解除するボタンを追加する
    setTimeout(() =>
      addCancelExcludeButton(isFileGraph)
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
        provideStyleExcludeExceptToday(isFileGraph)
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


const provideStyleExcludeExceptToday = (isFileGraph: boolean) => {
  if (isFileGraph === true)
    logseq.provideStyle({
      key: keyCSSExclude,
      style: CSSExclude
    })
}

const addCancelExcludeButton = (isFileGraph: boolean) => {
  if (parent.document.getElementById("cancel-exclude") || isFileGraph === false) return //すでにボタンがある場合は処理しない
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


// 現在のグラフがDBグラフかどうかのチェック(公式API)
// Logseq 0.10.x以下のホストにはこのAPIが存在しないが、logseq.Appは動的Proxyのため
// typeofガードは効かない。rejectや非booleanが返ったらfalse(DBグラフを開けない旧アプリ)
const checkLogseqDbGraph = async (): Promise<boolean> => {
  try {
    const value = await (logseq.App as any).checkCurrentIsDbGraph()
    return typeof value === "boolean" ? value : false
  } catch {
    return false
  }
}

// アプリのバージョンを取得(情報用のみ。グラフ種別の判定には使わない)
const fetchAppVersion = async (): Promise<string> => {
  const info = await logseq.App.getInfo("version")
  const version = typeof info === "string" ? info : "0.0.0"
  const m = version.match(/(\d+)\.(\d+)\.(\d+)/)
  return m ? m[0] : version
}

logseq.ready(main).catch(console.error)


