"use client";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: stretch;
  gap: 20px; /* Adds space between buttons */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack buttons vertically on mobile */
    align-items: center; /* Center buttons horizontally */
  }
`;

const ButtonPerfil = styled.button`
  border-radius: 20px;
  background: #b5d0ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333;
  border: none;
  font-family: Calibri;
  text-align: center;
  width: 35%;
  padding: 2%;
  box-sizing: border-box; /* Ensures padding doesn't affect width */
  transition: transform 0.3s ease; /* Smooth hover transition */

  &:hover {
    transform: scale(1.05); /* Slightly increases size on hover */
  }
    @media (max-width: 768px) {
    width: 80%;
  }

  &:disabled {
    background: #d3d3d3; /* Light gray background */
    color: #ffffff; /* White text */
    cursor: not-allowed; /* Change cursor to indicate disabled state */
    transform: none; /* Disable hover scale effect */
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const Label = styled.span`
  margin-top: 10px;
  font-size: 24px; /* Adjusted font size for better fit */
  color: #333;
  text-align: center;
  word-wrap: break-word; /* Ensures text wraps properly */
`;

const AnalisisMenu = () => {
  const handleClick = (url) => {
    window.location.href = url;
  };

  return (
    <Container>
      <ButtonPerfil onClick={() => handleClick("/admin/analisis-puestos/perfiles")}>
        <Image src="/images/perfiles-menu/image 56.png" alt="Placeholder" />
        <Label>Ver perfiles en la organización</Label>
      </ButtonPerfil>
      <ButtonPerfil onClick={() => handleClick("/admin/analisis-puestos/perfiles/perfil-cargo")}>
        <Image src="/images/perfiles-menu/ons (1).png" alt="Placeholder" />
        <Label>Crear nuevo perfil en la organización</Label>
      </ButtonPerfil>
      <ButtonPerfil disabled>
        <Image src="/images/perfiles-menu/ons (2).png" alt="Placeholder" />
        <Label>Asignar perfil al colaborador</Label>
      </ButtonPerfil>
      <ButtonPerfil disabled>
        <Image src="/images/perfiles-menu/ons (4).png" alt="Placeholder" />
        <Label>Asignar permisos para configurar los perfiles</Label>
      </ButtonPerfil>
    </Container>
  );
};

export default AnalisisMenu;
