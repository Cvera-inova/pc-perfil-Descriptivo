"use client";
 
import PerfilDescriptivoExamenes from "@src/components/perfil-descriptivo/examenesMedicos";
import React from "react";
import { useParams } from "next/navigation";
 
const business = () => {
  const {id} =useParams()
  return (
   
      <PerfilDescriptivoExamenes num={id}/>
 
  );
};
 
export default business;