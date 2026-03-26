import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      DISCIPLINE IS THE KEY TO SUCCESS!
    </footer>
  );
};

const footerStyle = {
  textAlign: 'center',
  padding: '1rem',
  fontWeight: 'bold',
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor:'black',
  color:'white'
};

export default Footer;