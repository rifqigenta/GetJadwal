import React from "react";
import { Link } from "react-router-dom";

const HeaderLogin = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("email");
    const newState = { page: "/" };
    window.history.replaceState(newState, "Jadwal Kuliah", "/home");
    window.location.replace("/");
  };
  return (
    <>
      <div className='header fixed top-0 left-0 right-0 z-50 bg-[#3A0B48] py-[32px] h-[124px]'>
        <ul className='flex list-none justify-around text-white text-[40px] font-bold'>
          <li>GetJadwal</li>
          <Link to='/'>
            <button onClick={handleLogout} className='flex items-center bg-[#D9019C] text-[20px] font-[700] px-[16px] py-[10px] rounded-[12px]' data-cy='btn-logout'>
              Check out | {sessionStorage.getItem("email")}
            </button>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default HeaderLogin;
