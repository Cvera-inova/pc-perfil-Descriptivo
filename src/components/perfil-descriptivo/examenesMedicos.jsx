import { createVersion, fetchVersionById, updateVersion } from '@src/services/examenesyValoracionesMedicas.dao';
import { useState, useEffect } from 'react';
import ConfirmacionPopup from '../popUp/ConfirmacionPopup';
import {obtenerSiguienteIdPerfil} from '../../services/idPerfil.dao'

export default function PerfilDescriptivoExamenes({num}) {
  // Estado para Reintegro y Especiales (Select Inputs)
  const [reintegro, setReintegro] = useState('');
  const [especiales, setEspeciales] = useState('');

  // Inicialización de Exámenes (Checkboxes)
  const inicializarExamenes = (examenes) => {
    const estadoInicial = {};
    examenes.forEach((exam) => {
      estadoInicial[exam] = false;
    });
    return estadoInicial;
  };

  const [preocupacionales, setPreocupacionales] = useState(
    inicializarExamenes([
      'Biometría hemática',
      'Glucosa basal',
      'Urea',
      'Creatinina en suero',
      'Colesterol total',
      'Triglicéridos',
      'VDRL',
      'Coproparasitario',
      'Uroanálisis',
      'Optometría',
      'Rx AP + L DE columna Cervico Dorsal',
      'Todas',
    ])
  );

  const [periodicos, setPeriodicos] = useState(
    inicializarExamenes([
      'Biometría hemática',
      'Glucosa basal',
      'Urea',
      'Creatinina en suero',
      'Colesterol total',
      'Triglicéridos',
      'VDRL',
      'Coproparasitario',
      'Elemental y microscópico de orina',
      'Agudeza visual (optometría)',
      'Rx AP + L DE columna Cervico Dorsal',
      'Todas',
    ])
  );

  const [salida, setSalida] = useState(
    inicializarExamenes([
      'Biometría hemática',
      'Glucosa basal',
      'Urea',
      'Creatinina en suero',
      'Colesterol total',
      'Triglicéridos',
      'VDRL',
      'Coproparasitario',
      'Elemental y microscópico de orina',
      'Agudeza visual (optometría)',
      'Rx AP + L DE columna Cervico Dorsal',
      'Todas',
    ])
  );

  useEffect(() => {
    const fetchData = async () => {
      console.log("Component initialized with num:", num);
      if (num !== 0) {
        try {
          const perfil = await fetchVersionById(num);
          if (!perfil) {
            alert("Error al obtener el perfil. Inténtalo nuevamente.");
            setShowPopup(false);
            return;
          }
          const fetchedExamenes=(perfil.versiones[0].examenes[0].examenes)

          const preocupacionalesData = fetchedExamenes.find((e) => e.tipo === 'preocupacional')?.examenes || [];
          const periodicosData = fetchedExamenes.find((e) => e.tipo === 'periodico')?.examenes || [];
          const salidaData = fetchedExamenes.find((e) => e.tipo === 'salida')?.examenes || [];

          // Update states based on fetched data
          setPreocupacionales((prev) =>
            Object.keys(prev).reduce((acc, key) => {
              acc[key] = preocupacionalesData.includes(key);
              return acc;
            }, {})
          );

          setPeriodicos((prev) =>
            Object.keys(prev).reduce((acc, key) => {
              acc[key] = periodicosData.includes(key);
              return acc;
            }, {})
          );

          setReintegro(fetchedExamenes.find((e) => e.tipo === 'reintegro')?.opcionSeleccionada)
          setEspeciales(fetchedExamenes.find((e) => e.tipo === 'especiales')?.opcionSeleccionada)
          setSalida((prev) =>
            Object.keys(prev).reduce((acc, key) => {
              acc[key] = salidaData.includes(key);
              return acc;
            }, {})
          );
        } catch (error) {
          console.error("Error fetching the perfil:", error);
          alert("Error al obtener el perfil. Inténtalo nuevamente.");
        }
      }
    };
    fetchData();
}, [num]);

  // Estado para Popup de Confirmación
  const [showPopup, setShowPopup] = useState(false);
  const [popupMensaje, setPopupMensaje] = useState('');

  /**
   * Maneja el cambio de estado de los checkboxes.
   * @param {string} tipo - Tipo de examen ('preocupacional', 'periodico', 'salida').
   * @param {string} nombre - Nombre del examen.
   */
  const handleCheckboxChange = (tipo, nombre) => {
    if (tipo === 'preocupacional') {
      setPreocupacionales((prev) => ({
        ...prev,
        [nombre]: !prev[nombre],
      }));
    } else if (tipo === 'periodico') {
      setPeriodicos((prev) => ({
        ...prev,
        [nombre]: !prev[nombre],
      }));
    } else if (tipo === 'salida') {
      setSalida((prev) => ({
        ...prev,
        [nombre]: !prev[nombre],
      }));
    }
  };

  /**
   * Maneja el envío del formulario.
   * Realiza validaciones y muestra el popup de confirmación.
   */
  const handleSubmit = () => {
    // Validación para asegurarse de que no se envíen formularios vacíos
    const hasPreocupacionales = Object.values(preocupacionales).some(Boolean);
    const hasPeriodicos = Object.values(periodicos).some(Boolean);
    const hasSalida = Object.values(salida).some(Boolean);

    if (!hasPreocupacionales) {
      alert('Por favor, selecciona al menos un examen en Preocupacionales.');
      return;
    }

    if (!hasPeriodicos) {
      alert('Por favor, selecciona al menos un examen en Periódicos.');
      return;
    }

    if (!hasSalida) {
      alert('Por favor, selecciona al menos un examen en Salida.');
      return;
    }

    if (!reintegro) {
      alert('Por favor, selecciona una opción en Reintegro.');
      return;
    }

    if (!especiales) {
      alert('Por favor, selecciona una opción en Especiales.');
      return;
    }

    setPopupMensaje('¿Estás seguro de que deseas continuar?');
    setShowPopup(true);
  };

  /**
   * Maneja la confirmación del popup.
   * Crea una nueva versión y la envía al backend.
   */
  const handleConfirm = async () => {
    const nuevaVersion = {
      examenes: [
        {
          tipo: 'preocupacional',
          examenes: Object.keys(preocupacionales).filter((exam) => preocupacionales[exam]),
        },
        {
          tipo: 'periodico',
          examenes: Object.keys(periodicos).filter((exam) => periodicos[exam]),
        },
        {
          tipo: 'reintegro',
          opcionSeleccionada: [reintegro],
        },
        {
          tipo: 'especiales',
          opcionSeleccionada: [especiales],
        },
        {
          tipo: 'salida',
          examenes: Object.keys(salida).filter((exam) => salida[exam]),
        },
      ],
    };

    console.log('Nueva Versión:', nuevaVersion);

    try {
      const perfilId = num === 0 ? (await obtenerSiguienteIdPerfil()) - 1 : num;
      const perfil = await fetchVersionById(perfilId);
  
      if (!perfil) {
        return handleError('Error al obtener el perfil. Inténtalo nuevamente.');
      }
  
      if (!perfil.versiones || !Array.isArray(perfil.versiones)) {
        perfil.versiones = [];
      }
  
      if (num === 0) {
        perfil.versiones[0].examenes[0] = nuevaVersion;
      } else {
        perfil.versiones[0].examenes[0] = nuevaVersion;
      }
  
      const result = await updateVersion(perfilId, perfil);
      if (result) {
        console.log('Versión creada:', result);
        const redirectPath = num === 0 
          ? '/admin/analisis-puestos/perfiles/' 
          : `/admin/analisis-puestos/perfiles/tabla-perfil/${num}`;
        window.location.href = redirectPath;
      } else {
        alert('No se pudo crear la versión. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al crear la versión:', error);
      alert('Ocurrió un error al crear la versión. Por favor, intenta nuevamente.');
    } finally {
      setShowPopup(false);
    }
  };

  /**
   * Maneja la cancelación del popup.
   */
  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="container">
      <div className="title-container">
        <h1>Perfil y Descriptivo del Cargo</h1>
      </div>

      <div className="form-container">
        <div className="form-header">
          <h2>Exámenes y valoraciones médicas ocupacionales</h2>
        </div>

        <div className="exam-sections">
          {/* Preocupacionales */}
          <div className="exam-section circular">
            <h3>Preocupacionales:</h3>
            <div className="grid">
              {[
                'Biometría hemática',
                'Glucosa basal',
                'Urea',
                'Creatinina en suero',
                'Colesterol total',
                'Triglicéridos',
                'VDRL',
                'Coproparasitario',
                'Uroanálisis',
                'Optometría',
                'Rx AP + L DE columna Cervico Dorsal',
                'Todas',
              ].map((exam) => (
                <label key={exam}>
                  <input
                    type="checkbox"
                    checked={preocupacionales[exam]}
                    onChange={() => handleCheckboxChange('preocupacional', exam)}
                  />
                  {exam}
                </label>
              ))}
            </div>
          </div>

          {/* Periódicos */}
          <div className="exam-section circular">
            <h3>Periódicos:</h3>
            <div className="grid">
              {[
                'Biometría hemática',
                'Glucosa basal',
                'Urea',
                'Creatinina en suero',
                'Colesterol total',
                'Triglicéridos',
                'VDRL',
                'Coproparasitario',
                'Elemental y microscópico de orina',
                'Agudeza visual (optometría)',
                'Rx AP + L DE columna Cervico Dorsal',
                'Todas',
              ].map((exam) => (
                <label key={exam}>
                  <input
                    type="checkbox"
                    checked={periodicos[exam]}
                    onChange={() => handleCheckboxChange('periodico', exam)}
                  />
                  {exam}
                </label>
              ))}
            </div>
          </div>

          {/* Reintegro y Especiales en una sola fila */}
          <div className="exam-section inline-section">
            <div className="half-width circular">
              <h3>Reintegro:</h3>
              <select
                value={reintegro}
                onChange={(e) => setReintegro(e.target.value)}
                className="circular-select"
              >
                <option value="">Seleccione una opción</option>
                <option>Opción 1: Reintegro total</option>
                <option>Opción 2: Reintegro parcial</option>
                <option>Opción 3: No aplica</option>
              </select>
            </div>

            <div className="half-width circular">
              <h3>Especiales:</h3>
              <select
                value={especiales}
                onChange={(e) => setEspeciales(e.target.value)}
                className="circular-select"
              >
                <option value="">Seleccione una opción</option>
                <option>Opción 1: Exámenes adicionales</option>
                <option>Opción 2: Evaluación médica especializada</option>
                <option>Opción 3: Otros</option>
              </select>
            </div>
          </div>

          {/* Salida */}
          <div className="exam-section circular">
            <h3>Salida:</h3>
            <div className="grid">
              {[
                'Biometría hemática',
                'Glucosa basal',
                'Urea',
                'Creatinina en suero',
                'Colesterol total',
                'Triglicéridos',
                'VDRL',
                'Coproparasitario',
                'Elemental y microscópico de orina',
                'Agudeza visual (optometría)',
                'Rx AP + L DE columna Cervico Dorsal',
                'Todas',
              ].map((exam) => (
                <label key={exam}>
                  <input
                    type="checkbox"
                    checked={salida[exam]}
                    onChange={() => handleCheckboxChange('salida', exam)}
                  />
                  {exam}
                </label>
              ))}
            </div>
          </div>

          <button className="next-button" onClick={handleSubmit}>{num!=0?"Actualizar":"Guardar"}</button>
        </div>
      </div>

      {/* Popup de confirmación */}
      {showPopup && (
        <ConfirmacionPopup
          mensaje={popupMensaje}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {/* Estilos (deja este bloque como está) */}
      <style jsx>{`
        .container {
          background-color: #f7f7f7;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
        }

        .title-container {
          background-color: #21498e;
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
          max-width: 900px;
          width: 100%;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .form-header {
          background-color: #b5d0ff;
          padding: 10px;
          text-align: center;
          font-size: 1.2em;
          color: black;
          margin-bottom: 20px;
        }

        .exam-sections {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .exam-section {
          padding: 10px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(4, auto);
          gap: 20px;
        }

        label {
          font-size: 1em;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #333;
        }

        input[type="checkbox"] {
          width: 40px;
          height: 40px;
          appearance: none;
          background-color: white;
          border: 2px solid #21498e;
          border-radius: 50%;
          position: relative;
          cursor: pointer;
        }

        input[type="checkbox"]:checked {
          background-color: transparent;
        }

        input[type="checkbox"]:checked::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          background-color: #21498e;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        select {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-top: 5px;
        }

        .inline-section {
          display: flex;
          justify-content: space-between;
        }

        .half-width {
          flex: 1;
          margin-right: 10px;
        }

        .half-width:last-child {
          margin-right: 0;
        }

        .next-button {
          background-color: #21498e;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1em;
          margin-top: 20px;
          width: 100%;
        }

        .next-button:hover {
          background-color: #1b3b6b;
        }
      `}</style>
    </div>
  );
}