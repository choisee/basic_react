const React = require('react');
const ReactDom = require('react-dom');


const WordRelay = require('./WordRelay'); // 필요한 모듈만 불러와서 사용하면 됨

ReactDom.render(<WordRelay />, document.querySelector('#root'))