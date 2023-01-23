import logo from './logo.svg';
// import './App.css';
// import './css/normalize.css';
// import './css/util.css';
// import './css/frombelow.css';

import Home from "./pages/Home"

import Container from '@mui/material/Container';
import Header from "./components/navbar";


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
