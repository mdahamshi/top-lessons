import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className='root-content'>
      <h1>Hello from the main page of the app!</h1>
      <p>Here are some examples of links to other pages</p>
      <nav>
        <ul>
          <li>
            <Link to='profile'>Profile Page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;
