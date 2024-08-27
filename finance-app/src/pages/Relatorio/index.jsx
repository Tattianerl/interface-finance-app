import { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import axios from 'axios';
import Header from '../../components/Header/Header';

const Relatorio = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get('https://api-finance-khaki.vercel.app/report');
        console.log(response.data.data); // Verifique o conteúdo da resposta
        setReport(response.data.data);
        setLoading(false);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Erro ao carregar o relatório');
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto my-8 p-4 flex flex-col items-center justify-center bg-fuchsia-600 shadow-lg rounded-lg relative">
      <div className="absolute top-4 right-4">
        <Header />
      </div>
      <div className="absolute left-1 top-4">
        <BackButton />
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">Relatório de Despesas</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-fuchsia-100 text-left text-gray-600 font-bold">Categoria</th>
            <th className="py-2 px-4 bg-red-300 text-left text-gray-600 font-bold">Total Gasto (R$)</th>
          </tr>
        </thead>
        <tbody>
          {report.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-gray-700">{item.category}</td>
              <td className="border px-4 py-2 text-gray-700">{item.totalAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Relatorio;
