import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import appReducers from "./redux/reducers";
import allSaga from "./redux/sagas";
import "@ant-design/v5-patch-for-react-19";
import "./index.css";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: appReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(allSaga);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
