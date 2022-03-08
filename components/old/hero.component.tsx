import heroStyles from "../../styles/Hero.module.css";
import HomeButton from "./homeButton.component";

const Hero = (props: any) => (
    <div
        className="py-10 mb-6 md:mb-14"
    >
        <div className={`${heroStyles.hero_img} flex`}>
            <div
                className="flex justify-center space-x-6 self-end w-full">
                <HomeButton type="button" onClick={() => console.log('onclick1')}>
                    Discover Pre Sale Packs
                </HomeButton>

                <HomeButton type="button" onClick={() => console.log('onclick2')}>
                    Whitepaper
                </HomeButton>
            </div>
        </div>
    </div>
)

export default Hero;