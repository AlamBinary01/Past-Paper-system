import React from 'react';
import Navbar from "../components/Navbar"; // Your Navbar component
import Footer from "../components/Footer"; 
import PrivacyPolicySection from "../components/PrivacyPolicySection"; // Reuse the PrivacyPolicySection component

const TermsandConditions = () => {
  return (
    <div className="min-h-screen bg-indigo-200">
      <Navbar />
      <main className="flex-grow my-16 mx-14 md:mx-40 lg:mx-72">
        <PrivacyPolicySection
          title="Terms and Conditions"
          content={
            <>
              <p>
                By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions. Your access to and use of the service is conditioned on your acceptance of and compliance with these terms. These terms apply to all visitors, users, and others who access or use the service.
              </p>

              <h3 className="mt-4 text-lg font-bold text-black">Use of the Platform</h3>
              <p>
                The use of our platform is subject to the following terms:
              </p>
              <ul className="list-disc ml-6">
                <li>You may not use our platform for any illegal or unauthorized purpose.</li>
                <li>Legal action will be taken on selling or stealing our product.</li>
                <li>You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the service.</li>
                <li>You may not engage in any conduct that disrupts or interferes with the normal functioning of the platform.</li>
                <li>Your use of the platform is at your sole risk. The service is provided on an "as is" and "as available" basis.</li>
              </ul>


              <h3 className="mt-4 text-lg font-semibold text-black">Contact Us</h3>
              <p>
                If you have any questions, concerns, or requests regarding these Terms and Conditions, please contact us at info@papersource.com
              </p>
            </>
          }
        />
      </main>

      <Footer />
    </div>
  );
};

export default TermsandConditions;
