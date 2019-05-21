import React, { Component } from 'react';
import '../css/introduction.css';
class Introduction extends Component{
    render() {
        return(
            <div className="body">
                <div className="title">
                    <div className="icon">
                        <img src={require("../images/book.png")} alt=""/>
                    </div>
                    <div className="name">
                        <p className="header">e-book</p>
                    </div>
                    <div className="icon">
                        <img src={require("../images/buy.png")} alt=""/>
                    </div>
                </div>
                <div className="introduction">
                    <p className="font">一个让用户购买书籍，提供书籍情报的网站。</p>
                </div>
            </div>
        )
    }
}

export default Introduction;
