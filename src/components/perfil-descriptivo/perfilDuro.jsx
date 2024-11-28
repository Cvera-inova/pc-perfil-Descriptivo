// src/pages/PerfilDuro.js

import React, { useState } from 'react';
import ConfirmacionPopup from '../popUp/ConfirmacionPopup'; // Asegúrate de que este componente exista y esté correctamente importado
import { actualizarPerfil, obtenerPerfilPorId } from '@src/services/perfilDuro.dao';
import { FaPlus, FaMinus } from 'react-icons/fa';
import {obtenerSiguienteIdPerfil} from '../../services/idPerfil.dao'

export default function PerfilDuro() {
  const [formData, setFormData] = useState({
    bachiller: '',
    tiempoBachiller: '',
    disponibilidadViajar: '',
    lugaresViajar: '',
    herramientas: '',
    exigencias: '',
    horarioEntrada: '',
    horarioSalida: '',
    horarioAlmuerzo: '',
  });

  const [posgrados, setPosgrados] = useState([
    {
      posgrado: null,
      tiempoPosgrado: null,
    },
  ]);

  const [tecnologias, setTecnologias] = useState([
    {
      tecnologia: null,
      tiempoTecnologia: null,
    },
  ]);

  const [certificaciones, setCertificaciones] = useState([
    {
      certificacion: null,
      tiempoCertificacion: null,
    },
  ]);

  const [licencias, setLicencias] = useState([
    {
      licencia: null,
      tiempoLicencia: null,
    },
  ]);

  const [idiomas, setIdiomas] = useState([
    {
      idioma: null,
      tiempoIdioma: null,
    },
  ]);

  const [experiencias, setExperiencias] = useState([
    {
      experiencia: null,
      tiempoExperiencia: null,
    },
  ]);

  const [conocimientos, setConocimientos] = useState([
    {
      conocimiento: null,
      descripcionConocimiento: null,
    },
  ]);

  const removeItem = (index, array, setArray) => {
    if (index === 0) return; // Prevent removal of the first item
    const updatedArray = array.filter((_, i) => i !== index);
    setArray(updatedArray);
  };

  const handleItemChange = (value, index, field, array, setArray) => {
    const updatedArray = [...array];
    updatedArray[index][field] = value;
    setArray(updatedArray);
  };

  const addItem = (array, setArray, template) => {
    const hasNullValues = array.some(item =>
      Object.values(item).some(value => value === null || value === '' )
    );
  
    if (hasNullValues) {
      console.warn("Existen valores nulos.");
      return;
    }
    setArray([...array, { ...template }]);
  };
  
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const manejarConfirmacion = async () => {
    setShowPopup(false);

    try {
      const id_new = (await obtenerSiguienteIdPerfil())-1
      const perfilExistente = await obtenerPerfilPorId(id_new);

      if (!perfilExistente) {
        throw new Error('Perfil no encontrado');
      }

      const perfilesDetalle = perfilExistente.perfiles_detalle || [];

      let perfilDetalle = perfilesDetalle.find((p) => p.id === `perfil_${id_new}`);

      const combinedData = {
        formacion: [
          posgrados,
          tecnologias,
          {
            bachiller: formData.bachiller,
            tiempoBachiller: formData.tiempoBachiller,
          },
          certificaciones,
          licencias,
          idiomas,
          experiencias,
        ],
        disponibilidadViajar: formData.disponibilidadViajar,
        lugaresViajar: formData.lugaresViajar,
        conocimientos,
        herramientas: formData.herramientas,
        exigencias: formData.exigencias,
        horarioEntrada: formData.horarioEntrada,
        horarioSalida: formData.horarioSalida,
        horarioAlmuerzo: formData.horarioAlmuerzo,
      };
      

      if (perfilDetalle) {
        perfilDetalle.perfilDuro = combinedData;
      } else {
        perfilDetalle = {
          id: id_new,
          perfilDuro: combinedData,
          otrosRequerimientos: [],
          condicionesCargo: [],
        };
        perfilesDetalle.push(perfilDetalle);
      }

      const perfilActualizado = {
        ...perfilExistente,
        perfiles_detalle: perfilesDetalle,
      };

      const resultado = await actualizarPerfil(id_new, perfilActualizado);

      if (resultado) {
        alert('Perfil Duro actualizado exitosamente.');
        window.location.href = '/servicios/atencion-colaborador/riesgosCargo'; // Redirigir a otra página
      } else {
        throw new Error('No se pudo actualizar el perfil.');
      }
    } catch (error) {
      console.error('Error al actualizar el Perfil Duro:', error);
      alert(`Ocurrió un error al actualizar el Perfil Duro: ${error.message}`);
    }
  };

  const manejarCancelacion = () => {
    setShowPopup(false);
  };

  return (
    <div className="container">
      <div className="title-container">
        <h1>Perfil y Descriptivo del Cargo</h1>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-header">
          <h2>Perfil Duro</h2>
        </div>

        <div className="content">
          {/* Posgrado */}
          <h2>Posgrados</h2>
          {posgrados.map((posgrado, index) => (
            <div>
              <div className="form-row">
                <div className="form-field">
                  <label>Posgrado en:</label>
                  <input
                    type="text"
                    name="posgrado"
                    value={posgrados[index][posgrado]}
                    onChange={(e) => handleItemChange(e.target.value, index, 'posgrado', posgrados, setPosgrados)}
                    placeholder="Escriba su posgrado"
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Tiempo:</label>
                  <select
                    name="tiempoPosgrado"
                    value={posgrados[index][posgrado]} 
                    onChange={(e) => handleItemChange(e.target.value, index, 'tiempoPosgrado', posgrados, setPosgrados)}
                    required
                  >
                    <option value="">Seleccione un tiempo</option>
                    <option value="No Aplica">No Aplica</option>
                    <option value="Menos de 1 año">Menos de 1 año</option>
                    <option value="1 año">1 año</option>
                    <option value="2 años">2 años</option>
                    <option value="3 años">3 años</option>
                    <option value="Más de 3 años">Más de 3 años</option>
                  </select>
                </div>
              </div>
              <div>
                <button type="button" className='addScheduleButton' onClick={() => addItem(posgrados, setPosgrados, { posgrado: null, tiempoPosgrado: null })}>
                  <FaPlus className='infoIcon' />
                </button>
                {index>0 &&(<button type="button" className='removeScheduleButton' onClick={() => removeItem(index, posgrados, setPosgrados)}>
                  <FaMinus className='infoIcon' />
                </button>)}
              </div>
            </div>
          ))}

          {/* Segunda línea */}
          <h2>Tecnologías</h2>
          {tecnologias.map((tecnologia, index) => (
            <div>
              <div className="form-row">
                <div className="form-field">
                  <label>Tecnología en:</label>
                  <input
                    type="text"
                    name="tecnologia"
                    value={tecnologias[index][tecnologia]}
                    onChange={(e) => handleItemChange(e.target.value, index, 'tecnologia', tecnologias, setTecnologias)}
                    placeholder="Escriba su tecnología"
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Tiempo:</label>
                  <select
                    name="tiempoTecnologia"
                    value={tecnologias[index][tecnologia]}
                    onChange={(e) => handleItemChange(e.target.value, index, 'tiempoTecnologia', tecnologias, setTecnologias)}
                    required
                  >
                    <option value="">Seleccione un tiempo</option>
                    <option value="No Aplica">No Aplica</option>
                    <option value="Menos de 1 año">Menos de 1 año</option>
                    <option value="1 año">1 año</option>
                    <option value="2 años">2 años</option>
                    <option value="3 años">3 años</option>
                    <option value="Más de 3 años">Más de 3 años</option>
                  </select>
                </div>
              </div>
              <div>
                <button type="button" className='addScheduleButton' onClick={() => addItem(tecnologias, setTecnologias, { tecnologia: null, tiempoTecnologias: null })}>
                  <FaPlus className='infoIcon' />
                </button>
                {index>0 &&(<button type="button" className='removeScheduleButton' onClick={() => removeItem(index, tecnologias, setTecnologias)}>
                  <FaMinus className='infoIcon' />
                </button>)}
              </div>
            </div>
          ))}

          {/* Tercera línea */}
          <h2>Bachiller</h2>
          <div className="form-row">
            <div className="form-field">
              <label>Bachiller en:</label>
              <input
                type="text"
                name="bachiller"
                value={formData.bachiller}
                onChange={handleChange}
                placeholder="Escriba su bachiller"
                required
              />
            </div>
            <div className="form-field">
              <label>Tiempo:</label>
              <select
                name="tiempoBachiller"
                value={formData.tiempoBachiller}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un tiempo</option>
                <option value="No Aplica">No Aplica</option>
                <option value="Menos de 1 año">Menos de 1 año</option>
                <option value="1 año">1 año</option>
                <option value="2 años">2 años</option>
                <option value="3 años">3 años</option>
                <option value="Más de 3 años">Más de 3 años</option>
              </select>
            </div>
          </div>

          {/* Cuarta línea */}
          <h2>Certificaciones</h2>
            {certificaciones.map((certificacion, index) => (
              <div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Certificación en:</label>
                    <input
                      type="text"
                      name="certificacion"
                      value={certificaciones[index][certificacion]}
                      onChange={(e) => handleItemChange(e.target.value, index, 'certificacion', certificaciones, setCertificaciones)}
                      placeholder="Escriba su certificación"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Tiempo:</label>
                    <select
                      name="tiempoCertificacion"
                      value={certificaciones[index][certificacion]}
                      onChange={(e) => handleItemChange(e.target.value, index, 'tiempoCertificacion', certificaciones, setCertificaciones)}
                      required
                    >
                      <option value="">Seleccione un tiempo</option>
                      <option value="No Aplica">No Aplica</option>
                      <option value="Menos de 1 año">Menos de 1 año</option>
                      <option value="1 año">1 año</option>
                      <option value="2 años">2 años</option>
                      <option value="3 años">3 años</option>
                      <option value="Más de 3 años">Más de 3 años</option>
                    </select>
                  </div>
                </div>
                <div>
                  <button type="button" className='addScheduleButton' onClick={() => addItem(certificaciones, setCertificaciones, { certificacion: null, tiempoCertificacion: null })}>
                    <FaPlus className='infoIcon' />
                  </button>
                  {index>0 &&(<button type="button" className='removeScheduleButton' onClick={() => removeItem(index, certificaciones, setCertificaciones)}>
                    <FaMinus className='infoIcon' />
                  </button>)}
                </div>
              </div>
            ))}
          
          {/* Quinta línea */}
          <h2>Licencias</h2>
          {licencias.map((licencia, index) => (
              <div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Licencias:</label>
                    <input
                      type="text"
                      name="licencia"
                      value={licencias[index][licencia]}
                      onChange={(e) => handleItemChange(e.target.value, index, 'licencia', licencias, setLicencias)}
                      placeholder="Escriba sus licencias"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Tiempo:</label>
                    <select
                      name="tiempoLicencia"
                      value={licencias[index][licencia]}
                      onChange={(e) => handleItemChange(e.target.value, index, 'tiempoLicencia', licencias, setLicencias)}
                      required
                    >
                      <option value="">Seleccione un tiempo</option>
                      <option value="No Aplica">No Aplica</option>
                      <option value="Menos de 1 año">Menos de 1 año</option>
                      <option value="1 año">1 año</option>
                      <option value="2 años">2 años</option>
                      <option value="3 años">3 años</option>
                      <option value="Más de 3 años">Más de 3 años</option>
                    </select>
                  </div>
                </div>
                <div>
                  <button type="button" className='addScheduleButton' onClick={() => addItem(licencias, setLicencias, { licencia: null, tiempoLicencia: null })}>
                    <FaPlus className='infoIcon' />
                  </button>
                  {index>0 &&(<button type="button" className='removeScheduleButton' onClick={() => removeItem(index, licencias, setLicencias)}>
                    <FaMinus className='infoIcon' />
                  </button>)}
                </div>
              </div>
            ))}
          

          {/* Sexta línea */}
          <h2>Idiomas</h2>
          {idiomas.map((idioma, index) => (
              <div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Idiomas:</label>
                    <input
                      type="text"
                      name="idioma"
                      value={idiomas[index][idioma]}
                      onChange={(e) => handleItemChange(e.target.value, index, 'idioma', idiomas, setIdiomas)}
                      placeholder="Escriba los idiomas"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Tiempo:</label>
                    <select
                      name="tiempoIdioma"
                      value={idiomas[index][idioma]}
                      onChange={(e) => handleItemChange(e.target.value, index, 'tiempoIdioma', idiomas, setIdiomas)}
                      required
                    >
                      <option value="">Seleccione un tiempo</option>
                      <option value="No Aplica">No Aplica</option>
                      <option value="Menos de 1 año">Menos de 1 año</option>
                      <option value="1 año">1 año</option>
                      <option value="2 años">2 años</option>
                      <option value="3 años">3 años</option>
                      <option value="Más de 3 años">Más de 3 años</option>
                    </select>
                  </div>
                </div>
                <div>
                  <button type="button" className='addScheduleButton' onClick={() => addItem(idiomas, setIdiomas, { idioma: null, tiempoIdioma: null })}>
                    <FaPlus className='infoIcon' />
                  </button>
                  {index>0 &&(<button type="button" className='removeScheduleButton' onClick={() => removeItem(index, idiomas, setIdiomas)}>
                    <FaMinus className='infoIcon' />
                  </button>)}
                </div>
              </div>
            ))}

          {/* Séptima línea */}
          <h2>Experiencia</h2>
          {experiencias.map((experiencia, index) => (
              <div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Experiencia:</label>
                    <input
                      type="text"
                      name="experiencia"
                      value={experiencias[index][experiencia]}
                      onChange={(e) => handleItemChange(e.target.value, index, 'experiencia', experiencias, setExperiencias)}
                      placeholder="Escriba su experiencia"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Tiempo:</label>
                    <select
                      name="tiempoExperiencia"
                      value={experiencias[index][experiencia]}
                      onChange={(e) => handleItemChange(e.target.value, index, 'tiempoExperiencia', experiencias, setExperiencias)}
                      required
                    >
                      <option value="">Seleccione un tiempo</option>
                      <option value="No Aplica">No Aplica</option>
                      <option value="Menos de 1 año">Menos de 1 año</option>
                      <option value="1 año">1 año</option>
                      <option value="2 años">2 años</option>
                      <option value="3 años">3 años</option>
                      <option value="Más de 3 años">Más de 3 años</option>
                    </select>
                  </div>
                </div>
                <div>
                  <button type="button" className='addScheduleButton' onClick={() => addItem(experiencias, setExperiencias, { experiencia: null, tiempoExperiencia: null })}>
                    <FaPlus className='infoIcon' />
                  </button>
                  {index>0 &&(<button type="button" className='removeScheduleButton' onClick={() => removeItem(index, experiencias, setExperiencias)}>
                    <FaMinus className='infoIcon' />
                  </button>)}
                </div>
              </div>
            ))}

          {/* Disponibilidad para viajar */}
          <h2>Viajes</h2>
          <div className="form-full">
            <label>Disponibilidad para viajar:</label>
            <select
              name="disponibilidadViajar"
              value={formData.disponibilidadViajar}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Lugares para viajar */}
          <div className="form-full">
            <label>Lugares para viajar:</label>
            <input
              type="text"
              name="lugaresViajar"
              value={formData.lugaresViajar}
              onChange={handleChange}
              placeholder="Escriba los lugares"
              required
            />
          </div>

          {/* Conocimientos */}
          <h2>Conocimientos</h2>
          {conocimientos.map((conocimiento, index) => (
              <div>
                <div className="form-full">
                  <label>Conocimientos:</label>
                  <input
                    type="text"
                    name="conocimiento"
                    value={conocimientos[index][conocimiento]}
                    onChange={(e) => handleItemChange(e.target.value, index, 'conocimiento', conocimientos, setConocimientos)}
                    placeholder="Escriba sus conocimientos"
                    required
                  />
                </div>

                {/* Descripción de Conocimiento */}
                <div className="form-full">
                  <label>Descripción del Conocimiento:</label>
                  <input
                    type="text"
                    name="descripcionConocimiento"
                    value={conocimientos[index][conocimiento]}
                    onChange={(e) => handleItemChange(e.target.value, index, 'descripcionConocimiento', conocimientos, setConocimientos)}
                    placeholder="Escriba la descripción"
                    required
                  />
                </div>
                <div>
                  <button type="button" className='addScheduleButton' onClick={() => addItem(conocimientos, setConocimientos, { conocimiento: null, descripcionConocimiento: null })}>
                    <FaPlus className='infoIcon' />
                  </button>
                  {index>0 &&(<button type="button" className='removeScheduleButton' onClick={() => removeItem(index, conocimientos, setConocimientos)}>
                    <FaMinus className='infoIcon' />
                  </button>)}
                </div>
              </div>
            ))}
          

          {/* Herramientas */}
          <h2>Herramientas</h2>
          <div className="form-full">
            <label>Herramientas:</label>
            <input
              type="text"
              name="herramientas"
              value={formData.herramientas}
              onChange={handleChange}
              placeholder="Escriba las herramientas"
              required
            />
          </div>

          {/* Exigencias */}
          <h2>Exigencias</h2>
          <div className="form-full">
            <label>Exigencias:</label>
            <input
              type="text"
              name="exigencias"
              value={formData.exigencias}
              onChange={handleChange}
              placeholder="Escriba las exigencias"
              required
            />
          </div>

          {/* Horarios */}
          <h2>Horarios</h2>
          <div className="form-row">
            <div className="form-field">
              <label>Horario de Entrada:</label>
              <input
                type="time"
                name="horarioEntrada"
                value={formData.horarioEntrada}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label>Horario de Salida:</label>
              <input
                type="time"
                name="horarioSalida"
                value={formData.horarioSalida}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Horario de Almuerzo */}
          <div className="form-full">
            <label>Horario de Almuerzo:</label>
            <input
              type="time"
              name="horarioAlmuerzo"
              value={formData.horarioAlmuerzo}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Botón de envío dentro del formulario */}
        <button type="submit" className="next-button">
          Enviar Perfil
        </button>
      </form>

      {showPopup && (
        <ConfirmacionPopup
          mensaje="¿Está seguro de que quiere enviar los datos?"
          onConfirm={manejarConfirmacion}
          onCancel={manejarCancelacion}
        />
      )}

      {/* Estilos */}
      <style jsx>{`
        .container {
          background-color: #f7f7f7; /* Color de fondo externo */
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
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
          background-color: #ffffff; /* Color de fondo del formulario */
          border-radius: 8px;
          overflow: hidden;
          max-width: 900px; /* Ancho máximo del formulario */
          width: 100%;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .form-header {
          background-color: var(--Primary, #B5D0FF);
          color: white;
          padding: 10px 20px;
          text-align: center;
        }

        .content {
          padding: 20px;
        }

        .form-row {
          display: flex;
          justify-content: space-between; /* Espacio entre campos */
          margin-bottom: 20px; /* Espacio entre filas */
        }
        
        @media (max-width: 480px) {
          .form-row {
            flex-direction: column;
          }
        }

        .form-field {
          flex: 1; /* Cada campo ocupa el mismo espacio */
          margin-right: 30px; /* Espacio entre los campos */
        }

        .form-field:last-child {
          margin-right: 0; /* Sin margen derecho en el último campo */
        }

        .form-full {
          margin-bottom: 20px; /* Espacio entre campos de ancho completo */
        }

        label {
          margin-bottom: 8px; /* Espacio entre la etiqueta y el input */
          display: block; /* Asegura que la etiqueta esté en su propia línea */
          font-weight: bold; /* Negrita */
          font-size: 1.1em; /* Tamaño de fuente un poco más grande */
        }

        input,
        select,
        textarea {
          width: 100%; /* Ancho completo */
          padding: 10px; /* Espaciado interno */
          border: 1px solid #ccc; /* Borde de los inputs */
          border-radius: 4px; /* Bordes redondeados */
          background-color: #eae7e7; /* Color de fondo de los inputs */
        }

        .next-button {
          background-color: #21498e; /* Color del botón */
          color: white; /* Color del texto */
          padding: 15px; /* Espaciado interno */
          border: none; /* Sin borde */
          border-radius: 4px; /* Bordes redondeados */
          width: 100%; /* Ancho completo */
          cursor: pointer; /* Cursor tipo mano al pasar el ratón */
          font-size: 16px; /* Tamaño de la fuente */
          margin-top: 20px; /* Margen superior para el botón */
        }

        .next-button:hover {
          background-color: #1a3677; /* Color del botón al pasar el ratón */
        }

        .addScheduleButton {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 8px;
          font-weight: bold;
          background-color: #75bf44;
          color: #ffffff;
          transition: background-color 0.3s ease;
        }
        
        .addScheduleButton:hover {
          background-color: #5a9c36;
        }

        .removeScheduleButton {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 8px;
          font-weight: bold;
          background-color: #d9534f;
          color: #ffffff;
          transition: background-color 0.3s ease;
        }
        
        .removeScheduleButton:hover {
          background-color: #c9302c;
        }
 
      `}</style>
    </div>
  );
}