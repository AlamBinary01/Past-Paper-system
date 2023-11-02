import React from 'react'
import FAST from "../assets/fast.png"
import ITU from "../assets/ITU.jpeg"
import NUST from "../assets/NUST.jpeg"
import UOP from "../assets/UOP.jpeg"

function Testimonial() {
    return (
        <section class=" m-5">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-col text-center w-full mb-12 ">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">About Us</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-justify">At PaperSource, we are passionate about preserving and sharing the academic heritage of universities worldwide.
                        Our platform is dedicated to providing easy access to a diverse range of university past papers, allowing students to learn from the experiences of those who have walked the same educational path. Our mission is to empower learners with valuable insights, foster a deeper understanding of subjects,
                        and ultimately contribute to their academic success. Join us as we bridge the gap between the past and the present, helping students thrive in their educational journey.</p>
                </div>
                <hr className='my-6 ' />
                <div class="flex flex-col text-center w-full mb-12">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Testimonials</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-justify ">
                        We share resources from Pakistan's All major universities, including UET, NUST, FAST, GIKI, LUMS, LSE, IBA, and many more.
                    </p>
                </div>

                <div class="flex flex-wrap ">
                    <div class="p-4 lg:w-1/2">
                        <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                            <img alt="team" class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={FAST} />
                            <div class="flex-grow sm:pl-8">
                                <h2 class="title-font font-medium text-[1.35rem] text-gray-900">
                                    Abdullah
                                </h2>
                                <h3 class="text-gray-500 mb-3 text-[1.15rem]">Data Scientist</h3>
                                <p class="mb-4">
                                    I am studying in FAST NU. My university is famous for giving its student tough time.
                                    when you have extremely hard level problems and exams. Thankful to this repo,
                                    It has all the past papers of my university in one place. So, it saved me from the hassle of searching for past papers.
                                </p>
                                
                            </div>
                        </div>
                    </div>
                    <div class="p-4 lg:w-1/2">
                        <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                            <img alt="team" class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={ITU} />
                            <div class="flex-grow sm:pl-8">
                                <h2 class="title-font font-medium text-[1.35rem] text-gray-900">Abdullah Zeb</h2>
                                <h3 class="text-gray-500 mb-3 text-[1.15rem]">
                                    Soft Eng
                                </h3>
                                <p class="mb-4">
                                    I am studying in ITU, Lahore. I am a full stack developer.
                                    My university exams have totally unseen and logical problems, so it is hard to prepare for them.
                                    I am happy I came around this repo, which have all the past papers of my university. It helped me a lot in my exams.
                                </p>
                                
                            </div>
                        </div>
                    </div>
                    <div class="p-4 lg:w-1/2">
                        <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                            <img alt="team" class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={NUST} />
                            <div class="flex-grow sm:pl-8">
                                <h2 class="title-font font-medium text-[1.35rem] text-gray-900">
                                    Muneeb
                                </h2>
                                <h3 class="text-gray-500 mb-3 text-[1.15rem]">Mechatronics engineer</h3>
                                <p class="mb-4">I am doing my engineering degree from NUST. All our friends use past papers from this repo and
                                    it has been extremely popular these days in our university to prepare for exam. We feel more confident preparing for our midterms and finals. </p>
                               
                            </div>
                        </div>
                    </div>
                    <div class="p-4 lg:w-1/2">
                        <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                            <img alt="team" class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={UOP} />
                            <div class="flex-grow sm:pl-8">
                                <h2 class="title-font font-medium text-[1.35rem] text-gray-900">
                                    Hassan Raza
                                </h2>
                                <h3 class="text-gray-500 mb-3 text-[1.15rem]">Digital Forensic Scientist</h3>
                                <p class="mb-4">
                                    I am from UOP. Lorem ipsum is placeholder text commonly used in the graphic, print,
                                    and publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewin.
                                </p>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonial
