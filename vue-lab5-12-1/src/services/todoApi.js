const BASE_URL = 'https://jsonplaceholder.typicode.com'
const USER_ID = 1

async function handleResponse(res) {
  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`)
  }
  return res.json()
}

export async function fetchTodos() {
  const res = await fetch(`${BASE_URL}/todos?userId=${USER_ID}`)
  return handleResponse(res)
}

export async function createTodoApi(todo) {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  })
  return handleResponse(res)
}

export async function updateTodoApi(id, patch) {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch)
  })
  return handleResponse(res)
}

export async function deleteTodoApi(id) {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE'
  })

  // jsonplaceholder для DELETE может вернуть пустое тело
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
  return true
}