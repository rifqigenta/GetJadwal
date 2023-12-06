import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className='header fixed top-0 left-0 right-0 z-50 bg-[#3A0B48] py-[32px] h-[124px]'>
        <ul className='flex list-none justify-around text-white text-[40px] font-bold'>
          <li>GetJadwal</li>
        </ul>
      </div>
    </>
  );
};

export default Header;
