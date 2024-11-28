import { ActividadesService } from '@src/services/actividadesCargo.Dao';
import React, { useEffect, useState } from 'react';

const CombinedTable = ({id_generado}) => {
  const [actividadData, setActividadData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActividad = async () => {
      try {
        const data = await ActividadesService.obtenerActividadPorId(id_generado);
        setActividadData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActividad();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const datos = actividadData?.datos?.[0];
  const actividades = datos?.actividades;
  const relacionamiento = datos?.relacionamiento;
  const responsabilidadYAutoridad = datos?.responsabilidadYAutoridad;

  if (!datos) {
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <div style={{ padding: '0px', display: 'flex', justifyContent: 'center' }}>
      <table style={{ width: '80%', borderCollapse: 'collapse', marginTop: '0px' }}>
        {/* Cabecera de la tabla */}
        <thead>
          <tr>
            <th colSpan="8" style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', textAlign: 'center' }}>
              Actividades del Cargo
            </th>
          </tr>
        </thead>
        {/* Contenido de las actividades */}
        <tbody>
          <tr>
            <th style={{ backgroundColor: '#EEE', color: '#21498E', padding: '10px', textAlign: 'center' }}>Actividades</th>
            <th style={{ backgroundColor: '#EEE', color: '#21498E', padding: '10px', textAlign: 'center' }}>Indicadores KPI</th>
            <th style={{ backgroundColor: '#EEE', color: '#21498E', padding: '10px', textAlign: 'center' }}>Fórmula de Medición</th>
            <th style={{ backgroundColor: '#EEE', color: '#21498E', padding: '10px', textAlign: 'center' }}>Frecuencia</th>
            <th style={{ backgroundColor: '#EEE', color: '#21498E', padding: '10px', textAlign: 'center' }}>Impacto</th>
            <th style={{ backgroundColor: '#EEE', color: '#21498E', padding: '10px', textAlign: 'center' }}>Dificultad</th>
            <th style={{ backgroundColor: '#EEE', color: '#21498E', padding: '10px', textAlign: 'center' }}>Total</th>
            <th style={{ backgroundColor: '#EEE', color: '#21498E', padding: '10px', textAlign: 'center' }}>Es Esencial</th>
          </tr>
          {actividades &&
            actividades.map((row, index) => (
              <tr key={index}>
                <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>{row.actividad}</td>
                <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>{row.indicadoresKPI}</td>
                <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>{row.formulaMedicion}</td>
                <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>{row.frecuencia}</td>
                <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>{row.impacto}</td>
                <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>{row.dificultad}</td>
                <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>{row.total}</td>
                <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>{row.esEsencial}</td>
              </tr>
            ))}
        </tbody>

        {/* Sección de responsabilidad y autoridad */}
        <thead>
          <tr>
            <th colSpan="8" style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', textAlign: 'center' }}>
              Responsabilidad y Autoridad
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="8" style={{ backgroundColor: 'white', padding: '10px', textAlign: 'left' }}>
              <strong>Responsabilidad:</strong> {responsabilidadYAutoridad?.responsabilidad || 'N/A'} <br />
              <strong>Autoridad:</strong> {responsabilidadYAutoridad?.autoridad || 'N/A'}
            </td>
          </tr>
        </tbody>

        {/* Sección de relacionamiento */}
        <thead>
          <tr>
            <th colSpan="8" style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', textAlign: 'center' }}>
              Relacionamiento
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ backgroundColor: '#EEE', padding: '10px', textAlign: 'center' }}>Clientes Internos</td>
            <td colSpan="3" style={{ backgroundColor: 'white', padding: '10px' }}>
              {relacionamiento?.clientesInternos?.aplica || 'No especificado'}
            </td>
            <td style={{ backgroundColor: '#EEE', padding: '10px', textAlign: 'center' }}>Clientes Externos</td>
            <td colSpan="3" style={{ backgroundColor: 'white', padding: '10px' }}>
              {relacionamiento?.clientesExternos?.aplica || 'No especificado'}
            </td>
          </tr>
        </tbody>

        {/* Sección de ausencia temporal */}
        <thead>
          <tr>
            <th colSpan="8" style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', textAlign: 'center' }}>
              En caso de ausencia temporal será reemplazado por:
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="8" style={{ backgroundColor: 'white', padding: '10px', textAlign: 'center' }}>
              {relacionamiento?.ausenciaTemporal || 'Technical Support Senior / Coordinador de Servicios TI'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CombinedTable;