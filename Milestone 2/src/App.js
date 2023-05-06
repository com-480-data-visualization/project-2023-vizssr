import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import Bubble from './components/bubble';
import AreaBump from './components/areaBump';

import React, { useState, useEffect } from 'react'; 
import bubble from './bubble'; 

const App = () => {
	return (
		<BrowserRouter>
			<nav>
				<NavLink 
					exact 
					activeStyle={{ textDecoration: 'underline' }} 
					to="/areaBump">
					AreaBump
				</NavLink>
				<NavLink
					exact
					activeStyle={{ textDecoration: 'underline' }}
					to="/bubble">
					Bubble
				</NavLink>
			</nav>
			<Switch>
				<Route exact path="/areaBump" component={AreaBump} />
				<Route exact path="/bubble" component={Bubble} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;