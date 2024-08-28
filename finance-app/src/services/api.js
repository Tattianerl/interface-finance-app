import axios  from 'axios'

const api = axios.create({
    baseURL: 'https://api-node-js-ashy.vercel.app'
})

export default api
