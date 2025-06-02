import { AppUserConfigs } from '@logseq/libs/dist/LSPlugin.user'
import { format } from 'date-fns'

export const removeProvideStyle = (className: string) => {
    const doc = parent.document.head.querySelector(
      `style[data-injected-style^="${className}"]`
    ) as HTMLStyleElement | null
    if (doc) doc.remove()
  }
export const openPageTodayDiary = async (logseqVersionMd: boolean) => {
  const { preferredDateFormat } = await logseq.App.getUserConfigs() as AppUserConfigs
  logseq.App.pushState('page', { name: format(new Date(), preferredDateFormat) })
}
