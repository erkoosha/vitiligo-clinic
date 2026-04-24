import Hero from "@/components/shared/hero/Hero"
import About from "@/sections/about/About"
import Certificates from "@/sections/certificates/Certificates"
import Results from "@/sections/results/Results"
import Reviews from "@/sections/reviews/Reviews"
import Contact from "@/sections/contact/Contact"
import Footer from "@/components/shared/footer/Footer"

const Page = () => (
  <main>
    <Hero />
    <About />
    <Certificates />
    <Results />
    <Reviews />
    <Contact />
    <Footer />
  </main>
)

export default Page