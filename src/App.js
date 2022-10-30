import { Routes,HashRouter, Route } from 'react-router-dom';
import NotFound from './pages/NotFound'
import Home from './pages/Home'
//import Navbar from './components/Navbar'
import News from './pages/News'
import './style/app.scss'

function App() {
  return (
    <div className="container app">
    <HashRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route index element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/news" element={<News/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </HashRouter>
    </div>
  );
}

export default App;
