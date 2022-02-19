import Link from "next/link";
import Logo from "./logo.component";

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

export default Brand;