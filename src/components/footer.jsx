import React from 'react';
import Image from 'next/image';
import logo from '../assets/images/image 7.png';
import facebookIcon from '../assets/images/Vector.svg';
import twitterIcon from '../assets/images/Vector (2).svg';
import instagramIcon from '../assets/images/Vector (1).svg';
import microsoftIcon from '../assets/images/Group 8.svg';
import './responsive.css';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.logoContainer} className='logoContainer'>
          <Image src={logo} alt="Logo" height={100} />
        </div>
        <div style={styles.textContainer}>
          <h5 style={styles.text} className='text'>Tu pasaporte a la nube.</h5>
        </div>
        <div style={styles.iconsContainer}>
          <a href="#" style={styles.iconLink}>
            <Image src={facebookIcon} alt="Facebook" height={30} />
          </a>
          <a href="#" style={styles.iconLink}>
            <Image src={twitterIcon} alt="Twitter" height={30} />
          </a>
          <a href="#" style={styles.iconLink}>
            <Image src={instagramIcon} alt="Instagram" height={30} />
          </a>
          <a href="#" style={{ ...styles.iconLink, marginLeft: 50 }} className="microsoft-icon">
            <Image src={microsoftIcon} alt="Microsoft" height={30} />
          </a>
        </div>
      </div>
    </footer>
  );
}
const styles = {
  footer: {
    backgroundColor: '#21498e',
    color: 'white',
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    padding: '0 20px',
    boxSizing: 'border-box',
  },
  logoContainer: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  textContainer: {
    flex: '2',
    textAlign: 'center',
  },
  text: {
    fontStyle: 'italic',
    fontFamily: 'Cambria, Cochin',
    fontSize: '25px',
    margin: '0',
  },
  iconsContainer: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconLink: {
    color: 'white',
    margin: '0 10px',
    display: 'inline-block',
  },
};
