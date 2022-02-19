import sobrePng from '../public/sobre.png';
import metamaskLogoPng from '../public/metamask_logo.png';
import presaleStyles from "../styles/Presale.module.css";
import Image from "next/image";
import HomeButton from './homeButton.component';

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

export default Presale