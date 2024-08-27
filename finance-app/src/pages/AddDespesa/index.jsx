import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';




const AddDespesa = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparar os dados para envio
    const expenseData = {
      title,
      amount: parseFloat(amount),
      category,
      date,
    };

    try {
      const response = await axios.post('http://localhost:3333/expenses', expenseData);
      console.log('Despesa cadastrada com sucesso:', response.data);

      // Limpar os campos do formulário após o sucesso
      setTitle('');
      setAmount('');
      setCategory('');
      setDate('');
      navigate('/gestaoDespesas')
      // Chamar o callback para notificar que uma nova despesa foi adicionada
      
    } catch (error) {
      console.error('Erro ao cadastrar despesa:', error.response ? error.response.data : error.message);
    }
   
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-fuchsia-600 relative"> 
    <div className="flex items-center justify-center w-full">
      <div className='absolute left-0 0 top-15'>
      <BackButton /> 
    </div>
    <h1 className="text-white text-3xl font-bold py-12">Adicionar Despesa</h1>
    </div>
      <div className="bg-fuchsia-50 px-10 rounded-t-3xl shadow-lg w-full h-full md:max-w-md">  
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="mb-2 mt-10 outline-none">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Valor</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data vencimento</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 mb-4 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-fuchsia-600 text-white py-2 px-4 rounded-lg hover:bg-fuchsia-500 transition duration-200"
        >
          Salvar
        </button>
      </form>
     
    </div>
  </div>
  );
};

export default AddDespesa;
