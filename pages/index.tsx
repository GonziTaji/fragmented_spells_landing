import type { NextPage } from "next";
import Footer from "../components/footer.component";
import Header from "../components/header.component";
import Hero from "../components/hero.component";
import Presale from "../components/presale.component";
// import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    return <div>
        <Header/>
        <Hero/>
        <Presale/>
        <Footer />
    </div>;
};

export default Home;
