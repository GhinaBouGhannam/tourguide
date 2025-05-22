
import Header from "./Header";
import React from 'react';
function About(){
  return (
    <>
    <Header/>
    <div style={styles.container}>
      <h1 style={styles.title}>About Discover Baladi</h1>
      <p style={styles.paragraph}>
        The idea of Discover Baladi came to life in the middle of the Lebanese financial crisis by two entrepreneurs who believed that Lebanon still had a lot to offer. Lebanon's beauty and hospitality are its best hope to move past the financial crisis. With the goal of modernizing and organizing Lebanon's tourism sector, Discover Baladi was launched on 2021.
      </p>
      <p style={styles.paragraph}>
      Discover Baladi  quickly became the <strong>#1 travel and tourism app</strong> in Lebanon and a reference for local travels, foreign travelers, and ex-pats alike. Discover Baladi brings together the best Lebanon has to offer, from guesthouses to restaurants and activities. 
      </p>
      <p style={styles.paragraph}>
      Discover Baladi  also highlights things that people cannot Google or find with a social media search, such as scenic drives, sunset spots, kid-friendly restaurants, and more.
      </p>
      
      <h2 style={styles.contactTitle}>Contact Information</h2>
      <div style={styles.contactInfo}>
        <p style={styles.contactItem}>
          <strong>Phone:</strong> +961 71 234 567
        </p>
        <p style={styles.contactItem}>
          <strong>Email:</strong> info@discoverBaladi .com
        </p>
        <p style={styles.contactItem}>
          <strong>Location:</strong> Beirut, Lebanon
        </p>
      </div>
    </div>
    </>
  );
};

// Inline styles
const styles = {
  container: {
    marginTop:'20px',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'left',
    color: '#45a049',
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  paragraph: {
    lineHeight: '1.6',
    color: '#555',
    fontSize: '1.1rem',
    marginBottom: '15px',
  },
  contactTitle: {
    textAlign: 'left',
    color: '#45a049',
    fontSize: '2rem',
    marginTop: '30px',
    marginBottom: '15px',
  },
  contactInfo: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
  },
  contactItem: {
    lineHeight: '1.6',
    color: '#555',
    fontSize: '1rem',
    margin: '5px 0',
  },
};

export default About;