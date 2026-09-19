const apiBaseUrl = import.meta.env.VITE_API_URL || '/api'

export async function apiRequest(path, options = {}) {
  let response
  const isFormData = options.body instanceof FormData

  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: isFormData
        ? options.headers
        : { 'Content-Type': 'application/json', ...options.headers },
    })
  } catch {
    throw new Error('تعذر الاتصال بالخادم. شغّل الباك إند باستخدام npm run server')
  }

  const responseText = await response.text()
  let data = {}

  try {
    data = responseText ? JSON.parse(responseText) : {}
  } catch {
    data = { message: responseText }
  }

  if (!response.ok) {
    const error = new Error(data.message || `Request failed (${response.status})`)
    error.status = response.status
    throw error
  }

  return data
}
