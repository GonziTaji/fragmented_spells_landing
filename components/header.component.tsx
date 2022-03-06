import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import NavItem from "./navItem.component";
import Logo from "./logo.component";
import Brand from "./brand.component";
import { useContext, useState } from "react";
import { Web3Context } from "./web3ContextProvider";
import HomeButton from "./homeButton.component";
import { Web3Widget } from "./web3Widget";

const Header = () => {
    const [ menuShown, setMenuShown ] = useState(false);

    const showMenu = () => setMenuShown(true);
    const hideMenu = () => setMenuShown(false);

    const menuEntries = [
        { label: 'Home', href: '#' },
        { label: 'Presale', href: '#' },
        { label: 'Whitepaper', href: '#' },
        { label: 'About us', href: '#' },
    ];

    const { connected, connect, address } = useContext(Web3Context);

    return (
        <div className={`
            z-10
            sticky top-0
            bg-gray-200
            py-2 px-8
            flex items-center justify-between
            text-2xl
        `}>
            <Brand />

            <nav className="hidden md:block">
                <ul className="flex space-x-6">
                    {
                        menuEntries.map(({ label, href }, i) => (
                            <NavItem key={i} text={label} href={href} />
                        ))
                    }
                    <li>
                        {
                            connected && address
                            ?
                            <Web3Widget />
                            : 
                            <HomeButton type="button" onClick={connect}>
                                Connect
                            </HomeButton>
                        }
                    </li>
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