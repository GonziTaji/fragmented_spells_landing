import { ButtonHTMLAttributes, DOMAttributes } from "react";

export interface HomeButtonProps {
    className?: string;
    type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
    children: any;
}
const HomeButton = (props: HomeButtonProps) => (
    <button
        type={props.type}
        onClick={props.onClick}
        className={`
            rounded border border-red-600
            bg-red-500 hover:bg-red-400
            transition-colors
            text-white
            font-semibold
            p-2
            w-50
            ${props.className || ''}
        `}
    >
        {props.children}
    </button>
)

export default HomeButton;