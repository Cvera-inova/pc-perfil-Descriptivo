// components/Alert.js

import { useEffect } from 'react';

const AlertaJair = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // La alerta se cierra después de 3 segundos

    return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
  }, [onClose]);

  return (
    <div style={styles.alert}>
      {message}
      <button onClick={onClose} style={styles.closeButton}>X</button>
    </div>
  );
};

const styles = {
  alert: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '15px',
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '300px',
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    marginLeft: '15px',
  },
};

export default AlertaJair;
