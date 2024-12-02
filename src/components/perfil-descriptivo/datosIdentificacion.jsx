// pages/PerfilDescriptivo.js

import { useState, useEffect } from 'react';
import Image from 'next/image';
import martilloImage from '@src/assets/images/servicios/atencion-colaborador/perfil/Datos de identifficacion.png';
import AlertaJair from '../alert';
import styles from './datoseIdentificacion.module.css';
import ConfirmacionPopup from '../popUp/ConfirmacionPopup';
import {obtenerSiguienteIdPerfil} from '../../services/idPerfil.dao'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createVersion, fetchVersionById, updateVersion } from '@src/services/examenesyValoracionesMedicas.dao';

export default function PerfilDescriptivo( { num }) {
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

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
          console.log(perfil.datos_e_identificacion_del_cargo[0])
          const data = {
            nombre_del_cargo: perfil.datos_e_identificacion_del_cargo[0].nombre_del_cargo,
            departamento: perfil.datos_e_identificacion_del_cargo[0].departamento,
            reporta_a: perfil.datos_e_identificacion_del_cargo[0].reporta_a,
            supervisa_a: perfil.datos_e_identificacion_del_cargo[0].supervisa_a,
            ciudad: perfil.datos_e_identificacion_del_cargo[0].ciudad,
            direccion: perfil.datos_e_identificacion_del_cargo[0].direccion,
            teletrabajo: perfil.datos_e_identificacion_del_cargo[0].teletrabajo,
            mision_del_cargo: perfil.datos_e_identificacion_del_cargo[0].mision_del_cargo,
          };
          setFormData(data);
        } catch (error) {
          console.error("Error fetching the perfil:", error);
          alert("Error al obtener el perfil. Inténtalo nuevamente.");
        }
      }
    };
    fetchData();
}, [num]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

  const handleSubmit = (e) => {
    e.preventDefault();

    if(validateForm()){
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
    }
    else{
      toast.error("Por favor, corrija los errores antes de enviar.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.nombre_del_cargo) errors.nombre_del_cargo = "El nombre es obligatorio.";
    if (!formData.departamento) errors.departamento = "Seleccione un departamento.";
    if (!formData.reporta_a) errors.reporta_a = "Escriba un valor o N/A si no aplica.";
    if (!formData.supervisa_a) errors.supervisa_a = "Escriba un valor o N/A si no aplica";
    if (!formData.ciudad) errors.ciudad = "La ciudad es obliatoria.";
    if (!formData.direccion) errors.direccion = "La dirección es obligatoria.";
    if (!formData.teletrabajo || formData.teletrabajo==='Seleccione una opción') errors.teletrabajo = "El valor de teletrabajo es obligatorio.";
    if (!formData.mision_del_cargo) errors.mision_del_cargo = 'La misión es obligatoria';
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirm = async () => {
    try {
      if(num===0){
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
      }
      else{
        const perfil = await fetchVersionById(num);
        if (!perfil) {
          alert('Error al obtener el perfil. Inténtalo nuevamente.');
          return;
        }
        if (!perfil.datos_e_identificacion_del_cargo || !Array.isArray(perfil.datos_e_identificacion_del_cargo)) {
          perfil.datos_e_identificacion_del_cargo = [];
        }
        const newData={
          datos_e_identificacion_del_cargo: [
            {
              id: num, // Asegúrate de usar el mismo ID o uno adecuado
              ...formData,
            },
          ],
        }
        console.log(newData.datos_e_identificacion_del_cargo)
        perfil.datos_e_identificacion_del_cargo=[newData.datos_e_identificacion_del_cargo[0]];
        //console.log(perfil)
        // Enviar la actualización al backend
        const result = await updateVersion(num, perfil);
        if (result) {
          console.log('Nuevo perfil: ',result)
          // Redirige a otra ruta después de una creación exitosa
          window.location.href = `/servicios/atencion-colaborador/admin/admin-tabla/${num}`; // Cambia esta ruta según sea necesario
        } else {
          alert('No se pudo crear la versión. Por favor, intenta nuevamente.');
        }
      }
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
      <ToastContainer />
      <div className={styles.titleContainer}>
        <h1 className={styles.header}>Perfil y Descriptivo del Cargo</h1>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2 className={styles.header}>Datos de Identificación del Cargo</h2>
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
            <input name="nombre_del_cargo" type="text" placeholder="Escriba el nombre del cargo" required value={formData.nombre_del_cargo} onChange={handleChange} />

            <label>Departamento:</label>
            <input name="departamento" type="text" placeholder="Escriba el departamento del cargo" required value={formData.departamento} onChange={handleChange} />

            <label>Reporta a:</label>
            <input name="reporta_a" type="text" placeholder="Escriba a quién reporta el cargo" required value={formData.reporta_a} onChange={handleChange} />

            <label>Supervisa a:</label>
            <input name="supervisa_a" type="text" placeholder="Escriba a quién supervisa el cargo" required value={formData.supervisa_a} onChange={handleChange} />

            <label>Ciudad:</label>
            <input name="ciudad" type="text" placeholder="Escriba la ciudad" required value={formData.ciudad} onChange={handleChange} />

            <label>Dirección:</label>
            <input name="direccion" type="text" placeholder="Escriba la dirección" required value={formData.direccion} onChange={handleChange} />

            <label>Teletrabajo:</label>
            <select name="teletrabajo" required value={formData.teletrabajo} onChange={handleChange}>
              <option value="">Seleccione una opción</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>

            <label>Misión del cargo:</label>
            <textarea name="mision_del_cargo" placeholder="Escriba la misión del cargo" required value={formData.mision_del_cargo} onChange={handleChange}></textarea>

            <button className={styles.nextButton} type="submit">
              Actualizar
            </button>
          </div>
        </form>
      </div>

      {showAlert && <AlertaJair message={alertMessage} onClose={handleCloseAlert} />}
      {showConfirmPopup && (
        <ConfirmacionPopup
          mensaje="¿Está seguro de enviar los datos? Tenga en cuenta que los resultados serán guardados."
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}