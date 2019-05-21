import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BookInformation from './bookInformation';
import AddBookDialog from './addBookDialog';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add'
import Paper from '@material-ui/core/Paper';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {Button} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: '240px',
    },
    bookRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    searchRoot: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '80%',
        marginTop: '50px',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },

    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

/*
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        marginLeft: '240px',
    },
    fab: {
        margin: theme.spacing.unit * 2,
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
});
*/

let bottomStyle= {
    height: '240px',
    width: '180px',
    margin: '10px',
    marginTop: '50px',
};

let bookStyle= {
    height: '240px',
    width: '180px',
};

/*const bookInfo = [
    {
        id: 0,
        img: require('../images/book1.jpg'),
        title: '游戏设计艺术（第2版）',
        author: '[美] Jesse Schell',
        price: '168.00元',
        isbn: '9787121282669',
        detail: '《游戏设计艺术（第2版）》主要内容包括：游戏的体验、构成游戏的元素、元素支撑的主题、游戏的改进、游戏机制、游戏中的角色、游戏设计团队、如何开发好的游戏、如何推销游戏、设计者的责任等。',
    },
    {
        id: 1,
        img: require('../images/book2.jpg'),
        title: '游戏设计梦工厂',
        author: 'Tracy Fullerton（特雷西•富勒顿）',
        price: '119.00元',
        isbn: '9787121284663',
        detail: '从了解游戏设计师的角色及游戏的结构开始，到游戏的正规、戏剧和动态元素，再到游戏的原型制作和游戏测试，直到游戏的打磨、发行和游戏制作，覆盖游戏设计的方方面面，适合不同阶段的游戏设计师。',
    },
    {
        id: 2,
        img: require('../images/book3.jpg'),
        title: '游戏的人',
        author: '[荷] 约翰·赫伊津哈',
        price: '28.00元',
        isbn: '9787536050686',
        detail: '本书研究游戏在人类进化和文化发展中的重要作用。强调指出：游戏是文化本质的、固有的、不可或缺的、决非偶然的成分。',
    },
    {
        id: 3,
        img: require('../images/book4.jpg'),
        title: '有限与无限的游戏',
        author: '[美]詹姆斯·卡斯',
        price: '35.00元',
        isbn: '9787121215698',
        detail: '在这本书中，詹姆斯·卡斯向我们展示了世界上两种类型的「游戏」：「有限的游戏」和「无限的游戏」。',
    },
    {
        id: 4,
        img: require('../images/book5.jpg'),
        title: '游戏改变世界',
        author: '[美] 简·麦戈尼格尔',
        price: '59.90元',
        isbn: '9787213049422',
        detail: '作者在书中用大量事例告诉我们，游戏击中了人类幸福的核心，提供了令人愉悦的奖励、刺激性的挑战和宏大的胜利，而这些都是现实世界十分匮乏的。她的研究表明，我们可以借助游戏的力量，让生活变得像游戏一样精彩。',
    },
];*/

const choices = ['书名', '作者', 'isbn']; //可供搜索的选项

let defaultOpen = [false, false, false, false, false];

var hide = {
    display: "none",
};

var show = {
    display: "inline",
};

class Book extends Component{
    //{ classes } = props;
    state = {
        open: defaultOpen,
        addBookDialogStyle: false,
        bookList: [],
        choice: "书名",
        listOpen: false,
        bookInfo: [],
        user: null,
        role: null,
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.bookInfo !== nextProps.bookInfo) {
            this.setState({
                bookInfo: nextProps.bookInfo,
                bookList: nextProps.bookInfo,
            })
        }
        if (this.state.user !== nextProps.user || this.state.role !== nextProps.role) {
            this.setState({
                user: nextProps.user,
                role: nextProps.role,
            })
        }
    }

    update(bookInfo){
        this.setState({
            bookInfo: bookInfo,
            bookList: bookInfo
        })
    }
    handleClickOpen(bookId){
        defaultOpen[bookId] = true;
        this.setState({
            open: defaultOpen
        });
    };
    handleClose(bookId){
        defaultOpen[bookId] = false;
        this.setState({ open: defaultOpen, });
    };
    handleChange(){
        let input = document.getElementById('search').value.toLowerCase();
        let newList = this.state.bookInfo.filter( (item) => {
            if(this.state.choice === "书名")
                return item.title.trim().toLowerCase().indexOf(input) !== -1;
            else if(this.state.choice === "作者")
                return item.author.trim().toLowerCase().indexOf(input) !== -1;
            else if(this.state.choice === "isbn")
                return item.isbn.trim().toLowerCase().indexOf(input) !== -1;
            else
                return false;
        });
        this.setState({
            bookList: newList,
        })
    };
    handleListChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleListClose = () => {
        this.setState({ listOpen: false });
    };
    handleListOpen = () => {
        this.setState({ listOpen: true });
    };
    handleAddBookDialogOpen = () => {
        this.setState({
            addBookDialogStyle: true,
        })
    };
    handleAddBookDialogClose = () => {
        this.setState({
            addBookDialogStyle: false,
        })
    };

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Paper className={classes.searchRoot} elevation={1}>
                    <form autoComplete="off">
                        <FormControl className={classes.formControl}>
                            <Select
                                open={this.state.listOpen}
                                onClose={this.handleListClose}
                                onOpen={this.handleListOpen}
                                value={this.state.choice}
                                onChange={this.handleListChange}
                                inputProps={{
                                    name: 'choice',
                                    id: 'demo-controlled-open-select',
                                }}
                            >
                                {choices.map(choice => (
                                    <MenuItem key={choice} value={choice}>
                                        {choice}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </form>
                    <InputBase className={classes.input} id={'search'} placeholder={"输入要搜索的" + this.state.choice} onChange={this.handleChange.bind(this)}/>
                    <IconButton className={classes.iconButton} aria-label="Search" onClick={() => this.handleChange()}>
                        <SearchIcon />
                    </IconButton>
                    <Divider className={classes.divider} />
                    <IconButton style={this.state.role === "ADMIN" ? show : hide} onClick={() => this.handleAddBookDialogOpen()} color="primary" className={classes.iconButton} aria-label="Directions">
                        <AddIcon />
                    </IconButton>
                </Paper>
                <div className={classes.bookRoot}>
                    <div style={this.state.role === "ADMIN" ? show : hide}>
                        <ButtonBase
                            focusRipple
                            className={classes.image}
                            focusVisibleClassName={classes.focusVisible}
                            style={bottomStyle}
                            onClick={() => this.handleAddBookDialogOpen()}
                        >
                            <span className={classes.imageBackdrop} />
                            <span className={classes.imageButton}>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                className={classes.imageTitle}
                            >
                                添加书本
                                <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </ButtonBase>
                    </div>
                    {this.state.bookList.map(book => (
                        <div key={book["b_ID"]}>
                            <ButtonBase
                                focusRipple
                                key={book["title"]}
                                className={classes.image}
                                focusVisibleClassName={classes.focusVisible}
                                style={bottomStyle}
                                onClick={() => this.handleClickOpen(book["b_ID"])}
                            >
                                    <span
                                        className={classes.imageSrc}
                                        style={{
                                            backgroundImage: `url(${book["img"]})`,
                                        }}
                                    />
                                <span className={classes.imageBackdrop} />
                                <span className={classes.imageButton}>
                                        <Typography
                                            component="span"
                                            variant="subtitle1"
                                            color="inherit"
                                            className={classes.imageTitle}
                                        >
                                            {book["title"]}
                                            <span className={classes.imageMarked} />
                                        </Typography>
                                    </span>
                            </ButtonBase>
                            <Typography>库存:{book["stock"]}
                                <Button
                                    style={this.state.role === "ADMIN" ? show : hide}
                                    onClick={() => this.props.deleteBook(book["b_ID"])}
                                >
                                    <DeleteIcon/>
                                </Button>
                            </Typography>
                            <BookInformation
                                open={this.state.open[book["b_ID"]]}
                                onClose={(bookId) => this.handleClose(bookId)}
                                img={book["img"]}
                                title={book["title"]}
                                author={book["author"]}
                                price={book["price"]}
                                isbn={book["isbn"]}
                                detail={book["detail"]}
                                stock={book["stock"]}
                                imgStyle={bookStyle}
                                bookID={book["b_ID"]}
                                user={this.state.user}
                                addABookToCart={(amount, bookID, stock) => this.props.addABookToCart(amount, bookID, stock)}
                                adminstyle={this.state.role === "ADMIN" ? show : hide}
                                updateBook={(bookID, key, value) => this.props.updateBook(bookID, key, value)}
                            />
                        </div>
                    ))}
                </div>
                <AddBookDialog
                    open={this.state.addBookDialogStyle}
                    onClose={() => this.handleAddBookDialogClose()}
                    addBookToDB={() => this.props.addBookToDB()}
                />
            </div>
        )
    }
}

Book.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Book);