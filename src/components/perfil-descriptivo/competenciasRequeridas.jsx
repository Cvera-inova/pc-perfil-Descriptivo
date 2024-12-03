import React, { useState, useEffect } from 'react';
import { obtenerPerfilPorId, actualizarPerfil } from '@src/services/competenciasRequeridas.Dao';
import styles from './CompetenciasRequeridas.module.css';
import ConfirmacionPopup from '../popUp/ConfirmacionPopup';
import {obtenerSiguienteIdPerfil} from '../../services/idPerfil.dao'
import { createVersion, fetchVersionById, updateVersion } from '@src/services/examenesyValoracionesMedicas.dao';

export default function CompetenciasRequeridas({ num }) {
  const [competencias, setCompetencias] = useState([
    {
      descripcion: '',
      tipo: '',
      grado: '',
    },
  ]);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

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
          console.log(perfil.competencias_requeridas[0])
          setCompetencias(perfil.competencias_requeridas[0].competencias)
        } catch (error) {
          console.error("Error fetching the perfil:", error);
          alert("Error al obtener el perfil. Inténtalo nuevamente.");
        }
      }
    };
    fetchData();
}, [num]);

  const agregarCompetencia = () => {
    setCompetencias([
      ...competencias,
      {
        descripcion: '',
        tipo: '',
        grado: '',
      },
    ]);
    setError('');
  };

  const eliminarCompetencia = (index) => {
    const nuevasCompetencias = competencias.filter((_, i) => i !== index);
    setCompetencias(nuevasCompetencias);
  };

  const actualizarCompetencia = (index, campo, valor) => {
    const nuevasCompetencias = [...competencias];
    nuevasCompetencias[index][campo] = valor;
    setCompetencias(nuevasCompetencias);
    setError('');
  };

  const validarCompetencias = () => {
    for (const competencia of competencias) {
      if (!competencia.descripcion || !competencia.tipo || !competencia.grado) {
        return false;
      }
    }
    return true;
  };

  const enviarCompetencias = () => {
    if (!validarCompetencias()) {
      setError('Por favor, complete todos los campos de las competencias.');
      return;
    }

    // Mostrar el pop-up de confirmación
    setShowPopup(true);
  };

  const manejarConfirmacion = async () => {
    setShowPopup(false);

    try {
      if(num===0){
        // Obtener el perfil existente
        const id_new = (await obtenerSiguienteIdPerfil())-1
        const perfilExistente = await obtenerPerfilPorId(id_new);

        // Actualizar la sección de competencias_requeridas
        const nuevasCompetenciasRequeridas = [
          {
            id: id_new,
            competencias: competencias.map((competencia) => ({
              descripcion: competencia.descripcion,
              tipo: competencia.tipo,
              grado: competencia.grado,
            })),
          },
        ];

        // Fusionar las nuevas competencias con el perfil existente
        const perfilActualizado = {
          ...perfilExistente,
          competencias_requeridas: nuevasCompetenciasRequeridas,
        };

        // Enviar el perfil completo actualizado al backend
        const resultado = await actualizarPerfil(id_new, perfilActualizado);

        if (resultado) {
          console.log('Competencias enviadas:', resultado);
          alert('Competencias enviadas exitosamente.');

          // Resetear el formulario
          setCompetencias([{ descripcion: '', tipo: '', grado: '' }]);
          setError('');

          // Redirigir a otra página
          window.location.href = 'http://localhost:3000/servicios/atencion-colaborador/perfilDuro';
        } else {
          console.error('Error al enviar competencias:', perfilActualizado);
          alert('Ocurrió un error al enviar las competencias.');
          
        }
      }
      else{
        const perfil = await fetchVersionById(num);
        if (!perfil) {
          alert('Error al obtener el perfil. Inténtalo nuevamente.');
          return;
        }
        const nuevasCompetenciasRequeridas = [
          {
            id: num,
            competencias: competencias.map((competencia) => ({
              descripcion: competencia.descripcion,
              tipo: competencia.tipo,
              grado: competencia.grado,
            })),
          },
        ];

        // Fusionar las nuevas competencias con el perfil existente
        const perfilActualizado = {
          ...perfil,
          competencias_requeridas: nuevasCompetenciasRequeridas,
        };

        // Enviar el perfil completo actualizado al backend
        const resultado = await actualizarPerfil(num, perfilActualizado);

        if (resultado) {
          console.log('Competencias enviadas:', resultado);
          alert('Competencias enviadas exitosamente.');

          // Resetear el formulario
          setCompetencias([{ descripcion: '', tipo: '', grado: '' }]);
          setError('');

          // Redirigir a otra página
          window.location.href = `/servicios/atencion-colaborador/admin/admin-tabla/${num}`;
        } else {
          console.error('Error al actualizar competencias:', perfilActualizado);
          alert('Ocurrió un error al actualizar las competencias.');
        }
      }
    } catch (error) {
      console.error('Error al enviar competencias:', error);
      alert('Ocurrió un error al enviar las competencias.');
    }
  };

  const manejarCancelacion = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.titleText}>Perfil y Descriptivo del Cargo</h1>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.competenciasHeader}>
          <h2 className={styles.competenciasText}>
            Competencias requeridas para el óptimo desenvolvimiento de un cargo
          </h2>
        </div>

        {competencias.map((competencia, index) => (
          <div key={index} className={styles.competenciaSection}>
            <label>Descripción de la competencia:</label>
            <textarea
              value={competencia.descripcion}
              onChange={(e) => actualizarCompetencia(index, 'descripcion', e.target.value)}
              placeholder="Escriba la descripción de la competencia"
              className={competencia.descripcion ? '' : styles.invalidField}
            />

            <div className={styles.row}>
              <div className={styles.actividadSection}>
                <label>Tipo de competencia:</label>
                <select
                  value={competencia.tipo}
                  onChange={(e) => actualizarCompetencia(index, 'tipo', e.target.value)}
                  className={competencia.tipo ? '' : styles.invalidField}
                >
                  <option value="" disabled>
                    Seleccione una opción
                  </option>
                  <option value="Competencia técnica">Competencia técnica</option>
                  <option value="Competencia interpersonal">Competencia interpersonal</option>
                  <option value="Competencia organizacional">Competencia organizacional</option>
                </select>
              </div>

              <div className={styles.actividadSection}>
                <label>Grado de competencia:</label>
                <select
                  value={competencia.grado}
                  onChange={(e) => actualizarCompetencia(index, 'grado', e.target.value)}
                  className={competencia.grado ? '' : styles.invalidField}
                >
                  <option value="" disabled>
                    Seleccione una opción
                  </option>
                  <option value="Básico">Básico</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button type="button" onClick={agregarCompetencia} className={styles.addButton}>
                +
              </button>
              {competencias.length > 1 && (
                <button type="button" onClick={() => eliminarCompetencia(index)} className={styles.removeButton}>
                  -
                </button>
              )}
            </div>
          </div>
        ))}

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.buttonContainer}>
          <button className={styles.nextButton} onClick={enviarCompetencias}>
            {num!=0?"Actualizar":"Siguente"}
          </button>
        </div>
      </div>

      {showPopup && (
        <ConfirmacionPopup
          mensaje="¿Está seguro de que quiere avanzar? Los datos se subirán al sistema."
          onConfirm={manejarConfirmacion}
          onCancel={manejarCancelacion}
        />
      )}
    </div>
  );
}