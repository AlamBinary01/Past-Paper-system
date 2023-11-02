import React, { useState, useEffect } from 'react'
import { usePastPaperContext } from '../pages/PastPaperContext';
import DocumentViewer from './DocumentViewer';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

import {
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from 'tw-elements-react';

export default function PapersCard(props) {
  const pastPapers = usePastPaperContext();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatePaperId, setUpdatePaperId] = useState('');

  const [papers, setPapers] = useState([]);
  const [selectedPaperImages, setSelectedPaperImages] = useState([]);
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');  

  useEffect(() => {
    setPapers(pastPapers);
  }, [pastPapers]);


  const filteredPapers = papers.filter(paper => {
    return (
      (props.selectedCourse === '' || paper.course_name === props.selectedCourse) &&
      (props.selectedUniversity === 'default' || paper.university_name === props.selectedUniversity) &&
      (props.selectedYear === 'default' || new Date(paper.year).getFullYear() === parseInt(props.selectedYear)) &&
      (props.selectedPaperType === 'default' || paper.p_type === props.selectedPaperType)

    )
  });
  const handlePaperClick = (imageUrls) => {
    setSelectedPaperImages(imageUrls);
  };
  const [updateData, setUpdateData] = useState({
    course_name: '',
    year: '',
    p_type: '',
    university_name: '',
    p_image: '',
  });
  const handleOpenUpdateModal = (paper) => {
    setUpdatePaperId(paper._id);
    setUpdateData({
      course_name: paper.course_name,
      year: paper.year,
      p_type: paper.p_type,
      university_name: paper.university_name,
      p_image: paper.p_image,
    });
    setUpdateModalOpen(true);
  };
  const fetchPastPapers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getpastpapers');
      if (response.ok) {
        const data = await response.json();
        setPapers(data.pastpapers);
      } else {
        console.error('Error fetching past papers:', response.status);
      }
    } catch (error) {
      console.error('Error fetching past papers:', error);
    }
  };
  const handleUpdateSubmit = async () => {
    const formData = new FormData();
    formData.append("course_name", updateData.course_name);
    formData.append("year", updateData.year);
    formData.append("p_type", updateData.p_type);
    formData.append("university_name", updateData.university_name);
    for (let i = 0; i < updateData.p_image.length; i++) {
      formData.append("p_image", updateData.p_image[i]);
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/updatepastpaper/${updatePaperId}`,
        {
          method: 'PUT',
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        Swal.fire({
          title: 'Success',
          text: 'Paper updated successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#6366f1',
        });

        console.log('Paper updated successfully');
        fetchPastPapers(); // Refresh the paper list after update
      } else {
        Swal.fire({
          title: 'Error',
          text: data.message,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#6366f1',
        });
        console.error('Error updating paper:', data.message);
      }
      handleCloseUpdateModal();
    } catch (error) {
      console.error('Error updating paper:', error);
    }
  };
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setUpdatePaperId('');
    setUpdateData({
      course_name: '',
      year: '',
      p_type: '',
      university_name: '',
      p_image: '',
    });
  };
  const handleDelete = async (paperId) => {
    // Use SweetAlert for confirmation
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this paper!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes, delete it',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/deletepastpaper/${paperId}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          Swal.fire('Deleted!', 'The paper has been deleted.', 'success');
          window.location.reload();
          // Refresh the paper list after deletion
        } else {
          Swal.fire('Error', data.message, 'error');
        }
      } catch (error) {
        console.error('Error deleting paper:', error);
        Swal.fire('Error', 'An error occurred while deleting the paper.', 'error');
      }
    }

  };
  const loginFunc = () => {
    Swal.fire({
      title: 'Please Login',
      text: 'You need to login to view the paper',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Login',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/login';
      }

    })
  }
  return (
    <>
      {
        filteredPapers.map((paper, index) => {
          console.log('paper.p_image:', paper.p_image); // Add this line
          const year = new Date(paper.year).getFullYear();
          const imageUrls = paper.p_image.map(
            (image) => `http://localhost:5000/${image}`
          );

          return (
            <>

              <div
                onContextMenu={(e) => e.preventDefault()}
                key={index} class="h-72 cursor-pointer px-3 py-2 shadow-sm  bg-indigo-50 hover:bg-white rounded-md hover:shadow-xl duration-300">
                {
                  role === 'admin' ? (
                    <>
                    <div className='flex  justify-end py-1 space-x-2'>

                      <button
                        className="text-indigo-500 hover:text-indigo-700 mr-2"

                        onClick={() => handleOpenUpdateModal(paper)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-400 hover:text-red-700"
                        onClick={() => handleDelete(paper._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>

                    </>) : null
                }
                <img
                  onClick={() =>
                    token ? handlePaperClick(imageUrls) : loginFunc()
                    
                    }
                  draggable="false"
                  src={`http://localhost:5000/${paper.p_image[0]}`}
                  className="h-4/6 md:w-72 w-full"
                  alt=""
                />
                <div className="flex  justify-between mt-4 space-y-2">
                  <p className='text-lg font-medium'>{paper.course_name} </p>
                  <p className='flex flex-col items-center font-mono '>{paper.p_type}<br /> <span className='text-xs mt-2'>{year} </span></p>

                </div>


              </div>
              {selectedPaperImages.length > 0 && (
                <DocumentViewer
                  imageUrls={selectedPaperImages}
                  onClose={() => setSelectedPaperImages([])}
                />
              )}
            </>)


        })
      }
      {/* Update Modal */}
      {/* Update Modal */}
      <TEModal show={updateModalOpen} setShow={handleCloseUpdateModal} staticBackdrop>
        <TEModalDialog >
          <TEModalContent >
            <TEModalHeader className='bg-indigo-100'>
              <h5 className="text-xl font-medium">Update Paper</h5>
              <button
                type="button"
                onClick={handleCloseUpdateModal}
                className="hover:text-gray-600 focus:text-gray-600"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </TEModalHeader>
            <TEModalBody className='bg-indigo-100'>
              {/* Update Form */}
              <div className=''>
                <label className="block text-sm font-medium text-gray-700">Course Name</label>
                <input
                  type="text"
                  value={updateData.course_name}
                  onChange={(e) => setUpdateData({ ...updateData, course_name: e.target.value })}
                  className="block w-full rounded border border-solid border-neutral-500 bg-transparent  p-2  text-base  focus:border-primary focus:pb-[0.625rem]   focus:outline-none "
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Year</label>
                <input
                  type="text"
                  value={updateData.year}
                  onChange={(e) => setUpdateData({ ...updateData, year: e.target.value })}
                  className="block w-full rounded border border-solid border-neutral-500 bg-transparent  p-2  text-base  focus:border-primary focus:pb-[0.625rem]   focus:outline-none "
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Paper Type</label>
                <input
                  type="text"
                  value={updateData.p_type}
                  onChange={(e) => setUpdateData({ ...updateData, p_type: e.target.value })}
                  className="block w-full rounded border border-solid border-neutral-500 bg-transparent  p-2  text-base  focus:border-primary focus:pb-[0.625rem]   focus:outline-none "
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">University Name</label>
                <input
                  type="text"
                  value={updateData.university_name}
                  onChange={(e) => setUpdateData({ ...updateData, university_name: e.target.value })}
                  className="block w-full rounded border border-solid border-neutral-500 bg-transparent  p-2  text-base  focus:border-primary focus:pb-[0.625rem]   focus:outline-none "
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Paper Image URL</label>
                <input
                multiple
                  type="file"
                
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      p_image: [...updateData.p_image, ...e.target.files],
                    })
                  }
                  className="block w-full rounded border border-solid border-neutral-500 bg-transparent  p-2  text-base  focus:border-primary focus:pb-[0.625rem]   focus:outline-none "
                  />
              </div>
            </TEModalBody>
            <TEModalFooter className='bg-indigo-100'>
              <button
                type="button"
                onClick={handleCloseUpdateModal}
                className="inline-block rounded bg-gray-300 px-4 py-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"

              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdateSubmit}
                className="ml-1 btn text-sm"
              >
                Update
              </button>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>

    </>
  )
}
