import React, { useState, useEffect } from 'react';
import styles from '../perfil-descriptivo/RiesgosDelCargo.module.css';
import { createRiesgoDelCargo, updateRiesgoDelCargo, fetchRiesgoDelCargoById } from '@src/services/riesgos.dao';
import ConfirmacionPopup from '../popUp/ConfirmacionPopup';
import AlertaJair from '../alert';

export default function AdminRiesgosDelCargo() {
  const [equiposProteccion, setEquiposProteccion] = useState({
    mascarilla: false,
    gafas: false,
    guante: false,
    vestimenta: false,
  });

  const [riesgos, setRiesgos] = useState({
    mecanico: Array.from({ length: 3 }, () => ({})),
    quimico: Array.from({ length: 2 }, () => ({})),
    electrico: Array.from({ length: 3 }, () => ({})),
  });

  const [idRiesgo, setIdRiesgo] = useState(null); 
  const [showPopup, setShowPopup] = useState(false); // Control para el popup de confirmación
  const [alertMessage, setAlertMessage] = useState(''); // Mensaje de alerta
  const [showAlert, setShowAlert] = useState(false); // Control para la alerta

  useEffect(() => {
    const cargarDatos = async () => {
      const data = await fetchRiesgoDelCargoById(1730651315882  );
      if (data) {
        setIdRiesgo(data.id);
        setRiesgos({
          mecanico: data.factoresDeRiesgo.find(r => r.tipo === 'Mecánico').riesgos,
          quimico: data.factoresDeRiesgo.find(r => r.tipo === 'Químico').riesgos,
          electrico: data.factoresDeRiesgo.find(r => r.tipo === 'Eléctrico').riesgos,
        });
      }
    };

    cargarDatos();
  }, []);

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

  const confirmarActualizacion = () => {
    setShowPopup(false); // Cierra el popup de confirmación
    actualizarDatos(); // Llama a la función de actualización
  };

  const actualizarDatos = async () => {
    const riesgoActualizado = {
      id: idRiesgo,
      factoresDeRiesgo: [
        {
          tipo: "Mecánico",
          riesgos: riesgos.mecanico.map((item, index) => ({
            peligroIdentificado: item.peligroIdentificado || `Peligro Mecánico ${index + 1}`,
            descripcion: item.descripcion || "Describa la situación de riesgo relacionada con el peligro mecánico",
            probabilidad: item.probabilidad || 'B',
            consecuencia: item.consecuencia || 'LD',
            nivelDeRiesgo: item.nivelDeRiesgo || 'TV',
          })),
        },
        {
          tipo: "Químico",
          riesgos: riesgos.quimico.map((item, index) => ({
            peligroIdentificado: item.peligroIdentificado || `Peligro Químico ${index + 1}`,
            descripcion: item.descripcion || "Describa la situación de riesgo relacionada con el peligro químico",
            probabilidad: item.probabilidad || 'B',
            consecuencia: item.consecuencia || 'LD',
            nivelDeRiesgo: item.nivelDeRiesgo || 'TV',
          })),
        },
        {
          tipo: "Eléctrico",
          riesgos: riesgos.electrico.map((item, index) => ({
            peligroIdentificado: item.peligroIdentificado || `Peligro Eléctrico ${index + 1}`,
            descripcion: item.descripcion || "Describa la situación de riesgo relacionada con el peligro eléctrico",
            probabilidad: item.probabilidad || 'B',
            consecuencia: item.consecuencia || 'LD',
            nivelDeRiesgo: item.nivelDeRiesgo || 'TV',
          })),
        },
      ],
    };

    try {
      const result = await updateRiesgoDelCargo(idRiesgo, riesgoActualizado);
      console.log('Riesgo actualizado exitosamente:', result);
      setAlertMessage('Riesgo actualizado correctamente'); // Mensaje de éxito
      setShowAlert(true); // Mostrar alerta
    } catch (error) {
      console.error('Error al actualizar el riesgo del cargo:', error);
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
              value={riesgos[tipo][index]?.peligroIdentificado || ''}
              onChange={(e) => handleInputChange(tipo, index, 'peligroIdentificado', e.target.value)}
            />
          </div>
          <div className={styles.identificacionRow}>
            <label>Descripción:</label>
            <input
              type="text"
              placeholder="Describa la situación de riesgo"
              className={styles.textInput}
              value={riesgos[tipo][index]?.descripcion || ''}
              onChange={(e) => handleInputChange(tipo, index, 'descripcion', e.target.value)}
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
                      checked={riesgos[tipo][index]?.probabilidad === value}
                      onChange={() => handleInputChange(tipo, index, 'probabilidad', value)}
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
                      checked={riesgos[tipo][index]?.consecuencia === value}
                      onChange={() => handleInputChange(tipo, index, 'consecuencia', value)}
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
                      checked={riesgos[tipo][index]?.nivelDeRiesgo === value}
                      onChange={() => handleInputChange(tipo, index, 'nivelDeRiesgo', value)}
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

        {renderRiesgoSection('Factores de Riesgo Mecánicos', 'mecanico', 3)}
        {renderRiesgoSection('Factores de Riesgo Químicos', 'quimico', 2)}
        {renderRiesgoSection('Factores de Riesgo Eléctricos', 'electrico', 3)}

        <div className={styles.equiposProteccion}>
          <h3>Equipos de Protección</h3>
          {Object.keys(equiposProteccion).map((equipo) => (
            <div key={equipo}>
              <label>
                <input
                  type="checkbox"
                  checked={equiposProteccion[equipo]}
                  onChange={() => handleEquipoChange(equipo)}
                />
                {equipo.charAt(0).toUpperCase() + equipo.slice(1)}
              </label>
            </div>
          ))}
        </div>

        <div className={styles.botonActualizarContainer}>
          <button className={styles.botonActualizar} onClick={() => setShowPopup(true)}>Actualizar</button>
        </div>

        {showPopup && (
          <ConfirmacionPopup 
            onConfirm={confirmarActualizacion} 
            onCancel={() => setShowPopup(false)} 
            message="¿Está seguro de que desea actualizar los riesgos?" 
          />
        )}

        {showAlert && (
          <AlertaJair 
            message={alertMessage} 
            onClose={() => setShowAlert(false)} 
          />
        )}
      </div>
    </div>
  );
}
