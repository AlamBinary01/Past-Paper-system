import React from 'react';

const PrivacyPolicySection = ({ title, content }) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{content}</p>
    </section>
  );
};

export default PrivacyPolicySection;
