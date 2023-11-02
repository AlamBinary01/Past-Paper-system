import React from 'react';

const DocumentViewer = ({ imageUrls, onClose }) => {
    const handleContextMenu = (e) => {
        e.preventDefault();
    };
    return (
        <div className=" overflow-auto fixed top-0 left-0 w-full h-full bg-gray-700  backdrop-blur-[2px] bg-opacity-50 flex justify-center items-center z-50 ">
            <div className="relative w-4/5 h-4/5 max-w-4xl ">
                <button
                    type="button"
                    className=" absolute -top-10 -right-1  rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    onClick={onClose}
                    aria-label="Close">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-9 w-9 border rounded-full text-red-400 border-red-400  ">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="flex flex-col items-center overflow-auto">
                    {/* Watermark Overlay */}

                    {

                        imageUrls.map((imageUrl, index) => (
                            <>

                                <div key={index}
                                    className=''
                                    onContextMenu={handleContextMenu}
                                >
                                     <div id="background">
                                        <p id="bg-text">PAPER SOURCE</p>
                                        <p id="sm-text">FastDev</p>
                                        <p id="sm-text2">FastDev</p>
                                        
                                    </div>

                                    <img
                                        draggable="false"
                                        src={imageUrl}
                                        alt={`Document ${index + 1}`}
                                        oncontextmenu="return false;"
                                        className=" pointer-events-none  user-select-none select-none"

                                    />
                                   

                                </div>
                            </>


                        ))

                    }
                </div>
            </div>
        </div>
    );
};

export default DocumentViewer;
