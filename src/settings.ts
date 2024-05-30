import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'
import { t } from 'logseq-l10n'

/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
export const settingsTemplate = (): SettingSchemaDesc[] => [

    {
        key: "excludeExceptToday",
        type: "boolean",
        title: t("Exclude everything except today's diary"),
        default: true,
        //日誌で今日のみを表示する場合は、このオプションを有効にします。一時的な解除は、コンテンツ下にあるボタンから行えます。
        description: t("If you want to display only today's diary, enable this option. Temporary cancellation can be done from the button under the content."),
    },
    {
        key: "redirectToToday",
        type: "boolean",
        title: t("Redirect to today's diary when opening journals"),
        default: false,
        //シングルページとして開きます。ただし、リダイレクトのタイムラグが生じます。
        description: t("Open as single page. However, there is a time lag for redirection."),
    },

    // ジャーナル移動のコマンドを追加するかどうか
    {
        key: "addJournalMoveCommand",
        type: "boolean",
        title: t("Add journal move command"),
        default: true,
        // プラグインもしくはアプリの再起動が必要です。
        description: t("⚠️ A plugin or app restart is required."),
    },
    // 曜日のコマンドを追加するかどうか
    {
        key: "addWeekdayCommand",
        type: "boolean",
        title: t("Add weekday command (access to the journal)"),
        default: true,
        description: t("⚠️ A plugin or app restart is required."),
    },
    // ジャーナル移動のツールバーアイコンを有効にするかどうか
    {
        key: "addJournalMoveToolbar",
        type: "boolean",
        title: t("Add journal move toolbar icon"),
        default: true,
        description: t("⚠️ A plugin or app restart is required."),
    },
    // 曜日のツールバーアイコンを有効にするかどうか
    {
        key: "addWeekdayToolbar",
        type: "boolean",
        title: t("Add weekday toolbar icon"),
        default: true,
        description: t("⚠️ A plugin or app restart is required."),
    },
]
