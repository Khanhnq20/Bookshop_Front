import React from 'react'

const CartContextProvider = React.createContext();

// const reducer = (state, action) =>{
//   switch (action.type) {
//     case "add to cart":
//       return {
//         ...state, 
//         cart: action.payload
//       };
  
//     default:
//       return state;
//   }
// }


const localCart = JSON.parse(localStorage.getItem?.("cart"));
export function CartContext({children}) {
  const [cart, setCart] = React.useState(localCart || []);
  const [loading, setLoading] = React.useState(true);
  const mounting = React.useRef(true);

  const functions = {
    filter(item, newItem){
      return item.id === newItem.id 
      && item.type === newItem.type;
    },
    addToCart(newItem){
      setCart(o => {
        let total = this.calculatePriceTotal(newItem?.price, newItem?.quantity);
        if(o?.length && o.some(p => this.filter(p, newItem))){
          return o.map(item => this.filter(item,newItem) ? {
            ...newItem,
            total
          } : item);
        }
        return [...o, {
          ...newItem,
          quantity: newItem?.quantity || 0,
          total
        }]
      });
    },
    addItem(key){
      setCart(o => o.map((item, index) => {
        let total = this.calculatePriceTotal(item.price, item.quantity + 1);
        return index === key ? ({
          ...item,
          quantity: item.quantity + 1,
          total
        }) : item
      }));
    },
    reduceItem(key){
      setCart(o => o.map((item, index) =>{
        if(index === key){
          if(item.quantity < 2){
            this.removeItem(index);
            return item;
          }

          return {
            ...item,
            quantity: item.quantity - 1,
            total: this.calculatePriceTotal(item?.price, item.quantity - 1)
          }
        }
        return item
      }));
    },
    removeItem(key){
      setCart(o => o.filter((_, index) => index !== key));
    },
    calculatePriceTotal(singlePrice, quantity){
      return singlePrice * quantity;
    }
  }

  React.useEffect(() => {
    console.log(cart);
    if(!mounting.current){
      localStorage.setItem("cart",JSON.stringify(cart));
    }
    mounting.current = false;
  }, [cart]);


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