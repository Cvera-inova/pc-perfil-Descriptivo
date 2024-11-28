// UnderConstruction.js
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import constructionImage from '@src/assets/images/construccion/obrero-04.gif';
import styles from './UnderConstruction.module.css';

const UnderConstruction = () => {
  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.title}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        ¡Algo Grande Está Llegando!
      </motion.h1>
      <motion.div
        className={styles.imageContainer}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <Image src={constructionImage} alt="Construcción" className={styles.image} />
      </motion.div>
      <motion.p
        className={styles.text}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
      >
        Estamos construyendo un sitio web increíble para ti. ¡Mantente conectado!
      </motion.p>
      <div className={styles.loader}>
        <motion.span
          className={styles.dot}
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut', delay: 0 }}
        ></motion.span>
        <motion.span
          className={styles.dot}
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut', delay: 0.2 }}
        ></motion.span>
        <motion.span
          className={styles.dot}
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut', delay: 0.4 }}
        ></motion.span>
      </div>
    </div>
  );
};

export default UnderConstruction;
