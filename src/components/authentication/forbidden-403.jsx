/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

// Animación de las olas
const waveAnimation = keyframes`
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 1000px;
  }
`;

// Contenedor principal
const ForbiddenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  text-align: center;
  font-family: 'Nunito', sans-serif;
  color: #e0f7fa;
  background: linear-gradient(to bottom, #00aaff, #004e92);
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
`;

// Fondo con animación de olas
const WavesBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://www.transparenttextures.com/patterns/wavecut.png');
  background-size: 500px 100px;
  background-repeat: repeat-x;
  opacity: 0.3;
  animation: ${waveAnimation} 20s linear infinite;
  z-index: 0;
`;

// Código de error grande
const ErrorCode = styled.h1`
  font-size: 10vw;
  color: #e0f7fa;
  font-family: 'Poppins', sans-serif;
  margin: 0;
  z-index: 1;

  @media (max-width: 600px) {
    font-size: 20vw; /* Adaptar el tamaño de la fuente en pantallas pequeñas */
  }
`;

// Mensaje de error
const ErrorMessage = styled.h2`
  font-size: 4vw;
  color: #ffffff;
  font-weight: 700;
  margin: 10px 0;
  z-index: 1;

  @media (max-width: 600px) {
    font-size: 8vw; /* Adaptar el tamaño de la fuente en pantallas pequeñas */
  }
`;

// Descripción adicional
const ErrorDescription = styled.p`
  font-size: 2vw;
  color: #d9f2fa;
  max-width: 90%;
  line-height: 1.5;
  margin: 0;
  z-index: 1;

  @media (max-width: 600px) {
    font-size: 4vw; /* Ajustar el tamaño de la fuente en pantallas pequeñas */
  }
`;

// Botón para volver
const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.5vw;
  color: #004e92;
  background-color: #e0f7fa;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  z-index: 1;

  &:hover {
    background-color: #b3e5fc;
    color: #003f7f;
  }

  @media (max-width: 600px) {
    font-size: 4vw; /* Aumentar tamaño en pantallas pequeñas */
    padding: 15px 30px;
  }
`;

const ForbiddenPage = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <ForbiddenContainer>
      <WavesBackground />
      <ErrorCode>403</ErrorCode>
      <ErrorMessage>Acceso Denegado</ErrorMessage>
      <ErrorDescription>
        No tienes permiso para acceder a esta página. Por favor, contacta con el administrador si crees que es un error.
      </ErrorDescription>
      <BackButton onClick={handleBack}>Volver</BackButton>
    </ForbiddenContainer>
  );
};

export default ForbiddenPage;
