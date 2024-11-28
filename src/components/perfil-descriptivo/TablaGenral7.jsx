import React, { useEffect, useState } from 'react';
import { fetchRiesgoDelCargoById } from '@src/services/riesgos.dao';


const RiesgosAsociadosTable = ({id_generado}) => {
  const [riesgos, setRiesgos] = useState([]);
  const [error, setError] = useState(null);
  const cargoId = id_generado; // ID del riesgo del cargo

  useEffect(() => {
    const obtenerRiesgos = async () => {
      try {
        const data = await fetchRiesgoDelCargoById(cargoId);
        console.log('Datos obtenidos:', data);
        if (data && data.riesgosDelCargo && data.riesgosDelCargo.length > 0) {
          const riesgosData = data.riesgosDelCargo[0].factoresDeRiesgo;
          setRiesgos(riesgosData);
        } else {
          setError('No se encontraron riesgos del cargo.');
        }
      } catch (error) {
        console.error('Error al obtener los riesgos:', error);
        setError('Error al obtener los riesgos.');
      }
    };

    obtenerRiesgos();
  }, []);

  const obtenerColor = (categoria, valor) => {
    if (categoria === 'probabilidad') {
      switch (valor) {
        case 'B': return 'lightgreen';
        case 'M': return 'yellow';
        case 'A': return 'red';
        default: return 'transparent';
      }
    } else if (categoria === 'consecuencia') {
      switch (valor) {
        case 'LD': return 'lightblue';
        case 'D': return 'orange';
        case 'ED': return 'purple';
        default: return 'transparent';
      }
    } else if (categoria === 'nivel') {
      switch (valor) {
        case 'TV': return 'pink';
        case 'TOL': return 'lightgrey';
        case 'MOD': return 'blue';
        case 'IMP': return 'brown';
        case 'INT': return 'black';
        default: return 'transparent';
      }
    }
    return 'transparent';
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#EEE', width: '80%', textAlign: 'center', borderRadius: '8px', marginBottom: '10px' }}>
        <h2 style={{ color: '#21498E', margin: 0, padding: '10px' }}>Riesgos asociados al cargo</h2>
      </div>
      <div style={{ overflowX: 'auto', width: '80%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #000', borderRadius: '8px' }}>
          <thead>
            <tr>
              <th style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', padding: '10px', border: '2px solid #000', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>F.R</th>
              <th style={{ padding: '10px', border: '2px solid #000', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Peligro identificado</th>
              <th style={{ padding: '10px', border: '2px solid #000', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Descripción (fuente generadora)</th>
              <th colSpan="3" style={{ padding: '10px', border: '2px solid #000', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Probabilidad</th>
              <th colSpan="3" style={{ padding: '10px', border: '2px solid #000', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Consecuencia</th>
              <th colSpan="5" style={{ padding: '10px', border: '2px solid #000', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Nivel</th>
            </tr>
            <tr>
              <td colSpan="3" style={{ border: '2px solid #000', padding: '10px' }}></td>
              <td style={{ padding: '10px', border: '2px solid #000', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>B</td>
              <td style={{ padding: '10px', border: '2px solid #000', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>M</td>
              <td style={{ padding: '10px', border: '2px solid #000', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>A</td>
              <td style={{ padding: '10px', border: '2px solid #000', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>LD</td>
              <td style={{ padding: '10px', border: '2px solid #000', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>D</td>
              <td style={{ padding: '10px', border: '2px solid #000', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>ED</td>
              <td style={{ padding: '10px', border: '2px solid #000', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>TV</td>
              <td style={{ padding: '10px', border: '2px solid #000', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>TOL</td>
              <td style={{ padding: '10px', border: '2px solid #000', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>MOD</td>
              <td style={{ padding: '10px', border: '2px solid #000', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>IMP</td>
              <td style={{ padding: '10px', border: '2px solid #000', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>INT</td>
            </tr>
          </thead>
          <tbody>
            {riesgos.length > 0 ? (
              riesgos.map((factor, factorIndex) =>
                factor.riesgos.map((riesgo, riesgoIndex) => (
                  <tr key={`${factorIndex}-${riesgoIndex}`}>
                    <td style={{ border: '2px solid #000', padding: '10px' }}>{factor.tipo}</td>
                    <td style={{ border: '2px solid #000', padding: '10px' }}>{riesgo.peligroIdentificado}</td>
                    <td style={{ border: '2px solid #000', padding: '10px' }}>{riesgo.descripcion}</td>
                    {/* Probabilidad */}
                    <td style={{ border: '2px solid #000', padding: '10px', backgroundColor: riesgo.probabilidad === 'B' ? obtenerColor('probabilidad', 'B') : 'transparent' }}></td>
                    <td style={{ border: '2px solid #000', padding: '10px', backgroundColor: riesgo.probabilidad === 'M' ? obtenerColor('probabilidad', 'M') : 'transparent' }}></td>
                    <td style={{ border: '2px solid #000', padding: '10px', backgroundColor: riesgo.probabilidad === 'A' ? obtenerColor('probabilidad', 'A') : 'transparent' }}></td>
                    {/* Consecuencia */}
                    <td style={{ border: '2px solid #000', padding: '10px', backgroundColor: riesgo.consecuencia === 'LD' ? obtenerColor('consecuencia', 'LD') : 'transparent' }}></td>
                    <td style={{ border: '2px solid #000', padding: '10px', backgroundColor: riesgo.consecuencia === 'D' ? obtenerColor('consecuencia', 'D') : 'transparent' }}></td>
                    <td style={{ border: '2px solid #000', padding: '10px', backgroundColor: riesgo.consecuencia === 'ED' ? obtenerColor('consecuencia', 'ED') : 'transparent' }}></td>
                    {/* Nivel */}
                    <td style={{ border: '2px solid #000', padding: '10px', backgroundColor: riesgo.nivelDeRiesgo === 'TV' ? obtenerColor('nivel', 'TV') : 'transparent' }}></td>
                    <td style={{ border: '2px solid #000', padding: '10px', backgroundColor: riesgo.nivelDeRiesgo === 'TOL' ? obtenerColor('nivel', 'TOL') : 'transparent' }}></td>
                    <td style={{ border: '2px solid #000', padding: '10px', backgroundColor: riesgo.nivelDeRiesgo === 'MOD' ? obtenerColor('nivel', 'MOD') : 'transparent' }}></td>
                    <td style={{ border: '2px solid #000', padding: '10px', backgroundColor: riesgo.nivelDeRiesgo === 'IMP' ? obtenerColor('nivel', 'IMP') : 'transparent' }}></td>
                    <td style={{ border: '2px solid #000', padding: '10px', backgroundColor: riesgo.nivelDeRiesgo === 'INT' ? obtenerColor('nivel', 'INT') : 'transparent' }}></td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan="14" style={{ textAlign: 'center', padding: '10px' }}>No se encontraron riesgos asociados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiesgosAsociadosTable;