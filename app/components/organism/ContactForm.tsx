import React, { useState } from 'react';

interface ContactFormProps {
  onSignIn: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSignIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="py-12 bg-black bg-opacity-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 font-playfair-display luxury-title">Contact Us</h2>
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* Name input */}
            <div className="group">
              <label htmlFor="name" className="text-sm luxury-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                className="w-full p-2 rounded bg-white/5 text-white border border-white/30 focus:outline-none transition-all duration-300 ease-in-out luxury-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {/* Email input */}
            <div className="group">
              <label htmlFor="email" className="text-sm luxury-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-2 rounded bg-white/5 text-white border border-white/30 focus:outline-none transition-all duration-300 ease-in-out luxury-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Message textarea */}
            <div className="group">
              <label htmlFor="message" className="text-sm luxury-label">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Your Message"
                className="w-full p-2 rounded bg-white/5 text-white border border-white/30 focus:outline-none transition-all duration-300 ease-in-out luxury-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            {/* Submit button */}
            <div className="text-center">
              <button type="submit" className="button px-6 py-2 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ease-in-out">
                Send Message
              </button>
            </div>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-400">Alternatively, you can</p>
            <button onClick={onSignIn} className="mt-2 px-6 py-2 bg-white/5 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ease-in-out">
              Sign In &amp; Create a Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
