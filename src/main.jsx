import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import chatStore from './Redux/chatStore.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

   <BrowserRouter>
   <Provider store={chatStore}><App /></Provider>      
   <ToastContainer/>
   </BrowserRouter>
  </React.StrictMode>,
)
