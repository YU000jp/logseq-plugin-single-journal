import { format, addDays, subDays, subWeeks, subMonths, subYears } from "date-fns"
import { openJournalPage, getConfigPreferredDateFormat } from "."
import { t } from "logseq-l10n"

// ツールバーボタン追加
export const addToolbarButtons = () => {

  if (logseq.settings!.addJournalMoveToolbar as boolean === true) {
    //一年前
    logseq.App.registerUIItem('toolbar', {
      key: 'journal11YearBefore',
      template: `<div><a class="button icon" data-on-click="yearBeforeJournal" style="font-size: 12px" title="${t("Year Before Journal")}">-1Y</a></div>`,
    })
    //一か月前
    logseq.App.registerUIItem('toolbar', {
      key: 'journal12MonthBefore',
      template: `<div><a class="button icon" data-on-click="monthBeforeJournal" style="font-size: 12px" title="${t("Month Before Journal")}">-1M</a></div>`,
    })
    //一週間前
    logseq.App.registerUIItem('toolbar', {
      key: 'journal13WeekBefore',
      template: `<div><a class="button icon" data-on-click="weekBeforeJournal" style="font-size: 12px" title="${t("Week Before Journal")}">-1W</a></div>`,
    })
    //昨日
    logseq.App.registerUIItem('toolbar', {
      key: 'journal14Yesterday',
      template: `<div><a class="button icon" data-on-click="yesterdayJournal" style="font-size: 12px" title="${t("Yesterday Journal")}">-1d</a></div>`,
    })
    //今日
    logseq.App.registerUIItem('toolbar', {
      key: 'journal15Today',
      template: `<div><a class="button icon" data-on-click="todayJournal" style="font-size: 14px" title="${t("Today Journal")}">d</a></div>`,
    })
    //明日
    logseq.App.registerUIItem('toolbar', {
      key: 'journal16Tomorrow',
      template: `<div><a class="button icon" data-on-click="tomorrowJournal" style="font-size: 12px" title="${t("Tomorrow Journal")}">+1d</a></div>`,
    })
    //クリックイベント
    logseq.provideModel({
      //今日の日記ページを開く
      todayJournal: async () => { await openJournalPage(format(new Date(), getConfigPreferredDateFormat())) },
      //明日の日記ページを開く
      tomorrowJournal: async () => { await openJournalPage(format(addDays(new Date(), 1), getConfigPreferredDateFormat())) },
      //昨日の日記ページを開く
      yesterdayJournal: async () => { await openJournalPage(format(subDays(new Date(), 1), getConfigPreferredDateFormat())) },
      //一週間前の日記ページを開く
      weekBeforeJournal: async () => { await openJournalPage(format(subWeeks(new Date(), 1), getConfigPreferredDateFormat()), true) },
      //一か月前の日記ページを開く
      monthBeforeJournal: async () => { await openJournalPage(format(subMonths(new Date(), 1), getConfigPreferredDateFormat()), true) },
      //一年前の日記ページを開く
      yearBeforeJournal: async () => { await openJournalPage(format(subYears(new Date(), 1), getConfigPreferredDateFormat()), true) },
    })
  }

  if (logseq.settings!.addWeekdayToolbar as boolean === true) {
    //日曜日
    logseq.App.registerUIItem('toolbar', {
      key: 'journal20Sunday',
      template: `<div><a class="button icon" data-on-click="sundayJournal" style="font-size: 12px" title="${t("Sunday Journal")}">${getWeekdayName(0)}</a></div>`,
    })
    //月曜日
    logseq.App.registerUIItem('toolbar', {
      key: 'journal21Monday',
      template: `<div><a class="button icon" data-on-click="mondayJournal" style="font-size: 12px" title="${t("Monday Journal")}">${getWeekdayName(1)}</a></div>`,
    })
    //火曜日
    logseq.App.registerUIItem('toolbar', {
      key: 'journal22Tuesday',
      template: `<div><a class="button icon" data-on-click="tuesdayJournal" style="font-size: 12px" title="${t("Tuesday Journal")}">${getWeekdayName(2)}</a></div>`,
    })
    //水曜日
    logseq.App.registerUIItem('toolbar', {
      key: 'journal23Wednesday',
      template: `<div><a class="button icon" data-on-click="wednesdayJournal" style="font-size: 12px" title="${t("Wednesday Journal")}">${getWeekdayName(3)}</a></div>`,
    })
    //木曜日
    logseq.App.registerUIItem('toolbar', {
      key: 'journal24Thursday',
      template: `<div><a class="button icon" data-on-click="thursdayJournal" style="font-size: 12px" title="${t("Thursday Journal")}">${getWeekdayName(4)}</a></div>`,
    })
    //金曜日
    logseq.App.registerUIItem('toolbar', {
      key: 'journal25Friday',
      template: `<div><a class="button icon" data-on-click="fridayJournal" style="font-size: 12px" title="${t("Friday Journal")}">${getWeekdayName(5)}</a></div>`,
    })
    //土曜日
    logseq.App.registerUIItem('toolbar', {
      key: 'journal26Saturday',
      template: `<div><a class="button icon" data-on-click="saturdayJournal" style="font-size: 12px" title="${t("Saturday Journal")}">${getWeekdayName(6)}</a></div>`,
    })

    //クリックイベント
    logseq.provideModel({
      //月曜日の日記ページを開く
      mondayJournal: async () => {
        await openJournalPage(format(getDayDate(1), getConfigPreferredDateFormat()))
      },
      //火曜日の日記ページを開く
      tuesdayJournal: async () => {
        await openJournalPage(format(getDayDate(2), getConfigPreferredDateFormat()))
      },
      //水曜日の日記ページを開く
      wednesdayJournal: async () => {
        await openJournalPage(format(getDayDate(3), getConfigPreferredDateFormat()))
      },
      //木曜日の日記ページを開く
      thursdayJournal: async () => {
        await openJournalPage(format(getDayDate(4), getConfigPreferredDateFormat()))
      },
      //金曜日の日記ページを開く
      fridayJournal: async () => {
        await openJournalPage(format(getDayDate(5), getConfigPreferredDateFormat()))
      },
      //土曜日の日記ページを開く
      saturdayJournal: async () => {
        await openJournalPage(format(getDayDate(6), getConfigPreferredDateFormat()))
      },
      //日曜日の日記ページを開く
      sundayJournal: async () => {
        await openJournalPage(format(getDayDate(0), getConfigPreferredDateFormat()))
      },
    })
  }
}

// 曜日のdateオブジェクトを返す
export const getDayDate = (day: number) => {
  const today = new Date()
  const dayOfWeek = today.getDay()
  return dayOfWeek === day ? today : dayOfWeek === 0 ? subDays(today, 6) : subDays(today, dayOfWeek - day)
}

// Intl.DateTimeFormatで曜日の数字から曜日名を取得
export const getWeekdayName = (day: number) => {
  return new Intl.DateTimeFormat("default", { weekday: 'short' }).format(getDayDate(day))
}
