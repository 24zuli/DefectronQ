import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import Card3D from '../components/Card3D';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  links: {
    github?: string;
    linkedin?: string;
    email?: string;
    website?: string;
  };
}

const Team = () => {
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: 'Ishita Bhojani',
      role: 'Lead Researcher',
      bio: 'Quantum computing expert specializing in hybrid quantum-classical architectures for computer vision applications.',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=600',
      links: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'mailto:ishita@defectronq.com',
      },
    },
    {
      id: 2,
      name: 'Zuli Dobariya',
      role: 'AI Engineer',
      bio: 'Deep learning specialist focused on anomaly detection and quantum circuit optimization for industrial applications.',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
      links: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'mailto:zuli@defectronq.com',
      },
    },
  ]);

  return (
    <div className="pt-20">
      <section className="hero-gradient min-h-[50vh] flex items-center">
        <div className="container mx-auto px-4 py-20">
          <SectionTitle 
            title="Meet The Team"
            subtitle="The minds behind DefectronQ's quantum-enhanced anomaly detection technology."
            centered
          />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <Card3D 
                key={member.id} 
                className="overflow-hidden" 
                glowColor="rgba(96, 165, 250, 0.4)"
                depth={5}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-blue-400 mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                  
                  <div className="flex space-x-3">
                    {member.links.github && (
                      <a 
                        href={member.links.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    
                    {member.links.linkedin && (
                      <a 
                        href={member.links.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                    
                    {member.links.email && (
                      <a 
                        href={member.links.email}
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Mail size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionTitle 
              title="Contact Us"
              subtitle="Interested in implementing DefectronQ in your manufacturing process?"
              centered
            />
            
            <div className="mt-10 bg-gray-800 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4">Let's Discuss Your Needs</h3>
              <p className="text-gray-300 mb-6">
                We're ready to help you implement quantum-enhanced defect detection in your manufacturing line.
              </p>
              
              <a 
                href="mailto:contact@defectronq.com" 
                className="btn-3d inline-block px-8 py-4 font-semibold text-white rounded-lg transition-all duration-300 
                bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;