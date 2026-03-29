import React from 'react';
import { aboutContent } from '../../content/about';
import { Link2 } from 'lucide-react';

const getColorConfig = (colorId) => {
  const configs = {
    blue: { bg: 'bg-[#3A5FCD]', text: 'text-[#3A5FCD]' },
    red: { bg: 'bg-[#B9442C]', text: 'text-[#B9442C]' },
    olive: { bg: 'bg-[#82691E]', text: 'text-[#82691E]' },
    green: { bg: 'bg-[#185529]', text: 'text-[#185529]' }
  };
  return configs[colorId] || configs.blue;
};

const About = () => {
  return (
    <section id="about" className="font-sans">
      
      {/* Top Section */}
      <div className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Story Text */}
            <div className="lg:w-7/12 mt-10 lg:mt-0 lg:order-1 order-2">
               <p className="text-[#3A5FCD] font-bold tracking-[0.16em] text-[10px] uppercase mb-6">
                {aboutContent.sectionTag}
               </p>
               <h2 className="text-[44px] lg:text-[56px] font-extrabold text-[#1a1a1a] tracking-tight leading-[1.05] mb-8 lg:w-[120%]">
                  {aboutContent.title.text}{" "}<span className="block">{aboutContent.title.highlight}</span>
               </h2>
               <p className="text-[16px] text-[#555962] leading-[1.7] lg:pr-10">
                 {aboutContent.story}
               </p>
            </div>
            
            {/* Image Right */}
            <div className="lg:w-5/12 w-full lg:order-2 order-1 flex justify-center lg:justify-end shrink-0">
               <div className="relative w-full max-w-[380px] aspect-[4/4.5]">
                 {/* Blue Shadow Accent */}
                 <div 
                   className="absolute inset-0 bg-[#E8EDFF] z-0 rounded-sm"
                   style={{ transform: 'rotate(4deg) translate(25px, 20px) scale(1.05)' }}
                 ></div>
                 
                 {/* Image */}
                 <div className="absolute inset-0 z-10 overflow-hidden shadow-lg border border-gray-100 rounded-sm bg-gray-200">
                    <div className="w-full h-full bg-cover bg-center grayscale contrast-125 hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1541819661413-5ae64b733075?q=80&w=1200&auto=format&fit=crop")' }}></div>
                 </div>
               </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Middle Section (Team) & Bottom (Quote) */}
      <div className="py-32 bg-[#F9FAFB] border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           
           {/* Section Header */}
           <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
             <h3 className="text-[26px] font-extrabold text-[#1a1a1a] tracking-tight">Executive Leadership</h3>
             <div className="text-[9.5px] font-bold text-[#8A8F9B] tracking-[0.15em] uppercase pb-1">
               Industrial Intelligence Engineered
             </div>
           </div>
           
           <div className="w-full h-px bg-[#E5E7EB] mb-12"></div>

           {/* Team Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {aboutContent.team.map(member => {
               const colors = getColorConfig(member.avatarColor);
               return (
                 <div key={member.id} className="bg-white p-8 lg:p-10 border border-gray-50 shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col h-full rounded-sm hover:-translate-y-1 transition-transform duration-300">
                   <div className={`${colors.bg} w-[50px] h-[50px] flex items-center justify-center text-white font-bold text-[18px] mb-8 rounded-sm shrink-0`}>
                     {member.initials}
                   </div>
                   <h4 className="text-[17px] font-bold text-[#1a1a1a] tracking-tight">{member.name}</h4>
                   <div className={`${colors.text} text-[8.5px] font-black uppercase tracking-[0.15em] mt-1.5 mb-5`}>
                     {member.title}
                   </div>
                   <p className="text-[12.5px] text-[#555962] leading-[1.65] flex-grow pr-2">
                     {member.bio}
                   </p>
                   <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-1.5 cursor-pointer group">
                     <Link2 className={`w-[14px] h-[14px] ${colors.text} group-hover:scale-110 transition-transform`} />
                     <span className={`${colors.text} text-[9px] font-bold tracking-[0.12em] uppercase`}>Linkedin</span>
                   </div>
                 </div>
               );
             })}
           </div>

           {/* Quote Section */}
           <div className="mt-40 mb-10 flex flex-col items-center justify-center text-center">
             <div className="w-[1.5px] h-16 bg-[#3A5FCD]/30 mb-12"></div>
             <h2 className="text-[34px] lg:text-[46px] font-extrabold text-[#1a1a1a] max-w-[900px] leading-[1.1] tracking-tight italic mb-8 mx-auto" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontStyle: 'italic', fontWeight: '800' }}>
               "We aren't building for Silicon Valley. 
               <br className="hidden md:block"/> We're building for the logistics heartland."
             </h2>
             <div className="text-[10px] font-bold text-[#8A8F9B] tracking-[0.2em] uppercase mt-2">
               Our Core Mission
             </div>
           </div>

         </div>
      </div>
      
    </section>
  );
};

export default About;
