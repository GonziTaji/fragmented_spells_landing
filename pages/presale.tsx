import type { NextPage } from "next";
import Footer from "../components/old/footer.component";
import Header from "../components/old/header.component";
import Hero from "../components/old/hero.component";
import Presale from "../components/old/presale.component";
import Web3ContextProvider2 from "../components/old/web3ContextProvider";
// import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <Web3ContextProvider2>
            <Header/>
            <Hero/>
            <Presale/>
            <Footer />
        </Web3ContextProvider2>
    );
};

export default Home;
