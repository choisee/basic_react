import React, { Component } from 'react';
import WordRelayClass from '../day02/WordRelay';
import NumberBaseballClass from '../day04/NumberBaseballClass';
import RenderTestClass from '../day04/RenderTest';
import { Route, Routes, useLocation, useNavigate } from "react-router";

class GameMatcher extends Component {
    render() {
        console.log(this.props, '===');

        let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1)); // search: "?query=10&hello=test&bye=react"
        console.log(urlSearchParams.get('hello'),'==='); // test

        // react v6
        return (
            <Routes>
                <Route path="word-relay" element={<WordRelayClass />} />
                <Route path="number-baseball" element={<NumberBaseballClass />} />
                <Route path="render-test" element={<RenderTestClass />} />
                <Route
                    path="*"
                    element={<div>
                        일치하는 게임이 없습니다.
                    </div>}
                />
            </Routes>
        );

        // // react v5
        // // this.props.match.params.namee -> this.props.location.pathname
        // if(this.props.location.pathname.includes('word-relay')){
        //     return <WordRelayClass/>
        // } else if(this.props.location.pathname.includes('number-baseball')){
        //     return <NumberBaseballClass/>
        // } else if(this.props.location.pathname.includes('render-test')){
        //     return <RenderTestClass/>
        // }
        //
        // return (
        //     <>
        //         일치하는 게임이 없습니다.
        //     </>
        // );
    }
}
// export default GameMatcher;

// useLocation, useNavigate 사용을 위한 래퍼
const WrappedComponent = (props) => {

    // react v6
    const location = useLocation();
    const navigate = useNavigate();
    // navigate(-1);
    console.log(location, '----');
    console.log(navigate, '----');


    return <GameMatcher location={location} {...props} />
}

export default WrappedComponent;

