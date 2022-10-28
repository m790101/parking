import { Routes,BrowserRouter, Route } from 'react-router-dom';
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="container app">
    <Navbar/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
