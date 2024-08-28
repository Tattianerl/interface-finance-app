import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://api-node-js-ashy.vercel.app/login', { email, password });

      if (response.status === 200) {
        // Redireciona para a tela de gestão de despesas se o login for bem-sucedido
        navigate('/gestaoDespesas');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError('Email ou senha incorretos');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen bg-fuchsia-600">
      <h1 className="text-white text-4xl font-bold mt-10">Welcome</h1>

      <div className="bg-fuchsia-50 px-6 rounded-t-3xl shadow-lg w-full h-full md:max-w-md">
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm mt-10 text-center">{error}</p>}
          <div className="mb-4 mt-20">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-fuchsia-600 text-white py-3 px-2 mt-3 rounded-lg hover:bg-fuchsia-500 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
