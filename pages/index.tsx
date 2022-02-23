import type { NextPage } from "next";
import Footer from "../components/footer.component";
import Header from "../components/header.component";
import Hero from "../components/hero.component";
import Presale from "../components/presale.component";
import { Web3ContextProvider } from "../components/web3ContextProvider";
// import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <Web3ContextProvider>
            <Header/>
            <Hero/>
            <Presale/>
            <Footer />
        </Web3ContextProvider>
    );
};

export default Home;
