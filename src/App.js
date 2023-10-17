import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Login';
import Reg from './Reg';
import UserProfile from './UserProfile';
import UserPage from './UserPage';
import View from './View';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='reg' element={<Reg/>}/>
    <Route path='userprofile' element={<UserProfile/>}/>
    <Route path='userpage' element={<UserPage/>}/>
    <Route path='/view/:log_id' element={<View/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
