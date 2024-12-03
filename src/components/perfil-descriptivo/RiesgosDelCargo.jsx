// src/components/perfil-descriptivo/RiesgosDelCargo.jsx

import React, { useState, useEffect } from 'react';
import styles from './RiesgosDelCargo.module.css';
import { updateRiesgosDelCargo } from '@src/services/riesgos.dao'; // Asegúrate de que la ruta sea correcta
import {obtenerSiguienteIdPerfil} from '../../services/idPerfil.dao'
import { fetchVersionById } from '@src/services/examenesyValoracionesMedicas.dao';

export default function RiesgosDelCargo({num}) {
  const [equiposProteccion, setEquiposProteccion] = useState({
    mascarilla: false,
    gafas: false,
    guante: false,
    vestimenta: false,
  });

  const [riesgos, setRiesgos] = useState({
    mecanico: Array.from({ length: 3 }, () => ({
      peligroIdentificado: '',
      descripcion: '',
      probabilidad: '',
      consecuencia: '',
      nivelDeRiesgo: '',
    })),
    quimico: Array.from({ length: 2 }, () => ({
      peligroIdentificado: '',
      descripcion: '',
      probabilidad: '',
      consecuencia: '',
      nivelDeRiesgo: '',
    })),
    electrico: Array.from({ length: 3 }, () => ({
      peligroIdentificado: '',
      descripcion: '',
      probabilidad: '',
      consecuencia: '',
      nivelDeRiesgo: '',
    })),
  });

  useEffect(() => {console.log(riesgos)},[riesgos])

  useEffect(() => {
    const fetchData = async () => {
      console.log("Component initialized with num:", num);
      if (num !== 0) {
        try {
          const perfil = await fetchVersionById(num); // Replace `id_new` with `num`
          if (!perfil) {
            alert("Error al obtener el perfil. Inténtalo nuevamente.");
            setShowPopup(false);
            return;
          }
          console.log(perfil.riesgosDelCargo[0].factoresDeRiesgo)
          const datosRiesgoMecanico = perfil.riesgosDelCargo[0].factoresDeRiesgo[0].riesgos
          const datosRiesgoQuimico = perfil.riesgosDelCargo[0].factoresDeRiesgo[1].riesgos
          const datosRiesgoElectrico = perfil.riesgosDelCargo[0].factoresDeRiesgo[2].riesgos
          console.log(datosRiesgoMecanico)
          console.log(datosRiesgoElectrico)
          console.log(datosRiesgoQuimico)
          console.log(riesgos)
          //setRiesgos({...riesgos, [mecanico]:datosRiesgoMecanico})
        } catch (error) {
          console.error("Error fetching the perfil:", error);
          alert("Error al obtener el perfil. Inténtalo nuevamente2.");
        }
      }
    };
    fetchData();
}, [num]);

  const handleEquipoChange = (equipo) => {
    setEquiposProteccion((prev) => ({
      ...prev,
      [equipo]: !prev[equipo],
    }));
  };

  const handleInputChange = (type, index, field, value) => {
    setRiesgos((prev) => {
      const updatedRiesgos = { ...prev };
      updatedRiesgos[type][index] = {
        ...updatedRiesgos[type][index],
        [field]: value,
      };
      return updatedRiesgos;
    });
  };

  const enviarDatos = async () => {
    // Validar que todos los campos estén llenos
    const camposIncompletos = Object.keys(riesgos).some((tipo) =>
      riesgos[tipo].some((riesgo, index) => {
        if (
          !riesgo.peligroIdentificado.trim() ||
          !riesgo.descripcion.trim() ||
          !riesgo.probabilidad ||
          !riesgo.consecuencia ||
          !riesgo.nivelDeRiesgo
        ) {
          alert(
            `Por favor completa todos los campos del riesgo ${tipo} número ${
              index + 1
            }`
          );
          return true;
        }
        return false;
      })
    );

    if (camposIncompletos) {
      return; // Detener la ejecución de la función
    }

    // Construir los nuevos factores de riesgo
    const nuevosFactoresDeRiesgo = [
      {
        tipo: 'Mecánico',
        riesgos: riesgos.mecanico.map((item, index) => ({
          peligroIdentificado: item.peligroIdentificado,
          descripcion: item.descripcion,
          probabilidad: item.probabilidad,
          consecuencia: item.consecuencia,
          nivelDeRiesgo: item.nivelDeRiesgo,
        })),
      },
      {
        tipo: 'Químico',
        riesgos: riesgos.quimico.map((item, index) => ({
          peligroIdentificado: item.peligroIdentificado,
          descripcion: item.descripcion,
          probabilidad: item.probabilidad,
          consecuencia: item.consecuencia,
          nivelDeRiesgo: item.nivelDeRiesgo,
        })),
      },
      {
        tipo: 'Eléctrico',
        riesgos: riesgos.electrico.map((item, index) => ({
          peligroIdentificado: item.peligroIdentificado,
          descripcion: item.descripcion,
          probabilidad: item.probabilidad,
          consecuencia: item.consecuencia,
          nivelDeRiesgo: item.nivelDeRiesgo,
        })),
      },
    ];

    try {
      const id_new = (await obtenerSiguienteIdPerfil())-1
      const result = await updateRiesgosDelCargo(id_new, nuevosFactoresDeRiesgo);
      if (result) {
        console.log('Riesgos del cargo actualizados exitosamente:', result);
        // Redirigir a otra página después de enviar los datos
        window.location.href =
          'http://localhost:3000/servicios/atencion-colaborador/examenesMedicos';
      } else {
        console.error('No se pudo actualizar los riesgos del cargo.');
        alert('No se pudo actualizar los riesgos del cargo. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al actualizar los riesgos del cargo:', error);
      alert('Ocurrió un error al actualizar los riesgos del cargo. Por favor, intenta nuevamente.');
    }
  };

  const renderRiesgoSection = (title, tipo, cantidad) => (
    <div className={styles.riesgoSection}>
      <h3>{title}</h3>
      {Array.from({ length: cantidad }).map((_, index) => (
        <div key={index} className={styles.riesgoItem}>
          <div className={styles.identificacionRow}>
            <label>Peligro Identificado:</label>
            <input
              type="text"
              placeholder="Describa el peligro identificado"
              className={styles.textInput}
              value={riesgos[tipo][index].peligroIdentificado}
              onChange={(e) =>
                handleInputChange(tipo, index, 'peligroIdentificado', e.target.value)
              }
            />
          </div>
          <div className={styles.identificacionRow}>
            <label>Descripción:</label>
            <input
              type="text"
              placeholder="Describa la situación de riesgo"
              className={styles.textInput}
              value={riesgos[tipo][index].descripcion}
              onChange={(e) =>
                handleInputChange(tipo, index, 'descripcion', e.target.value)
              }
            />
          </div>
          <div className={styles.seleccionRow}>
            <div className={styles.radioGroup}>
              <label>Probabilidad:</label>
              <div className={styles.square}>
                {['B', 'M', 'A'].map((value) => (
                  <label key={value} className={styles.radioOption}>
                    <input
                      type="radio"
                      name={`probabilidad-${tipo}-${index}`}
                      value={value}
                      className={styles.radioInput}
                      checked={riesgos[tipo][index].probabilidad === value}
                      onChange={() =>
                        handleInputChange(tipo, index, 'probabilidad', value)
                      }
                    />
                    {value}
                  </label>
                ))}
              </div>
            </div>
            <div className={styles.radioGroup}>
              <label>Consecuencia:</label>
              <div className={styles.square}>
                {['LD', 'D', 'ED'].map((value) => (
                  <label key={value} className={styles.radioOption}>
                    <input
                      type="radio"
                      name={`consecuencia-${tipo}-${index}`}
                      value={value}
                      className={styles.radioInput}
                      checked={riesgos[tipo][index].consecuencia === value}
                      onChange={() =>
                        handleInputChange(tipo, index, 'consecuencia', value)
                      }
                    />
                    {value}
                  </label>
                ))}
              </div>
            </div>
            <div className={styles.radioGroup}>
              <label>Nivel de Riesgo:</label>
              <div className={styles.square}>
                {['TV', 'TOL', 'MOD', 'IMP', 'INT'].map((value) => (
                  <label key={value} className={styles.radioOption}>
                    <input
                      type="radio"
                      name={`nivel-${tipo}-${index}`}
                      value={value}
                      className={styles.radioInput}
                      checked={riesgos[tipo][index].nivelDeRiesgo === value}
                      onChange={() =>
                        handleInputChange(tipo, index, 'nivelDeRiesgo', value)
                      }
                    />
                    {value}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>Perfil y Descriptivo del Cargo</h1>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.profileContainer}>
          <h2 className={styles.profileTitle}>Riesgos del Cargo</h2>
        </div>

        {renderRiesgoSection('Factores de Riesgo Mecánico', 'mecanico', 3)}
        {renderRiesgoSection('Factores de Riesgo Químico', 'quimico', 2)}
        {renderRiesgoSection('Factores de Riesgo Eléctrico', 'electrico', 3)}

        <button className={styles.nextButton} onClick={enviarDatos}>
          Enviar
        </button>
      </div>
    </div>
  );
}