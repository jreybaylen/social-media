import { ImgHTMLAttributes } from 'react'

export function ImageCircle (props: ImgHTMLAttributes<HTMLImageElement>): JSX.Element {
    const { className, ...rest } = props

    return (
        <div
            className="rounded-full p-[1px] w-[40px] h-[40px] mr-3 overflow-hidden border-[1px]"
        >
            <img
                { ...rest }
                className={ `rounded-full block h-full w-full ${ className }` }
            />
        </div>
    )
}