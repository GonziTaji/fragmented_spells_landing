import { useContext, useState } from "react";
import HomeButton from "./homeButton.component";
import { Web3Context } from "./web3ContextProvider";

export const Web3Widget = () => {
    const { disconnect, address } = useContext(Web3Context);

    return (
        <div className="text-sm">
            <span className="block">{address?.slice(0, 10)}...</span>
            <button className="" type="button" onClick={disconnect}>Disconnect</button>
        </div>
    );
}
