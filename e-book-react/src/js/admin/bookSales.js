import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import $ from "jquery";
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: '240px',
    },

    searchRoot: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '80%',
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

    table: {
        minWidth: 700,
    },

    tablePaper: {
        margin: 30
    },
});

var hide = {
    display: "none",
};

var show = {
    display: "inline",
};

class Detail extends Component{

    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.title}</TableCell>
                <TableCell>{this.props.price}</TableCell>
                <TableCell>{this.props.amount}</TableCell>
                <TableCell>{this.props.time}</TableCell>
            </TableRow>
        )
    }

}

class BookSales extends Component{

    infoStyle = true; //true for 全部条目 false for 汇总

    state = {
        salesList: [],
        salesListSave: [],
    };

    componentDidMount() {
        this.getSales();
    };

    getSales = () => {
        $.get(
            "/stat/books",
            function (data) {
                this.setState({
                    salesList: data,
                    salesListSave: data,
                })
            }.bind(this));
    };

    handleChange = () => {
        let beginDate = document.getElementById('beginDate').value;
        let endDate = document.getElementById('endDate').value;
        let newList;
        if(beginDate === "" && endDate === ""){
            newList = this.state.salesListSave.filter( (sale) => {
                return true;
            });
        }
        else if(beginDate === "" && endDate !== ""){
            newList = this.state.salesListSave.filter( (sale) => {
                return new Date(endDate) > new Date(sale["time"]);
            });
        }
        else if(beginDate !== "" && endDate === ""){
            newList = this.state.salesListSave.filter( (sale) => {
                return new Date(beginDate) < new Date(sale["time"]);
            });
        }
        else{
            newList = this.state.salesListSave.filter( (sale) => {
                return new Date(endDate) > new Date(sale["time"]) && new Date(beginDate) < new Date(sale["time"]);
            });
        }
        this.setState({
            salesList: newList,
        })
    };

    changeList = () => {
        if(this.infoStyle === true){
            let maxId = 0;
            for(let i = 0; i < this.state.salesList.length; i++){
                if(this.state.salesList[i]["b_ID"] > maxId)
                    maxId = this.state.salesList[i]["b_ID"];
            }

            let saveArray = new Array(maxId+1);
            for(let i = 0; i < maxId+1; i++)
                saveArray[i] = 0;

            for(let i = 0; i < this.state.salesList.length; i++){
                saveArray[this.state.salesList[i]["b_ID"]] += this.state.salesList[i]["amount"]
            }

            let newList = [];
            for(let i = 0; i < this.state.salesList.length; i++){
                if(saveArray[this.state.salesList[i]["b_ID"]] !== 0){
                    let js = {
                        b_ID:  this.state.salesList[i]["b_ID"],
                        time: null,
                        title: this.state.salesList[i]["title"],
                        price: this.state.salesList[i]["price"],
                        amount: saveArray[this.state.salesList[i]["b_ID"]],
                        key: this.state.salesList[i]["key"],
                    };
                    newList.push(js);
                    saveArray[this.state.salesList[i]["b_ID"]] = 0;
                }
            }
            this.setState({
                salesList: newList,
            });
        }
        else{
            this.handleChange();
        }
        this.infoStyle = !this.infoStyle;
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.searchRoot} elevation={1}>
                    <InputBase className={classes.input} id={'beginDate'} placeholder={"输入起始日期(格式:YYYY-MM-DD"} onChange={this.handleChange.bind(this)}/>
                    <InputBase className={classes.input} id={'endDate'} placeholder={"输入结束日期(格式:YYYY-MM-DD"} onChange={this.handleChange.bind(this)}/>
                    <IconButton className={classes.iconButton} aria-label="Search" onClick={() => this.handleChange()}>
                        <SearchIcon />
                    </IconButton>
                    <Button onClick={this.changeList}>切换显示方式</Button>
                </Paper>
                <Paper className={classes.tablePaper}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            书本销量表
                        </Typography>
                    </Toolbar>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>书本ID</TableCell>
                                <TableCell>书名</TableCell>
                                <TableCell>价格</TableCell>
                                <TableCell>购买数量</TableCell>
                                <TableCell>购买时间</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.salesList.map(sale => (
                                <Detail
                                    key={sale["key"]}
                                    time={sale["time"]}
                                    title={sale["title"]}
                                    price={sale["price"]}
                                    id={sale["b_ID"]}
                                    amount={sale["amount"]}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

BookSales.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookSales);