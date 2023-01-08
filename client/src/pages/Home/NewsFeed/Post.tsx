import { ImageCircle } from '@containers/ImageCircle'

type CardOptionalEvent = {
    onClose(POST_ID: string): void
}

type CardDetails = {
    header: string
    authId: string
    postId: string
    userId: string
    profile: string
    content: string
    subHeader: string
} & Partial<CardOptionalEvent>

export function Post (PROPS: CardDetails): JSX.Element {
    const DISPLAY_DELETE_POST = PROPS.authId === PROPS.userId
    const handleClickClose = () => {
        if (PROPS.onClose) {
            PROPS.onClose(PROPS.postId)
        }
    }

    return (
        <section
            className="pt-4 mt-4 shadow-sm rounded-md overflow-hidden bg-[#fff]"
        >
            <div
                className="px-3 flex flex-row relative"
            >
                <ImageCircle
                    src={ PROPS.profile }
                />
                <div>
                    <h2
                        className="font-axiformaBold"
                    >
                        { PROPS.header }
                    </h2>
                    <p
                        className="text-[12px]"
                    >
                        { PROPS.subHeader }
                    </p>
                </div>
                { DISPLAY_DELETE_POST && (
                    <button
                        onClick={ handleClickClose }
                        className="opacity-60 hover:opacity-100 absolute top-0 right-[10px] text-[20px] font-axiformaSemibold w-[20px] h-[20px] leading-[20px] cursor-pointer rounded-md"
                    >
                        &times;
                    </button>
                ) }
            </div>
            <div
                className="my-3"
            >
                <pre
                    className="mx-4 font-axiformaRegular"
                >
                    { PROPS.content }
                </pre>
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
                    className="py-2 px-3 w-full border-t-[1px] border-r-[1px] text-[12px]"
                >
                    Comment
                </button>
                <button
                    className="py-2 px-3 w-full border-t-[1px] text-[12px]"
                >
                    Edit
                </button>
            </div>
        </section>
    )
}