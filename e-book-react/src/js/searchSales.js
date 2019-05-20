import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class SearchSales extends React.Component {

    handleSearch = () => {
        this.props.onClose();
        this.props.search();
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">搜索指定时间段的订单</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            请输入开始日期和结束日期。
                        </DialogContentText>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="beginDate1"
                            label="开始日期"
                            type="text"
                            placeholder="YYYY-MM-DD"
                            helperText="格式:YYYY-MM-DD"
                            fullWidth
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="endDate1"
                            label="结束日期"
                            type="text"
                            placeholder="YYYY-MM-DD"
                            helperText="格式:YYYY-MM-DD"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSearch} color="primary">
                            搜索
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