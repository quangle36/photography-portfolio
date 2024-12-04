import axios, { AxiosRequestConfig } from "axios"
import useSWR, { SWRConfiguration, SWRResponse } from "swr"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DOMAIN || "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)

export const fetcher = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.get<T>(url, config)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        status: error.response?.status,
        message: error.response?.data.message || "An error occurred",
        error: error,
      }
    }
    throw error
  }
}

export function useApiSWR<T = any>(
  key: string | null,
  options?: SWRConfiguration<T>
): SWRResponse<T, Error> {
  return useSWR<T>(key, () => fetcher<T>(key!), {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    ...options,
  })
}

// Mutation utility for data updates
export async function apiMutate<T = any>(
  url: string,
  data: any,
  method: "post" | "put" | "patch" | "delete" = "post"
): Promise<T> {
  try {
    const response = await api[method]<T>(url, data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        status: error.response?.status,
        message: error.response?.data?.message || "An error occurred",
        error: error,
      }
    }
    throw error
  }
}

// Server-side data fetching for App Router
export async function fetchData<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T | null> {
  try {
    const response = await api.get<T>(url, config)
    return response.data
  } catch (error) {
    // Log error or handle specifically for server-side
    console.error("Server-side fetch error:", error)
    return null
  }
}

//Usecase

// Client-side data fetching
// function UserProfile() {
//   const { data, error, isLoading } = useApiSWR<User>('/users/me');

//   if (isLoading) return <Loader />;
//   if (error) return <ErrorMessage error={error} />;

//   return <UserDetails user={data} />;
// }

// Server-side data fetching (in a Server Component)
// export default async function UsersPage() {
//   const users = await fetchData<User[]>('/users');
//   return <UserList users={users} />;
// }

// Data mutation
// async function updateUser(userData) {
//   try {
//     const updatedUser = await apiMutate<User>('/users/me', userData, 'put');
//     // Handle successful update
//   } catch (error) {
//     // Handle error
//   }
// }
