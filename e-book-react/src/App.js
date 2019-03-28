import React, { Component } from 'react';
import './App.css';
import Navigation from "./js/navigation";

var sectionStyle = {
    width: "100%",
    height: "100%",
    marginTop: "64px",
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
