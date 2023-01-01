import { InputHTMLAttributes } from 'react'

type TextAreaField = {
    testId: string
    inputId: string
}

export default function Input (
    props: TextAreaField & InputHTMLAttributes<HTMLTextAreaElement>
): JSX.Element {
    const { testId, inputId, className, ...rest } = props

    return (
        <textarea
            { ...rest }
            id={ inputId }
            data-testid={ testId }
            className={ `px-3 py-2 mt-1 border-[1px] rounded ${ className }` }
        />
    )
}