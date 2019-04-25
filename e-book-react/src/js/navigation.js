import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import HighLight from '@material-ui/icons/Highlight';
import Login from './login';
import Register from './register';
import $ from 'jquery';
import Product from './product';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    button: {
        margin: theme.spacing.unit,
    },
    productList: {
        display: 'flex',
        direction: 'column',
    }
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

let hide = {
    display: "none",
};

let show = {
    display: "flex",
    alignItems: "center",
};

let tmp = 0;

class Navigation extends React.Component {
    state = {
        openShoppingCart: false,
        openDrawer: false,
        openLogin: false,
        openRegister: false,
        showShoppingCart: hide,
        showLogin: show,
        topBarStyle: {backgroundColor: "#3f51b5", color: "white"},
        username: null,
        role: null,
        cartProducts: [],
        totalPrice: 0
    };

    showBooks = () => {
        this.props.showBooks();
    };
    showIntro = () => {
        this.props.showIntro();
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
                this.setState({
                    cartProducts: cartProducts,
                })
            }.bind(this));
    };

    handleShoppingCartOpen = () => {
        this.setState({openShoppingCart: true});
        this.refreshShoppingCartOpen();
    };
    handleShoppingCartClose = () => {
        this.setState({openShoppingCart: false})
    };
    handleDrawerOpen = () => {
        this.setState({ openDrawer: true });
    };
    handleDrawerClose = () => {
        this.setState({ openDrawer: false });
    };
    handleLoginOpen = () => {
        this.setState({ openLogin: true});
    };
    handleLoginClose = () => {
        this.setState({ openLogin: false});
    };
    handleRegisterOpen = () => {
        this.setState({openRegister: true});
    };
    handleRegisterClose = () => {
        this.setState({openRegister: false});
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
                    var array = JSON.parse(data);
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
                            showShoppingCart: show,
                            showLogin: hide,
                        });
                        this.props.getUserInformation(array[2], array[3]);
                    }
                }.bind(this)
            );
        }
    };
    register = () => {
        var saveDataAry = {
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
                    var array = JSON.parse(data);
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
                            showShoppingCart: show,
                            showLogin: hide,
                        });
                    }
                }.bind(this)
            );
        }
    };
    logout = () => {
        this.setState({
            showShoppingCart: hide,
            showLogin: show,
            username: null,
            role: null,
        });
    };
    changeStyle = () => {
        this.props.changeStyle();
        tmp++;
        this.setState({
            topBarStyle: (tmp % 2) === 1 ? {backgroundColor: "#f5f5f5", color: "black"} : {backgroundColor: "#3f51b5", color: "white"},
        })
    };

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
            }.bind(this)
        });
        this.refreshShoppingCartOpen();
    };

    checkout = () => {
        if(this.state.cartProducts.length === 0)
            alert("您的购物车是空的哦");
        else{
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
                }.bind(this)
            });
            this.refreshShoppingCartOpen();
            window.location.href = "http://localhost:8080/getOrder/" + this.state.username;
        }
    };

    render() {
        const { classes, theme } = this.props;
        const { openDrawer } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: openDrawer,
                    })}
                    style={this.state.topBarStyle}
                >
                    <Toolbar disableGutters={!openDrawer}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, openDrawer && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
                            e-book
                        </Typography>
                        <IconButton onClick={this.changeStyle}>
                            <HighLight />
                        </IconButton>
                        <div style={this.state.showLogin}>
                            <Button color="inherit" onClick={this.handleRegisterOpen}>注册</Button>
                            <Button color="inherit" onClick={this.handleLoginOpen}>登录</Button>
                        </div>
                        <div style={this.state.showShoppingCart}>
                            <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
                                {this.state.username} 您的权限: {this.state.role}
                            </Typography>
                            <Button color="inherit" onClick={() => this.logout()}>登出</Button>
                            <IconButton className={classes.button} aria-label="Delete" color="inherit" onClick={this.handleShoppingCartOpen}>
                                <ShoppingCart />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={openDrawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItemLink onClick={this.showIntro}>
                            <ListItemText primary="首页"/>
                        </ListItemLink>
                        <ListItemLink>
                            <ListItemText primary="推荐列表"/>
                        </ListItemLink>
                        <ListItemLink onClick={this.showBooks}>
                            <ListItemText primary="全部书籍"/>
                        </ListItemLink>
                    </List>
                </Drawer>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="right"
                    open={this.state.openShoppingCart}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleShoppingCartClose}>
                            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {this.state.cartProducts.map((product) => (
                            <ListItem>
                                <Product
                                    title={product.title}
                                    price={product.price}
                                    amount={product.amount}
                                    b_ID={product.b_ID}
                                    bookAddRemove={(amount, bookID) => this.bookAddRemove(amount, bookID)}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <Button onClick={this.checkout}>下单</Button>
                </Drawer>
                <Login open={this.state.openLogin} onClose={() => this.handleLoginClose()} login={() => this.login()} />
                <Register
                    open={this.state.openRegister}
                    onClose={() => this.handleRegisterClose()}
                    register={() => this.register()}
                />
            </div>
        );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Navigation);