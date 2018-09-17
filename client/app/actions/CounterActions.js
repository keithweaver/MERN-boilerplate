import axios from 'axios';
// This is the action creator. It's made up
// of two parts. The function is the creator
// of the action and the return attribute is
// the actual action.
export function selectCounter(counter) {
  return {
    // type of action occurred
    type: 'COUNTER_SELECT',
    payload: counter,
  };
};

export function getCounters() {
  return {
    type: 'COUNTER_LOADED',
    payload: new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get('/api/counters').then(response => {
          const { data } = response;
          resolve(data);
        });
      }, 2000);
    })
  };
}
