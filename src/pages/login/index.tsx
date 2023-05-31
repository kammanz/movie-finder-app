import React from 'react';
import Form from '../../components/form';
import styles from './index.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      <Form isSignup={false} />
    </div>
  );
};

export default Login;
