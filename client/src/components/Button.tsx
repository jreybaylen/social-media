import { ButtonHTMLAttributes } from "react"

type ButtonField = {
    label: string
}

export default function Button (
    props: ButtonField & ButtonHTMLAttributes<HTMLButtonElement>
): JSX.Element {
    const { label, ...rest } = props
    const ADDITIONAL_CLASSNAME = rest.disabled ? 'bg-disabled' : 'bg-secondary'
    const COMMON_CLASSNAMES = 'font-axiformaSemibold w-full py-3 mt-3 rounded-[8px] text-white uppercase tracking-wider text-[18px]'

    return (
        <button
            { ...rest }
            className={
                `${ COMMON_CLASSNAMES } ${ ADDITIONAL_CLASSNAME }`
            }
        >
            { label }
        </button>
    )
}