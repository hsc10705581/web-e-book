import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './js/Home';
import

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact={true} component={Home}/>
            </Switch>
        </Router>
    );
}

export default App;
