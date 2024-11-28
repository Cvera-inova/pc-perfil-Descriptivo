"use client";

import CompleteTable from "@src/components/perfil-descriptivo/TablaGenral1";
import CombinedTable from "@src/components/perfil-descriptivo/TablaGenral2";
import CompetenciasTable from "@src/components/perfil-descriptivo/TablaGenral3";
import PerfilDuroTable from "@src/components/perfil-descriptivo/TablaGenral4";
import OtrosRequerimientosTable from "@src/components/perfil-descriptivo/TablaGenral5";
import CondicionesCargoTable from "@src/components/perfil-descriptivo/TablaGenral6";
import RiesgosAsociadosTable from "@src/components/perfil-descriptivo/TablaGenral7";
import EquiposProteccionIndividualTable from "@src/components/perfil-descriptivo/TablaGenral8";
import ExamenesValoracionesMedicasTable from "@src/components/perfil-descriptivo/TablaGenral9";
import UnifiedTable from "@src/components/perfil-descriptivo/TablaPerfilDuro";
import React from "react";

const Business = () => {
  return (
    <div>
      <CompleteTable />
      <CombinedTable />
      <CompetenciasTable />
      <UnifiedTable />
      <RiesgosAsociadosTable/>
      <EquiposProteccionIndividualTable />
      < ExamenesValoracionesMedicasTable />

      



    </div>
  );
};

export default Business;
