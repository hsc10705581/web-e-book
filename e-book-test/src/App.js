import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './config';
import Home from './js/Home';
import Book from './js/Book/Book';
import Cart from './js/Cart/Cart';
import Order from './js/Order';

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact={true} component={Home}/>
                <Route
                    path='/books'
                    exact={true}
                    render={() =>
                    <Book
                        username={global.configuration.user}
                        role={global.configuration.role}
                    />}
                />
                <Route path='/cart' exact={true} component={Cart}/>
                <Route path='/order' exact={true} component={Order}/>
            </Switch>
        </Router>
    );
}

export default App;
