import { useNavigate } from 'react-router-dom';

function useLogout() {
  const navigate = useNavigate();

  function logout() {
    // Remover o token de autenticação ou qualquer outra informação de usuário do localStorage
    localStorage.removeItem('userToken');
    // sessionStorage.removeItem('userToken');

    // Redirecionar o usuário para a tela de login
    navigate('/');
  }

  return logout;
}

export default useLogout;
