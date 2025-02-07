import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
// pull in bootsrap stuff?
import 'bootstrap/dist/css/bootstrap.css'

// using reactDOM to render a component tree in element "root"
// "renderin the tree inside of the element"
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
