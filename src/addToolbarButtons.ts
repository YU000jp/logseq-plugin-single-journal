import { format, addDays, subDays, subWeeks, subMonths, subYears } from "date-fns"
import { openJournalPage, getConfigPreferredDateFormat } from "."
import { t } from "logseq-l10n"

const registerToolbarButton = (key: string, onClick: string, label: string, text: string, fontSize: string = "12px") => {
  logseq.App.registerUIItem('toolbar', {
    key: `journal${key}`,
    template: `<div><a class="button icon" data-on-click="${onClick}" style="font-size: ${fontSize}" title="${t(label)}">${text}</a></div>`,
  })
}

export const addToolbarButtons = () => {
  if (logseq.settings!.addJournalMoveToolbar as boolean === true) {
    const timeButtons = [
      { key: '11YearBefore', onClick: 'yearBeforeJournal', label: 'Year Before Journal', text: '-1Y' },
      { key: '12MonthBefore', onClick: 'monthBeforeJournal', label: 'Month Before Journal', text: '-1M' },
      { key: '13WeekBefore', onClick: 'weekBeforeJournal', label: 'Week Before Journal', text: '-1W' },
      { key: '14Yesterday', onClick: 'yesterdayJournal', label: 'Yesterday Journal', text: '-1d' },
      { key: '15Today', onClick: 'todayJournal', label: 'Today Journal', text: 'd', fontSize: '14px' },
      { key: '16Tomorrow', onClick: 'tomorrowJournal', label: 'Tomorrow Journal', text: '+1d' }
    ]
    timeButtons.forEach(btn => registerToolbarButton(btn.key, btn.onClick, btn.label, btn.text, btn.fontSize))

    const timeHandlers = {
      todayJournal: () => new Date(),
      tomorrowJournal: () => addDays(new Date(), 1),
      yesterdayJournal: () => subDays(new Date(), 1),
      weekBeforeJournal: () => subWeeks(new Date(), 1),
      monthBeforeJournal: () => subMonths(new Date(), 1),
      yearBeforeJournal: () => subYears(new Date(), 1)
    }

    logseq.provideModel(Object.fromEntries(
      Object.entries(timeHandlers).map(([key, dateFunc]) => [
        key,
        async () => await openJournalPage(
          format(dateFunc(), getConfigPreferredDateFormat()),
          key.includes('Before')
        )
      ]))
    )
  }

  if (logseq.settings!.addWeekdayToolbar as boolean === true) {
    const weekdays = [
      { key: '20Sunday', onClick: 'sundayJournal', label: 'Sunday Journal', day: 0 },
      { key: '21Monday', onClick: 'mondayJournal', label: 'Monday Journal', day: 1 },
      { key: '22Tuesday', onClick: 'tuesdayJournal', label: 'Tuesday Journal', day: 2 },
      { key: '23Wednesday', onClick: 'wednesdayJournal', label: 'Wednesday Journal', day: 3 },
      { key: '24Thursday', onClick: 'thursdayJournal', label: 'Thursday Journal', day: 4 },
      { key: '25Friday', onClick: 'fridayJournal', label: 'Friday Journal', day: 5 },
      { key: '26Saturday', onClick: 'saturdayJournal', label: 'Saturday Journal', day: 6 }
    ]

    weekdays.forEach(day =>
      registerToolbarButton(day.key, day.onClick, day.label, getWeekdayName(day.day))
    )

    logseq.provideModel(Object.fromEntries(
      weekdays.map(day => [
        day.onClick,
        async () => await openJournalPage(format(getDayDate(day.day), getConfigPreferredDateFormat()))
      ]))
    )
  }
}

// 曜日のdateオブジェクトを返す
export const getDayDate = (targetDay: number): Date => {
  const today = new Date()
  const currentDay = today.getDay()
  const diff = targetDay - currentDay

  // 差分が負の場合は次週の日付を取得
  const daysToAdd = diff >= 0 ? diff : diff + 7
  return addDays(today, daysToAdd)
}

// Intl.DateTimeFormatで曜日の数字から曜日名を取得
export const getWeekdayName = (day: number) => {
  // 2023-01-01は日曜日なので、基準日として使用
  const baseDate = new Date(2023, 0, 1 + day)
  return new Intl.DateTimeFormat("default", { weekday: 'short' }).format(baseDate)
}
