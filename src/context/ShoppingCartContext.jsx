
import { createContext, ReactNode, useContext, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"


const ShoppingCartContext = createContext({})

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage("Shopping-cart", [])   
  const [isOpen, setIsOpen] = useState(false)
  
  const cartQuantity = cartItems.reduce(
    (quantity, item) =>   quantity + item.quantity
  , 0
  )
  
  const getItemQuantity = id => {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }
  function increaseCartQuantity(id) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function decreaseCartQuantity(id) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function removeFromCart(id) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  const openCart = () => setIsOpen(true) 
  const closeCart = () => setIsOpen(false) 
   

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartQuantity,
        cartItems       
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}

