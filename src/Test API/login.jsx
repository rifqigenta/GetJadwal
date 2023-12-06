import React, { useState, useEffect } from "react";
import axios from "axios";

function Login() {
  const [postEmail, setPostEmail] = useState("");

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://getjadwal.api.devcode.gethired.id/checkin",
    headers: {},
    data: { email: postEmail },
  };

  const handleInput = (event) => {
    setPostEmail(event.target.value);
  };
  const url = "https://getjadwal.api.devcode.gethired.id/checkin";
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(postEmail);
    axios(config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className='px-12 py-12'>
        <form onSubmit={handleSubmit} className='grid w-28'>
          <label htmlFor='email'>Email</label>
          <input className='bg-blue-600' type='email' value={postEmail} onChange={handleInput} name='email' />
          <button className='btn'>Submit</button>
        </form>
      </div>
    </>
  );
}

export default Login;
