"use client";
 
import RiesgosDelCargo from "@src/components/perfil-descriptivo/RiesgosDelCargo";
import React from "react";
import { useParams } from "next/navigation"; 
 
const business = () => {
  const {id} =useParams()
  return (
   
      <RiesgosDelCargo num={id}/>
 
  );
};
 
export default business;