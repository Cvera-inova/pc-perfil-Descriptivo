"use client";

import React from "react";
import CompleteTable from "@src/components/perfil-descriptivo/TablaGenral1";
import CombinedTable from "@src/components/perfil-descriptivo/TablaGenral2";
import CompetenciasTable from "@src/components/perfil-descriptivo/TablaGenral3";
import UnifiedTable from "@src/components/perfil-descriptivo/TablaPerfilDuro";
import RiesgosAsociadosTable from "@src/components/perfil-descriptivo/TablaGenral7";
import EquiposProteccionIndividualTable from "@src/components/perfil-descriptivo/TablaGenral8";
import ExamenesValoracionesMedicasTable from "@src/components/perfil-descriptivo/TablaGenral9";
import { useParams, useRouter } from "next/navigation";

const Business = () => {
  const router = useRouter();

  const {id} =useParams()

  return (
    <div style={{ position: 'relative', padding: '0px' }}>
      <div style={{ position: 'relative', marginBottom: '0px' }}>
        <CompleteTable id_generado={id}/>
      </div>

      <div style={{ position: 'relative', marginBottom: '0px' }}>
        <CombinedTable id_generado={id}/>
      </div>

      <div style={{ position: 'relative', marginBottom: '0px' }}>
        <CompetenciasTable id_generado={id}/>
      </div>

      <div style={{ position: 'relative', marginBottom: '0px' }}>
        <UnifiedTable id_generado={id}/>
      </div>

      <div style={{ position: 'relative', marginBottom: '0px' }}>
        <RiesgosAsociadosTable id_generado={id}/>
      </div>

      <div style={{ position: 'relative', marginBottom: '0px' }}>
        <EquiposProteccionIndividualTable id_generado={id}/>
      </div>

      <div style={{ position: 'relative', marginBottom: '100px' }}>
        <ExamenesValoracionesMedicasTable id_generado={id}/>
      </div>
    </div>
  );
};

export default Business;
