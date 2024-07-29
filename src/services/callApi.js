export const callApiService = {
  callApi
}

async function callApi (url, method, body) {
  const headers = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  }

  const request = {
    method,
    headers
  }

  if (method !== 'get' && body !== '') {
    request.body = JSON.stringify(body)
  }
  try {
    const result = await fetch(url, request)
    return result.json()
  } catch (error) {
    console.log('error at callApi.service', error)
  }
}
