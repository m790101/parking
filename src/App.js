import { Routes,BrowserRouter, Route } from 'react-router-dom';
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Search from './pages/Search'
import './style/app.scss'

function App() {
  return (
    <div className="container app">
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
