import sobrePng from '../../public/sobre.png';
import metamaskLogoPng from '../../public/metamask_logo.png';
import blackCircleImg from '../../public/IMG/black_circle_35x35.png';
import verticalLineImg from '../../public/IMG/v_line_black.png';
import bownTriangleImg from '../../public/IMG/down_triangle_black.png';
import presaleStyles from "../../styles/Presale.module.css";
import Image from "next/image";
import HomeButton from './homeButton.component';
import { Web3Context } from './web3ContextProvider';
import React, { ChangeEvent, useContext, useState } from 'react';
import contractLocations from '../../contracts/contractLocations.json';
import MyTokenAbi from '../../contracts/abi/MyToken.abi.json';

interface PresaleFormProps {
    className?: string;
}
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
            const MyTokenContract = new web3.eth.Contract(MyTokenAbi as any, contractLocations.MyToken);

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
        <div className={"flex justify-center items-center " + props.className || ''}>
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
    <div className='flex justify-between'>
        <div className="basis-1/2 bg-gray-100">
            <h1 className="text-5xl text-center leading-loose">
                Get yours!
            </h1>
            
            <div className="flex justify-center">
                <div className={`w-1/3 ${presaleStyles.sobre}`}>
                    <Image alt="pack" className="rotate-6" src={sobrePng} layout="intrinsic"/>
                </div>
            </div>

            <PresaleForm className="py-2" />
        </div>

        <div className="p-10 basis-1/2 bg-yellow-100">
            <h1 className='text-4xl'>Presale 1</h1>

            <small>Until xx-xx-xxxx xx:xx:xx EST</small>

            <div className='py-5'>
                <p>XX SOLD</p>
                <p>XX REMAINING</p>
            </div>

            <div className="flex">
                <div className="mx-4 grid grid-flow-row" style={{ gridTemplateRows: 'auto 1fr auto' }}>
                    <Image src={blackCircleImg} alt="black circle image" />

                    <Image src={verticalLineImg} alt="vertical line image" />

                    <Image src={bownTriangleImg} alt="brown triangle image" />
                </div>

                <div>
                    <h2 className='text-xl'>Presale 1</h2>
                    <p>Date: xx</p>

                    <br/>

                    <h2 className='text-xl'>Presale 2</h2>
                    <p>Date: xx</p>

                    <br/>

                    <h2 className='text-xl'>Presale 3</h2>
                    <p>Date: xx</p>

                    <br/>

                    <h2 className='text-xl'>Market launch</h2>
                    <p>Date: xx</p>

                    <br/>

                    <h2 className='text-xl'>Game launch</h2>
                    <p>Date: xx</p>

                    <br/>
                </div>
            </div>
        </div>
    </div>
)

export default Presale