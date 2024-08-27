import { useRef } from 'react'
import { Link } from "react-router-dom"

import api from '../../services/api'

function Cadastro() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
     const user = await api.post('/register', {
        name:nameRef.current.value,
        email:emailRef.current.value,
        passwordRef:passwordRef.current.value
      })
        console.log(user)
      alert("Usuário cadastrado com Sucesso")
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Erro ao cadastrar usuário")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-fuchsia-600">
      <div className="bg-fuchsia-50 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Nome
            </label>
            <input
              ref={nameRef}
              id="name"
              type="text"
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              ref={emailRef}
              id="email"
              type="email"
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              ref={passwordRef}
              id="password"
              type="password"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-fuchsia-600 text-white py-2 px-4 rounded-lg hover:bg-fuchsia-500 transition duration-200"
          >
            Login
          </button>
        </form>
        <Link to="/" className='py-2 px-4 font-bold block text-center'>Já cadastrado?login</Link>
      </div>
    </div>
  );
}
export default Cadastro