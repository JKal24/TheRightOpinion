import * as React from "react";
import Landing from './popups/landing';
import Result from './popups/result';
import Search from './popups/search';
import "./App.css";
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/result/:url" element={<Result />} />
        </Routes>
      </MemoryRouter>
    </div>
  );
};

export default App;
