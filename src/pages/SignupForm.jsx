import React, { useState, useEffect } from "react";
import logo from "../assets/Logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import swal from "sweetalert2";


const SignUpForm = () => {
  const navigate= useNavigate();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const[values , setValues] = useState({name:'',email:'',password:'', country:'', city:'', university:'', education:''});

  useEffect(() => {
    // Fetch countries data from API
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data));

    // Fetch cities data from API
    fetch("https://countriesnow.space/api/v0.1/countries/population/cities")
      .then((response) => response.json())
      .then((data) => setCities(data.data));
  }, []);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedCity("");
  };

  const handleSubmit = async (e) =>  {
    //setValues({...values, role: 'user'});
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            name: values.name,
            email: values.email,
            password: values.password,
            country: selectedCountry,
            city: selectedCity,
            university: values.university,
            education: values.education,
          

          }
        )
      });
      const data = await response.json();
      if(response.ok && data.success){
        swal.fire({
          title: "Success",
          text: "Account created successfully, Please Login",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#6366f1",
        });
        navigate('/login');
      }
      else{
      
        swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#6366f1",
        });
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" bg-indigo-800">
        <Link to='/'>
          <div className="group hover:underline flex ml-5 p-3 text-sm text-white">
            <span className="mt-1 mr-1"><FaArrowLeft /></span> Back
          </div>
        </Link>
        <section className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-center">
              <Link to="/">
                <img src={logo} alt="Sample" className="w-40 h-auto mb-5" />
              </Link>
            </div>


            <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
              {/*  Name */}
              <div className="relative mb-3">
                <input
                required
                value={values.name}
                onChange={e => setValues({...values, name: e.target.value})}
                  type="name"
                  className="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem]  focus:outline-none peer-focus:text-primary "
                  id="floatingInput"
                  placeholder="" />
                <label
                  htmFor="floatingInput"
                  className="pointer-events-none absolute left-0 -top-2 origin-[0_0] border border-solid border-transparent px-3 py-4  text-gray-400 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none"
                >Full Name <span className=" text-red-500 ml-[0.15rem]">*</span>
                </label>
              </div>


              {/* Email */}
              <div className="relative mb-3">
                <input
                required
                  value={values.email}
                  onChange={e => setValues({...values, email: e.target.value})}
                  type="email"
                  className="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem]  focus:outline-none peer-focus:text-primary "
                  id="floatingInput"
                  placeholder="name@example.com" />
                <label
                  htmFor="floatingInput"
                  className="pointer-events-none absolute left-0 -top-2 origin-[0_0] border border-solid border-transparent px-3 py-4  text-gray-400 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none"
                >Email address <span className=" text-red-500 ml-[0.15rem]">*</span>
                </label>
              </div>

              {/* Password */}
              <div className="relative mb-3">
                <input
                required
                  value={values.password}
                  onChange={e => setValues({...values, password: e.target.value})}
                  type="password"
                  className="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem]  focus:outline-none peer-focus:text-primary "
                  id="floatingInput"
                  placeholder="name@example.com" />
                <label
                  htmFor="floatingInput"
                  className="pointer-events-none absolute left-0 -top-2 origin-[0_0] border border-solid border-transparent px-3 py-4  text-gray-400 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none"
                >Password <span className=" text-red-500 ml-[0.15rem]">*</span>
                </label>
              </div>

              {/* Country */}
              <div className="relative mb-3 ">
                <label
                  htmFor="floatingInput"
                  className=" left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4  text-gray-400 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none"
                >Country <span className=" text-red-500 ml-[0.15rem]">*</span>
                </label>
                <select
                required
                  id="country"
                  className="w-full p-2 rounded border border-solid border-neutral-500"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                ><span className=" text-red-500 ml-[0.15rem]">*</span>
                  <option value="">Select Country</option> 
                  {countries &&
                    countries.map((country) => (
                      <option key={country.name.common} value={country.name.common}>
                        {country.name.common}
                      </option>
                    ))}
                </select>


              </div>

              {/* City */}
              <div className="relative mb-3 ">
                <label
                  htmFor="floatingInput"
                  className=" left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4  text-gray-400 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none"
                >City
                </label>
                <select
                required
                  id="city"
                  className="w-full p-2 rounded border border-solid border-neutral-500"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedCountry}
                ><span className=" text-red-500 ml-[0.15rem]">*</span>
                  <option value="">Select City</option>
                  {cities &&
                    cities.map((city) => (
                      <option key={city.city} value={city.city}>
                        {city.city}
                      </option>
                    ))}
                </select>
              </div>

              {/* University Name */}
              <div className="relative mb-3">
                <input
                required
                  value={values.university}
                  onChange={e => setValues({...values, university: e.target.value})}
                  type="text"
                  className="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem]  focus:outline-none peer-focus:text-primary "
                  id="floatingInput"
                  placeholder="name@example.com" />
                <label
                  htmFor="floatingInput"
                  className="pointer-events-none absolute left-0 -top-2 origin-[0_0] border border-solid border-transparent px-3 py-4  text-gray-400 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none"
                >University<span className=" text-red-500 ml-[0.15rem]">*</span>
                </label>
              </div>

              {/* Education Level */}
              <div className="relative mb-3">
                <input
                required
                  value={values.education}
                  onChange={e => setValues({...values, education: e.target.value})}
                  type="text"
                  className="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem]  focus:outline-none peer-focus:text-primary "
                  id="floatingInput"
                  placeholder="name@example.com" />
                <label
                  htmFor="floatingInput"
                  className="pointer-events-none absolute left-0 -top-2 origin-[0_0] border border-solid border-transparent px-3 py-4  text-gray-400 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none"
                >Education Level <span className=" text-red-500 ml-[0.15rem]">*</span>
                </label>
              </div>

         

              <div className="">
                <button
                
                  type="submit"
                  className="button-primary w-full py-3 text-white font-semibold rounded-lg shadow-lg bg-indigo-800 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                  Sign up
                </button>
              </div>
            </form>
            <p className="mt-8 text-sm text-neutral-700 ">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 underline underline-offset-8 font-medium">
                Login
              </Link>
            </p>
          </div>
        </section>
      </div>


    </>
  );
};

export default SignUpForm;
