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
import Login from './login';

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
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

let hide = {
    display: "none",
}

let show = {
    display: "inline"
}

class Navigation extends React.Component {
    state = {
        openDrawer: false,
        openLogin: false,
        showShoppingCart: hide,
        showLogin: show,
    };

    showBooks = () => {
        this.props.showBooks();
    };

    showIntro = () => {
        this.props.showIntro();
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

    login = () => {
        this.setState({
            showShoppingCart: show,
            showLogin: hide,
        });
    }

    render() {
        const { classes, theme } = this.props;
        const { openDrawer } = this.state;
        const links = {
            recommendedBooks: "#",
            allBooks: "%PUBLIC_URL%/detail.html",
            shoppingCart: "#",
        };

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: openDrawer,
                    })}
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
                        <div style={this.state.showLogin}>
                            <Button color="inherit" href={links.register}>注册</Button>
                            <Button color="inherit" onClick={this.handleLoginOpen}>登录</Button>
                        </div>
                        <div style={this.state.showShoppingCart}>
                            <IconButton className={classes.button} aria-label="Delete" color="inherit">
                                购物车：
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
                        <ListItemLink href={links.recommendedBooks}>
                            <ListItemText primary="推荐列表"/>
                        </ListItemLink>
                        <ListItemLink onClick={this.showBooks}>
                            <ListItemText primary="全部书籍"/>
                        </ListItemLink>
                        <ListItemLink href={links.shoppingCart}>
                            <ListItemText primary="我的购物车"/>
                        </ListItemLink>
                    </List>
                </Drawer>
                <Login open={this.state.openLogin} onClose={() => this.handleLoginClose()} login={() => this.login()} />
            </div>
        );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Navigation);