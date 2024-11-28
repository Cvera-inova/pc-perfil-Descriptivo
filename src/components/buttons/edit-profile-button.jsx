/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px; /* Espacio entre el ícono y el texto */
  position: absolute;
  top: 5px;
  right: 10px;
  padding: 5px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Segoe UI', sans-serif;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

const EditProfileButton = ({ editRoute }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(editRoute);
  };

  return (
    <Button onClick={handleClick}>
      <Icon src="https://peopleconnectpictures.blob.core.windows.net/perfil-descriptivo/edit-profile-icon.svg" alt="Editar icono" />
      Editar
    </Button>
  );
};

export default EditProfileButton;