import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Routes from './routes/Routes';
import reducer from './reducers/auth';
import './styles/globalStyle.css';


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhances(
	applyMiddleware(thunk)
));


render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
