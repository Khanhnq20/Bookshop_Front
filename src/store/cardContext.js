import React from 'react'

const CartContextProvider = React.createContext();

const reducer = (state, action) =>{
  switch (action.type) {
    case "add to cart":
      return {
        ...state, 
        cart: action.payload
      };
  
    default:
      return state;
  }
}

export function CartContext({children}) {
  const [cart, setCart] = React.useState(JSON.parse(localStorage.getItem("cart")));
  const [loading, setLoading] = React.useState(true);
  const mounting = React.useRef(true);

  const functions = {
    filter(item, newItem){
      return item.id === newItem.id 
      && item.type === newItem.type;
    },
    addToCart(newItem){
      setCart(o => {
        if(o.length && o.some(p => this.filter(p, newItem))){
          return o.map(item => item.id === newItem.id ? newItem : item);
        }
        return [...o, {
          ...newItem,
          quantity: newItem?.quantity || 0
        }]
      });
    },
    addItem(key){
      setCart(o => o.map((item, index) => index === key ? ({
        ...item,
        quantity: item.quantity + 1
      }) : item));
    },
    reduceItem(key){
      setCart(o => o.map((item, index) =>{
        if(index === key){
          if(item.quantity < 1){
            this.removeItem(index);
            return item;
          }

          return {
            ...item,
            quantity: item.quantity - 1
          }
        }
        return item
      }));
    },
    removeItem(key){
      setCart(o => o.filter((_, index) => index !== key));
    }
  }

  React.useEffect(() =>{
    localStorage.setItem("cart",JSON.stringify(cart));
  },[cart]);

  return (
    <CartContextProvider.Provider value={[
      {
        cart,
        loading
      },
      functions
    ]
    }>
      {children}
    </CartContextProvider.Provider>
  )
}

export const useCartContext = () =>{
  return React.useContext(CartContextProvider);
}