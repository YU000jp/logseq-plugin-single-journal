import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'
import { t } from 'logseq-l10n'

/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
export const settingsTemplate = (): SettingSchemaDesc[] => [

    {
        key: "excludeExceptToday",
        type: "boolean",
        title: t("Exclude everything except today's diary (default: true)"),
        default: true,
        //日誌で今日のみを表示する場合は、このオプションを有効にします。一時的な解除は、コンテンツ下にあるボタンから行えます。
        description: t("If you want to display only today's diary, enable this option. Temporary cancellation can be done from the button under the content."),
    },
    {
        key: "redirectToToday",
        type: "boolean",
        title: t("Redirect to today's diary when opening journals (default: false)"),
        default: false,
        //シングルページとして開きます。ただし、リダイレクトのタイムラグが生じます。
        description: t("Open as single page. However, there is a time lag for redirection."),
    },
]
