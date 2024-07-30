
import { callApiService } from '@/services/callApi'

const API_URL = process.env.VUE_APP_API_BASE_URL

async function getAllKnights (filter) {
  const formattedUrl = `${API_URL}/knights${filter}`
  const result = await callApiService.callApi(formattedUrl, 'get')
  return result
}

async function createKnight (body) {
  const formattedUrl = `${API_URL}/knights`
  const result = await callApiService.callApi(formattedUrl, 'post', body)
  console.log(result)
  return result
}

async function deleteKnight (id) {
  const formattedUrl = `${API_URL}/knights/${id}`
  const result = await callApiService.callApi(formattedUrl, 'delete')
  return result
}

async function getKnight (id) {
  const formattedUrl = `${API_URL}/knights/${id}`
  const result = await callApiService.callApi(formattedUrl, 'get')
  return result
}

export const knightsService = {
  getAllKnights,
  createKnight,
  deleteKnight,
  getKnight
}