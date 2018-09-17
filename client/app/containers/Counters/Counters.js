import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Redux Actions
import { selectCounter, getCounters } from '../../actions/CounterActions';
// Technically, you can just add selectCounter to the onClick
// action of the list of counters. However, it's not using
// Redux in that case. To do it, properly you need to use
// connect.

class Counters extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div>
        <h1>Counters</h1>
        {
          (this.props.counters) ? (
            (this.props.counters).map(counter => {
              return (
                <li
                  key={Math.random()}
                  onClick={() => this.props.selectCounter(counter)}
                >
                  {counter._id}
                </li>
              )
            })
          ) : (null)
        }
        {
          (this.props.selectedCounter) ? (
            <div>
              <p>
                Current Count for {this.props.selectedCounter._id}
                 is {this.props.selectedCounter.count}.
              </p>
            </div>
          ) : (null)
        }
      </div>
    );
  }
}

// Takes the application store (main data) and passes into
// your container as a prop. It can pass any aspect of the
// store. So we want counters, so state.counters. We can
// now reference this.props.counters to grab counters in
// store.
function mapStateToProps(state) {
  return {
    counters: state.counters,
    selectedCounter: state.selectedCounter,
  };
};

// Passing the selectCounter action in as a prop.
// Dispatch is a way saying call a function.
function mapDispatchToProps(dispatch) {
  // Connect this function creator to prop.
  // return bindActionCreators({
  //   selectCounter: selectCounter,
  //   getCounters: getCounters,
  // }, dispatch);
  return {
    selectCounter: (counter) => {
      dispatch(selectCounter(counter));
    },
    getCounters: dispatch(getCounters())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counters);
