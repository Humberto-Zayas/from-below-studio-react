// import './App.css';
// import './css/normalize.css';
// import './css/util.css';
// import './css/frombelow.css';

import Hero from '../components/hero';
import Services from '../components/services';
import Pricing from '../components/pricing';
import About from '../components/about';
import Subfooter from '../components/subfooter';
import Footer from '../components/Footer';

const Home = () => {

  return (
    <>
      <Hero></Hero>
      <Services></Services>
      <Pricing></Pricing>
      <About></About>
      <Footer></Footer>
    </>

  )

}

export default Home;