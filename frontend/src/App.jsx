import React from "react";
import Authentication from "./components/authentication/Authentication";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Authentication />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
