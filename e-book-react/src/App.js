import React, { Component } from 'react';
import './App.css';
import Background from './images/back.jpg'

var sectionStyle = {
    width: "100%",
    height: "853px",
// makesure here is String确保这里是一个字符串，以下是es6写法
    backgroundImage: `url(${Background})`
};

class App extends Component {
    render() {
        const icons = {
            icon1: ""
        }
        return (
            <div className="App">
                <div id="navigation"></div>
                <div style={sectionStyle}>
                    <div className="body">
                        <div className="title">
                            <div className="icon">
                                <img src={require("./images/book.png")} alt=""/>
                            </div>
                            <div className="name">
                                <p className="header">e-book</p>
                            </div>
                            <div className="icon">
                                <img src={require("./images/buy.png")} alt=""/>
                            </div>
                        </div>
                        <div className="introduction">
                            <p className="font">一个让用户购买书籍，提供书籍情报的网站。</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
