"use client";
 
import CompetenciasRequeridas from "@src/components/perfil-descriptivo/competenciasRequeridas";
import React from "react";
import { useParams } from "next/navigation"; 
 
const business = () => {
  const {id} =useParams()
  return (
   
      <CompetenciasRequeridas num={id}/>
 
  );
};
 
export default business;