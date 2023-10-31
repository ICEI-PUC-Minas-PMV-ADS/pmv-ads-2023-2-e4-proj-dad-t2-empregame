import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://empregame.onrender.com/'
})
