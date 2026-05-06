import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10 mt-10">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            EduSpider 🕸️
          </h1>
          <p className="text-sm mt-2 text-gray-400">
            Learn. Build. Grow. 🚀
          </p>
        </div>

        {/* Contact Only */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">
            Contact
          </h2>

          {/* Email */}
          <p className="flex items-center gap-2 text-sm">
            <FaEnvelope />
            raush1522@gmail.com
          </p>

          {/* Social */}
          <div className="flex gap-5 mt-4 text-lg">

            <a
              href="https://github.com/raushan-k15"
              target="_blank"
            >
              <FaGithub className="hover:text-white transition" />
            </a>

            <a
              href="https://www.linkedin.com/in/raushan-kumar-22117230b"
              target="_blank"
            >
              <FaLinkedin className="hover:text-blue-400 transition" />
            </a>

          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-gray-500 mt-8">
        © {new Date().getFullYear()} EduSpider • Made with ❤️ by Raushan
      </div>

    </footer>
  );
};

export default Footer;