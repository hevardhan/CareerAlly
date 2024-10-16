import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Test from './pages/Test';
import Splash from './pages/Splash';
import Chat from './pages/Chat';
import Conversations from './pages/Conversations';
import Connections from './pages/Connections';
import Settings from './pages/Settings';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Test />} /> */}
        <Route path="/" element={<Splash />} />
        <Route path="home" element={<Home />} />
        <Route path='about' element={<About/>} />
        <Route path='chat' element={<Chat/>} />
        <Route path='convo' element={<Conversations/>} />
        <Route path='connect' element={<Connections/>} />
        <Route path='settings' element={<Settings/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
