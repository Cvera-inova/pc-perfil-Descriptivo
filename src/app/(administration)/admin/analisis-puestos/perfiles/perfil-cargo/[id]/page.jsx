"use client";
 
import PerfilDescriptivo from "@src/components/perfil-descriptivo/datosIdentificacion";
import React from "react";
import { useParams } from "next/navigation";
 
const business = () => {
  const {id} =useParams()
  return (
    
      <PerfilDescriptivo num={id} />
 
  );
};
 
export default business;