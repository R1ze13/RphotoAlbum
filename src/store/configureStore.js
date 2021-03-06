import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

export default function configureStore(initialState) {
	const logger = createLogger();
	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(logger, thunk)
	);
	return store;
}
