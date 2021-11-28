import * as React from "react";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Landing from './popups/landing';
import Search from './popups/search';
import Result from './popups/result';
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/results" element={<Result />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

export default App;
