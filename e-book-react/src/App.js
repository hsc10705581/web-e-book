import React, { Component } from 'react';
import './App.css';
import Navigation from "./js/navigation";
import $ from 'jquery';
import Book from "./js/book";

var sectionStyle = {
    width: "100%",
    height: "100%",
    minHeight: "1000px",
    marginTop: "64px",
    backgroundColor: "#FFFFF0",
    backgroundSize: "100% 100%",
};
var otherSectionStyle = {
    width: "100%",
    height: "100%",
    minHeight: "1000px",
    marginTop: "64px",
    backgroundColor: "#B0B0B0",
    backgroundSize: "100% 100%",
};

var hide = {
    display: "none",
}

var show = {
    display: "inline"
}

let tmp = 0;

class App extends Component {

    componentDidMount() {
        this.getBooks()
    }

    state = {
        introductionStyle: show,
        booksStyle: hide,
        backStyle: sectionStyle,
        responseData: null,
        bookInfo: [],
        username: null,
        role: null,
    };

    getUserInformation(username, role){
        this.setState({
            username: username,
            role: role,
        });
    }

    showIntroduction(){
        this.setState({
            introductionStyle: show,
            booksStyle: hide,
        })
    };

    getBooks(){
        $.get("http://localhost:8080/books", function (data) {
            this.setState({
                responseData: JSON.parse(data)
            })
        }.bind(this));
        for (let x in this.state.responseData){
            let data = JSON.parse(this.state.responseData[x]);
            let dir = {};
            dir["title"] = data[0];
            dir["author"] = data[1];
            dir["translator"] = data[2];
            dir["grade"] = data[3];
            dir["press"] = data[4];
            dir["date"] = data[5];
            dir["numOfPeople"] = data[6];
            dir["price"] = data[7];
            dir["isbn"] = data[8];
            dir["detail"] = data[9];
            dir["id"] = data[10];
            dir["stock"] = data[11];
            let cp = this.state.bookInfo;
            cp[x] = dir;
            this.setState({
                bookInfo: cp,
            })
        }
    }

    showBooks(){
        this.getBooks();
        this.setState({
            introductionStyle: hide,
            booksStyle: show,
        });
    };

    changeStyle(){
        tmp++;
        this.setState({
            backStyle: (tmp % 2) === 1 ? otherSectionStyle : sectionStyle,
        })
    };

    render() {
        return (
            <div className="App" style={this.state.backStyle}>
                <div id="navigation">
                    <Navigation
                        showIntro={() => this.showIntroduction()}
                        showBooks={() => this.showBooks()}
                        changeStyle={() => this.changeStyle()}
                        getUserInformation={(username, password) => {this.getUserInformation(username, password)}}
                    />
                </div>
                <div>
                    <div id="introduction" style={this.state.introductionStyle}/>
                    <div id="books" style={this.state.booksStyle}>
                        <Book bookInfo={this.state.bookInfo} user={this.state.username} ref="book"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
