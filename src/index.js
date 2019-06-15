import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import reducer from './reducers';
import './index.css';
import data from './data.json'
import ReactChip from './components/react-chip/ReactChip';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(logger)
));

ReactDOM.render(
    <Provider store={store}>
        <div className='app-container'>
            <ReactChip data = {data} />
        </div>
    </Provider>, 
    document.getElementById('root')
);