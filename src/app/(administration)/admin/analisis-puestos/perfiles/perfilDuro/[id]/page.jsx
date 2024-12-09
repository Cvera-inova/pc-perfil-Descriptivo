"use client";
 
import PerfilDuro from "@src/components/perfil-descriptivo/perfilDuro";
import React from "react";
import { useParams } from "next/navigation"; 
 
const business = () => {
  const {id} =useParams()
  return (
   
      <PerfilDuro num={id}/>
 
  );
};
 
export default business;