import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert(' Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      } else {
        alert(data.error || ' Failed to send message');
      }
    } catch (err) {
      console.error('Message send error:', err);
      alert(' Server error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-center text-gray-300 mb-12">
          Have questions or feedback? We'd love to hear from you!
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-300 text-black p-8 rounded shadow-xl"
        >
          <div>
            <label className="block mb-1 font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your message..."
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded"
          >
            Send Message
          </button>
        </form>

        <div className="mt-12 text-center text-sm text-gray-400">
          Or reach us directly: <br />
          Email: <span className="text-blue-300">support@ethiogo.com</span> <br />
          Phone: <span className="text-blue-300">+251 932730558</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
