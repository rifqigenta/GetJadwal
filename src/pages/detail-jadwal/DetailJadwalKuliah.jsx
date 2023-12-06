import React from "react";
import HeaderLogin from "../../layout/HeaderLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";

const DetailJadwalKuliah = () => {
  const { title } = useParams();
  // const back = useHistory();

  return (
    <>
      <HeaderLogin />
      <div className='bg-[#F4F4F4] h-[100vh]'>
        <div className='pt-44 mx-52'>
          <div className='flex justify-between'>
            <div className='gap-4'>
              <button>
                <FontAwesomeIcon icon={faChevronLeft} className='me-2' />
              </button>
              <p>{`Detail Jadwal - ${title}`}</p>
            </div>
            <button className='btn w-[251px] h-[54px] py-[15px] px-[24px] bg-[#D9019C] text-white text-[18px] font-[600] rounded-[45px] ' data-cy='btn-create-schedule'>
              <FontAwesomeIcon icon={faPlus} className='me-2' />
              Tambah Mata Kuliah
            </button>
          </div>
          {/* ... (Isi sesuai kebutuhan) */}
        </div>
      </div>
    </>
  );
};

export default DetailJadwalKuliah;
