import { applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';
import rootReducerFn from './reducers';

const store=createStore(rootReducerFn,applyMiddleware(thunk));

export default store;