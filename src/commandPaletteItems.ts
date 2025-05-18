import { format, subDays, addDays, subWeeks, subMonths, subYears } from "date-fns"
import { openJournalPage, getConfigPreferredDateFormat } from "."
import { getDayDate } from "./addToolbarButtons"
import { t } from "logseq-l10n"

const registerJournalCommand = (key: string, label: string, dateFunc: () => Date, moveFlag: boolean = false) => {
  logseq.App.registerCommandPalette({
    key: `direct-journal-${key}`,
    label: t(label),
    keybinding: { binding: "", mode: "non-editing" }
  }, async () => { 
    await openJournalPage(format(dateFunc(), getConfigPreferredDateFormat()), moveFlag) 
  })
}

export const commandPaletteItems = () => {
  if (logseq.settings!.addJournalMoveCommand as boolean === true) {
    const timeMoves = [
      { key: "year-before", label: "Journal Year Before (-1y)", date: () => subYears(new Date(), 1) },
      { key: "month-before", label: "Journal Month Before (-1M)", date: () => subMonths(new Date(), 1) },
      { key: "week-before", label: "Journal Week Before (-1w)", date: () => subWeeks(new Date(), 1) },
      { key: "yesterday", label: "Journal Yesterday (-1d)", date: () => subDays(new Date(), 1) },
      { key: "today", label: "Journal Today (d)", date: () => new Date() },
      { key: "tomorrow", label: "Journal Tomorrow (+1d)", date: () => addDays(new Date(), 1) }
    ]
    timeMoves.forEach(move => registerJournalCommand(move.key, move.label, move.date, true))
  }

  if (logseq.settings!.addWeekdayCommand as boolean === true) {
    const weekdays = [
      { key: "monday", label: "Journal Monday", day: 1 },
      { key: "tuesday", label: "Journal Tuesday", day: 2 },
      { key: "wednesday", label: "Journal Wednesday", day: 3 },
      { key: "thursday", label: "Journal Thursday", day: 4 },
      { key: "friday", label: "Journal Friday", day: 5 },
      { key: "saturday", label: "Journal Saturday", day: 6 },
      { key: "sunday", label: "Journal Sunday", day: 0 }
    ]
    weekdays.forEach(day => registerJournalCommand(day.key, day.label, () => getDayDate(day.day)))
  }
}
