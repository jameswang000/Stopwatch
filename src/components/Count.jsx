import { Component } from "react";
import PropTypes from "prop-types";

class Count extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.count}</div>;
  }
}

Count.propTypes = { count: PropTypes.number };

export default Count;
