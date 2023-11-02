import React from "react";
import Navbar from "../components/Navbar"; // Your Navbar component
import Footer from "../components/Footer"; // Your Footer component
import PrivacyPolicyHeader from "../components/PrivacyPolicyHeader"; // Your PrivacyPolicyHeader component
import PrivacyPolicySection from "../components/PrivacyPolicySection"; // Your PrivacyPolicySection component
import PrivacyPolicyContact from "../components/PrivacyPolicyContact"; // Your PrivacyPolicyContact component

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-indigo-200 ">
      <Navbar />

      <main className="flex-grow my-16 mx-14 md:mx-40 lg:mx-72 ">
        <PrivacyPolicyHeader />
        <PrivacyPolicySection
          title="Information We Collect"
          content={
            <>
              <p>
                We may collect various types of information from users of our platform, including but not limited to:
              </p>
              <ul className="list-disc ml-6">
                <li>
                  Personal Information: We may collect personal information such as your name, email address, and university affiliation when you create an account or communicate with us.
                </li>
                <li>
                  Usage Information: We may collect information about your interactions with our platform, including the pages you visit, the papers you access, and your search queries.
                </li>
                <li>
                  Device Information: We may collect information about the device you use to access our platform, including your IP address, browser type, and operating system.
                </li>
                <li>
                  Cookies and Similar Technologies: We may use cookies and similar technologies to collect information about your preferences and activities on our platform.
                </li>
              </ul>
            </>
          }
        />

<PrivacyPolicySection
          title="How We Use Your Information"
          content={
            <>
              <p>
              We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc ml-6">
                <li>
                Providing and Improving our Services: We use your information to operate, maintain, and enhance our platform, including personalized user experiences and content recommendations.
                </li>
                <li>
                Communication: We may use your contact information to send you updates, newsletters, and administrative messages related to PaperSource.
                </li>
                <li>
                Research and Analytics: We may use aggregated and anonymized data for research and analytics purposes to improve our platform's functionality and user experience.
                </li>
              </ul>
            </>
          }
        />

<PrivacyPolicySection
          title="Disclosure of Your Information"
          content={
            <>
              <p>
              We may share your information with third parties in the following circumstances:
              </p>
              <ul className="list-disc ml-6">
                <li>
                Service Providers: We may share your information with third-party service providers who help us operate and maintain our platform.
                </li>
                <li>
                Legal Requirements: We may disclose your information to comply with applicable laws, regulations, legal processes, or government requests.
                </li>
                <li>
              Business Transfers: If PaperSource is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
                </li>
              </ul>
            </>
          }
        />

<PrivacyPolicySection
          title="Your Choices"
          content={
            <>
              
              <ul className="list-disc ml-6">
                <li>
                Account Information: You can review and update your account information by logging into your PaperSource account.
                </li>
                <li>
                Cookies: You can control cookies through your browser settings. Please note that disabling cookies may impact your experience on our platform.
                </li>
                <li>
                Communications: You can opt-out of receiving promotional communications from us by following the instructions provided in those communications.
                </li>
              </ul>
            </>
          }
        />
        <PrivacyPolicySection
          title="Security"
          content={
            <>
              <p>
              We take reasonable measures to protect your personal information from unauthorized access, disclosure, or loss. However, no data transmission over the internet or electronic storage is entirely secure, and we cannot guarantee the security of your information.
              </p>
              
            </>
          }
        />

<PrivacyPolicySection
          title="Children's Privacy"
          content={
            <>
              <p>
              PaperSource is not intended for children under the age of 10. We do not knowingly collect personal information from children under 13. If you believe we may have collected information from a child under 13, please contact us at info@papersource.com
              </p>
            
            </>
          }
        />

<PrivacyPolicySection
          title="Changes to this Privacy Policy"
          content={
            <>
              <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes through our platform or by other means.
              </p>
             
            </>
          }
        />


      
        <PrivacyPolicyContact />
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
