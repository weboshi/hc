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

function SimpleTable(props) {
  const { classes } = props;
  const dataObject = Object.keys(Object.values(props)[0])[0]

  return (
    Array.isArray(props.data) ?
    
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell align="center">Cryptocurrency</TableCell>
            <TableCell align="center">Symbol</TableCell>
            <TableCell align="center">USD Price</TableCell>
            <TableCell align="center">Supply</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map(row => (
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
  
    :
  
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell align="center">Cryptocurrency</TableCell>
            <TableCell align="center">Symbol</TableCell>
            <TableCell align="center">Logo</TableCell>
            <TableCell align="center">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {dataObject}
              </TableCell>
              <TableCell align="center">{props.data[dataObject].name}</TableCell>
              <TableCell align="center">{props.data[dataObject].symbol}</TableCell>
              <TableCell align="center"><img src={props.data[dataObject].logo}/></TableCell>
              <TableCell align="center">{props.data[dataObject].description}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);