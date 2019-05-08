import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { defaultProps } from 'recompose';
import './table.css';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class SimpleTable extends React.Component {
  constructor(props){
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick = (e) => {
    let attr = e.target.getAttribute('name')
    this.props.onSort(attr)
  }

render(){
  const { classes } = this.props;


  return (   
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center" name="cmc_rank" onClick={this.onClick}>Rank</TableCell>
            <TableCell align="center" name='name' onClick={this.onClick}>Cryptocurrency</TableCell>
            <TableCell align="center" name="symbol" onClick={this.onClick}>Symbol</TableCell>
            <TableCell align="center" name="quote.USD.price" onClick={this.onClick}>USD Price</TableCell>
            <TableCell align="center" name="circulating_supply" onClick={this.onClick}>Supply</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.data.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.cmc_rank}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.symbol}</TableCell>
              <TableCell align="center">{row.quote.USD.price}</TableCell>
              <TableCell align="center">{row.circulating_supply}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);