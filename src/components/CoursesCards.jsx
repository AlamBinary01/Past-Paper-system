
import React from 'react';
import { usePastPaperContext } from '../pages/PastPaperContext';
export default function CoursesCards(props) {
   
    const pastPapers = usePastPaperContext();
    const uniqueCourses = Array.from(new Set(pastPapers.map((paper) => paper.course_name)));
     const filteredCourses = uniqueCourses.filter(course => {
        return course.toLowerCase().includes(props.search.toLowerCase());
    });
    return (
        <>
           {filteredCourses.map((course, index) => (
                <div
                onClick={() => props.setSelectedCourse(course)}
                    key={index}
                    className= " cursor-pointer w-52 mx-1 lg:mx-0 block mb-2 p-2 h-10 md:h-auto border-0 md:p-3 bg-indigo-50 rounded-lg shadow hover:bg-white duration-300 hover:shadow-md"
                >
                    <h5 className="text-sm truncate">{course}</h5>
                </div>
            ))}
        </>
    )
}
