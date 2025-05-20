import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Section, SectionTitle, Button } from '../components/common/StyledComponents';
import { theme } from '../styles/theme';
import { CVData } from '../utils/cvUtils';

interface ContactPageProps {
  cvData: CVData | null;
  loading: boolean;
  error: string | null;
}

const contactIcons: Record<string, string> = {
  email: require('../assets/images/email.png'),
  linkedin: require('../assets/images/linkedin.png'),
  github: require('../assets/images/github.png'),
  medium: require('../assets/images/medium.png'),
  google_scholar: require('../assets/images/google_scholar.png'),
};

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.xl};
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.dark};
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 2rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  color: ${({ theme }) => theme.colors.dark};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  color: ${({ theme }) => theme.colors.dark};
  
  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${theme.colors.light};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: ${theme.colors.primary};
  }
  
  .content {
    h3 {
      margin-bottom: ${theme.spacing.xs};
    }
    
    p, a {
      color: ${theme.colors.gray};
      text-decoration: none;
      
      &:hover {
        color: ${theme.colors.primary};
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.primary};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

const ContactForm = styled(motion.form)`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.md};
  color: ${({ theme }) => theme.colors.dark};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md};
  
  label {
    display: block;
    margin-bottom: ${theme.spacing.xs};
    font-weight: 500;
  }
  
  input, textarea {
    width: 100%;
    padding: ${theme.spacing.md};
    border: 1px solid ${theme.colors.lightGray};
    border-radius: ${theme.borderRadius.sm};
    font-family: inherit;
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
    }
  }
  
  textarea {
    min-height: 150px;
    resize: vertical;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: ${theme.spacing.md};
`;

const ThankYouMessage = styled(motion.div)`
  background-color: ${theme.colors.success};
  color: white;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  margin-top: ${theme.spacing.md};
  text-align: center;
`;

const ContactPage: React.FC<ContactPageProps> = ({ cvData, loading, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cvData) return <div>No CV data available</div>;
  
  const { personal_information } = cvData;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you'd send this data to a server
    console.log('Form submitted:', formData);
    
    // Show thank you message
    setIsSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Hide thank you message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  return (
    <Section>
      <Container>
        <SectionTitle>Get In Touch</SectionTitle>
        
        <ContactContainer>
          <ContactInfo>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Let's talk about your project
            </motion.h2>
            
            <ContactItem
              as={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {contactIcons['email'] && (
                  <img src={contactIcons['email']} alt="Email" style={{ width: 28, height: 28, margin: '0 auto', display: 'block' }} />
                )}
              </div>
              <div className="content">
                <h3>Email</h3>
                <a href={`mailto:Hhirp@uic.edu`}>{personal_information.email}</a>
              </div>
            </ContactItem>
            
            {personal_information.phone && (
              <ContactItem
                as={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="icon">
                  <span role="img" aria-label="Phone" style={{ fontSize: 28 }}>
                    📞
                  </span>
                </div>
                <div className="content">
                  <h3>Phone</h3>
                  <a href={`tel:${personal_information.phone}`}>{personal_information.phone}</a>
                </div>
              </ContactItem>
            )}
            
            <SocialLinks>
              {personal_information.github && (
                <SocialLink 
                  href={personal_information.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  as={motion.a}
                  whileHover={{ y: -5 }}
                >
                  {contactIcons['github'] && (
                    <img src={contactIcons['github']} alt="GitHub" style={{ width: 28, height: 28, verticalAlign: 'middle' }} />
                  )}
                </SocialLink>
              )}
              
              {personal_information.linkedin && (
                <SocialLink 
                  href={personal_information.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  as={motion.a}
                  whileHover={{ y: -5 }}
                >
                  {contactIcons['linkedin'] && (
                    <img src={contactIcons['linkedin']} alt="LinkedIn" style={{ width: 28, height: 28, verticalAlign: 'middle' }} />
                  )}
                </SocialLink>
              )}
              
              {personal_information.medium && (
                <SocialLink 
                  href={personal_information.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  as={motion.a}
                  whileHover={{ y: -5 }}
                >
                  {contactIcons['medium'] && (
                    <img src={contactIcons['medium']} alt="Medium" style={{ width: 28, height: 28, verticalAlign: 'middle' }} />
                  )}
                </SocialLink>
              )}
              
              {personal_information.google_scholar && (
                <SocialLink 
                  href={personal_information.google_scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  as={motion.a}
                  whileHover={{ y: -5 }}
                >
                  {contactIcons['google_scholar'] && (
                    <img src={contactIcons['google_scholar']} alt="Google Scholar" style={{ width: 28, height: 28, verticalAlign: 'middle' }} />
                  )}
                </SocialLink>
              )}
            </SocialLinks>
          </ContactInfo>
          
          <ContactForm
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
          >
            <FormGroup>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </FormGroup>
            
            <SubmitButton type="submit">Send Message</SubmitButton>
            
            {isSubmitted && (
              <ThankYouMessage
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Thank you for your message! I'll get back to you soon.
              </ThankYouMessage>
            )}
          </ContactForm>
        </ContactContainer>
      </Container>
    </Section>
  );
};

export default ContactPage;
