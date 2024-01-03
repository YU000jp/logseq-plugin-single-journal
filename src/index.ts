import '@logseq/libs'; //https://plugins-doc.logseq.com/
import { LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user'
import { setup as l10nSetup, t } from "logseq-l10n"; //https://github.com/sethyuan/logseq-l10n
import CSSExclude from './exclude.css?inline'; // CSS
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
const keyCSSExclude = 'exclude' // CSS

/* main */
const main = async () => {

  await l10nSetup({
    builtinTranslations: {//Full translations
      ja, af, de, es, fr, id, it, ko, "nb-NO": nbNO, nl, pl, "pt-BR": ptBR, "pt-PT": ptPT, ru, sk, tr, uk, "zh-CN": zhCN, "zh-Hant": zhHant
    }
  })

  /* user settings */
  logseq.useSettingsSchema(settingsTemplate())
  if (!logseq.settings) setTimeout(() => logseq.showSettingsUI(), 300)


  logseq.App.onRouteChanged(async ({ template }) => {
    // 日誌を開いたときのみ処理する
    if (template !== "/") return

    //一時的解除をした場合に再度CSSを適用する
    if (logseq.settings!.flagExcludeExceptToday as boolean === true) provideStyleExcludeExceptToday()

    //日誌を開いたら、今日の日記ページを強制的に開く
    if (logseq.settings!.redirectToToday as boolean === true)
      await openPageTodayDiary()//ページが存在しない場合も作成される

    // 除外を解除するボタンを追加する
    if (logseq.settings!.excludeExceptToday as boolean === true)
      addCancelExcludeButton()
  })

  //CSSで除外する場合
  if (logseq.settings!.excludeExceptToday as boolean === true)
    provideStyleExcludeExceptToday()
  logseq.onSettingsChanged(async (newSet: LSPluginBaseInfo['settings'], oldSet: LSPluginBaseInfo['settings']) => {
    if (oldSet.excludeExceptToday !== newSet.excludeExceptToday) {
      if (newSet.excludeExceptToday as boolean === true)
        provideStyleExcludeExceptToday()
      else
        removeProvideStyle(keyCSSExclude)
    }
  })

}/* end_main */

const provideStyleExcludeExceptToday = () =>
  logseq.provideStyle({ key: keyCSSExclude, style: CSSExclude })


const addCancelExcludeButton = () => {
  if (parent.document.getElementById("cancel-exclude")) return //すでにボタンがある場合は処理しない
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

logseq.ready(main).catch(console.error)


