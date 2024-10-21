import { useRef } from 'react'

export default () => {
    const scrollBlocked = useRef<boolean>()
    const html = document.documentElement
    const { body } = document

    const blockScroll = () => {
        if (!body || !body.style || scrollBlocked.current) return

        const scrollBarWidth = window.innerWidth - html.clientWidth
        const bodyPaddingRight =
            parseInt(
                window.getComputedStyle(body).getPropertyValue('padding-right')
            ) || 0

        html.style.position = 'relative'
        html.style.overflow = 'hidden'
        html.style.height = '100%'
        body.style.height = '100%'
        body.style.position = 'relative'
        body.style.overflow = 'hidden'
        body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`

        scrollBlocked.current = true
    }

    const allowScroll = () => {
        if (!body || !body.style || !scrollBlocked.current) return

        html.style.position = ''
        html.style.overflow = ''
        html.style.height = ''
        body.style.position = ''
        body.style.overflow = ''
        body.style.paddingRight = ''
        body.style.height = ''

        scrollBlocked.current = false
    }

    return [blockScroll, allowScroll]
}
