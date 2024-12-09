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
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #21498e;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
`;

const TopButton = styled(StyledButton)`
  width: 25%;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const BottomButton = styled(StyledButton)`
  width: 100%;
  margin-top: 20px;
`;

const Business = () => {
  const router = useRouter();

  const {id} =useParams()

  return (
    <div style={{ position: 'relative', padding: '0px' }}>
      <TopButton onClick={() => router.push('/admin/analisis-puestos/perfiles')}>Regresar</TopButton>
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

      <div style={{ position: 'relative', marginBottom: '25px' }}>
        <ExamenesValoracionesMedicasTable id_generado={id}/>
      </div>
      <BottomButton onClick={() => router.push('/admin/analisis-puestos/perfiles')}>Aceptar</BottomButton>
    </div>
  );
};

export default Business;
