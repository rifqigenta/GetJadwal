import React from "react";
import { useState } from "react";
import Header from "../../layout/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

const CheckIn = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);

    setIsValidEmail(validateEmail(inputEmail));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // Lakukan sesuatu saat tombol disubmit
  // };

  // const [postEmail, setPostEmail] = useState("");

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://getjadwal.api.devcode.gethired.id/checkin",
    headers: {},
    data: { email: email },
  };
  
  const url = "https://getjadwal.api.devcode.gethired.id/checkin";
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(email);
    axios(config)
      .then((response) => {
        sessionStorage.setItem("email", email);
        // navigation.navigate("Home");
        const newState = { page: "/home" };
        window.history.replaceState(newState, "Checkin", "/");
        window.location.replace("/home");
        // window.location.href = "/home";
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Header />
      <div className='bg-[#F4F4F4] h-[100vh]'>
        <div className='flex justify-center'>
          <div className='py-[48px] px-[65px] bg-white w-[491px] mt-44 h-[334px] rounded-[12px] shadow-lg'>
            <div className='flex justify-center'>
              <p className='text-[24px] text-[#100720] font-[600] mb-[40px] leading-[36px]' data-cy='text-login'>
                Check In
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <label className='block'>
                <span className='text-[16px] text-[#100720] mb-[7px] font-medium leading-[24px]'>Email</span>
                <input
                  type='email'
                  name='email'
                  data-cy='input-email'
                  placeholder='Masukkan email anda'
                  value={email}
                  className={`peer bg-[#F4F4F4] border-[#E5E5E5] w-full py-[12px] px-[15px] border rounded-[6px] my-[10px] 
                  focus:border-[#d9019c] focus:outline-none focus:ring-[#d9019c]
                  ${isValidEmail ? "" : "focus:invalid:border-[#Ed4C5C] focus:invalid:ring-[#Ed4C5C]"}`}
                  onChange={handleEmailChange}
                />
                <p className={`${isValidEmail ? "hidden" : ""} hidden peer-invalid:block text-[#Ed4C5C] text-[16px] font-[400] leading-[24px] mb-[7px]`} data-cy='error-email'>
                  <FontAwesomeIcon icon={faCircleExclamation} className='me-2' />
                  Format email tidak sesuai.
                </p>
              </label>
              {/* <Link to='/home'> */}
              <button
                type='submit'
                disabled={!email || !isValidEmail}
                className='disabled:opacity-[20%] bg-[#D9019C] w-full h-[48px] rounded-[47px] text-white text-[16px] leading-[24px] font-[700] mt-[10px]'
                data-cy='btn-login'
              >
                Mulai Sesi
              </button>
              {/* </Link> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckIn;
