import React, { useEffect, useState } from 'react';
import CoursesCards from '../components/CoursesCards';
import PapersCard from '../components/PapersCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { disableCtrlKey } from './utils';

import { usePastPaperContext } from './PastPaperContext';

const MainPage = () => {
    useEffect(() => {
        disableCtrlKey();
    }, []);

    const pastPapers = usePastPaperContext();
    const [search, setSearch] = useState('');
    const [selectedUniversity, setSelectedUniversity] = useState('default');
    const [selectedYear, setSelectedYear] = useState('default');
    const [selectedPaperType, setSelectedPaperType] = useState('default');
    const [selectedCourse, setSelectedCourse] = useState('');

    useEffect(() => {
        
    }, [pastPapers]);      // eslint-disable-line react-hooks/exhaustive-deps
  
    return (
        <>
            <div className=' bg-gradient-to-t from-indigo-200 to-indigo-100'>
                <Navbar />
                <div className='m-5'>
                    {/* filters */}
                    <div className='grid md:grid-cols-4 grid-cols-3 gap-3  mb-5'>
                        <div className='   '>
                            <button 
                            onClick={() => {
                                setSelectedUniversity('default');
                                setSelectedYear('default');
                                setSelectedPaperType('default');
                                setSelectedCourse('');
                            }}
                            className='border border-indigo-300 hover:bg-indigo-100 text-[15px] rounded-lg p-1.5'>
                                Reset Filters
                            </button>
                        </div>
                        <div className=' col-span-2 md:col-span-1'>

                            <select

                                onChange={(e) => setSelectedUniversity(e.target.value)}
                                name=""
                                id=""
                                className="bg-transparent border border-gray-500 hover:bg-indigo-50 text-sm rounded-lg p-2.5"
                            >
                                <option value="default" selected className="font-extralight">
                                    Select University
                                </option>
                                {Array.from(new Set(pastPapers.map((paper) => paper.university_name))).map(
                                    (universityName, index) => (
                                        <option key={index} value={universityName}>
                                            {universityName}
                                        </option>
                                    )
                                )}
                            </select>

                        </div>
                        <div className=''>

                            <select
                                onChange={(e) => setSelectedYear(e.target.value)}
                                name="" id="" className=" bg-transparent border border-gray-500 hover:bg-indigo-50 text-sm rounded-lg p-2.5">
                                <option value="default" selected className='font-extralight'>Year </option>
                                {

                                    Array.from(new Set(pastPapers.map((paper) => paper.year))).map((year, index) => {
                                        const Year_ = new Date(year).getFullYear();
                                        return <option key={index} value={Year_}>{Year_}</option>
                                    }
                                    )

                                }
                            </select>
                        </div>
                        <div className=''>

                            <select
                                onChange={(e) => setSelectedPaperType(e.target.value)}
                                name="" id="" className="bg-transparent border hover:bg-indigo-50 border-gray-500  text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5">
                                <option value="default" selected className='font-extralight'>
                                    Paper type
                                </option>
                                {
                                    Array.from(new Set(pastPapers.map((paper) => paper.p_type))).map((p_type, index) => {
                                        return <option key={index} value={p_type}>{p_type}</option>
                                    }
                                    )

                                }
                            </select>

                        </div>
                    </div>
                    <div className='-ml-4 md:-ml-0 flex lg:flex-row flex-col space-x-5'>
                        {/* Courses   */}
                        <div className=''>
                            <div className='flex items-center '>
                                {/* Course Search Bar */}
                                <div className="ml-5 md:ml-2 mt-2 flex space-x-1">
                                    <input
                                        onChange={(e) => setSearch(e.target.value)}
                                        type="search"
                                        className=" relative block flex-auto w-52 rounded-full border border-solid border-gray-500 bg-transparent bg-clip-padding px-3 py-[0.22rem] text-sm leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                                        placeholder="Search Course"
                                    />
                                    

                                </div>

                            </div>
                            <div className='container mt-5 ml-5 md:ml-0 grid lg:space-x-5 '>

                                <div className='course overflow-y-auto overflow-x-auto w-80 h-screen md:px-2'>
                                    {

                                        [0].map((item, index) => {
                                            return <CoursesCards key={index}
                                                setSelectedCourse={setSelectedCourse}
                                                search={search}
                                                 />
                                        }
                                        )
                                    }



                                </div>

                            </div>
                        </div>
                        {/* Papers */}
                        <div className='papers mt-5 overflow-auto grid grid-col-1 sm:grid-cols-2 gap-4 sm:gap-8 '>
                            {

                                [0].map((item, index) => {
                                    return <PapersCard key={index}
                                        selectedUniversity={selectedUniversity}
                                        selectedYear={selectedYear}
                                        selectedPaperType={selectedPaperType}
                                        selectedCourse={selectedCourse}
                                      

                                        
                                    />

                                }
                                )
                                
                            }
                        </div>

                    </div>
                    
                </div>
                <Footer />
            </div>

        </>
    );
};

export default MainPage;
