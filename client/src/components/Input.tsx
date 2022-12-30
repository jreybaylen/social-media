import { InputHTMLAttributes } from 'react'

type TextField = {
    testId: string
    inputId: string
    inputLabel: string
}

export default function Input (
    props: TextField & InputHTMLAttributes<HTMLInputElement>
): JSX.Element {
    const { testId, inputId, inputLabel, ...rest } = props

    return (
        <div
            className="mb-3"
        >
            <label
                htmlFor="email"
                className="text-gray-500 text-[14px]"
            >
                { inputLabel }
            </label>
            <input
                { ...rest }
                id={ inputId }
                data-testid={ testId }
                className="px-3 py-2 mt-1 w-full border-[1px] rounded"
            />
        </div>
    )
}