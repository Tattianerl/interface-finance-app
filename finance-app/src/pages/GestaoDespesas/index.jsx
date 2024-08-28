import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom';
import { FiTrash, FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';
import { FcEditImage } from "react-icons/fc";
import { MdAttachMoney } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import BackButton from '../../components/BackButton/BackButton';
import axios from 'axios';

const GestaoDespesas = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [updatedExpense, setUpdatedExpense] = useState({ title: '', amount: '', category: '', date: '' });
  const [initialBalance, setInitialBalance] = useState(0);
  const [newBalance, setNewBalance] = useState('');
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('https://api-node-js-ashy.vercel.app/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Erro ao buscar despesas:', error);
      alert('Erro ao buscar despesas. Por favor, tente novamente.');
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`https://api-node-js-ashy.vercel.app/expenses/${id}`);
      setExpenses(expenses.filter(expense => expense.id !== id));
      console.log('Despesa excluída com sucesso');
    } catch (error) {
      console.error('Erro ao deletar despesa:', error);
      alert('Erro ao deletar despesa. Por favor, tente novamente.');
    }
  };

  const calculateAvailableBalance = () => {
    const totalExpenses = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    return initialBalance - totalExpenses;
  };

  const updateBalance = () => {
    const balance = parseFloat(newBalance.replace(',', '.'));
    if (!isNaN(balance)) {
      const updatedBalance = initialBalance + balance;
      setInitialBalance(updatedBalance);
      localStorage.setItem('initialBalance', updatedBalance); // Salva no localStorage
      setNewBalance('');
    } else {
      alert('Por favor, insira um valor válido.');
    }
  };


  const resetBalance = () => {
    setInitialBalance(0);
    localStorage.removeItem('initialBalance'); // Remove do localStorage
    console.log('Saldo zerado com sucesso.');
  };



  const startEditing = (expense) => {
    setEditingExpense(expense.id);
    setUpdatedExpense({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });
  };

  const cancelEditing = () => {
    setEditingExpense(null);
    setUpdatedExpense({ title: '', amount: '', category: '', date: '' });
  };

  const updateExpense = async (id) => {
    try {
      await axios.put(`https://api-node-js-ashy.vercel.app/expenses/${id}`, updatedExpense);
      setExpenses(expenses.map(expense =>
        expense.id === id ? { ...expense, ...updatedExpense } : expense
      ));
      cancelEditing();
      alert('Despesa atualizada com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar despesa:', error);
      alert('Erro ao atualizar despesa. Por favor, tente novamente.');
    }
  };

  useEffect(() => {
    const savedBalance = localStorage.getItem('initialBalance');
    if (savedBalance) {
      setInitialBalance(parseFloat(savedBalance)); // Recupera o saldo salvo
    }
    fetchExpenses();
  }, []);


  return (
    <div className="bg-fuchsia-600 px-4 py-6 w-full h-full overflow-hidden">
      <div className="absolute top-4 right-4">
        <Header />
      </div>
      <div className="flex items-center justify-center w-full relative">
        <div className='absolute left-0 0 top-4'>
          <BackButton />
        </div>
        <h1 className="text-white text-2xl font-bold py-4">Gestão de Despesa</h1>
      </div>
      <div className="mb-4">
        <div className="flex justify-around mb-3 gap-2">
          <div className="flex flex-col text-center justify-center w-full p-4 bg-green-50 text-green-800 rounded-lg shadow-sm">
            <div className='flex text-center justify-center py-2'><FiArrowUpRight size={40} /></div>
            <p className="text-lg">Renda: R${initialBalance.toFixed(2)}</p>
          </div>
          <div className="flex flex-col text-center justify-center w-full p-4 bg-fuchsia-50 text-blue-800 rounded-lg shadow-sm">
            <div className='flex text-center justify-center py-2'><MdAttachMoney size={40} /></div>
            <p className="text-lg">Disponível: R${calculateAvailableBalance().toFixed(2)}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded-lg py-2 px-2 mr-2 w-full shadow-sm outline-none"
            placeholder="Atualize seu saldo"
            value={newBalance}
            onChange={(e) => setNewBalance(e.target.value)}
          />

          <button
            className="w-16 h-10 bg-green-600 text-white py-2 px-3 rounded-lg shadow hover:bg-green-500 transition duration-200 m-0 flex items-center justify-center"
            onClick={updateBalance}
          >
            <IoAddCircleOutline size={18} color='#fff' />
          </button>
          <button
            className="w-16 h-10 bg-red-600 text-white py-2 px-3 rounded-lg shadow hover:bg-red-500 transition duration-200 m-0 flex items-center justify-center ml-2"
            onClick={resetBalance}
          >
            <FiTrash size={18} />
          </button>

        </div>
      </div>
      <div className='bg-fuchsia-50 rounded-lg px-4 py-6 overflow-hidden relative'>
        <button
          className="bg-green-600 text-white w-7 h-7 hover:bg-green-500 transition duration-200 flex items-center justify-center rounded-lg absolute right-4 top-2"
          type="button"
          onClick={() => navigate('/addDespesa')}
        >
          <IoAddCircleOutline size={18} color='#fff' />
        </button>
        <button
          className="bg-gray-600 text-white w-7 h-7 hover:bg-gray-500 transition duration-200 flex items-center justify-center rounded-lg absolute right-14 top-2"
          type="button"
          onClick={() => navigate('/relatorio')}
        >
          <TbReportSearch size={18} color='#fff' />
        </button>
        <p className='flex text-center justify-center'><FiArrowDownRight size={40} color='red' /></p>
        <h2 className="font-semibold text-xl text-gray-900 mb-4 text-center">Total de Despesas: R$ {expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0).toFixed(2)}</h2>
        {expenses.length > 0 ? (
          <ul className="space-y-4 w-full overflow-y-auto h-80 bg-fuchsia-50 rounded-lg">
            {expenses.map(expense => (
              <li key={expense.id} className="p-4 rounded-lg shadow-lg bg-white hover:scale-95 duration-300">
                {editingExpense === expense.id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateExpense(expense.id);
                    }}
                  >

                    <div className="mb-2">
                      <label className="block text-gray-700">Título</label>
                      <input
                        type="text"
                        value={updatedExpense.title}
                        onChange={(e) => setUpdatedExpense({ ...updatedExpense, title: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700">Valor</label>
                      <input
                        type="number"
                        step="0.01"
                        value={updatedExpense.amount || ''}
                        onChange={(e) => setUpdatedExpense({ ...updatedExpense, amount: parseFloat(e.target.value) || '' })}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700">Categoria</label>
                      <input
                        type="text"
                        value={updatedExpense.category}
                        onChange={(e) => setUpdatedExpense({ ...updatedExpense, category: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700">Data</label>
                      <input
                        type="date"
                        value={updatedExpense.date}
                        onChange={(e) => setUpdatedExpense({ ...updatedExpense, date: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      >
                        Atualizar
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-gray-700 font-bold">{expense.title}</h2>
                      <p className="text-gray-700 font-medium">Valor: R$ {parseFloat(expense.amount).toFixed(2)}</p>
                      <p className="text-gray-600 font-medium">Categoria: {expense.category}</p>
                      <p className="text-gray-700 font-medium">Data vencimento: {new Date(expense.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex space-x-2 relative">

                      <button
                        onClick={() => startEditing(expense)}
                        className="bg-fuchsia-600 text-white w-7 h-7 rounded-lg hover:bg-fuchsia-500 flex items-center justify-center"
                      >
                        <FcEditImage size={18} color='#fff' />
                      </button>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="bg-red-600 text-white w-7 h-7 rounded-lg hover:bg-red-400 flex items-center justify-center"
                      >
                        <FiTrash size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 font-semibold text-center">Nenhuma despesa registrada.</p>
        )}
      </div>
    </div>
  );
};

export default GestaoDespesas;
