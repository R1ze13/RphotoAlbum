export const ping = store => next => action => {
	console.log(`type of action: ${action.type} with payload: ${action.payload}`);
	return next(action);
}
