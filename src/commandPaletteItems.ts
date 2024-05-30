import { format, subDays, addDays, subWeeks, subMonths, subYears } from "date-fns"
import { openJournalPage, getConfigPreferredDateFormat } from "."
import { getDayDate } from "./addToolbarButtons"
import { t } from "logseq-l10n"

export const commandPaletteItems = () => {

  if (logseq.settings!.addJournalMoveCommand as boolean === true) {
    //コマンドパレットに「Year Before Journal」を追加
    logseq.App.registerCommandPalette({
      key: "direct-journal-year-before",
      label: t("Journal Year Before (-1y)"),
      keybinding: {
        binding: "",
        mode: "non-editing",
      }
    }, async () => { await openJournalPage(format(subYears(new Date(), 1), getConfigPreferredDateFormat())) })
    //コマンドパレットに「Month Before Journal」を追加
    logseq.App.registerCommandPalette({
      key: "direct-journal-month-before",
      label: t("Journal Month Before (-1M)"),
      keybinding: {
        binding: "",
        mode: "non-editing",
      }
    }, async () => { await openJournalPage(format(subMonths(new Date(), 1), getConfigPreferredDateFormat())) })
    //コマンドパレットに「Week Before Journal」を追加
    logseq.App.registerCommandPalette({
      key: "direct-journal-week-before",
      label: t("Journal Week Before (-1w)"),
      keybinding: {
        binding: "",
        mode: "non-editing",
      }
    }, async () => { await openJournalPage(format(subWeeks(new Date(), 1), getConfigPreferredDateFormat())) })
    //コマンドパレットに「Yesterday Journal」を追加
    logseq.App.registerCommandPalette({
      key: "direct-journal-yesterday",
      label: t("Journal Yesterday (-1d)"),
      keybinding: {
        binding: "",
        mode: "non-editing",
      }
    }, async () => { await openJournalPage(format(subDays(new Date(), 1), getConfigPreferredDateFormat())) })
    //コマンドパレットに「Today Journal」を追加
    logseq.App.registerCommandPalette({
      key: "direct-journal-today",
      label: t("Journal Today (d)"),
      keybinding: {
        binding: "",
        mode: "non-editing",
      }
    }, async () => { await openJournalPage(format(new Date(), getConfigPreferredDateFormat())) })
    //コマンドパレットに「Tomorrow Journal」を追加
    logseq.App.registerCommandPalette({
      key: "direct-journal-tomorrow",
      label: t("Journal Tomorrow (+1d)"),
      keybinding: {
        binding: "",
        mode: "non-editing",
      }
    }, async () => { await openJournalPage(format(addDays(new Date(), 1), getConfigPreferredDateFormat())) })
  }

  if (logseq.settings!.addWeekdayCommand as boolean === true) {
    //コマンドパレットに「Journal Monday」を追加
    logseq.App.registerCommandPalette({
      key: "direct-journal-monday",
      label: t("Journal Monday"),
      keybinding: {
        binding: "",
        mode: "non-editing",
      }
    }, async () => { await openJournalPage(format(getDayDate(1), getConfigPreferredDateFormat())) })
    //コマンドパレットに「Journal Tuesday」を追加
    logseq.App.registerCommandPalette({
      key: "direct-journal-tuesday",
      label: t("Journal Tuesday"),
      keybinding: {
        binding: "",
        mode: "non-editing",
      }
    }, async () => { await openJournalPage(format(getDayDate(2), getConfigPreferredDateFormat())) })
    //コマンドパレットに「Journal Wednesday」を追加
    logseq.App.registerCommandPalette({
      key: "direct-journal-wednesday",
      label: t("Journal Wednesday"),
      keybinding: {
        binding: "",
        mode: "non-editing",
      }
    }, async () => { await openJournalPage(format(getDayDate(3), getConfigPreferredDateFormat())) })
    //コマンドパレットに「Journal Thursday」を追加
    logseq.App.registerCommandPalette({
      key: "direct-journal-thursday",
      label: t("Journal Thursday"),
      keybinding: {
        binding: "",
        mode: "non-editing",
      }
    }, async () => { await openJournalPage(format(getDayDate(4), getConfigPreferredDateFormat())) })
    //コマンドパレットに「Journal Friday」を追加
    logseq.App.registerCommandPalette({
      key: "direct-journal-friday",
      label: t("Journal Friday"),
      keybinding: {
        binding: "",
        mode: "non-editing",
      }
    }, async () => { await openJournalPage(format(getDayDate(5), getConfigPreferredDateFormat())) })
    //コマンドパレットに「Journal Saturday」を追加
    logseq.App.registerCommandPalette({
      key: "direct-journal-saturday",
      label: t("Journal Saturday"),
      keybinding: {
        binding: "",
        mode: "non-editing",
      }
    }, async () => { await openJournalPage(format(getDayDate(6), getConfigPreferredDateFormat())) })
    //コマンドパレットに「Journal Sunday」を追加
    logseq.App.registerCommandPalette({
      key: "direct-journal-sunday",
      label: t("Journal Sunday"),
      keybinding: {
        binding: "",
        mode: "non-editing",
      }
    }, async () => { await openJournalPage(format(getDayDate(0), getConfigPreferredDateFormat())) })
  }
}
