/* ----- REQUIRED IMPORTS ----- */

import reducer from "./reducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux"
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

/* ---------- */

/* ----- REDUX PERSIST CONFIG ----- */

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

/* ---------- */

/* ----- STORE ----- */

const store = createStore(persistedReducer, applyMiddleware(thunk))

/* ---------- */

export default store