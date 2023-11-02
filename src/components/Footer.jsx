import React from 'react';
import { FaDiscord, FaTwitter, FaGithub, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";

const Footer = () => {
  const url = process.env.REACT_APP_WEBSITE_URL;
  return (
    <footer className="bg-indigo-800 mt-10">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to='/'>
              <img src={logo} className="h-12 mr-3" alt="Logo" />
            </Link>

          </div>
          <div className="flex text-white mt-4 space-x-5 sm:justify-center sm:mt-0">
            <a href="facebook.com" target='_blank' rel='noreferrer' className="  hover:text-blue-500 duration-300">
              <FaFacebook className="w-8 h-8" />
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="https://www.discord.com" target='_blank' rel='noreferrer' className=" hover:text-purple-500 duration-300 ">
              <FaDiscord className="w-8 h-8" />
              <span className="sr-only">Discord community</span>
            </a>
            <a href="https://www.twitter.com" target='_blank' rel='noreferrer' className=" hover:text-blue-300 duration-300 ">
              <FaTwitter className="w-8 h-8" />
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="https://www.github.com" target='_blank' rel='noreferrer' className=" hover:text-black duration-300" >
              <FaGithub className="w-8 h-8" />
              <span className="sr-only">GitHub account</span>
            </a>
            <a href="https://www.linkedin.com" target='_blank' rel='noreferrer' className=" hover:text-blue-500 duration-300">
              <FaLinkedin className="w-8 h-8" />
              <span className="sr-only">LinkedIn account</span>
            </a>
            <a href="https://www.instagram.com" target='_blank' rel='noreferrer' className=" hover:text-pink-500 duration-300">
              <FaInstagram className="w-8 h-8" />
              <span className="sr-only">Instagram account</span>
            </a>
          </div>

        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto d lg:my-8" />
        <div className=" text-gray-300 flex items-center justify-center">
          <Link to={'/terms-and-condition'} className="hover:underline">Terms</Link>
          <Link to={'/privacy-policy'} className="mx-4 hover:underline">Privacy</Link>
          <span className="text-sm ">© 2023 <Link to="/" className="hover:underline">PaperSource™</Link>. All Rights Reserved. 
          <a href={url} target='_blank' rel='noreferrer' className=' ml-1 font-bold hover:italic hover:underline'>FastDev</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
