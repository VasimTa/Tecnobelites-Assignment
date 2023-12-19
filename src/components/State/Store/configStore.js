import { createStore, combineReducers } from "redux";
import { AddReducer } from "../Reducer/AddReducer";


export const configStore = () => {
  const store = createStore(
    combineReducers({AddReducer}),
    window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
     