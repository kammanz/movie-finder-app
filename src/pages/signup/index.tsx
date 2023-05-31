import React from 'react';
import Form from '../../components/form';
import styles from './index.module.css';

const Signup = () => {
  return (
    <div className={styles.container}>
      <Form isSignup={true} />
    </div>
  );
};

export default Signup;
