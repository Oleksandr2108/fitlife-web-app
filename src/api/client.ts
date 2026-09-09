const API_BASE_URL = import.meta.env.VITE_API_URL ?? ''

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers: { Accept: 'application/json', ...options?.headers } })
  if (!response.ok) throw new ApiError(`API request failed with status ${response.status}`, response.status)
  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}
