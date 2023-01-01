import { ImageCircle } from './ImageCircle'

type CardDetails = {
    header: string
    profile: string
    content: string
    subHeader: string
}

export function Card (props: CardDetails): JSX.Element {
    return (
        <section
            className="pt-3 border-[1px] rounded-md overflow-hidden"
        >
            <div
                className="px-3 flex flex-row"
            >
                <ImageCircle
                    src={ props.profile }
                />
                <div>
                    <h2
                        className="font-axiformaBold"
                    >
                        { props.header }
                    </h2>
                    <p
                        className="text-[12px]"
                    >
                        { props.subHeader }
                    </p>
                </div>
            </div>
            <div
                className="my-3"
            >
                <h3
                    className="ml-3"
                >
                    { props.content }
                </h3>
            </div>
            <div
                className="flex flex-row"
            >
                <button
                    className="py-2 px-3 w-full border-t-[1px] border-r-[1px] text-[12px]"
                >
                    Like
                </button>
                <button
                    className="py-2 px-3 w-full border-t-[1px] text-[12px]"
                >
                    Comment
                </button>
            </div>
        </section>
    )
}