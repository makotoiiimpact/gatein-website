import React from 'react';
import { contactContent } from '../../content/contact';
import { Mail, MapPin, ExternalLink, ChevronDown, ArrowRight, Github, Linkedin, Twitter, Bot } from 'lucide-react';

const Contact = () => {
  const { info, nextSteps, sectionTag, title } = contactContent;

  return (
    <section id="contact" className="py-24 bg-[#FAFAFA] font-sans border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          
          {/* Left Column */}
          <div className="lg:w-[45%] flex flex-col justify-start pt-4">
            
            {/* Header */}
            <div className="mb-14">
              <span className="inline-block px-3 py-1.5 bg-[#E8EDFF] text-[#3A5FCD] font-bold text-[8px] tracking-[0.16em] uppercase rounded-sm mb-6">
                {sectionTag}
              </span>
              <h2 className="text-[52px] font-extrabold text-[#1a1a1a] tracking-tight leading-[1.05]">
                {title.text} <span className="text-[#3A5FCD] italic underline decoration-[4px] underline-offset-[12px]">{title.highlight}</span>
              </h2>
            </div>

            <div className="mb-8">
              <h3 className="text-[20px] font-extrabold text-[#1a1a1a] tracking-tight">What Happens Next?</h3>
            </div>
            
            <div className="w-full h-px bg-gray-200 mb-10"></div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 mb-10 w-[110%]">
              {nextSteps.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="text-[38px] font-extrabold text-[#E5E7EB] leading-none -mt-1 tracking-tighter shrink-0 select-none">
                    0{step.number}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#1a1a1a] mb-2 tracking-tight">{step.title}</h4>
                    <p className="text-[12px] text-[#8A8F9B] leading-[1.6] max-w-[95%]">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-gray-200 mb-10"></div>

            {/* Bottom Info and Connect box */}
            <div className="flex flex-col sm:flex-row gap-8 justify-between mt-2">
              
              <div className="flex flex-col gap-6 w-1/2">
                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="w-[34px] h-[34px] bg-[#E8EDFF] text-[#3A5FCD] flex items-center justify-center rounded-sm shrink-0">
                     <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col mt-0.5">
                    <span className="text-[7.5px] font-bold text-gray-400 uppercase tracking-[0.16em] mb-0.5">General Inquiries</span>
                    <span className="text-[13px] font-bold text-[#1a1a1a]">{info.email}</span>
                  </div>
                </div>
                
                {/* Location */}
                <div className="flex gap-4 items-start">
                  <div className="w-[34px] h-[34px] bg-[#E8EDFF] text-[#3A5FCD] flex items-center justify-center rounded-sm shrink-0">
                     <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col mt-0.5">
                    <span className="text-[7.5px] font-bold text-gray-400 uppercase tracking-[0.16em] mb-0.5">Headquarters</span>
                    <span className="text-[13px] font-bold text-[#1a1a1a]">{info.location}</span>
                  </div>
                </div>
              </div>

              {/* Connect Box */}
              <div className="bg-[#F3F4F6] p-6 rounded-sm w-full sm:max-w-[210px] relative overflow-hidden flex flex-col justify-center border border-gray-100">
                <div className="absolute right-[-10px] top-[-10px] opacity-[0.03] pointer-events-none">
                   <Bot className="w-24 h-24" />
                </div>
                <h4 className="text-[14px] font-bold text-[#1a1a1a] mb-5 leading-snug">Connect with our<br/>engineering team.</h4>
                <a href={info.linkedin.url} className="text-[10px] font-bold text-[#3A5FCD] flex items-center hover:text-blue-800 transition-colors w-max uppercase tracking-wider relative z-10">
                  LinkedIn <ExternalLink className="ml-1 w-3 h-3" />
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:w-[55%] flex flex-col items-center xl:items-end z-10">
            
            <div className="bg-white p-10 lg:p-14 shadow-[0_8px_40px_rgba(0,0,0,0.04)] rounded-sm w-full mx-auto xl:mr-0 max-w-[520px]">
              <form className="flex flex-col gap-6">
                
                <div className="flex gap-5">
                   <div className="w-1/2 flex flex-col gap-2">
                     <label className="text-[10px] font-extrabold text-[#1a1a1a] uppercase tracking-[0.1em]">First Name</label>
                     <input type="text" placeholder="John" className="bg-[#EAEAEA]/60 placeholder:text-gray-400 text-[13px] text-gray-800 p-3.5 px-4 rounded-sm border-none focus:ring-2 focus:ring-[#3A5FCD] outline-none w-full" />
                   </div>
                   <div className="w-1/2 flex flex-col gap-2">
                     <label className="text-[10px] font-extrabold text-[#1a1a1a] uppercase tracking-[0.1em]">Last Name</label>
                     <input type="text" placeholder="Doe" className="bg-[#EAEAEA]/60 placeholder:text-gray-400 text-[13px] text-gray-800 p-3.5 px-4 rounded-sm border-none focus:ring-2 focus:ring-[#3A5FCD] outline-none w-full" />
                   </div>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <label className="text-[10px] font-extrabold text-[#1a1a1a] uppercase tracking-[0.1em]">Business Email</label>
                  <input type="email" placeholder="j.doe@company.com" className="bg-[#EAEAEA]/60 placeholder:text-gray-400 text-[13px] text-gray-800 p-3.5 px-4 rounded-sm border-none focus:ring-2 focus:ring-[#3A5FCD] outline-none w-full" />
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <label className="text-[10px] font-extrabold text-[#1a1a1a] uppercase tracking-[0.1em]">Company</label>
                  <input type="text" placeholder="Logistics Corp Inc." className="bg-[#EAEAEA]/60 placeholder:text-gray-400 text-[13px] text-gray-800 p-3.5 px-4 rounded-sm border-none focus:ring-2 focus:ring-[#3A5FCD] outline-none w-full" />
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <label className="text-[10px] font-extrabold text-[#1a1a1a] uppercase tracking-[0.1em]">Facility Type</label>
                  <div className="relative">
                    <select className="bg-[#E5E7EB]/80 text-[#1a1a1a] font-medium text-[13.5px] p-3.5 px-4 pr-10 rounded-sm border-none focus:ring-2 focus:ring-[#3A5FCD] outline-none w-full appearance-none">
                      <option>Container Depot</option>
                      <option>Intermodal Terminal</option>
                      <option>Warehouse / DC</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <label className="text-[10px] font-extrabold text-[#1a1a1a] uppercase tracking-[0.1em]">How Can We Help?</label>
                  <div className="relative">
                    <select className="bg-[#E5E7EB]/80 text-[#1a1a1a] font-medium text-[13.5px] p-3.5 px-4 pr-10 rounded-sm border-none focus:ring-2 focus:ring-[#3A5FCD] outline-none w-full appearance-none">
                      <option>Schedule a demo</option>
                      <option>ROI consultation</option>
                      <option>Discuss pilot program</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <label className="text-[10px] font-extrabold text-[#1a1a1a] uppercase tracking-[0.1em]">Message (Optional)</label>
                  <textarea rows="3" placeholder="Tell us about your yard operations..." className="bg-[#EAEAEA]/60 placeholder:text-gray-400 text-[13px] text-gray-800 p-3.5 px-4 rounded-sm border-none focus:ring-2 focus:ring-[#3A5FCD] outline-none w-full resize-none"></textarea>
                </div>

                <button type="button" className="mt-4 w-full bg-[#3A5FCD] hover:bg-[#3151b1] text-white font-bold text-[14px] leading-none py-4 px-6 rounded-sm flex items-center justify-center transition-colors">
                  Submit Request <ArrowRight className="ml-2 w-4 h-4" />
                </button>

                <div className="text-center mt-3 mb-1">
                  <p className="text-[7.5px] font-extrabold text-[#9CA3AF] uppercase tracking-[0.16em] leading-[1.8]">
                    By submitting, you agree to receive communications<br/>from GateIn AI.
                  </p>
                </div>

              </form>
            </div>

            {/* Social Icons Below Form */}
            <div className="flex items-center justify-center w-[520px] gap-4 mt-8 opacity-40 mx-auto xl:mr-0">
              <div className="w-[18px] h-[18px] bg-gray-500 rounded-sm flex items-center justify-center cursor-pointer hover:bg-gray-700 transition">
                <Github className="w-2.5 h-2.5 text-white" />
              </div>
              <div className="w-[18px] h-[18px] bg-gray-500 rounded-sm flex items-center justify-center cursor-pointer hover:bg-gray-700 transition">
                <Twitter className="w-2.5 h-2.5 text-white" />
              </div>
              <div className="w-[18px] h-[18px] bg-gray-500 rounded-sm flex items-center justify-center cursor-pointer hover:bg-gray-700 transition">
                <Linkedin className="w-2.5 h-2.5 text-white" />
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
