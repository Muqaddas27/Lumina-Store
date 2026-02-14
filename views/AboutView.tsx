
import React from 'react';

const AboutView: React.FC = () => {
  const values = [
    {
      title: 'Ethical Sourcing',
      description: 'We partner with artisans and manufacturers who prioritize fair labor and sustainable materials.',
      icon: '🌱'
    },
    {
      title: 'Timeless Quality',
      description: 'Our products are built to last, moving away from fast-fashion toward enduring excellence.',
      icon: '💎'
    },
    {
      title: 'Customer First',
      description: 'Every decision we make starts with the question: How does this improve the shopping experience?',
      icon: '🤝'
    }
  ];

  return (
    <div className="pb-20 bg-white dark:bg-gray-950 transition-colors duration-300 overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[300px] sm:h-[400px] flex items-center justify-center text-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Team collaboration" 
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 dark:text-white">Our Story</h1>
          <p className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto font-medium dark:text-gray-300">
            Redefining the modern shopping experience through quality, transparency, and innovation.
          </p>
        </div>
      </section>

      {/* Narrative */}
      <section className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6 py-12 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Founded on a simple idea.</h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Lumina was born in 2024 out of a desire to create a more intentional e-commerce platform. 
              We noticed that most stores were either cold and corporate or cluttered and confusing.
            </p>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We wanted to build something different—a curated sanctuary of products that bring value 
              to your life, backed by technology that feels human. Today, we're proud to serve 
              thousands of customers worldwide who share our vision for quality over quantity.
            </p>
          </div>
          <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl md:rotate-2">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
              alt="Office interior" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-indigo-900 dark:bg-indigo-950 py-20 text-white transition-colors">
        <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">The Lumina Way</h2>
            <p className="text-indigo-200 dark:text-indigo-300">Our core values guide every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-indigo-800/50 dark:bg-indigo-900/50 p-8 rounded-2xl border border-indigo-700 dark:border-indigo-800 transition-transform hover:-translate-y-2">
                <div className="text-4xl mb-6">{v.icon}</div>
                <h3 className="text-xl font-bold mb-4 dark:text-white">{v.title}</h3>
                <p className="text-indigo-100/80 dark:text-indigo-200/80 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-2 sm:px-3 lg:px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Join the Community</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
          Subscribe to our newsletter for exclusive updates, behind-the-scenes looks at our process, and early access to new releases.
        </p>
        <button className="px-10 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all active:scale-95">
          Shop Our Collection
        </button>
      </section>
    </div>
  );
};

export default AboutView;


