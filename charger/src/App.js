import React from 'react';
import { BrowserRouter as  Route,Switch , Link, Router} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer'
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    
    <div class='App'>
    <Header/>
    <Home/>
    <About/>


     <Footer/>
    </div>
    
  );
}

export default App;
