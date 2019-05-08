import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import { Navigation } from '../Components/Navbar/navbar';
import { Footer } from '../Components/Footer/footer'

import './app.scss'

export default props =>

<BrowserRouter>
  <div className="app">
    <Navigation/>
      <div className="app-main">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route render={function () {
            return (
              <div className='PageNotFound'><h2>404 Page Not Found</h2></div>
            )
          }} />
        </Switch>
      </div>
    <Footer/>
  </div>
</BrowserRouter>
