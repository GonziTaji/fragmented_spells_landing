import { Component, createContext, useEffect, useState } from "react";
import Web3 from "web3";
import { WebsocketProvider, IpcProvider, provider } from 'web3-core';
import Web3Modal from "web3modal";
import { Modal } from "./modal.component";

interface IWeb3Context {
    provider: provider;
    connected: boolean;
    connecting: boolean;
    address: string;
    chainId: number;
    networkId: number;
    connect: () => Promise<void>;
    disconnect: () => void;
}

const ethChains: { [label: string]: { network_id: number, chain_id: number, label: string } } = {
    mainnet: {
        network_id: 1,
        chain_id: 1,
        label: 'Ethereum main network',
    },
}

export const Web3Context = createContext<IWeb3Context>({
    provider: null,
    connected: false,
    connecting: false,
    address: '',
    chainId: 0,
    networkId: 0,
    connect: () => Promise.resolve(),
    disconnect: () => {},
});

interface Web3ContextProviderState {
    web3: Web3 | null;
    provider: any;
    connected: boolean;
    connecting: boolean;
    address: string;
    chainId: number;
    networkId: number;
}

const INITIAL_STATE: Web3ContextProviderState = {
    web3: null,
    provider: null,
    connected: false,
    connecting: false,
    address: '',
    chainId: 0,
    networkId: 0,
}

class Web3ContextProvider2 extends Component<any, Web3ContextProviderState> {
    constructor(props: any) {
        super(props);

        this.state = INITIAL_STATE;
    }

    web3Modal: Web3Modal | null = null;

    public componentDidMount() {
        const providerOptions = {
            /* See Provider Options Section */
        };

        this.web3Modal = new Web3Modal({
            network: "mainnet",
            cacheProvider: false,
            providerOptions
        });

        if (this.web3Modal.cachedProvider) {
            // this.connect();
            this.web3Modal.clearCachedProvider();
        }
    }

    async connect() {
        try {
            this.setState({ connecting: true });

            // show modal for at least 0.6 seconds
            // showing and hiding something for 0.1 is horrible UX
            await new Promise(resolve => setTimeout(resolve, 600));

            console.log('connecting');

            const provider = await this.web3Modal?.connect();

            const web3 = new Web3(provider);

            const accounts = await web3.eth.requestAccounts();

            if (!accounts.length) {
                return this.disconnect();
            }

            const networkId = await web3.eth.net.getId();
            const chainId = await web3.eth.getChainId();

            if (networkId !== ethChains.mainnet.network_id || chainId !== ethChains.mainnet.chain_id) {
                alert('Please connect to the ' + ethChains.mainnet.label);
                return
            } 

            provider.on('close', () => {
                console.log('on close');
                this.disconnect()
            });
            provider.on('disconnect', () => {
                console.log('on disconnect');
                this.disconnect()
            });

            provider.on('accountsChanged', async () => {
                console.log('on accountsChanged');
                // not using param address because it give address in lowercase
                if (web3) {
                    const accounts = await web3.eth.getAccounts();
                    const address = accounts[0];
                    
                    if (!address) {
                        this.disconnect();
                    } else {   
                        this.setState({ address });
                    }
                }
            });

            provider.on('chainChanged', async () => {
                console.log('on chainChanged');
                // not using param address because it give address in lowercase
                if (web3) {
                    const networkId = await web3.eth.net.getId();
                    const chainId = await web3.eth.getChainId();

                    this.setState({ networkId, chainId });

                    // if (networkId !== ethChains.mainnet.network_id || chainId !== ethChains.mainnet.chain_id) {
                    //     alert('Please connect to the ' + ethChains.mainnet.label);
                    //     this.disconnect();
                    // }
                }
            });
        
            this.setState({
                web3,
                provider,
                connected: true,
                connecting: false,
                address: accounts[0],
                chainId,
                networkId
            });
        } catch (e: any) {
            console.log({ ...e });
            console.log(e.code, e.message);

            this.disconnect().then(alert.bind(null, e.message));
        }
    }

    async disconnect() {
        console.log('disconnecting');
        const { provider } = this.state;

        if (provider) {
            if (provider.removeAllListeners) {
                console.log('removing listeners');
                provider.removeAllListeners('accountsChanged');
                provider.removeAllListeners('networkChanged');
            }

            if (provider.close) {
                await provider.close();
            }
        }

        this.web3Modal?.clearCachedProvider();

        this.setState(INITIAL_STATE);
    }

    render() {
        const context: IWeb3Context = {
            provider: this.state.provider,
            connected: this.state.connected,
            connecting: this.state.connecting,
            address: this.state.address,
            chainId: this.state.chainId,
            networkId: this.state.networkId,
            connect: this.connect.bind(this),
            disconnect: this.disconnect.bind(this)
        }

        return (
            <Web3Context.Provider value={context}>
                {this.props.children}

                <Modal
                    content={
                        <span className="block text-center">
                            Waiting for connection with web3 provider...
                        </span>
                    }
                    show={this.state.connecting}
                ></Modal>
            </Web3Context.Provider>
        )
    }
}

export default Web3ContextProvider2;