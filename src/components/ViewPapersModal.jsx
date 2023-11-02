import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaList } from 'react-icons/fa';
import Swal from 'sweetalert2';
import {
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from 'tw-elements-react';

function ViewPapers(props) {
  const [pastPapers, setPastPapers] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatePaperId, setUpdatePaperId] = useState('');
  const[showModal,setShowModal] = useState(false);

  const [updateData, setUpdateData] = useState({
    course_name: '',
    year: '',
    p_type: '',
    university_name: '',
    p_image: '',
  });

  useEffect(() => {
    fetchPastPapers();
  }, []);

  const fetchPastPapers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getpastpapers');
      if (response.ok) {
        const data = await response.json();
        setPastPapers(data.pastpapers);
      } else {
        console.error('Error fetching past papers:', response.status);
      }
    } catch (error) {
      console.error('Error fetching past papers:', error);
    }
  };

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

  const handleDelete = async (paperId) => {
    // Use SweetAlert for confirmation
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this paper!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/deletepastpaper/${paperId}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          Swal.fire('Deleted!', 'The paper has been deleted.', 'success');
          fetchPastPapers(); // Refresh the paper list after deletion
        } else {
          Swal.fire('Error', data.message, 'error');
        }
      } catch (error) {
        console.error('Error deleting paper:', error);
        Swal.fire('Error', 'An error occurred while deleting the paper.', 'error');
      }
    }
  };
  
  


  return (
    <div className="container p-5 bg-indigo-100 rounded-xl cursor-pointer" >
      <div className="flex items-center justify-between mb-4" onClick={()=> setShowModal(!showModal)} >
        <h1 className="text-2xl ml-2">All Past Papers</h1>
       
        <FaList className="text-3xl" />
      </div>
      <ul className={`grid grid-cols-1 gap-4 ${showModal ? 'block' : 'hidden'}`} >
        {pastPapers.map((paper) => (
          <li
            key={paper._id}
            className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition duration-300 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold mb-2">{paper.course_name}</h2>
              <p className="text-sm text-gray-500 mb-1">Year: {paper.year}</p>
              <p className="text-sm text-gray-500 mb-1">Type: {paper.p_type}</p>
            </div>
            <div>
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
          </li>
        ))}
      </ul>

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
    </div>
  );
}

export default ViewPapers;
