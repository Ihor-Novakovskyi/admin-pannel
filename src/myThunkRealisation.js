export default function thunk(store) { 
    const { getState } = store;
    return function next(next) { 
        return function dispatchWrapper(action) { 
            if (typeof action === 'function') { 
                return action(dispatchWrapper, getState)
            }
           return next(action)
        }
    }
}