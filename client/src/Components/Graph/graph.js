import React from 'react';
import { Bar } from 'react-chartjs-2';


export default class Graph extends React.Component {

  render() {
    return (
      <div>
        <Bar
          data={this.props.data}
        />
      </div>
    );
  }
};