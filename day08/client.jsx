import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import Games from './Games'

// const Hot = hot(Games);

ReactDOM.render(<Games />, document.querySelector('#root'));

// ReactDOM.render(<BrowserRouter><Hot /><BrowserRouter />, document.querySelector('#root'));
// 위처럼 여기에서 감싸도 됨

// [ProxyFacade] is not a <Route> component. 오류로 react-hot-loader/root 뺌.

