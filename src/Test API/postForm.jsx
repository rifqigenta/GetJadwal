import React from "react";

function BuatJadwalKuliah() {
  const [postEmail, setPostEmail] = useState({
    title: "",
    day: "",
  });

  const data = {
    email: postEmail.email,
  };

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://getjadwal.api.devcode.gethired.id/checkin",
    headers: {},
    data: data,
  };

  const handleInput = (event) => {
    const value = event.target.value;
    setPostEmail({ ...postEmail, [event.target.name]: value });
  };

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
          <input className='bg-blue-600' type='text' value={postEmail.title} onChange={handleInput} name='email' />
          <button className='btn'>Submit</button>
        </form>
      </div>
    </>
  );
}

export default BuatJadwalKuliah;
