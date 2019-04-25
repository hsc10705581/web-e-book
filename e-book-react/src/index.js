import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Introduction from './js/introuction'

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Introduction />, document.getElementById('introduction'));
//ReactDOM.render(<Book />, document.getElementById('books'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
