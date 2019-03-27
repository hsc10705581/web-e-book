import React, { Component } from 'react';
import './App.css';
import Navigation from "./js/navigation";

var sectionStyle = {
    width: "100%",
    height: "1000px",
    marginTop: "64px",
// makesure here is String确保这里是一个字符串，以下是es6写法
    backgroundColor: "#FFFFF0",
    backgroundSize: "100% 100%",
};

var hide = {
    display: "none",
}

var show = {
    display: "inline"
}

class App extends Component {
    state = {
        introductionStyle: show,
        booksStyle: hide,
    };

    showIntroduction(){
        this.setState({
            introductionStyle: show,
            booksStyle: hide,
        })
    };

    showBooks(){
        this.setState({
            introductionStyle: hide,
            booksStyle: show,
        })
    };

    render() {
        return (
            <div className="App" style={sectionStyle}>
                <div id="navigation">
                    <Navigation
                        showIntro={() => this.showIntroduction()}
                        showBooks={() => this.showBooks()}
                    />
                </div>
                <div>
                    <div id="introduction" style={this.state.introductionStyle}/>
                    <div id="books" style={this.state.booksStyle}/>
                </div>
            </div>
        );
    }
}

export default App;
