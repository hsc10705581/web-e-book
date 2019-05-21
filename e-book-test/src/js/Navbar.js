import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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
import $ from 'jquery';

import Login from './User/Login';
import Register from './User/Register';

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

        topBarStyle: {backgroundColor: "#3f51b5", color: "white"},
        cartProducts: [],
        totalPrice: 0,
        isAdmin: hide,

        isLogin: false,
        username: null,
        role: null,
    };

    componentDidMount() {
        this.setState({
            username: global.configuration.user,
            role: global.configuration.role,
        })
    }

    logout = () => {
        this.setState({
            username: null,
            role: null,
            isLogin: false,
        });
        global.configuration.user = null;
        global.configuration.role = null;
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
                url: "http://localhost:8080/user/add",
                type: "POST",
                contentType: "application/json",
                body: JSON.stringify(saveDataAry),
                success: function (data) {
                    if (data["success"] === false) {
                        alert(data["alert"]);
                    } else {
                        alert(data["alert"]);
                        this.setState({
                            isLogin: true,
                            username: data["username"],
                            role: data["role"],
                        });
                        global.configuration.user = data["username"];
                        global.configuration.role = data["role"];
                    }
                }.bind(this)
            });
        }
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
                            isLogin: true,
                            username: data["username"],
                            role: data["role"],
                        });
                        global.configuration.user = data["username"];
                        global.configuration.role = data["role"];
                    }
                }.bind(this)
            });
        }
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
    changeStyle = () => {
        tmp++;
        this.setState({
            topBarStyle: (tmp % 2) === 1 ? {backgroundColor: "#f5f5f5", color: "black"} : {backgroundColor: "#3f51b5", color: "white"},
        })
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
                        <div style={this.state.isLogin ? hide : show}>
                            <Button color="inherit" onClick={this.handleRegisterOpen}>注册</Button>
                            <Button color="inherit" onClick={this.handleLoginOpen}>登录</Button>
                        </div>
                        <div style={this.state.isLogin ? show : hide}>
                            <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
                                {this.state.username} 您的权限: {this.state.role}
                            </Typography>
                            <Button color="inherit" onClick={() => this.logout()}>登出</Button>
                            <Link to="/cart">
                                <IconButton className={classes.button} aria-label="Delete" color="inherit">
                                    <ShoppingCart />
                                </IconButton>
                            </Link>
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
                        <Link to="/">
                            <ListItemLink>
                                <ListItemText primary="首页"/>
                            </ListItemLink>
                        </Link>
                        <Link to="/books">
                            <ListItemLink>
                                    <ListItemText primary="全部书籍"/>
                            </ListItemLink>
                        </Link>
                        <Divider/>
                        <Link to="/order">
                            <ListItemLink style={this.state.isLogin ? show : hide}>
                                <ListItemText primary="查看所有订单"/>
                            </ListItemLink>
                        </Link>
                        <Divider/>
                        <ListItemLink style={this.state.isAdmin}>
                            <ListItemText primary="管理所有用户"/>
                        </ListItemLink>
                        <ListItemLink style={this.state.isAdmin}>
                            <ListItemText primary="管理所有订单"/>
                        </ListItemLink>
                        <ListItemLink style={this.state.isAdmin}>
                            <ListItemText primary="查看用户的累计消费情况"/>
                        </ListItemLink>
                    </List>
                </Drawer>
                <Login
                    open={this.state.openLogin}
                    onClose={() => this.handleLoginClose()}
                    login={() => this.login()} />
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