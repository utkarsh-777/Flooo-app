import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Flash from './components/Flash';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Flash} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
      </Switch>
    </Router>
  );
}

export default App;
