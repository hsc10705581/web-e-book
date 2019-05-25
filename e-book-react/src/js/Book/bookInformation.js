import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';

const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
};

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);

class BookInformation extends Component{

    handleAdd = () => {
        this.handleClose();
        this.props.addABookToCart(null, this.props.bookID, this.props.stock);
    };

    handleClose = () => {
        this.props.onClose(this.props.bookID);
    };

    onClickEdit = (key) => {
        let value = prompt("请输入要改成的" + key, this.props[key]);
        if(value == null)
            return;
        this.props.updateBook(this.props.bookID, key, value);
    };

    render(){
        const { classes, onClose, selectedValue, ...other } = this.props;
        return(
            <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">
                    {this.props.title}
                    <Button style={this.props.adminstyle} onClick={() => this.onClickEdit("title")}><CreateIcon/></Button>
                </DialogTitle>
                <DialogContent>
                    <img src={this.props.img} alt={this.props.title} style={this.props.imgStyle} />
                    <Typography gutterBottom>
                        作者: {this.props.author}
                        <Button style={this.props.adminstyle} onClick={() => this.onClickEdit("author")}><CreateIcon/></Button>
                    </Typography>
                    <Typography gutterBottom>
                        价格: {this.props.price}
                        <Button style={this.props.adminstyle} onClick={() => this.onClickEdit("price")}><CreateIcon/></Button>
                    </Typography>
                    <Typography gutterBottom>
                        isbn: {this.props.isbn}
                        <Button style={this.props.adminstyle} onClick={() => this.onClickEdit("isbn")}><CreateIcon/></Button>
                    </Typography>
                    <Typography gutterBottom>
                        内容: {this.props.detail}
                    </Typography>
                    <DialogActions>
                        <Typography>
                            库存: {this.props.stock}
                            <Button style={this.props.adminstyle} onClick={() => this.onClickEdit("stock")}><CreateIcon/></Button>
                        </Typography>
                        <Button onClick={this.handleAdd} color="primary">
                            加入购物车
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}

BookInformation.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

export default withStyles(styles)(BookInformation);
