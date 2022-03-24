# Basic React

#### updating studied source codes

------------
#### Contents
- Class Component
- Functional Component
- React Hooks
- Webpack, Babel (make react prj without create-react-app cmd)
- state, setState, ref, ...
- setting target browsers using preset-env option (cf. browserslist)
- set HotReload
- class to Hooks
- node = require, react = import/export
- seperate component
- use map(iteration) for components
- props
- react identify rendering target by key (using index as key is not good)
- react list & key detail : (cf. https://ko.reactjs.org/docs/lists-and-keys.html)
- react debug : use Highlight updates when components render.
- react rending performance (shouldComponentUpdate(){}, PureComponent, memo)
- createRef for class component
- two way : class vs hooks, useRef vs createRef, setState vs setState(()=>{})
- handling props in child component
- use for, if in Hooks using IIEF(Immediately-invoked function expression)
- use useRef in Hooks for non-screen data changing
- class component lifecycle
- high order function : function handles function
- useEffect (hooks)
- hooks vs Functional Component
- useMemo, useEffect, useCallback & hooks ordering
- call ajax in componentDidMount in hooks
- use useReducer for many states & dispatch for many setStates
- how to set data in react 
- handle states updates asynchronously
- analize re-rendering isuues using useRef,useEffect, chrome debug tool (w.react developer tool)
- optimize re-rendering issues using useMemo, memo
- using contextApi: createContext, ~Context.Provider
- cache contextApi values using useMemo
- optimize contextApi re-rendering issues using useMemo, memo
- use react-router
- BrowserRouter, HashRouter and DynamicRouteMatching
- history and this.props.history
- get queryString using URLSearchParams
- Switch(v5) / Routes(v6) and exact
- check npm outdated
- useLocation, useNavigate

------------
#### Used Commands
- npm init
- npm i -D webpack webpack-cli webpack-dev-server
- npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
- npm i -D @pmmmwh/react-refresh-webpack-plugin react-refresh
- npm i react react-dom
- npm i react-router react-router-dom
- npm i @babel/plugin-proposal-class-properties
------------
###### watched ZeroCho TV on Youtube :)
###### https://www.youtube.com/c/ZeroChoTV (lecture - 리액트 무료 강좌(웹게임))
###### https://github.com/ZeroCho/react-webgame (source codes)