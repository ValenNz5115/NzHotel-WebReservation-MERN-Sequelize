import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { logo } from "../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Form = () => {
  let [name, setName] = useState([]);
  let [email, setEmail] = useState([]);
  let [password, setPassword] = useState([]);
  let [showPassword, setShowPassword] = useState(false); // State untuk menampilkan/menyembunyikan password
  let [saveImage, setSaveImage] = useState([]);
  let navigate = useNavigate();

  function handleUploadChange(e) {
    console.log(e.target.files[0]);
    let uploaded = e.target.files[0];
    setSaveImage(uploaded);
  }

  function AddData(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append("nama", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("foto", saveImage);

    let url = "http://localhost:8000/customer";

    if (window.confirm("Selesai Menambahkan Data Baru?")) {
      axios
        .post(url, formData, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          // getMember()
          console.log(response.data);
          //   clear()
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className="flex flex-col p-10">
      <div className="w-[550px]">
      <div className="flex flex-col items-center justify-center">
        <img className="h-[160px]" src={logo} alt="" />
      </div>
        <div className="flex flex-col mt-2">
          <h1 className="text-4xl font-bold primary-text text-center">Selamat Datang!</h1>
          <p className="text-base text-gray mt-4 text-center mb-2">
            Buat Akun untuk mengakses fitur yang telah tersedia pada website
            kami!
          </p>
        </div>

        <form onSubmit={AddData} className="flex flex-col mt-5 ">
          <div className="mt-6">
            <label htmlFor="email">Nama</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              name="email"
              placeholder="Masukkan Email"
              className="mt-1 p-4 stroke-form w-full"
              required
            />
          </div>
          <div className="mt-6">
            <label htmlFor="email">Alamat Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              name="email"
              placeholder="Masukkan Email"
              className="mt-1 p-4 stroke-form w-full"
              required
            />
          </div>
          <div className="mt-6">
            <label htmlFor="pass">Password</label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"} // Tampilkan atau sembunyikan password
                name="pass"
                placeholder="Masukkan Password"
                className="mt-1 p-4 stroke-form w-full"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword saat tombol ditekan
                className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />{" "}
                {/* Menggunakan ikon Font Awesome */}
              </button>
            </div>
          </div>
          <input
            onChange={handleUploadChange}
            name="file"
            className="bg-form p-4 border-r-[16px] border-r-[#f6f6f6] mt-6"
            type="file"
            multiple
          />
          <form action="" className="mt-6">
            {/* <p className='ml-2 text-gray'>Belum Memiliki Akun?<Link className='primary-text font-medium'to="" > Registrasi</Link></p> */}
            {/* <input type="checkbox" name='ingat'/>
                    <label htmlFor="ingat" className='ml-2 text-gray'>Ingat Akun?</label> */}
          </form>
          <button
            type="submit"
            className="w-full h-[48px] sm:flex justify-center items-center text-white primary-bg rounded-lg hidden mt-5"
          >
            Buat Akun
          </button>
          <p className="text-gray mt-6">
            Sudah memiliki akun?{" "}
            <Link className="primary-text font-medium" to="/login">
              Masuk
            </Link>{" "}
          </p>
        </form>

        <p className="text-gray text-center mt-4">© Nebula Zing2023 - All Rights Reserved </p>
      </div>
    </div>
  );
};

export default Form;
