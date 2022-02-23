import { Component, createContext, useEffect, useState } from "react";
import Web3 from "web3";
import { WebsocketProvider, IpcProvider, provider } from 'web3-core';
import Web3Modal from "web3modal";

interface IWeb3Context {
    web3?: Web3 | null;
    provider: provider;
    connected: boolean;
    address: string;
    chainId: number;
    networkId: number;
    connect: () => Promise<void>;
    disconnect: () => void;
}

interface PartialWeb3Context {
    web3?: Web3 | null;
    provider?: provider;
    connected?: boolean;
    address?: string;
    chainId?: number;
    networkId?: number;
    connect?: () => Promise<void>;
    disconnect?: () => void;
}

const web3InitialContext: IWeb3Context = {
    web3: null,
    provider: null,
    connected: false,
    address: '',
    chainId: 0,
    networkId: 0,
    connect: () => Promise.resolve(),
    disconnect: () => {},
}

const ethChains: { [label: string]: { network_id: number, chain_id: number, label: string } } = {
    mainnet: {
        network_id: 1,
        chain_id: 1,
        label: 'Ethereum main network',
    },
}

export const Web3Context = createContext({...web3InitialContext});

export const Web3ContextProvider = ({children}: { children: JSX.Element[] }): JSX.Element => {
    const [ state, setState ] = useState({...web3InitialContext});

    const safeSetState = (newState: PartialWeb3Context) => setState(previousState => ({
        ...previousState,
        ...newState
    }));

    const disconnect = async () => {
        if (state.provider) {
            if ((state.provider as any).removeAllListeners) {
                (state.provider as WebsocketProvider).removeAllListeners('accountsChanged');
                (state.provider as WebsocketProvider).removeAllListeners('networkChanged');
            }

            if ((state.provider as any).removeAllListeners) {
                (state.provider as WebsocketProvider).removeAllListeners('accountsChanged');
                (state.provider as WebsocketProvider).removeAllListeners('networkChanged');
            }

            if ((state.provider as any).disconnect) {
                (state.provider as WebsocketProvider).disconnect(1,'User disconnected');
            }

            if ((state.provider as any).reset) {
                (state.provider as IpcProvider).reset();
            }
        }

        setState({ ...web3InitialContext });
    }

    const ethEnabled = async () => {
        if (window.ethereum) {
            await window.ethereum.request({method: 'eth_requestAccounts'});
            window.web3 = new Web3(window.ethereum);
            return true;
        }

        return false;
    }

    const connect = async () => {
        let web3 = state.web3;
        let provider = null;
        let networkId = 0;
        let chainId = 0;

        if (!web3) {
            web3 = new Web3(Web3.givenProvider);

            if (!web3.currentProvider) {
                alert('No web3 Provider. Try again after installing metamask: https://metamask.io/download/');
                web3 = null;
            } else {
                networkId = await web3.eth.net.getId();
                chainId = await web3.eth.getChainId();

                if (networkId !== ethChains.mainnet.network_id || chainId !== ethChains.mainnet.chain_id) {
                    alert('Please connect to the ' + ethChains.mainnet.label);
                    web3 = null;
                    provider = null;
                    networkId = 0;
                    chainId = 0;
                } else {   
                    provider = web3.currentProvider;
                }
            }
        }

        if (web3 && provider) {
            console.log('web3 & provider');          

            await web3.eth.requestAccounts();
    
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];

            if ((provider as any).on) {
                (provider as WebsocketProvider).on('accountsChanged', async () => {
                    console.log('on accountsChanged');
                    // not using param address because it give address in lowercase
                    if (web3) {
                        const accounts = await web3.eth.getAccounts();
                        const address = accounts[0];
                        
                        safeSetState({ address });
                    }
                });

                (provider as WebsocketProvider).on('networkChanged', async () => {
                    console.log('on networkChanged');
                    // not using param address because it give address in lowercase
                    if (web3) {
                        const networkId = await web3.eth.net.getId();
                        const chainId = await web3.eth.getChainId();

                        if (networkId !== ethChains.mainnet.network_id || chainId !== ethChains.mainnet.chain_id) {
                            alert('Please connect to the ' + ethChains.mainnet.label);
                            disconnect();
                        } else {
                            safeSetState({ networkId, chainId });
                        }
                    }
                });
            }
    
            safeSetState({
                web3,
                provider,
                connected: true,
                address,
                chainId,
                networkId
            });
        }
    }

    const invokeModal = async () => {
        const providerOptions = {
            /* See Provider Options Section */
          };
          
        const web3Modal = new Web3Modal({
            network: "mainnet", // optional
            cacheProvider: false,
            providerOptions // required
        });

        web3Modal.clearCachedProvider();

        
        console.log('connecting');
        const provider = await web3Modal.connect();

        console.log('connected');

        await provider.enable();
    
        console.log('enabled');

        const web3 = new Web3(provider);

        const accounts = await web3.eth.requestAccounts();

        console.log({ accounts });
    }

    const context = {
        ...state,
        connect: invokeModal,
        disconnect
    }

    return (
        <Web3Context.Provider value={context}>
            {children}
        </Web3Context.Provider>
    )
}