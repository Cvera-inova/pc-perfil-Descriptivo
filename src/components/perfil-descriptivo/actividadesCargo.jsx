import { ActividadesService } from '@src/services/actividadesCargo.Dao';
import React, { useState, useEffect } from 'react';
import ConfirmacionPopup from '../popUp/ConfirmacionPopup';
import {obtenerSiguienteIdPerfil} from '../../services/idPerfil.dao'
import { fetchVersionById } from '@src/services/examenesyValoracionesMedicas.dao';

export default function ActividadesDelCargo({ num }) {
  const [responsabilidad, setResponsabilidad] = useState('');
  const [autoridad, setAutoridad] = useState('');
  const [relacionamiento, setRelacionamiento] = useState({
    clientesInternos: { aplica: '' },
    clientesExternos: { aplica: '' },
    ausenciaTemporal: '',
  });

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
          console.log(perfil.datos[0])
          setActividades(perfil.datos[0].actividades)
          setRelacionamiento(perfil.datos[0].relacionamiento)
          setResponsabilidad(perfil.datos[0].responsabilidadYAutoridad.responsabilidad)
          setAutoridad(perfil.datos[0].responsabilidadYAutoridad.autoridad)
        } catch (error) {
          console.error("Error fetching the perfil:", error);
          alert("Error al obtener el perfil. Inténtalo nuevamente.");
        }
      }
    };
    fetchData();
}, [num]);

  const [actividades, setActividades] = useState([
    {
      id: 1,
      actividad: '',
      indicadoresKPI: '',
      formulaMedicion: '',
      frecuencia: 1,
      impacto: 1,
      dificultad: 1,
      total: 28,
      esEsencial: 'Sí',
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);

  const agregarActividad = () => {
    setActividades([
      ...actividades,
      {
        id: actividades.length + 1,
        actividad: '',
        indicadoresKPI: '',
        formulaMedicion: '',
        frecuencia: 1,
        impacto: 1,
        dificultad: 1,
        total: 28,
        esEsencial: 'Sí',
      },
    ]);
  };

  const eliminarActividad = (index) => {
    if (actividades.length > 1) {
      const nuevasActividades = actividades.filter((_, i) => i !== index);
      setActividades(nuevasActividades);
    }
  };

  const actualizarActividad = (index, campo, valor) => {
    const nuevasActividades = [...actividades];
    nuevasActividades[index][campo] = valor;
    setActividades(nuevasActividades);
  };

  const validarCampos = () => {
    if (!responsabilidad.trim() || !autoridad.trim()) {
      alert('Los campos de responsabilidad y autoridad son obligatorios.');
      return false;
    }

    for (const actividad of actividades) {
      if (
        !actividad.actividad.trim() ||
        !actividad.indicadoresKPI.trim() ||
        !actividad.formulaMedicion.trim()
      ) {
        alert('Todas las actividades deben tener actividad, indicadores KPI y fórmula de medición.');
        return false;
      }
    }

    if (!relacionamiento.clientesInternos.aplica || !relacionamiento.clientesExternos.aplica) {
      alert('Es necesario indicar el relacionamiento con clientes internos y externos.');
      return false;
    }

    return true;
  };

  const guardarActividades = () => {
    if (validarCampos()) {
      setShowPopup(true);
    }
  };

  const confirmarGuardarActividades = async () => {
    try {
      // Obtener el perfil existente
      if (num===0){
        const id_new = (await obtenerSiguienteIdPerfil())-1
        const perfilExistente = await ActividadesService.obtenerActividadPorId(id_new);

        // Actualizar solo la sección 'datos'
        const nuevosDatos = [
          {
            id: id_new,
            actividades,
            responsabilidadYAutoridad: {
              responsabilidad,
              autoridad,
            },
            relacionamiento,
          },
        ];

        // Fusionar los nuevos datos con el perfil existente
        const perfilActualizado = {
          ...perfilExistente,
          datos: nuevosDatos,
        };

        // Enviar el perfil completo actualizado al backend
        await ActividadesService.actualizarActividad(id_new, perfilActualizado);

        alert('Actividades guardadas exitosamente!');
        window.location.href = 'http://localhost:3000/servicios/atencion-colaborador/competencias';
      }
      else{
        const perfil = await fetchVersionById(num);
        if (!perfil) {
          alert('Error al obtener el perfil. Inténtalo nuevamente.');
          return;
        }
        const nuevosDatos = [
          {
            id: num,
            actividades,
            responsabilidadYAutoridad: {
              responsabilidad,
              autoridad,
            },
            relacionamiento,
          },
        ];

        // Fusionar los nuevos datos con el perfil existente
        const perfilActualizado = {
          ...perfil,
          datos: nuevosDatos,
        };
        // Enviar el perfil completo actualizado al backend
        await ActividadesService.actualizarActividad(num, perfilActualizado);

        alert('Actividades guardadas exitosamente!');
        window.location.href = `/servicios/atencion-colaborador/admin/admin-tabla/${num}`;
      }
      
    } catch (error) {
      console.error(error);
      alert('Error al guardar las actividades');
    }
    setShowPopup(false);
  };

  return (
    <div className="container">
      <div className="title-container">
        <h1>Perfil y Descriptivo del Cargo</h1>
      </div>

      <div className="form-container">
        <div className="form-header">
          <h2>Actividades del Cargo</h2>
        </div>

        {/* Campos de Responsabilidad y Autoridad */}
        <div className="actividad-section">
          <label>Responsabilidad:</label>
          <textarea
            value={responsabilidad}
            onChange={(e) => setResponsabilidad(e.target.value)}
            placeholder="Describa la responsabilidad del cargo"
            style={{ height: '150px' }}
          />
        </div>

        <div className="actividad-section">
          <label>Autoridad:</label>
          <textarea
            value={autoridad}
            onChange={(e) => setAutoridad(e.target.value)}
            placeholder="Describa la autoridad del cargo"
            style={{ height: '150px' }}
          />
        </div>

        {/* Campos de Relacionamiento */}
        <div className="row">
          <div className="actividad-section" style={{ flex: '1' }}>
            <label>Relacionamiento con Clientes Internos:</label>
            <select
              onChange={(e) =>
                setRelacionamiento({
                  ...relacionamiento,
                  clientesInternos: { aplica: e.target.value },
                })
              }
              defaultValue=""
              value={relacionamiento.clientesInternos.aplica}
            >
              <option value="" disabled>
                Seleccione una opción
              </option>
              <option value="APLICA">APLICA</option>
              <option value="NO APLICA">NO APLICA</option>
            </select>
          </div>

          <div className="actividad-section" style={{ flex: '1' }}>
            <label>Relacionamiento con Clientes Externos:</label>
            <select
              onChange={(e) =>
                setRelacionamiento({
                  ...relacionamiento,
                  clientesExternos: { aplica: e.target.value },
                })
              }
              defaultValue=""
              value={relacionamiento.clientesExternos.aplica}
            >
              <option value="" disabled>
                Seleccione una opción
              </option>
              <option value="APLICA">APLICA</option>
              <option value="NO APLICA">NO APLICA</option>
            </select>
          </div>

          <div className="actividad-section" style={{ flex: '1' }}>
            <label>En caso de ausencia será reemplazado por:</label>
            <input
              type="text"
              value={relacionamiento.ausenciaTemporal}
              onChange={(e) =>
                setRelacionamiento({ ...relacionamiento, ausenciaTemporal: e.target.value })
              }
              placeholder="Nombre de la persona que reemplazará"
            />
          </div>
        </div>

        {/* Lista de Actividades */}
        {actividades.map((actividad, index) => (
          <div key={index} className="actividad-section">
            <label>Actividad:</label>
            <textarea
              value={actividad.actividad}
              onChange={(e) => actualizarActividad(index, 'actividad', e.target.value)}
              placeholder="Escriba la actividad del cargo"
            />

            <label>Indicador KPI:</label>
            <input
              type="text"
              value={actividad.indicadoresKPI}
              onChange={(e) => actualizarActividad(index, 'indicadoresKPI', e.target.value)}
              placeholder="Escriba el indicador de KPI"
            />

            <label>Fórmula de Medición:</label>
            <input
              type="text"
              value={actividad.formulaMedicion}
              onChange={(e) => actualizarActividad(index, 'formulaMedicion', e.target.value)}
              placeholder="Escriba la fórmula de medición"
            />

            {/* Campos de Frecuencia, Impacto y Dificultad */}
            <div className="row">
              <div>
                <label>Frecuencia:</label>
                <select
                  value={actividad.frecuencia}
                  onChange={(e) => actualizarActividad(index, 'frecuencia', e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div>
                <label>Impacto:</label>
                <select
                  value={actividad.impacto}
                  onChange={(e) => actualizarActividad(index, 'impacto', e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div>
                <label>Dificultad:</label>
                <select
                  value={actividad.dificultad}
                  onChange={(e) => actualizarActividad(index, 'dificultad', e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div>
                <label>Total:</label>
                <input type="text" value={actividad.total} readOnly />
              </div>

              <div className="button-group">
                {index > 0 && (
                  <button className="remove-button" onClick={() => eliminarActividad(index)}>
                    -
                  </button>
                )}
                <button className="add-button" onClick={agregarActividad}>
                  +
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Botón para Guardar Actividades */}
        <div className="button-group">
          <button className="next-button" onClick={guardarActividades}>
          {num!=0?"Actualizar":"Guardar Actividades"}
          </button>
        </div>
      </div>

      {/* Popup de Confirmación */}
      {showPopup && (
        <ConfirmacionPopup
          onConfirm={confirmarGuardarActividades}
          onCancel={() => setShowPopup(false)}
          mensaje="¿Está seguro de guardar las actividades?"
        />
      )}

      {/* Estilos */}
      <style jsx>{`
        .container {
          padding: 20px;
          background-color: #f7f7f7;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title-container {
          background-color: var(--Primary, #21498e);
          color: white;
          padding: 10px 20px;
          width: 100%;
          text-align: center;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .form-container {
          background-color: white;
          border-radius: 8px;
          padding: 20px;
          max-width: 900px;
          width: 100%;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .form-header {
          background-color: #b5d0ff;
          padding: 10px;
          text-align: center;
          font-size: 1.2em;
          color: #21498e;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        .actividad-section {
          margin: 10px 0;
        }

        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .button-group {
          margin-top: 10px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .remove-button {
          background-color: #f23b3b;
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
          margin-right: 10px;
        }

        .next-button {
          background-color: #21498e;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 4px;
          cursor: pointer;
          margin: 5px;
        }

        .add-button {
          background-color: #9bcb3c;
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
        }

        .add-button:hover,
        .remove-button:hover,
        .next-button:hover {
          background-color: #1a377b;
        }

        textarea,
        input,
        select {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          background-color: #eae7e7;
        }
      `}</style>
    </div>
  );
}