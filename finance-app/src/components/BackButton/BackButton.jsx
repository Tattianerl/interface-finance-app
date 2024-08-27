import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center text-white font-bold py-2 px-4 rounded">
      <FiArrowLeft size={20} color='#fff'/>
      
    </button>
  );
}

export default BackButton;