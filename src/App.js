import logo from './logo.svg';
// import './App.css';
// import './css/normalize.css';
// import './css/util.css';
// import './css/frombelow.css';

import Header from "./components/navbar"; 
import Hero from './components/hero';
import Services from './components/services';

function App() {
  return (
    <div>
     <Header></Header>
     <Hero></Hero>
     <Services></Services>
    </div>
  );
}

export default App;
