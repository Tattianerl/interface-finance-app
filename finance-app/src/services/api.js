import axios  from 'axios'

const api = axios.create({
    baseURL: 'https://api-finance-khaki.vercel.app'
})

export default api
