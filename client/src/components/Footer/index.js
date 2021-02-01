import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Styled Components
/* import { FooterWrapper, SocialMediaWrapper } from './styles'; */
import './Footer.css'

// Social Media Icons
/* import { ReactComponent as Twitter } from '../../assets/icons/twitter.svg';
import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg';
import { ReactComponent as YouTube } from '../../assets/icons/youtube.svg';
import { ReactComponent as Instagram } from '../../assets/icons/instagram.svg'; */

const Footer = () => {

  return (
    <footer className="footer-wrapper">
      <nav className="nav-foo">
        <ul>
          <li><Link id="link">Terms & Conditions</Link></li>
          <li><Link id="link">Privacy Policy</Link></li>
          <li><Link id="link">Contact</Link></li>
        </ul>
        <div className="footer-page">
          <div className="social-foo">
            <ul className="footer-ul">
              <li>
                <a href="https://www.facebook.com/PC-Creative-101512221940205/" target="_blank" rel="noreferrer" id="media-links"><FaFacebookF className="icons" /></a>
              </li>
              <li>
                <a href="https://twitter.com/PCCreative1" target="_blank" rel="noreferrer" id="media-links"><FaTwitter className="icons" /></a>
              </li>
              <li>
                <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" id="media-links"><FaYoutube className="icons" /></a>
              </li>
              <li>
                <a href="https://www.instagram.com/pc.creative.hlabs/" target="_blank" rel="noreferrer" id="media-link s"><FaInstagram className="icons" /></a>
              </li>
            </ul>
          </div>
          <div className="disclaimer-foo">
            <p className="copy">&copy; {new Date().getFullYear()} BuildHUB. All rights reserved.</p>
          </div>
        </div>

      </nav>
    </footer>
    /* 
    <div className="div-body">
    <FooterWrapper>

      <SocialMediaWrapper>
        <Twitter />
        <Facebook />
        <YouTube />
        <Instagram />
      </SocialMediaWrapper>

      <a href='/'>Terminos de uso </a> 
      <a href='/'>Declaración de privacidad </a> 
      <a href='/'>Centro de ayuda</a>

    </FooterWrapper>
    </div>
       */
  );
};

export default Footer;
