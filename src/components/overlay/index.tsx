import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingOverlay = ({ isLoading }: { isLoading: boolean }) => {
  return isLoading ? (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FaSpinner size={50} color="black" />
    </div>
  ) : null;
};

export default LoadingOverlay;
