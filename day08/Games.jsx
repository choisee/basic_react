import React from 'react';
import {BrowserRouter, HashRouter, Route, Link, Routes, Switch} from 'react-router-dom';
import WordRelayClass from '../day02/WordRelay';
import NumberBaseballClass from '../day04/NumberBaseballClass';
import RenderTestClass from '../day04/RenderTest';
import GameMatcher from "./GameMatcher";
// import RSP from '../day05_3/RSP'; // hooks
// import Lotto from '../day06_2/Lotto' // hooks

const Games = () => {
    return (
        <BrowserRouter>
        {/*<HashRouter>*/}
            <div>
                <Link to='/game/word-relay'>안녕</Link>
                {/*<Link to='/word-relay'>안녕</Link>*/}
                &nbsp;
                <Link to='/game/number-baseball?query=10&hello=test&bye=react'>숫자야구</Link>
                {/*<Link to='/number-baseball'>숫자야구</Link>*/}
                &nbsp;
                <Link to='/game/render-test'>렌더테스트</Link>
                {/*<Link to='/render-test'>렌더테스트</Link>*/}
                &nbsp;
                <Link to='/game/index'>게임 매쳐</Link>
            </div>
            <div>
                <Routes>
                    {/*<Switch>*/}
                    <Route path="/" exact element={<GameMatcher/>}/>
                    {/*<Route path='/word-relay' element={<WordRelayClass/>}/>*/}
                    {/*<Route path='/number-baseball' element={<NumberBaseballClass/>}/>*/}
                    {/*<Route path='/render-test' element={<RenderTestClass/>}/>*/}
                    <Route path='/game/:namee' element={<GameMatcher/>}/>
                    {/*<Route path='/game/:name' element={() => <GameMatcher props='123'/>}/>*/}
                    {/*<Route path='/game/:name' render={(props) => <GameMatcher {...props}/>}/>*/}
                    {/*<Route exact path='/game/number-baseball/' render={(props) => <GameMatcher {...props}/>}/>*/}
                    {/*</Switch>*/}
                </Routes>
            </div>
        {/*</HashRouter>*/}
        </BrowserRouter>
    );
}

export default Games;

// react router가 리액크에서 어떤 역할, 웹사이트 에서 어떤 역할, react router ~ react 연동법 및 간단한 기능
// react native에서도 react-router 쓰임
// web에서 사용하는 react-router-dom
// BrowserRouter, HashRouter 많이 쓰임
// 가상의 페이지패스를 만들어서 각각 연결해주기

// 페이지가 여러개가 아니라 리액트라우터가 가상으로 만들어낸 페이지이다 (SPA이다)

// import하는 React의 대상이 다를 경우 나는 오류
// 그래서 클래스로 변경 후에 연결해줘야함
// Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
// 1. You might have mismatching versions of React and the renderer (such as React DOM)
// 2. You might be breaking the Rules of Hooks

// BrowserRouter
// http://localhost:8080/word-relay 주소창에 입력하여 SPA임을 확인하자 (가상의 주소는 리액트라우터, 클라이언트만 알고 있다)
// 주소창에 입력하여 서버에 요청을 하면 서버는 알지 못하는 주소라 Cannot GET /word-relay 라고 뜬다
// 새로고침하면 화면이 안뜬다
// 서버에 /word-relay이 존재함을 알려줘야한다 (서버에 셋팅 필요, express 등 설정)

// HashRouter
// # 뒤의 주소는 브라우저만 안다, 리액터라우터에서 아는 주소
// 서버는 # 뒤의 주소를 알지 못한다, 검색엔진 SEO(써치 엔진 옵티마이제이션)에서 불이익을 받음
// 검색엔진에서 안뜨기 떄문에 실무에서는 잘 사용하지 않는다

// 라우트할 페이지가 많아지면 DynamicRouteMatching(동적라우트매칭) 사용
// '/game/:name'의 :name가 파라미터임
// 기존 Route를 제거하거 /game 붙여서 하나로 압축할 수 있음

// history.pushState('','','/hello') 브라우저 주소를 바꿀수 있는데, react-router가 이를 활용함
// this.props.history(내부적으로는 브라우저의 히스토리 api 사용) != history(브라우저의 히스토리 api)

// 주소로 데이터 전달 - 쿼리스트링 : /game/number-baseball?query=10&hello=test&bye=react
// URLSearchParams로 쿼리스트링 데이터 가져오기

// Switch를 쓰면 중복 주소일때 하나만 그림, 동시에 여러개 그려지는걸 막음
// exact를 동시에 여러개 뜨는 라우트를 막기 위해 사용하는데, 일치하는 주소로 뜨게 함 (단, / 상위 주소랑 겹쳐도 안뜸 주의 /game)

// react-router + reach = react v6
// remix(react v6 도입함) next기반 프레임워크
// Switch -> Routes, react router github에서 changelog, release 로 확인
// navigate(-1); -1 뒤로 몇페이지
// migration 팁: 타입스크립트 사용시 버전업할 경우 명확하게 비교가능함, 자바스크립트는 찾기 어려움(이때 codemod 툴 사용하여 모두바꾸기 가능, ex react-router v5 -> v6 플러그인사용가능)

// npm outdated
