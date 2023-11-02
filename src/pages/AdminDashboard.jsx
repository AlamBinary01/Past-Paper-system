import React, { useState, useEffect } from 'react';
import '../App.css';
import { FaChartLine, FaPlus } from 'react-icons/fa';
import PaperModal from '../components/AddPapersModal';
import ViewPastPapers from '../components/ViewPapersModal';
import { usePastPaperContext } from './PastPaperContext';


const App = () => {

  const [isClicked, setIsClicked] = useState(false);
  const [uniCount, setUniCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [paperCount, setPaperCount] = useState(0);

  const pastPapers = usePastPaperContext();


  const handleClick = () => {
    setIsClicked(!isClicked);
  }

  async function getPastPaperCount() {
    try {
      const response = await fetch("http://localhost:5000/api/getpastpapercount", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setPaperCount(data.pastpapersCount);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }


  async function getUsersCount() {
    try {
      const response = await fetch("http://localhost:5000/api/getuserscount", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setUserCount(data.usersCount);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUniversities() {
    try {
      const response = await fetch("http://localhost:5000/api/getuniversityCount", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setUniCount(data.universityCount);

    } catch (error) {
      console.log(error);

    }
  }
  async function getCoursesCount() {
    try {
      const response = await fetch("http://localhost:5000/api/getcoursescount", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setCourseCount(data.coursesCount);
      console.log(courseCount)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCoursesCount();
    getUniversities();
    getUsersCount();
    getPastPaperCount();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniCount, courseCount, userCount, paperCount]);


  const uniqueCourses = Array.from(new Set(pastPapers.map(paper => paper.course_name)));
  const uniqueUniversities = Array.from(new Set(pastPapers.map(paper => paper.university_name)));

  return (
    <>
      <div className='bg-indigo-800 min-h-screen flex sm:flex-col flex-col-reverse items-center justify-center space-y-5'>
        <div className=" text-white">
          <button onClick={handleClick} className='group flex text-xl btn w-72 justify-between'>
            {isClicked ?
              (<>
                {"Show Stats"} <span className='ml-1 mt-1'><FaChartLine className="group-hover:animate-pulse" /></span>
              </>) :
              (<>
                {"Add Data"} <span className='ml-1 mt-1'><FaPlus className="group-hover:animate-pulse" /></span>
              </>)
            }
          </button>
        </div>

        <div className="  w-fit flex flex-col items-center">

          <h1 className="-mb-3 md:-mb-5  text-indigo-500 text-3xl md:text-5xl lg:text-[4.9rem] font-extrabold ">
            Admin Dashboard
          </h1>

          <div className="shadow-xl bg-indigo-300 rounded-3xl p-6 sm:p-8 mb-5 w-full ">
            {/* Stats  */}
            <div className={`${isClicked ? 'hidden' : 'block'}`} >
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 ml-1">Stats</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div className="p-4 bg-indigo-100 rounded-xl hover:shadow-lg">
                  <div className="font-bold text-xl md:text-2xl leading-none">
                    {
                      uniqueCourses.length
                    }
                    </div>
                  <div className="mt-1 md:mt-2">Courses</div>
                </div>
                <div className="p-4 bg-indigo-100 rounded-xl hover:shadow-lg">
                  <div className="font-bold text-xl md:text-2xl leading-none">
                    {
                      uniqueUniversities.length
                    }
                    </div>
                  <div className="mt-1 md:mt-2">Universities</div>
                </div>
                <div className="p-4 bg-indigo-100 rounded-xl hover:shadow-lg">
                  <div className="font-bold text-xl md:text-2xl leading-none ">
                    {
                      userCount
                    }</div>
                  <div className="mt-1 md:mt-2">Users Signed Up</div>
                </div>
                <div className="p-4 bg-indigo-100 rounded-xl  hover:shadow-lg">
                  <div className="font-bold text-xl md:text-2xl leading-none">
                    {
                      pastPapers.length

                  }</div>
                  <div className="mt-1 md:mt-2">Past papers available</div>
                </div>
              </div>
            </div>

            {/* Add files */}
            <div className={`${isClicked ? 'block' : 'hidden'}`} >
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 ml-1">Add Data</h2>
              <div className="grid grid-cols-1  gap-4 md:gap-5 md:text-2xl text-xl font-medium ">

                <PaperModal />
                <ViewPastPapers />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default App;
