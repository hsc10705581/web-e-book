import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class AddBookDialog extends React.Component {

    handleAddBook = () => {
        if (document.getElementById("bookTitle").value === "") {
            alert("请输入书本名");
        }
        else if(document.getElementById("bookAuthor").value === "") {
            alert("请输入作者");
        }
        else if(document.getElementById("bookPrice").value === "") {
            alert("请输入价格");
        }
        else if(document.getElementById("bookIsbn").value === "") {
            alert("请输入isbn");
        }
        else if(document.getElementById("bookStock").value === "") {
            alert("请输入库存数");
        }
        else {
            this.props.addBookToDB();
            this.props.onClose();
            //alert("添加成功！");
        }
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">添加书本</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            请输入书名，作者，译者，出版社，出版日期，价格，isbn，简介，库存数来添加书本
                        </DialogContentText>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="bookTitle"
                            label="书名"
                            type="text"
                            helperText=""
                            fullWidth
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="bookAuthor"
                            label="作者"
                            type="text"
                            helperText=""
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="bookTranslator"
                            label="译者"
                            type="text"
                            helperText=""
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="bookPress"
                            label="出版社"
                            type="text"
                            helperText=""
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="bookDate"
                            label="出版日期"
                            type="text"
                            helperText=""
                            fullWidth
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="bookPrice"
                            label="价格"
                            type="text"
                            helperText=""
                            fullWidth
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="bookIsbn"
                            label="isbn"
                            type="text"
                            helperText=""
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="bookIntroduction"
                            label="简介"
                            type="text"
                            helperText=""
                            fullWidth
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="bookStock"
                            label="库存数"
                            type="text"
                            helperText=""
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleAddBook()} color="primary">
                            添加书本
                        </Button>
                        <Button onClick={this.props.onClose} color="secondary">
                            取消
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}