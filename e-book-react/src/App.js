import React, { Component } from 'react';
import './App.css';
import Navigation from "./js/navigation";
import $ from 'jquery';
import Book from "./js/book";
import Introduction from './js/introuction';
import Order from './js/order';
import User from './js/user';
import {arrayOf} from "prop-types";
import {JSS} from "jss";

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
                else{
                    this.setState({
                        cartProducts: [],
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
    showAdminAllOrders() {
        this.getAllOrders();
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
        $.get(
            "http://localhost:8080/book/getAll",
            function (data) {
                let bookInfo = JSON.parse(data);
                this.setState({
                    bookInfo: bookInfo
                })
        }.bind(this));
    }
    getAllOrders = () => {
        $.get(
            "http://localhost:8080/order/getAll",
            function(data) {
                let orderList = JSON.parse(data);
                this.setState({
                    orderList: orderList
                })
            }.bind(this)
        )
    };
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
    addBookToDB = () => {
        let saveDataAry = {
            title: document.getElementById("bookTitle").value,
            author: document.getElementById("bookAuthor").value,
            translator: document.getElementById("bookTranslator").value,
            grade: 0,
            press: document.getElementById("bookPress").value,
            date: document.getElementById("bookDate").value,
            numOfPeople: 0,
            price: document.getElementById("bookPrice").value,
            isbn: document.getElementById("bookIsbn").value,
            introduction: document.getElementById("bookIntroduction").value,
            stock: document.getElementById("bookStock").value,
        };
        console.log(saveDataAry);
        $.post(
            "http://localhost:8080/book/add",
            {values: JSON.stringify(saveDataAry)},
            function (data){

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
    bookAddRemove(amount, bookID, stock) {
        let saveDataAry = {
            username: this.state.username,
            b_ID: bookID,
            amount: amount
        };
        if(this.state.username === null)
            alert("要登录才能把书本加入购物车哦");
        else if(stock === 0)
            alert("这本书的库存为0哦");
        else{
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
        }
    };
    updateBook(bookID, key, value) {
        $.ajax({
            type: "GET",
            async: false,
            url: "http://localhost:8080/book/update/" + key + "?id=" + bookID + "&" + key + "=" + value,
            success: function (data) {

            }
        });
        let index = 0;
        for(; index < this.state.bookInfo.length; index++){
            if(this.state.bookInfo[index]["id"] === bookID)
                break;
        }
        let newBookInfo = this.state.bookInfo;
        newBookInfo[index][key] = value;
        this.setState({
            bookInfo: newBookInfo,
        })
    };
    deleteBook(bookID) {
        $.ajax({
            type: "GET",
            async: false,
            url: "http://localhost:8080/book/delete?id=" + bookID,
            success: function (data) {

            }
        });
        let index = 0;
        for(; index < this.state.bookInfo.length; index++){
            if(this.state.bookInfo[index]["id"] === bookID)
                break;
        }
        let newBookInfo = this.state.bookInfo.slice(0, index).concat(this.state.bookInfo.slice(index+1));
        this.setState({
            bookInfo: newBookInfo,
        })
    }
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
                    let newOrderList = [];
                    newOrderList[0] = orders;
                    this.setState({
                        orderList: newOrderList,
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

                        bookAddRemove={(amount, bookID, stock) => this.bookAddRemove(amount, bookID, stock)}
                        checkout={() => this.checkout()}

                        showOrders={() => this.showOrders()}
                        showUsers={() => this.showUsers()}
                        showAdminAllOrders={() => this.showAdminAllOrders()}
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
                            addABookToCart={(amount, bookID, stock) => this.bookAddRemove(amount, bookID, stock)}
                            updateBook={(bookID, key, value) => this.updateBook(bookID, key, value)}
                            role={this.state.role}
                            deleteBook={(bookID) => this.deleteBook(bookID)}
                            addBookToDB={() => this.addBookToDB()}
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
