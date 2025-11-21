import React, { useState } from "react";

const LandFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is an ATS?",
      answer: "An ATS (Applicant Tracking System) is your recruitment game-changer, streamlining hiring with smart automation and candidate management.",
    },
    {
      question: "Can I customize the pipeline?",
      answer: "Absolutely! Tailor your hiring journey with our dynamic, drag-and-drop pipeline customization—your rules, your flow.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes, your data is fortress-protected with top-tier encryption and compliance, ensuring peace of mind 24/7.",
    },
    {
      question: "How does your ATS improve the candidate experience?",
      answer: "Our ATS ensures timely communication, personalized updates, and a transparent application process, helping you build strong relationships with candidates from day one.",
    },
    {
      question: "How does your ATS rank and score resumes?",
      answer: "Our ATS uses AI-powered algorithms to parse resumes, match key skills and experiences to job descriptions, and assign a score to each candidate, making it easy to prioritize top talent.",
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-3xl -z-10 animate-pulse delay-300"></div>

      <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center mb-12 relative z-10">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-6 text-gray-800">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <h3
              className="font-bold text-xl text-gray-900 cursor-pointer flex justify-between items-center"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
              <span
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </h3>
            <p
              className={`mt-2 text-gray-600 overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LandFAQ;