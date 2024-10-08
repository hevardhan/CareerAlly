import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Test from './pages/Test';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Test />} /> */}
        <Route path="/" element={<Home />} />
        <Route path='about' element={<About/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
