import { fetchCompetenciaRequeridaById } from "@src/services/competenciasRequeridas.Dao";
import React, { useEffect, useState } from "react";
import EditProfileButton from "../buttons/edit-profile-button";

const CompetenciasTable = ({id_generado}) => {
  const [competencias, setCompetencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = id_generado; // Cambia esto si necesitas obtener competencias de otro ID

  useEffect(() => {
    const obtenerCompetencias = async () => {
      try {
        const data = await fetchCompetenciaRequeridaById(id);
        console.log("Competencias obtenidas:", data);
        setCompetencias(data);
      } catch (error) {
        console.error("Error al obtener las competencias:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerCompetencias();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>; // Mensaje de carga mientras se obtienen los datos
  }

  if (competencias.length === 0) {
    return <div>No hay competencias disponibles.</div>;
  }

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <table style={{ width: "80%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              colSpan="3"
              style={{
                backgroundColor: "#EEE",
                padding: "10px",
                color: "#21498E",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Texto centrado */}
                <span
                  style={{ flex: 1, textAlign: "center", fontWeight: "bold", fontSize: "1.5em" }}
                >
                  Competencias requeridas para el óptimo desenvolvimiento de un cargo
                </span>
                {/* Botón */}
                <EditProfileButton editRoute="/ruta/para/CompleteTable" />
              </div>
            </th>
          </tr>
          <tr>
            <th
              style={{
                backgroundColor: "#21498E",
                color: "white",
                padding: "10px",
                border: "1px solid black",
              }}
            >
              Descripción de la competencia
            </th>
            <th
              style={{
                backgroundColor: "#21498E",
                color: "white",
                padding: "10px",
                border: "1px solid black",
              }}
            >
              Tipo de Competencia
            </th>
            <th
              style={{
                backgroundColor: "#21498E",
                color: "white",
                padding: "10px",
                border: "1px solid black",
              }}
            >
              Grado Requerido
            </th>
          </tr>
        </thead>
        <tbody>
          {competencias.map((competencia, index) => (
            <tr key={index}>
              <td
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  border: "1px solid black",
                }}
              >
                {competencia.descripcion || "N/A"}
              </td>
              <td
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  border: "1px solid black",
                }}
              >
                {competencia.tipo || "N/A"}
              </td>
              <td
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  border: "1px solid black",
                }}
              >
                {competencia.grado || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompetenciasTable;