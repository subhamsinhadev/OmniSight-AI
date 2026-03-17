import React from "react";
import { Linkedin, Twitter, Github, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-24">

      {/* MAIN FOOTER */}
      <div className="container mx-auto px-8 py-16 grid md:grid-cols-3 gap-14">

        {/* COMPANY */}
        <div>
          <h3 className="text-white font-semibold text-2xl mb-6">
            OmniSight AI
          </h3>

          <p className="text-gray-400 text-base leading-relaxed mb-6">
            AI-powered parametric income protection platform designed
            to safeguard India's gig delivery workforce from external
            disruptions such as extreme weather, city shutdowns,
            and platform outages.
          </p>

          <p className="text-sm text-gray-500">
            Built as a hackathon prototype demonstrating the
            future of automated insurance protection systems.
          </p>
        </div>

        {/* PLATFORM */}
        <div>
          <h3 className="text-white font-semibold text-xl mb-6">
            Platform
          </h3>

          <ul className="space-y-4 text-base">
            <li>
              <a href="https://github.com/thegreatayanchowdhury/OmniSight-AI/blob/main/README.md" 
               target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition">
                About OmniSight AI
              </a>
            </li>

            <li>
              <a
                href="https://medium.com/@ashikmr0604/omnisight-ai-part-1-protecting-indias-food-delivery-partners-from-income-disruptions-023741442aef"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition"
              >
                Blog & Research
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-emerald-400 transition">
                Risk Models
              </a>
            </li>

            <li>
             <a href="https://github.com/thegreatayanchowdhury/OmniSight-AI/blob/main/omnisight-frontend/README.md" 
              target="_blank"
                rel="noopener noreferrer"
              className="hover:text-emerald-400 transition">
                Developer Documentation
              </a>
            </li>
          </ul>
        </div>

        {/* CONNECT */}
        <div>
          <h3 className="text-white font-semibold text-xl mb-6">
            Connect
          </h3>

          <p className="text-gray-400 mb-6 text-base">
            Follow the development of OmniSight AI and stay updated
            on new research, features, and platform improvements.
          </p>

          <div className="flex items-center gap-5">

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800 hover:bg-emerald-500 hover:text-black transition"
            >
              <Linkedin size={22} />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800 hover:bg-emerald-500 hover:text-black transition"
            >
              <Twitter size={22} />
            </a>

            <a
              href="https://github.com/thegreatayanchowdhury/OmniSight-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800 hover:bg-emerald-500 hover:text-black transition"
            >
              <Github size={22} />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800 hover:bg-emerald-500 hover:text-black transition"
            >
              <Globe size={22} />
            </a>

          </div>
        </div>
      </div>


      {/* DISCLAIMER */}
      <div className="border-t border-gray-800"></div>

      <div className="container mx-auto px-8 py-8 text-gray-400 text-sm leading-relaxed">

        <p className="mb-4">
          <span className="text-white font-medium">
            Disclaimer:
          </span>{" "}
          OmniSight AI is a conceptual prototype created for demonstration
          and research purposes during a technology hackathon. The platform
          illustrates how AI-driven parametric protection systems could
          support gig economy workers by automatically detecting disruption
          events and triggering compensation.
        </p>

        <p>
          Insurance products described on this platform are hypothetical
          and would require regulatory approval from relevant insurance
          authorities before commercial deployment. This website does not
          offer real insurance policies, financial products, or guarantees
          of compensation.
        </p>

      </div>


      {/* LEGAL BAR */}
      <div className="bg-black text-gray-500 text-sm py-4 text-center border-t border-gray-800">
        © {new Date().getFullYear()} OmniSight AI • Hackathon Prototype •
        Terms of Use • Privacy Policy • Research Project
      </div>

    </footer>
  );
};

export default Footer;