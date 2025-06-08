import './App.css';
import Navbar from './nav/Navber';
import './nav/navber.css';
import Sidebar from './nav/Sidebar';
import Read from './Home/Read';
import { Route, Routes } from 'react-router-dom';
import Rating from './Rinning/Rating';
import Chat from './chat/Chat';
import Home from './Home/Home';

 
function App() {
 
  return (
    <div>
      <div className='row-nav'>
          <div className='nav-bar'>
              <Navbar/>
          </div>
          
      </div>
      <div className='row-content shaw'>
          <div className='col-md-12 offset-md-0'>
              <Routes>
                  <Route path='/' element={<Home/>} className='home'/>
                  <Route path='/chat' element={<Chat/>} />
                  <Route path='/Rating' element={<Rating/>} />
              </Routes>
          </div>
          <div className='col-md-1 offset-md-1'>
            <Sidebar/>            
          </div>
      </div>
    </div>
  );
}

export default App;
