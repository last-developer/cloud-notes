import './App.css';
import Home from "./components/Home";
import Header from './components/Header';
import About from './components/About';
import NoPage from './components/NoPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert'

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Header />
          <Alert message="im" />
          <Routes>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/" element={<Home />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App;
