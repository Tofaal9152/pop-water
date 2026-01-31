import axios from 'axios'

const apiClient = axios.create({
  baseURL: "https://pop-water-api.ongshak.com",
  // withCredentials: true,
})

export default apiClient
