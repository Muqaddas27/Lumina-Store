
import React, { useState } from 'react';

const FaqView: React.FC = () => {
  const categories = [
    {
      name: 'Ordering & Payment',
      questions: [
        { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay.' },
        { q: 'Can I cancel my order?', a: 'Orders can be cancelled within 1 hour of placement. Please contact support immediately via our Contact page.' },
        { q: 'Do you offer bulk discounts?', a: 'Yes! For corporate or bulk orders of 20+ items, please contact our business inquiry team.' }
      ]
    },
    {
      name: 'Shipping & Delivery',
      questions: [
        { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days.' },
        { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide. International shipping times vary by location.' },
        { q: 'How can I track my order?', a: 'Once shipped, you will receive an email with a tracking link. You can also track orders in your Account page.' }
      ]
    },
    {
      name: 'Returns & Exchanges',
      questions: [
        { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy for unused items in original packaging.' },
        { q: 'Are returns free?', a: 'Returns are free for domestic orders within the US. International customers are responsible for return shipping costs.' },
        { q: 'How long until I get my refund?', a: 'Refunds are processed within 5-7 business days after we receive and inspect your returned item.' }
      ]
    }
  ];

  const [activeIdx, setActiveIdx] = useState<string | null>(null);

  const toggle = (id: string) => {
    setActiveIdx(activeIdx === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-3 lg:px-6 py-12 sm:py-20 overflow-x-hidden">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">Frequently Asked Questions</h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">Quick answers to common questions about Lumina.</p>
      </div>

      <div className="space-y-8 sm:space-y-12">
        {categories.map((cat, catIdx) => (
          <div key={catIdx}>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 flex items-center">
              <span className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center mr-3 text-sm">#</span>
              {cat.name}
            </h2>
            <div className="space-y-4">
              {cat.questions.map((q, qIdx) => {
                const id = `${catIdx}-${qIdx}`;
                const isOpen = activeIdx === id;
                return (
                  <div key={id} className="border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => toggle(id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="font-bold text-gray-900 dark:text-gray-100">{q.q}</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 text-gray-400 dark:text-gray-500 transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                      <div className="p-6 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700">
                        {q.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-gradient-to-br from-gray-900 to-indigo-900 dark:from-gray-950 dark:to-indigo-950 rounded-3xl p-10 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
        <p className="text-gray-300 dark:text-gray-400 mb-8">We're here to help. Reach out to our customer support team.</p>
        <a 
          href="#/contact" 
          className="inline-block px-8 py-3 bg-indigo-600 dark:bg-indigo-700 text-white font-bold rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-lg"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default FaqView;


