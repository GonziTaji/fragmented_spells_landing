import sobrePng from '../public/sobre.png';
import metamaskLogoPng from '../public/metamask_logo.png';
import presaleStyles from "../styles/Presale.module.css";
import Image from "next/image";
import HomeButton from './homeButton.component';
import { Web3Context } from './web3ContextProvider';
import React, { ChangeEvent, useContext, useState } from 'react';
import { MyToken } from '../contracts/contractLocations.json';
import MyTokenAbi from '../contracts/abi/MyToken.abi.json';

interface PresaleFormProps {}
const PresaleForm = (props: PresaleFormProps) => {
    const [ quantity, setQuantity ] = useState(1);
    const { connected, connect, web3, address } = useContext(Web3Context);

    const price = 5;
    const currency = 'BUSD';

    const getAmount = () => quantity * price

    async function callContract() {
        // console.log('sadress', _address);
        if (!connected) {
            return;
            
        }

        console.log({ web3 });

        if (web3) {
            const MyTokenContract = new web3.eth.Contract(MyTokenAbi as any, MyToken);

            // console.log(MyTokenContract);

            const precio = await  MyTokenContract.methods.precio().call();

            console.log('MyToken precio: ' + precio);
        }

        alert(getAmount());
    }

    function onChangeQuantity(e: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.currentTarget.value) || 0;
        console.log({ value });

        setQuantity(value);
    }

    return (
        <div className="flex justify-center items-center">
            <span>
                {getAmount()} {currency}
                <small> {currency} {price} each </small>
            </span>

            <input type="number" value={quantity} onChange={onChangeQuantity} className="w-16 mx-2 border rounded p-2" />

            {
                connected
                ? ( 
                    <HomeButton type="button" className="w-28 flex items-center justify-between" onClick={callContract}>
                        <span>Buy now</span>
                        <Image alt="metamask_logo" src={metamaskLogoPng} width={20} height={20} />
                    </HomeButton>
                ) : (
                    <HomeButton type="button" onClick={connect}>
                        Connect
                    </HomeButton>
                )
            }
        </div>
    );
}

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

        <PresaleForm />

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