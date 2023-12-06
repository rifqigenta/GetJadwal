import React from "react";
import { useState, useEffect } from "react";
import HeaderLogin from "../../layout/HeaderLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { Link } from "react-router-dom";
import axios from "axios";

const JadwalKuliah = () => {
  const [modal, setModal] = useState(false);

  const users = sessionStorage.getItem("email");
  // const users = sessionStorage.getItem("email");
  // const day = sessionStorage.getItem("data");
  const [matkul, setMatkul] = useState("");
  const [hari, setHari] = useState("");
  const [allJadwal, setAllJadwal] = useState([]);
  const [detailJadwal, setDetailJadwal] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };
  const options = [
    { value: "", label: "" },
    { value: "monday", label: "Senin" },
    { value: "tuesday", label: "Selasa" },
    { value: "wednesday", label: "Rabu" },
    { value: "thursday", label: "Kamis" },
    { value: "friday", label: "Jumat" },
  ];

  const data = {
    title: matkul,
    day: hari,
  };

  const configPost = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://getjadwal.api.devcode.gethired.id/schedule?email=${users}`,
    headers: {},
    data: data,
  };

  const handleMatkul = (event) => {
    const value = event.target.value;
    // setJadwal({ ...jadwal, [name]: value });
    // console.log(jadwal);
    setMatkul(value);
  };
  const handleHari = (event) => {
    const value = event.target.value;
    // setJadwal({ ...jadwal, [name]: value });
    // console.log(jadwal);
    setHari(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    axios(configPost)
      .then((res) => {
        getJadwal(res.data.data);
        toggleModal();
      })
      .catch((err) => console.log(err));
    setAllJadwal(data);
  };

  const postData = () => {};

  const getJadwal = () => {
    const configGetAllData = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://getjadwal.api.devcode.gethired.id/schedule?email=${users}`,
      headers: {},
      // data: data,
    };

    axios(configGetAllData).then((res) => {
      console.log("Data baru berhasil ditambahkan :", res.data);
      setAllJadwal(res.data);
    });
  };

  const getDetailJadwal = (day) => {
    const configGetDetailJadwal = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://getjadwal.api.devcode.gethired.id/schedule?email=${users}&day=${day}`,
      headers: {},
    };
    axios(configGetDetailJadwal)
      .then((res) => {
        console.log("Detail Jadwal for", day, ":", res.data);
        setDetailJadwal((prevDetail) => ({
          ...prevDetail,
          [day]: res.data.data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching detail jadwal:", error);
      });
  };
  useEffect(() => {
    getJadwal();
  }, []);
  return (
    <>
      <HeaderLogin />
      <div className='bg-[#F4F4F4] h-[100vh]'>
        <div className='pt-44 mx-52'>
          <div className='flex justify-end'>
            <button className='btn w-[251px] h-[54px] py-[15px] px-[24px] bg-[#D9019C] text-white text-[18px] font-[600] rounded-[45px] ' data-cy='btn-create-schedule' onClick={toggleModal}>
              <FontAwesomeIcon icon={faPlus} className='me-2' />
              Buat Jadwal Kuliah
            </button>
          </div>
          {allJadwal && (
            <div key={[data]} className='flex justify-evenly gap-[16px] mt-14'>
              <Link to='/detail-jadwal-kuliah'>
                <div className='card'>
                  <div className='card-title bg-white w-[187px] h-[103px] rounded-[12px] p-[10px] drop-shadow-[0_6px_10px_rgba(0,0,0,0.1)]' data-cy='card-day'>
                    <div className='card-title-content grid gap-y-[6px] py-[10px] px-[12px]'>
                      <p className='text-[24px] text-[#100720] font-[600] leading-[36px]' data-cy='card-title-Senin'>
                        Senin
                      </p>
                      <p className='text-[12px] font-[400] leading-[18px] text-[#BBBBBB]' data-cy='card-desc-Senin'>
                        {/* {allJadwal.monday} Belum Ada Mata Kuliah */}
                        {allJadwal.length == null ? `Belum Ada Mata Kuliah` : `${allJadwal.monday} Mata Kuliah`}
                      </p>
                    </div>
                  </div>
                  <div className='card-content bg-white w-[187px] p-[10px] rounded-[12px] mt-7'>
                    <div className='grid gap-y-[10px]'>
                      {detailJadwal &&
                        detailJadwal.map((jadwal, i) => (
                          <div key={i} className='bg-[#F8F8F8] rounded-[12px] p-[16px]'>
                            <p className='text-[#100720] text-[16px] leading-[24px]' data-cy={`card-content-${day}-${i}`}>
                              {jadwal.title}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </Link>
              <div className='card'>
                <div className='card-title-content bg-white w-[187px] h-[103px] rounded-[12px] p-[10px] drop-shadow-[0_6px_10px_rgba(0,0,0,0.1)]' data-cy='card-day'>
                  <div className='card-title grid gap-y-[6px] py-[10px] px-[12px]'>
                    <p className='text-[24px] text-[#100720] font-[600] leading-[36px]' data-cy='card-title-Selasa'>
                      Selasa
                    </p>
                    <p className='text-[12px] font-[400] leading-[18px] text-[#BBBBBB]' data-cy='card-desc-Selasa'>
                      {/* Belum Ada Mata Kuliah */}
                      {allJadwal.length == null ? `Belum Ada Mata Kuliah` : `${allJadwal.tuesday} Mata Kuliah`}
                    </p>
                  </div>
                </div>
                <div className='card-content bg-white w-[187px] p-[10px] rounded-[12px] mt-7'>
                  <div className='grid gap-y-[10px]'>
                    {detailJadwal &&
                      detailJadwal.map((day, i) => (
                        <div key={i} className='bg-[#F8F8F8] rounded-[12px] p-[16px]'>
                          <p className='text-[#100720] text-[16px] leading-[24px]'>
                            {day.title}
                            {/* {day.length == null ? `Belum Ada Mata Kuliah` : `${day.title} Mata Kuliah`} */}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className='card'>
                <div className='card-title-content bg-white w-[187px] h-[103px] rounded-[12px] p-[10px] drop-shadow-[0_6px_10px_rgba(0,0,0,0.1)]' data-cy='card-day'>
                  <div className='card-title grid gap-y-[6px] py-[10px] px-[12px]'>
                    <p className='text-[24px] text-[#100720] font-[600] leading-[36px]' data-cy='card-title-Rabu'>
                      Rabu
                    </p>
                    <p className='text-[12px] font-[400] leading-[18px] text-[#BBBBBB]' data-cy='card-desc-Rabu'>
                      {/* Belum Ada Mata Kuliah */}
                      {allJadwal.length == null ? `Belum Ada Mata Kuliah` : `${allJadwal.wednesday} Mata Kuliah`}
                    </p>
                  </div>
                </div>
                <div className='card-content bg-white w-[187px] p-[10px] rounded-[12px] mt-7'>
                  <div className='grid gap-y-[10px]'>
                    <div className='bg-[#F8F8F8] rounded-[12px] p-[16px]'>
                      <p className='text-[#100720] text-[16px] leading-[24px]'>TESTING</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card'>
                <div className='card-title-content bg-white w-[187px] h-[103px] rounded-[12px] p-[10px] drop-shadow-[0_6px_10px_rgba(0,0,0,0.1)]' data-cy='card-day'>
                  <div className='card-title grid gap-y-[6px] py-[10px] px-[12px]'>
                    <p className='text-[24px] text-[#100720] font-[600] leading-[36px]' data-cy='card-title-Kamis'>
                      Kamis
                    </p>
                    <p className='text-[12px] font-[400] leading-[18px] text-[#BBBBBB]' data-cy='card-desc-Kamis'>
                      {/* Belum Ada Mata Kuliah */}
                      {allJadwal.length == null ? `Belum Ada Mata Kuliah` : `${allJadwal.thursday} Mata Kuliah`}
                    </p>
                  </div>
                </div>
                <div className='card-content bg-white w-[187px] p-[10px] rounded-[12px] mt-7'>
                  <div className='grid gap-y-[10px]'>
                    <div className='bg-[#F8F8F8] rounded-[12px] p-[16px]'>
                      <p className='text-[#100720] text-[16px] leading-[24px]'>TESTING</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card'>
                <div className='card-title-content bg-white w-[187px] h-[103px] rounded-[12px] p-[10px] drop-shadow-[0_6px_10px_rgba(0,0,0,0.1)]' data-cy='card-day'>
                  <div className='card-title grid gap-y-[6px] py-[10px] px-[12px]'>
                    <p className='text-[24px] text-[#100720] font-[600] leading-[36px]' data-cy='card-title-Jumat'>
                      Jumat
                    </p>
                    <p className='text-[12px] font-[400] leading-[18px] text-[#BBBBBB]' data-cy='card-desc-Jumat'>
                      {/* Belum Ada Mata Kuliah */}
                      {allJadwal.length == null ? `Belum Ada Mata Kuliah` : `${allJadwal.friday} Mata Kuliah`}
                    </p>
                  </div>
                </div>
                <div className='card-content bg-white w-[187px] p-[10px] rounded-[12px] mt-7'>
                  <div className='grid gap-y-[10px]'>
                    <div className='bg-[#F8F8F8] rounded-[12px] p-[16px]'>
                      <p className='text-[#100720] text-[16px] leading-[24px]'>TESTING</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Start Modal */}
        {modal && (
          <div className='modals'>
            <div className='overlay'></div>
            <div className='modal w-[830px] h-[411px] bg-white rounded-[12px]' data-cy='form-add'>
              <div className='flex justify-between items-center modal-title py-[24px] px-[42px]'>
                <p className='text-[20px] font-[600] leading-[30px] text-[#100720]'>Buat Jadwal Kuliah</p>
                <button onClick={toggleModal} data-cy='close-modal'>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <hr className='border-[#E5E5E5]' />
              <div className='modal-content px-[42px] py-8'>
                <form onSubmit={handleSubmit} className='grid'>
                  <label htmlFor='mata-kuliah' className='text-[16px] text-[#100720] font-[500] mb-[10px]'>
                    Mata Kuliah
                  </label>
                  <input
                    type='text'
                    name='mata-kuliah'
                    id='mata-kuliah'
                    onChange={handleMatkul}
                    value={matkul}
                    placeholder='Masukkan Mata Kuliah'
                    className='py-[12px] px-[15px] border border-[#E5E5E5] rounded-[6px] focus:border-[#E5E5E5] focus:outline-none mb-[23px]'
                    data-cy='form-matkul'
                  />
                  <label htmlFor='pilih-hari' className='text-[16px] text-[#100720] font-[500] mb-[10px]'>
                    Pilih Hari
                  </label>
                  {/* <Select options={options} /> */}
                  <select
                    name='pilih-hari'
                    id='pilih-hari'
                    value={hari}
                    onChange={handleHari}
                    className='py-[12px] px-[15px] border border-[#E5E5E5] rounded-[6px] focus:border-[#E5E5E5] focus:outline-none '
                    data-cy='form-day'
                  >
                    <option value='' disabled defaultValue={""} hidden>
                      <p className='text-[#A4A4A4]'>Pilih Hari</p>
                    </option>
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                    {/* <option className='py-[12px] px-[15px] border border-[#E5E5E5] rounded-[6px] focus:border-[#E5E5E5] focus:outline-none ' value='senin'>
                        Senin
                      </option>
                      <option className='py-[12px] px-[15px] border border-[#E5E5E5] rounded-[6px] focus:border-[#E5E5E5] focus:outline-none ' value='selasa'>
                        Selasa
                      </option>
                      <option className='py-[12px] px-[15px] border border-[#E5E5E5] rounded-[6px] focus:border-[#E5E5E5] focus:outline-none ' value='rabu'>
                        Rabu
                      </option>
                      <option className='py-[12px] px-[15px] border border-[#E5E5E5] rounded-[6px] focus:border-[#E5E5E5] focus:outline-none ' value='kamis'>
                        Kamis
                      </option>
                      <option className='py-[12px] px-[15px] border border-[#E5E5E5] rounded-[6px] focus:border-[#E5E5E5] focus:outline-none ' value='jumat'>
                        Jumat
                      </option> */}
                  </select>
                  <hr className='border-[#E5E5E5]' />
                  <div className='flex justify-end px-[42px]'>
                    <button
                      type='submit'
                      className='disabled:opacity-[20%] bg-[#D9019C] w-[120px] h-[54px] rounded-[45px] text-white py-[15px] px-[24px] text-[18px] leading-[27px] font-[600] mt-[12px]'
                      data-cy='btn-submit'
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
  // });
};

export default JadwalKuliah;
