import React, { Component } from 'react';
import './App.css';
import Navigation from "./js/navigation";
import $ from 'jquery';
import Book from "./js/book";
import Introduction from './js/introuction';
import Order from './js/order';
import User from './js/user';

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
};

var show = {
    display: "inline"
};

let tmp = 0;

class App extends Component {

    componentDidMount() {
        this.getBooks()
    }

    state = {
        introductionStyle: show,
        booksStyle: hide,
        orderStyle: hide,
        userStyle: hide,
        backStyle: sectionStyle,
        responseData: null,
        bookInfo: [],
        username: null,
        role: null,
        cartProducts: [],
        orderList: [],
        userList: [],
    };

    refreshShoppingCartOpen(){
        let saveDataAry = {
            username: this.state.username,
        };
        $.post(
            "http://localhost:8080/shoppingCart",
            {values: JSON.stringify(saveDataAry)},
            function (data) {
                let cartProducts = JSON.parse(data);
                if(cartProducts !== false)
                {
                    this.setState({
                        cartProducts: cartProducts,
                    })
                }
            }.bind(this));
    }

    showIntroduction(){
        this.setState({
            introductionStyle: show,
            booksStyle: hide,
            orderStyle: hide,
            userStyle: hide,
        })
    }
    showBooks(){
        this.getBooks();
        this.setState({
            introductionStyle: hide,
            booksStyle: show,
            orderStyle: hide,
            userStyle: hide,
        });
    }
    showOrders() {
        this.refreshOrders();
        this.setState({
            introductionStyle: hide,
            booksStyle: hide,
            orderStyle: show,
            userStyle: hide,
        });
    }
    showUsers() {
        this.refreshUsers();
        this.setState({
            introductionStyle: hide,
            booksStyle: hide,
            orderStyle: hide,
            userStyle: show,
        })
    }

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
    login = () => {
        let saveDataAry = {
            username: document.getElementById("loginName").value,
            password: document.getElementById("loginPassword").value,
        };
        if(saveDataAry["username"] === "" || saveDataAry["password"] === "")
            alert("请输入用户名或密码");
        else{
            $.post(
                "http://localhost:8080/userLogin",
                {values: JSON.stringify(saveDataAry)},
                function (data){
                    let array = JSON.parse(data);
                    if(array[0] === false)
                    {
                        alert(array[1]);
                    }
                    else
                    {
                        alert(array[1]);
                        this.setState({
                            username: array[2],
                            role: array[3],
                        });
                    }
                }.bind(this)
            );
        }
    };
    register = () => {
        let saveDataAry = {
            username: document.getElementById("registerName").value,
            password: document.getElementById("registerPassword1").value,
            email: document.getElementById("registerEmail").value,
        };
        if(saveDataAry["username"] === "" || saveDataAry["password"] === "")
            alert("请输入用户名或密码");
        else{
            $.post(
                "http://localhost:8080/userRegister",
                {values: JSON.stringify(saveDataAry)},
                function (data){
                    let array = JSON.parse(data);
                    if(array[0] === false)
                    {
                        alert(array[1]);
                    }
                    else
                    {
                        alert(array[1]);
                        this.setState({
                            username: array[2],
                            role: array[3],
                        });
                    }
                }.bind(this)
            );
        }
    };
    logout = () => {
        this.setState({
            username: null,
            role: null,
        });
    };
    addABookToCart(bookID, stock) {
        if(this.state.username === null)
            alert("要登录才能把书本加入购物车哦");
        else if(stock === 0)
            alert("这本书的库存为0哦");
        else
        {
            let saveDataAry = {
                username: this.state.username,
                b_ID: bookID,
            };
            console.log(saveDataAry);
            $.post(
                "http://localhost:8080/addProduct",
                {values: JSON.stringify(saveDataAry)},
                function (data){
                    let array = JSON.parse(data);
                    console.log(array);
                });
        }
        this.refreshShoppingCartOpen();
    }
    bookAddRemove(amount, bookID) {
        let saveDataAry = {
            username: this.state.username,
            b_ID: bookID,
            amount: amount
        };
        $.ajax({
            type: "POST",
            async: false,
            url: "http://localhost:8080/addProduct",
            data: {values: JSON.stringify(saveDataAry)},
            success: function (data){
                let array = JSON.parse(data);
                if(array["success"] === false)
                    alert(array["alert"]);
            }
        });
        this.refreshShoppingCartOpen();
    };
    checkout = () => {
        let saveDataAry = {
            cartProducts: this.state.cartProducts,
            username: this.state.username,
        };
        $.ajax({
            type: "POST",
            async: false,
            url: "http://localhost:8080/checkout",
            data: {values: JSON.stringify(saveDataAry)},
            success: function (data){
                alert(data);
            }
        });
    };
    refreshOrders = () => {
        $.post(
            "http://localhost:8080/getOrders/" + this.state.username,
            {},
            function (data) {
                let orders = JSON.parse(data);
                if(orders !== false)
                {
                    this.setState({
                        orderList: orders,
                    })
                }
            }.bind(this));
    };
    refreshUsers = () => {
        $.post(
            "http://localhost:8080/getUsers",
            {},
            function (data) {
                let users = JSON.parse(data);
                if(users !== false)
                {
                    this.setState({
                        userList: users,
                    })
                }
            }.bind(this));
    };
    changeStyle(){
        tmp++;
        this.setState({
            backStyle: (tmp % 2) === 1 ? otherSectionStyle : sectionStyle,
        })
    }

    render() {
        return (
            <div className="App" style={this.state.backStyle}>
                <div id="navigation">
                    <Navigation
                        showIntro={() => this.showIntroduction()}
                        showBooks={() => this.showBooks()}
                        changeStyle={() => this.changeStyle()}
                        refreshShoppingCartOpen={() => this.refreshShoppingCartOpen()}
                        cartProducts={this.state.cartProducts}

                        login={() => this.login()}
                        register={() => this.register()}
                        logout={() => this.logout()}
                        username={this.state.username}
                        role={this.state.role}

                        bookAddRemove={(amount, bookID) => this.bookAddRemove(amount, bookID)}
                        checkout={() => this.checkout()}

                        showOrders={() => this.showOrders()}
                        showUsers={() => this.showUsers()}
                    />
                </div>
                <div>
                    <div id="introduction" style={this.state.introductionStyle}>
                        <Introduction/>
                    </div>
                    <div id="books" style={this.state.booksStyle}>
                        <Book
                            bookInfo={this.state.bookInfo}
                            user={this.state.username}
                            ref="book"
                            addABookToCart={(bookID, stock) => this.addABookToCart(bookID, stock)}
                        />
                    </div>
                    <div id="order" style={this.state.orderStyle}>
                        <Order
                            orderList={this.state.orderList}
                            refreshOrders={() => this.refreshOrders()}
                        />
                    </div>
                    <div id="Users" style={this.state.userStyle}>
                        <User
                            userList={this.state.userList}
                            refreshUsers={() => this.refreshUsers()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
