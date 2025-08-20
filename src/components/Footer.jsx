import { FaLinkedinIn } from "react-icons/fa";
import { ImLink } from "react-icons/im";
import { SiGithub } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="pt-10">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
      <footer className="footer text-base-content pt-10  flex flex-col items-center text-center gap-5 text-white">
        <nav>
          <div className="flex gap-6 items-center">
            <a
              href="https://www.linkedin.com/in/amar6003"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn size={32} />
            </a>
            <a
              href="https://github.com/Amar-6003"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub size={32} />
            </a>
            <a
              href="https://amarfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImLink size={28} />
            </a>
          </div>
        </nav>
        <aside>
          <p className="text-lg md:text-2xl mb-2 sm:mb-3">
            Copyright © {new Date().getFullYear()} - Build with ❤️ by{" "}
            <a
              href="https://amarfolio.vercel.app"
              className="link link-hover inline-flex items-center gap-1 text-blue-400 hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              CodeWithAmar
              <FiExternalLink />
            </a>
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
