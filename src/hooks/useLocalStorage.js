import { useEffect, useState } from "react"

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) ? 
    JSON.parse(localStorage.getItem(key)) : 
    []
    
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]

}
