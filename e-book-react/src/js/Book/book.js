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
import $ from "jquery";

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

    loadButton: {
        display: 'flex',
        justifyContent: 'center',
        height: 64,
    }
});

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

const choices = ['书名', '作者', 'isbn']; //可供搜索的选项

let defaultOpen = [];

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
        saveBookInfo: [],
        user: null,
        role: null,
        showSize: 20,
        canLoadMore: true,
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.state.user !== nextProps.user || this.state.role !== nextProps.role) {
            this.setState({
                user: nextProps.user,
                role: nextProps.role,
            })
        }
    }

    componentDidUpdate(nextProps, nextState, nextContext) {
        if (this.state.user !== nextProps.user || this.state.role !== nextProps.role) {
            this.setState({
                user: nextProps.user,
                role: nextProps.role,
            })
        }
    }

    componentDidMount() {
        this.getBooks();
        document.getElementById("loadMoreButton").style.color="#00aaff";
    };

    getBooks = () => {
        $.get(
            "/book/all",
            function (data) {
                let defaultOpen = new Array(data.length);
                for(let i = 0; i < data.length; i++)
                    defaultOpen[i] = false;
                this.setState({
                    saveBookInfo: data,
                    bookInfo: data,
                    bookList: data.slice(0, this.state.showSize),
                    canLoadMore: 20 < data.length,
                    showSize: 20,
                    open: defaultOpen
                });
            }.bind(this));
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
            price: parseFloat(document.getElementById("bookPrice").value),
            isbn: document.getElementById("bookIsbn").value,
            introduction: document.getElementById("bookIntroduction").value,
            stock: parseInt(document.getElementById("bookStock").value),
        };
        if(saveDataAry["title"] === "")
            alert("请输入书本标题");
        else if(saveDataAry["author"] === "")
            alert("请输入作者");
        else if(saveDataAry["price"] === "")
            alert("请输入书本价格");
        else if(saveDataAry["isbn"] === "")
            alert("请输入书本isbn");
        else if(saveDataAry["stock"] === "")
            alert("请输入书本库存量");
        else{
            $.ajax({
                type: "POST",
                async: false,
                url: "/book/add",
                data: JSON.stringify(saveDataAry),
                headers: {'Content-Type': 'application/json'},
                success: function (data) {
                    alert(data);
                }
            });
            this.getBooks();
        }
    };
    addABookToCart = (amount, bookID, stock) => {
        let saveDataAry = {
            username: this.state.user,
            b_ID: bookID,
            amount: amount
        };
        if(this.state.user === null)
            alert("要登录才能把书本加入购物车哦");
        else if(stock === 0)
            alert("这本书的库存为0哦");
        else{
            $.ajax({
                type: "POST",
                async: false,
                url: "/cart/add",
                data: JSON.stringify(saveDataAry),
                headers: {'Content-Type': 'application/json'},
                success: function (data){
                    if(data["success"] === false)
                        alert(data["alert"]);
                    else
                        alert("成功加入到购物车中");
                }
            });
        }
    };
    updateBook = (bookID, key, value) => {
        $.ajax({
            type: "GET",
            async: false,
            url: "/book/update/" + key + "?id=" + bookID + "&" + key + "=" + value,
            success: function (data) {
                alert("修改成功！");
            }
        });
        this.getBooks();
    };
    deleteBook = (bookID) => {
        $.ajax({
            type: "GET",
            async: false,
            url: "/book/delete?id=" + bookID,
            success: function (data) {
                alert("删除书本成功");
            }
        });
        this.getBooks();
    };

    handleClickOpen = (bookId) => {
        defaultOpen[bookId] = true;
        this.setState({
            open: defaultOpen
        });
    };
    handleClose = (bookID) =>{
        defaultOpen[bookID] = false;
        this.setState({ open: defaultOpen, });
    };
    handleChange(){
        let input = document.getElementById('search').value.toLowerCase();
        let newList = this.state.saveBookInfo.filter( (item) => {
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
            bookInfo: newList,
            bookList: newList.slice(0, 20),
            canLoadMore: 20 < newList.length,
            showSize: 20,
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

    loadMore = () => {
        this.setState({
            bookList: this.state.bookInfo.slice(0, this.state.showSize + 20),
            showSize: this.state.showSize + 20,
            canLoadMore: this.state.showSize < this.state.bookInfo.length,
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
                                            backgroundImage: `url(/book/image/${book["b_ID"]})`,
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
                                    onClick={() => this.deleteBook(book["b_ID"])}
                                >
                                    <DeleteIcon/>
                                </Button>
                            </Typography>
                            <BookInformation
                                open={this.state.open[book["b_ID"]]}
                                onClose={(bookID) => this.handleClose(bookID)}
                                img={book["img"]}
                                title={book["title"]}
                                author={book["author"]}
                                price={book["price"]}
                                isbn={book["isbn"]}
                                detail={book["introduction"]}
                                stock={book["stock"]}
                                imgStyle={bookStyle}
                                bookID={book["b_ID"]}
                                user={this.state.user}
                                addABookToCart={(amount, bookID, stock) => this.addABookToCart(amount, bookID, stock)}
                                adminstyle={this.state.role === "ADMIN" ? show : hide}
                                updateBook={(bookID, key, value) => this.updateBook(bookID, key, value)}
                            />
                        </div>
                    ))}
                </div>
                <div className={classes.loadButton}>
                    <Button onClick={() => this.loadMore()}
                            id="loadMoreButton"
                            style={this.state.canLoadMore ? show : hide}>
                        加  载  更  多
                    </Button>
                </div>
                <AddBookDialog
                    open={this.state.addBookDialogStyle}
                    onClose={() => this.handleAddBookDialogClose()}
                    addBookToDB={() => this.addBookToDB()}
                />
            </div>
        )
    }
}

Book.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Book);