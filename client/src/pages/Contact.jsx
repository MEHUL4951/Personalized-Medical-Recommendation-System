import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar.jsx';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="ms-3"> {/* Small left margin added here */}
          <h2 className="mb-4">Contact Us</h2> {/* Removed text-center */}
          <p className="mb-5"> {/* Removed text-center */}
            Have questions or need assistance? We're here to help!
          </p>

          <h4 className="mt-4">Customer Support</h4>
          <p className="mb-3">
            Our dedicated customer support team is available to assist you with any inquiries or issues you may have. Whether it's a technical question, feedback, or a general inquiry, we're just a message away.
          </p>

          <h4 className="mt-4">Get in Touch</h4>
          <p className="mb-2">
            Feel free to reach out to us via email. We value your feedback and are committed to providing you with the best possible experience.
          </p>

          <p className="mb-1"><strong>Email:</strong> mehulhadiyal608@gmail.com</p>
          <p className="mb-4"><strong>Email:</strong> gohilnana9@gmail.com</p>

          <h4 className="mt-4">Stay Connected</h4>
          <p className="mb-3">
            Stay up-to-date with the latest news, updates, and health tips by following us on social media. Connect with us on Facebook or Instagram to join our growing community.
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;