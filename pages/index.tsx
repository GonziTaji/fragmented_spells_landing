import type { NextPage } from "next";
// import styles from "../styles/Home.module.css";

interface NavItemProps { href: string, text: string }
const NavItem = (props: NavItemProps) => (
    <li>
        <Link href={props.href}>
            {props.text}
        </Link>
    </li>
)

import logoStyles from "../styles/Logo.module.css";
interface LogoProps {};
const Logo = (props: LogoProps) => (
    <div className={logoStyles.fe_logo} />
)

interface BrandProps {};
const Brand = (props: BrandProps) => ( 
    <Link 
        href="/"
    >
        <a className="flex items-center">
            <Logo />
            <span>
                Fragmented spells
            </span>
        </a>
    </Link>
)

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

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

interface HomeButtonProps {
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

import heroStyles from "../styles/Hero.module.css";
import { ButtonHTMLAttributes, DOMAttributes, useState } from "react";

const Hero = (props: any) => (
    <div
        className="py-10"
    >
        <div className={`${heroStyles.hero_img} flex h-96`}>
            <div
                className="flex justify-center space-x-6 self-end w-full">
                <HomeButton type="button" onClick={() => console.log('onclick1')}>
                    Discover Pre Sale Packs
                </HomeButton>

                <HomeButton type="button" onClick={() => console.log('onclick2')}>
                    Whitepaper
                </HomeButton>
            </div>
        </div>
    </div>
)

import sobrePng from '../public/sobre.png';
import metamaskLogoPng from '../public/metamask_logo.png';
import presaleStyles from "../styles/Presale.module.css";
import Image from "next/image";
import Link from "next/link";
const Presale = () => (
    <div className="bg-gray-100" id="presale">
        <h1 className="text-5xl text-center leading-loose">
            Get yours!
        </h1>
        
        <div className="flex justify-center">
            <div className={`w-1/3 ${presaleStyles.sobre}`}>
                <Image alt="pack" className="rotate-6" src={sobrePng} layout="intrinsic"/>
            </div>
        </div>

        <div className="flex justify-center items-center">
            <span>
                $10 BUSD
            </span>

            <select className="w-16 mx-2 border rounded p-2">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>5</option>
                <option>10</option>
                <option>18</option>
            </select>

            <HomeButton type="button" className="w-28 flex items-center justify-between" >
                <span>Buy now</span>
                <Image alt="metamask_logo" src={metamaskLogoPng} width={20} height={20} />
            </HomeButton>
        </div>

        <div className="flex justify-around my-5 py-5 bg-yellow-100">
            <div>
                <p>XX SOLD</p>
                <p>XX REMAINING</p>
            </div>
            <div>
                <p>Up until xx-xx-xxxx xx:xx:xx EST</p>
                <p>Presale ends on x days and xx:xx:xx</p>
            </div>
        </div>

        <div className="container margin-auto">
            <h1>Presale 1</h1>
            <p>Date: xx</p>
            <h1>Presale 2</h1>
            <p>Date: xx</p>
        </div>
    </div>
)

const Footer = () => (
    <div className="bg-gray-800 text-gray-200 py-3 px-10">
        <p className="text-center w-full">Footer</p>
        <p>Sitemap</p>
        <ul>
            <li> Thing 1 </li>
            <li> Thing 2 </li>
            <li> Thing 3 </li>
        </ul>
    </div>
)

const Home: NextPage = () => {
    return <div>
        <Header/>
        <Hero/>
        <Presale/>
        <Footer />
    </div>;
};

export default Home;
