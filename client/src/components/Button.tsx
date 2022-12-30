import { ButtonHTMLAttributes } from "react"

type ButtonField = {
    label: string
}

export default function Button (
    props: ButtonField & ButtonHTMLAttributes<HTMLButtonElement>
): JSX.Element {
    const { label, ...rest } = props

    return (
        <button
            { ...rest }
            className="font-axiformaSemibold w-full py-3 mt-3 bg-secondary rounded-[8px] text-white uppercase tracking-wider text-[18px]"
        >
            { label }
        </button>
    )
}