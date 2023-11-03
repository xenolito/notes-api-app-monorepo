import { createRoot } from 'react-dom/client'
// import React from 'react'
import './style.scss'
// import Titular from './components/Titular'
import App from './components/App'

const root = createRoot(document.querySelector('#root'))

root.render(
  <>
    <App />
  </>

)
