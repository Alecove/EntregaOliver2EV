import axios from 'axios'

// Usamos JSONPlaceholder, una API gratuita para hacer pruebas de tareas
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-type': 'application/json',
  },
})

export default api