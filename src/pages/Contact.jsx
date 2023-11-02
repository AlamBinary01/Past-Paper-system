
import React from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'

function Contact() {

  const email = process.env.REACT_APP_EMAIL_URL;
  return (
    <section class="text-gray-600 body-font relative">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">We're here to assist you! If you have any questions, suggestions, or feedback, please don't hesitate to reach out to us.</p>
        </div>
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
          <form action={`https://formsubmit.co/${email}`} method="POST">
           
            <input type="hidden" name="_captcha" value="false" />
            
            <input type="hidden" name="_subject" value="From Paper Source" />
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                  <input
                  required
                    type="text" id="name" name="Name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                  <input
                    required
                    type="email" id="email" name="Email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                  <textarea
                   required
                    id="message" name="Message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button
                  type='submit'
                  class="group flex mx-auto text-white font-medium bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-800 rounded text-lg"
                   >
                    Send<span className='mt-[0.35rem] ml-1 group-hover:animate-pulse'><FaArrowCircleRight /> </span> </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact