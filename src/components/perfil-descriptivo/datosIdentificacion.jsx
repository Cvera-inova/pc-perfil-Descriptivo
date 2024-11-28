// pages/PerfilDescriptivo.js

import { useState } from 'react';
import Image from 'next/image';
import martilloImage from '@src/assets/images/servicios/atencion-colaborador/perfil/Datos de identifficacion.png';
import AlertaJair from '../alert';
import styles from './datoseIdentificacion.module.css';
import ConfirmacionPopup from '../popUp/ConfirmacionPopup';
import {obtenerSiguienteIdPerfil} from '../../services/idPerfil.dao'

export default function PerfilDescriptivo() {
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Captura los datos del formulario
    const data = {
      nombre_del_cargo: e.target.nombre_del_cargo.value,
      departamento: e.target.departamento.value,
      reporta_a: e.target.reporta_a.value,
      supervisa_a: e.target.supervisa_a.value,
      ciudad: e.target.ciudad.value,
      direccion: e.target.direccion.value,
      teletrabajo: e.target.teletrabajo.value,
      mision_del_cargo: e.target.mision_del_cargo.value,
    };

    // Guarda los datos en el estado y muestra el popup
    setFormData(data);
    setShowConfirmPopup(true);
  };

  const handleConfirm = async () => {
    try {
      const id_new = await obtenerSiguienteIdPerfil()
      const dataToSend = {
        id: id_new, // Puedes generar o asignar el ID que corresponda
        datos_e_identificacion_del_cargo: [
          {
            id: id_new, // Asegúrate de usar el mismo ID o uno adecuado
            ...formData,
          },
        ],
        datos: [
          {
            id: id_new,
            actividades: [],
            responsabilidadYAutoridad: null,
            relacionamiento: null,
          },
        ],
        competencias_requeridas: [
          {
            id: id_new,
            competencias: [],
          },
        ],
        versiones: [
          {
            id: id_new,
            examenes: [],
          },
        ],
        perfiles_detalle: [
          {
            id: `perfil_${id_new}`,
            perfilDuro: null,
            otrosRequerimientos: [],
            condicionesCargo: [],
          },
        ],
        riesgosDelCargo: [
          {
            id: id_new,
            factoresDeRiesgo: [],
          },
        ],
      };

      const response = await fetch('http://51.222.110.107:5011/perfil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error('Error al enviar los datos');

      setAlertMessage('Datos enviados exitosamente!');
      setShowAlert(true);
      setFormData({});

      // Redirigir a la nueva URL
      window.location.href = 'http://localhost:3000/servicios/atencion-colaborador/actividades';
    } catch (error) {
      setAlertMessage('Error al enviar los datos.');
      setShowAlert(true);
    } finally {
      setShowConfirmPopup(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>Perfil y Descriptivo del Cargo</h1>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2>Datos de Identificación del Cargo</h2>
        </div>

        <form className={styles.content} onSubmit={handleSubmit}>
          <div className={styles.imageContainer}>
            <Image
              src={martilloImage}
              alt="Imagen"
              className={styles.sideImage}
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className={styles.formFields}>
            <label>Nombre del Cargo:</label>
            <input name="nombre_del_cargo" type="text" placeholder="Escriba el nombre del cargo" required />

            <label>Departamento:</label>
            <input name="departamento" type="text" placeholder="Escriba el departamento del cargo" required />

            <label>Reporta a:</label>
            <input name="reporta_a" type="text" placeholder="Escriba a quién reporta el cargo" required />

            <label>Supervisa a:</label>
            <input name="supervisa_a" type="text" placeholder="Escriba a quién supervisa el cargo" required />

            <label>Ciudad:</label>
            <input name="ciudad" type="text" placeholder="Escriba la ciudad" required />

            <label>Dirección:</label>
            <input name="direccion" type="text" placeholder="Escriba la dirección" required />

            <label>Teletrabajo:</label>
            <select name="teletrabajo" required>
              <option value="">Seleccione una opción</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>

            <label>Misión del cargo:</label>
            <textarea name="mision_del_cargo" placeholder="Escriba la misión del cargo" required></textarea>

            <button className={styles.nextButton} type="submit">
              Siguiente
            </button>
          </div>
        </form>
      </div>

      {showAlert && <AlertaJair message={alertMessage} onClose={handleCloseAlert} />}
      {showConfirmPopup && (
        <ConfirmacionPopup
          mensaje="¿Está seguro de enviar los datos? Tenga en cuenta que avanzará al siguiente nivel."
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}