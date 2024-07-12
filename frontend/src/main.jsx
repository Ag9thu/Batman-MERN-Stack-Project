import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './Routes/index.jsx'




import './index.css'


import { AuthcontextProvider } from './contexts/Authcontext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthcontextProvider>

      <Routes />
     
    </AuthcontextProvider>
  </React.StrictMode>,
)