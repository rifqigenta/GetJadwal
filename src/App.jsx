import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CheckIn from "./pages/check-in/CheckIn";
import JadwalKuliah from "./pages/jadwal/JadwalKuliah";
import DetailJadwalKuliah from "./pages/detail-jadwal/DetailJadwalKuliah";
import Login from "./Test API/login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<CheckIn />} />
          <Route path='/home' element={<JadwalKuliah />} />
          <Route path='/detail-jadwal-kuliah' element={<DetailJadwalKuliah />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
