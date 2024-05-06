import './App.css'
import ChatPage from './components/ChatPage';
import LandingPage from './components/LandingPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom'
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/chatboat' element={<ChatPage/>}/>
      <Route path='/*' element={<LandingPage/>}/>

    </Routes>
    </>
  )
}

export default App
