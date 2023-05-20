import './App.css';
import Home from "./components/Home";
import Header from './components/Header';
import About from './components/About';
import NoPage from './components/NoPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/about" element={<About />} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
