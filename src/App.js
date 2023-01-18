import logo from './logo.svg';
// import './App.css';
// import './css/normalize.css';
// import './css/util.css';
// import './css/frombelow.css';

import Header from "./components/navbar"; 
import Hero from './components/hero';
import Services from './components/services';
import Pricing from './components/pricing';
import About from './components/about';
import Subfooter from './components/subfooter';

function App() {
  return (
    <div>
     <Header></Header>
     <Hero></Hero>
     <Services></Services>
     <Pricing></Pricing>
     <About></About>
     <Subfooter></Subfooter>
    </div>
  );
}

export default App;
