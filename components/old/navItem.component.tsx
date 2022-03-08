import Link from "next/link";

interface NavItemProps { href: string, text: string }
const NavItem = (props: NavItemProps) => (
    <li>
        <Link href={props.href}>
            {props.text}
        </Link>
    </li>
)

export default NavItem;