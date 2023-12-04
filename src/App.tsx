import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE_CONFIG } from "./constants/routes/config";
import { HomePage, UserPosts } from "./pages";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path={ROUTE_CONFIG.HOME}></Route>
          <Route element={<UserPosts />} path={ROUTE_CONFIG.POSTS}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
