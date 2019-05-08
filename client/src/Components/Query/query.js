import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '../Button/button';
import './query.css'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  input1: {
      height: 20,
      width: 60,
      padding: 10,
  }
});


class OutlinedTextFields extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = () => {
    const {lowerBound, upperBound} = this.state
    console.log(this.state.lowerBound)
    console.log(lowerBound)
    this.props.onQuery(lowerBound, upperBound)
  }

  render() {
    const { classes } = this.props;
    if (this.props.canClear == true ) {
        return (
            <div className='query-module'>
                <Button label="View Graph of Quotes" onClick={this.props.onClick}/>
                <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-name"
                  label="Min USD"
                  className={classes.textField}
                  value={this.state.lowerBound}
                  onChange={this.handleChange}
                  margin="normal"
                  variant="outlined"
                  name='lowerBound'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    classes: { input: classes.input1}
                  }}        />
        
                <TextField
                  id="outlined-name"
                  label="Max USD"
                  className={classes.textField}
                  value={this.state.upperBound}
                  onChange={this.handleChange}
                  margin="normal"
                  variant="outlined"
                  name='upperBound'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    classes: { input: classes.input1}
                  }}        /> 
                <div className='query-button'>
                    <Button label='filter by quote price' onClick={this.handleClick}/>
                    <Button label="clear" onClick={this.props.onClear}/>
                </div>
              </form>
            </div> 
            );

    }
    else {
        return (
            <div className='query-module'>
                <Button label="View Graph of Quotes" onClick={this.props.onClick}/>
                <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-name"
                  label="Min USD"
                  className={classes.textField}
                  value={this.state.lowerBound}
                  onChange={this.handleChange}
                  margin="normal"
                  variant="outlined"
                  name='lowerBound'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    classes: { input: classes.input1}
                  }}        />
        
                <TextField
                  id="outlined-name"
                  label="Max USD"
                  className={classes.textField}
                  value={this.state.upperBound}
                  onChange={this.handleChange}
                  margin="normal"
                  variant="outlined"
                  name='upperBound'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    classes: { input: classes.input1}
                  }}        /> 
                <div className='query-button'>
                    <Button label='filter by quote price' onClick={this.handleClick}/>
                </div>
              </form>
            </div> 
            );
    }

  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);