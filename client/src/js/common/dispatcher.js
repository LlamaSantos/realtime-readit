import { Dispatcher } from 'flux';

var dispatcher = new Dispatcher();

dispatcher.handleAction = (action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

export default dispatcher;
