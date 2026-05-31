import HeroSection from "../components/hero"
import AutoSlider from "../components/autoslider"
import FourPillars from "../components/fourpillars"
import ServicesPreview from "../components/servicespreview"
import CapabilityStrip from "../components/capabilities"
import WhyNow from "../components/whynow"
import InsightsPreview from "../components/insightspreview"
import YoutubeSection from "../components/youtubeFeed"
// Floating actions
import FloatingActions from "../components/floatingactions"
import Loader from "../components/loader"

function Home() {
    return (
        <>
            <HeroSection />
            <AutoSlider />
            <FourPillars />
            <ServicesPreview />
            <CapabilityStrip />
            <WhyNow />
            <YoutubeSection />
            <InsightsPreview />
            <FloatingActions />
            <Loader />
        </>
    )
}

export default Home