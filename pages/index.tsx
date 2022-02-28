import type { NextPage } from "next";
import Footer from "../components/footer.component";
import Header from "../components/header.component";
import Hero from "../components/hero.component";
import Presale from "../components/presale.component";
import Web3ContextProvider2 from "../components/web3ContextProvider";
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
