import { fetchVersionById } from "@src/services/examenesyValoracionesMedicas";
import React, { useEffect, useState } from "react";

function Pruebas() {
  const [examen, setExamen] = useState(null);

  useEffect(() => {
    const obtenerExamenPorId = async () => {
      try {
        const id = 1; // Reemplaza con el ID que desees obtener
        const result = await fetchVersionById(id);
        console.log("Resultado de fetchVersionById:", result);
        setExamen(result);
      } catch (error) {
        console.error("Error al obtener la versión por ID:", error);
      }
    };
    obtenerExamenPorId();
  }, []);

  useEffect(() => {
    console.log("Estado de examen:", examen);
  }, [examen]);

  return (
    <div>
      <h1>Detalles del Cargo</h1>
      {examen ? (
        <div>
          {examen.datos_e_identificacion_del_cargo &&
            examen.datos_e_identificacion_del_cargo.length > 0 && (
              <div>
                <p>
                  <strong>Nombre del cargo:</strong>{" "}
                  {examen.datos_e_identificacion_del_cargo[0].nombre_del_cargo}
                </p>
                <p>
                  <strong>Departamento:</strong>{" "}
                  {examen.datos_e_identificacion_del_cargo[0].departamento}
                </p>
                <p>
                  <strong>Reporta a:</strong>{" "}
                  {examen.datos_e_identificacion_del_cargo[0].reporta_a}
                </p>
                <p>
                  <strong>Supervisa a:</strong>{" "}
                  {examen.datos_e_identificacion_del_cargo[0].supervisa_a}
                </p>
                <p>
                  <strong>Ciudad:</strong>{" "}
                  {examen.datos_e_identificacion_del_cargo[0].ciudad}
                </p>
                <p>
                  <strong>Dirección:</strong>{" "}
                  {examen.datos_e_identificacion_del_cargo[0].direccion}
                </p>
                <p>
                  <strong>Teletrabajo:</strong>{" "}
                  {examen.datos_e_identificacion_del_cargo[0].teletrabajo}
                </p>
                <p>
                  <strong>Misión del cargo:</strong>{" "}
                  {examen.datos_e_identificacion_del_cargo[0].mision_del_cargo}
                </p>
              </div>
            )}
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}

export default Pruebas;
