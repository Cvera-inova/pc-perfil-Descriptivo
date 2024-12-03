"use client";
 
import ActividadesDelCargo from "@src/components/perfil-descriptivo/actividadesCargo";
import React from "react";
import { useParams } from "next/navigation";
 
const business = () => {
  const {id} =useParams()
  return (
   
      <ActividadesDelCargo num={id}/>
 
  );
};
 
export default business;