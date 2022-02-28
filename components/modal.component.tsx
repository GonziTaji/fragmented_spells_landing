import { useState } from "react"

interface ModalProps {
    content: JSX.Element | string;
    buttons?: JSX.Element;
    show: boolean;
    onHide?: () => void
}

export const Modal = (props: ModalProps) => {
    return (
        <div className={`
            fixed
            z-10
            inset-0
            overflow-y-auto
            ${!props.show && 'hidden'}
        `}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="
                items-end
                justify-center
                min-h-screen
                pt-4
                px-4
                pb-20
                text-center
                sm:block
                sm:p-0"
            >
                <div
                    className={`
                        fixed
                        inset-0
                        bg-gray-500
                        bg-opacity-75
                        transition-opacity
                        ${!props.show && 'opacity-0'}
                    `}
                    aria-hidden="true"></div>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                    className="
                        hidden
                        sm:inline-block
                        sm:align-middle
                        sm:h-screen
                    "
                    aria-hidden="true"
                >
                    &#8203;
                </span>

                <div className={`
                    inline-block
                    align-bottom
                    bg-white
                    rounded-sm
                    text-left
                    overflow-hidden
                    shadow-xl
                    transform
                    transition-all
                    sm:my-8
                    sm:align-middle
                    sm:max-w-lg
                    sm:w-full
                    ${!props.show && 'opacity-0'}
                `}
                >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        { props.content }
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        { props.buttons }
                    </div>
                </div>
            </div>
        </div>
    )
}
