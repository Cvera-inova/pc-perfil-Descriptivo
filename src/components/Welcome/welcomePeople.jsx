// components/WelcomeModule.js
import React, { useEffect, useState } from 'react';
import styles from './werlcome.module.css'; // Importa el CSS como un módulo
import TransitionWrapper from '../transicion/transicion';

const WelcomeModule = () => {
  const [showBlur, setShowBlur] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBlur(false); // Cambia el estado para ocultar el desenfoque después de 2 segundos
    }, 2000);

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar
  }, []);

  const handleButtonClick = () => {
    window.location.href = 'http://localhost:3000/servicios/atencion-colaborador/actividades'; // Redirige a la URL especificada
  };

  return (
    <TransitionWrapper> {/* Envuelve el contenido en TransitionWrapper */}
      <div className={styles.welcomeModule}>
        <div className={styles.welcomeHeader}>
          <h1 className={styles.animatedText}>¡Bienvenidos a People Connect!</h1>
          <p className={styles.welcomeSubtitle}>Conectando talentos con oportunidades.</p>
        </div>
        <div className={styles.moduleDescription}>
          <h2>Estamos en el módulo para añadir un perfil descriptivo del cargo</h2>
          <p>
            Aquí podrás crear y gestionar perfiles que reflejen las habilidades, experiencias y requisitos del cargo.
            Añade detalles relevantes que ayuden a encontrar el candidato ideal para tu equipo.
          </p>
        </div>
        <div className={styles.featuresContainer}>
          <h3>Características clave:</h3>
          <ul className={styles.featuresList}>
            <li>🔍 **Búsqueda fácil de candidatos**</li>
            <li>📄 **Gestión de perfiles intuitiva**</li>
            <li>🌐 **Integración con redes profesionales**</li>
          </ul>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.startButton} onClick={handleButtonClick}>
            ¡Comenzar!
          </button>
        </div>
        {showBlur && <div className={styles.blurOverlay}></div>} {/* Muestra el desenfoque si el estado es true */}
      </div>
    </TransitionWrapper>
  );
};

export default WelcomeModule;
