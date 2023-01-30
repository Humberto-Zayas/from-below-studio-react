import logo from './logo.svg';
// import './App.css';
// import './css/normalize.css';
// import './css/util.css';
// import './css/frombelow.css';

import Home from "./pages/Home"
import BootlegStepper from "./components/bootlegstepper"
import Stepper from "./components/stepper"
// import Calendar from './components/calendar';

import Container from '@mui/material/Container';
import Header from "./components/navbar";


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      
      <Router>
      <Header></Header>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bootlegstepper" element={<BootlegStepper />} />
            
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;