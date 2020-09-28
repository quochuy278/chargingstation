import React from 'react';
import { BrowserRouter as  Router,Switch , Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer'
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Switch>
    <div class='App'>
    <Header/>
    <Route path='/Home' exact component={Home}/>    
    <Route path='/About' exact component={About} />
     <Footer/>
    </div>
    </Switch>
    </Router>
  );
}

export default App;
