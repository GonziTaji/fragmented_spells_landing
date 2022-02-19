import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import NavItem from "./navItem.component";
import Logo from "./logo.component";
import Brand from "./brand.component";
import { useState } from "react";

const Header = () => {
    const [ menuShown, setMenuShown ] = useState(false);

    const showMenu = () => setMenuShown(true);
    const hideMenu = () => setMenuShown(false);

    const menuEntries = [
        { label: 'Home', href: '#' },
        { label: 'Presale', href: '#' },
        { label: 'Whitepaper', href: '#' },
        { label: 'About us', href: '#' },
    ]

    return (
        <div className={`
            bg-gray-200
            py-2 px-4
            flex items-center justify-between
            text-2xl
        `}>
            <Brand />

            <nav className="hidden md:block">
                <ul className="flex space-x-4">
                    {
                        menuEntries.map(({ label, href }, i) => (
                            <NavItem key={i} text={label} href={href} />
                        ))
                    }
                </ul>
            </nav>

            <button
                type="button"
                className="md:hidden"
                onClick={showMenu}
            >
                <FontAwesomeIcon icon={faBars} />
            </button>

            <nav
                className={`
                    bg-red-200
                    h-full w-full
                    transition-all
                    duration-300
                    p-4
                    fixed top-0
                    z-50
                    ${menuShown ? 'left-0' : 'left-full'}
                `}
            >
                <div className="w-full flex justify-between">
                    <Logo />
                    <button type="button" onClick={hideMenu}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <ul className="text-center">
                    {
                        menuEntries.map(({ label, href }, i) => (
                            <NavItem key={i} text={label} href={href} />
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Header;