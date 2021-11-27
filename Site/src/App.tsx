import * as React from "react";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './reducers/store';
import Landing from './popups/landing';
import Result from './popups/result';
import Search from './popups/search';
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/result/:url" element={<Result />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

export default App;
