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
import Login from './user/login';
import Register from './user/register';
import {Link, withRouter} from "react-router-dom";

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
        isLogin: false,
        showLogin: show,
        topBarStyle: {backgroundColor: "#3f51b5", color: "white"},
        username: null,
        role: null,
        cartProducts: [],
        totalPrice: 0,
        isAdmin: hide,
    };

    getCartProduct = () => {
        this.props.getCartProduct();
    };

    getExpenses = () => {
        this.props.getExpenses();
    };

    getUsersExpenses = () => {
        this.props.getUsersExpenses();
    };

    refreshUsers = () => {
        this.props.refreshUsers();
    };

    refreshOrders = () => {
        this.props.refreshOrders();
    };

    refreshAllOrders = () => {
        this.props.refreshAllOrders();
    };

    logout = () => {
        this.props.logout();
        this.props.history.push("/");
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.cartProducts !== nextProps.cartProducts) {
            this.setState({
                cartProducts: nextProps.cartProducts,
            })
        }
        if (this.state.username !== nextProps.username) {
            if (nextProps.username !== null)
            {
                this.setState({
                    username: nextProps.username,
                    role: nextProps.role,
                    isLogin: true,
                    showLogin: hide,
                })
            }
            else
            {
                this.setState({
                    username: null,
                    role: null,
                    isLogin: false,
                    showLogin: show,
                })
            }
        }
        if (nextProps.role === "ADMIN")
        {
            this.setState({
                isAdmin: show,
            })
        }
        else
        {
            this.setState({
                isAdmin: hide,
            })
        }
    }

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
        this.props.changeStyle();
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
                        <div style={this.state.showLogin}>
                            <Button color="inherit" onClick={this.handleRegisterOpen}>注册</Button>
                            <Button color="inherit" onClick={this.handleLoginOpen}>登录</Button>
                        </div>
                        <div style={this.state.isLogin ? show : hide}>
                            <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
                                {this.state.username} 您的权限: {this.state.role}
                            </Typography>
                            <Button color="inherit" onClick={() => this.props.logout()}>登出</Button>
                            <Link to={global.url.cart}>
                                <IconButton className={classes.button} aria-label="Delete" color="inherit" onClick={this.getCartProduct}>
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
                        <Link to={global.url.home}>
                            <ListItemLink>
                                <ListItemText primary="首页"/>
                            </ListItemLink>
                        </Link>
                        <Link to={global.url.book}>
                            <ListItemLink>
                                <ListItemText primary="全部书籍"/>
                            </ListItemLink>
                        </Link>
                        <Divider/>
                        <Link to={global.url.usersExpenses}>
                            <ListItemLink style={this.state.isLogin ? show : hide} onClick={this.getUsersExpenses}>
                                <ListItemText primary="我的消费记录"/>
                            </ListItemLink>
                        </Link>
                        <Link to={global.url.order}>
                            <ListItemLink style={this.state.isLogin ? show : hide} onClick={this.refreshOrders}>
                                <ListItemText primary="我的所有订单"/>
                            </ListItemLink>
                        </Link>
                        <Link to={global.url.cart}>
                            <ListItemLink style={this.state.isLogin ? show : hide} onClick={this.getCartProduct}>
                                <ListItemText primary="我的购物车"/>
                            </ListItemLink>
                        </Link>
                        <Divider/>
                        <Link to={global.url.user}>
                            <ListItemLink style={this.state.isAdmin} onClick={this.refreshUsers}>
                                <ListItemText primary="管理所有用户"/>
                            </ListItemLink>
                        </Link>
                        <Link to={global.url.allOrders}>
                            <ListItemLink style={this.state.isAdmin} onClick={this.refreshAllOrders}>
                                <ListItemText primary="管理所有订单"/>
                            </ListItemLink>
                        </Link>
                        <Link to={global.url.expenses}>
                            <ListItemLink style={this.state.isAdmin} onClick={this.getExpenses}>
                                <ListItemText primary="管理用户消费"/>
                            </ListItemLink>
                        </Link>
                        <Link to={global.url.bookSales}>
                            <ListItemLink style={this.state.isAdmin}>
                                <ListItemText primary="管理书本销量"/>
                            </ListItemLink>
                        </Link>
                    </List>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: openDrawer,
                    })}
                >
                    {this.props.children}
                </main>
                <Login open={this.state.openLogin} onClose={() => this.handleLoginClose()} login={() => this.props.login()} />
                <Register
                    open={this.state.openRegister}
                    onClose={() => this.handleRegisterClose()}
                    register={() => this.props.register()}
                />
            </div>
        );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(withRouter(Navigation));