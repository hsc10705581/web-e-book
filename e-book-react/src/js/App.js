import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import '../App.css';
import Navigation from "./navigation";
import $ from 'jquery';
import "./config";

import Book from "./Book/book";
import Introduction from './introuction';
import Order from './user/order';
import User from './admin/user';
import Cart from './Cart/Cart';
import Expenses from './admin/expenses';

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
let tmp = 0;

class App extends Component {

    state = {
        backStyle: sectionStyle,
        username: null,
        role: null,
        bookInfo: [],

        cartProducts: [],
        orderList: [],
        userList: [],
        expensesMap: {},
    };

    login = () => {
        let saveDataAry = {
            username: document.getElementById("loginName").value,
            password: document.getElementById("loginPassword").value,
        };
        if(saveDataAry["username"] === "" || saveDataAry["password"] === "")
            alert("请输入用户名或密码");
        else{
            $.ajax({
                url: "/user/login",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(saveDataAry),
                headers: {'Content-Type': 'application/json'},
                success: function (data) {
                    if (data["success"] === false) {
                        alert(data["alert"]);
                    } else {
                        alert(data["alert"]);
                        this.setState({
                            username: data["username"],
                            role: data["role"],
                        });
                    }
                }.bind(this)
            });
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
            $.ajax({
                url: "/user/add",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(saveDataAry),
                headers: {'Content-Type': 'application/json'},
                success: function (data) {
                    if (data["success"] === false) {
                        alert(data["alert"]);
                    } else {
                        alert(data["alert"]);
                        this.setState({
                            username: data["username"],
                            role: data["role"],
                        });
                    }
                }.bind(this)
            });
        }
    };
    logout = () => {
        this.setState({
            username: null,
            role: null,
        });
    };

    getCartProduct = () => {
        if (this.state.username === null)
            alert("你需要登录才能查看购物车");
        else{
            $.get(
                "/cart/all/" + this.state.username,
                function (data) {
                    this.setState({
                        cartProducts: data,
                    })
                }.bind(this));
        }
    };
    checkout = () => {
        let saveDataAry = {
            cartProducts: this.state.cartProducts,
            username: this.state.username,
        };
        if(this.state.cartProducts.length === 0)
            alert("你的购物车是空的！");
        else {
            $.ajax({
                type: "POST",
                url: "/cart/checkout",
                async: false,
                data: JSON.stringify(saveDataAry),
                headers: {'Content-Type': 'application/json'},
                success: function (data){
                    alert(data);
                }
            });
            this.getCartProduct();
        }
    };

    refreshAllOrders = () => {
        $.get(
            "/order/getAll",
            function (data) {
                this.setState({
                    orderList: data,
                })
            }.bind(this)
        )
    };
    refreshOrders = () => {
        $.get(
            "/order/getAll/" + this.state.username,
            function (data) {
                this.setState({
                    orderList: data,
                })
            }.bind(this));
    };
    refreshUsers = () => {
        $.get(
            "/user/getAll",
            function (data) {
                this.setState({
                    userList: data,
                })
            }.bind(this));
    };
    refreshExpenses = () => {
        $.get(
            "/order/get/expenses",
            function (data) {
                this.setState({
                    expensesMap: data,
                })
            }.bind(this)
        )
    };
    changeStyle(){
        tmp++;
        this.setState({
            backStyle: (tmp % 2) === 1 ? otherSectionStyle : sectionStyle,
        })
    }

    render() {
        return (
            <Router>
                <div className="App" style={this.state.backStyle}>
                    <div id="navigation">
                        <Navigation
                            changeStyle={() => this.changeStyle()}
                            getCartProduct={() => this.getCartProduct()}
                            refreshUsers={() => this.refreshUsers()}
                            refreshOrders={() => this.refreshOrders()}
                            refreshAllOrders={() => this.refreshAllOrders()}
                            refreshExpenses={() => this.refreshExpenses()}

                            login={() => this.login()}
                            register={() => this.register()}
                            logout={() => this.logout()}
                            username={this.state.username}
                            role={this.state.role}
                        />
                    </div>
                    <div>
                        <Switch>
                            <Route path={global.url.home} exact component={Introduction} />
                            <Route path={global.url.book} exact render={() =>
                                <Book
                                    bookInfo={this.state.bookInfo}
                                    user={this.state.username}
                                    role={this.state.role}
                                />}
                            />
                            <Route path={global.url.cart} exact render={() =>
                                <Cart
                                    cartProducts={this.state.cartProducts}
                                    getCartProduct={() => this.getCartProduct()}
                                    username={this.state.username}
                                    checkout={() => this.checkout()}
                                />}
                            />
                            <Route path={global.url.order} exact render={() =>
                                <Order
                                    orderList={this.state.orderList}
                                    refreshOrders={() => this.refreshOrders()}
                                />}
                            />
                            <Route path={global.url.user} exact render={() =>
                                <User
                                    userList={this.state.userList}
                                    refreshUsers={() => this.refreshUsers()}
                                />}
                            />
                            <Route path={global.url.allOrders} exact render={() =>
                                <Order
                                    orderList={this.state.orderList}
                                    refreshOrders={() => this.refreshAllOrders()}
                                />}
                            />
                            <Route path={global.url.expenses} exact render={() =>
                                <Expenses
                                    expensesMap={this.state.expensesMap}
                                />}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;