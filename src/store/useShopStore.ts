import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Order, Product } from "@/types";
import { coinValue, rewardForOrder } from "@/lib/magicCoins";

type State = {
  cart: CartItem[]; wishlist:string[]; coins:number; orders:Order[];
  coupon:{code:string;discount:number}|null;
  addToCart:(item:CartItem)=>void; removeFromCart:(id:string,size:string,color:string)=>void;
  setQty:(id:string,size:string,color:string,qty:number)=>void;
  toggleWishlist:(id:string)=>void; applyCoupon:(code:string,subtotal:number)=>boolean;
  clearCoupon:()=>void; placeOrder:(coinsUsed:number)=>Order;
};

export const useShopStore = create<State>()(persist((set,get)=>({
  cart:[], wishlist:["p1","p7"], coins:850, orders:[],
  coupon:null,
  addToCart:(item)=>set(s=>{
    const key=(x:CartItem)=>`${x.product.id}-${x.size}-${x.color}`;
    const found=s.cart.find(x=>key(x)===key(item));
    return {cart:found?s.cart.map(x=>key(x)===key(item)?{...x,quantity:x.quantity+item.quantity}:x):[...s.cart,item]};
  }),
  removeFromCart:(id,size,color)=>set(s=>({cart:s.cart.filter(x=>!(x.product.id===id&&x.size===size&&x.color===color))})),
  setQty:(id,size,color,qty)=>set(s=>({cart:qty<=0?s.cart.filter(x=>!(x.product.id===id&&x.size===size&&x.color===color)):s.cart.map(x=>x.product.id===id&&x.size===size&&x.color===color?{...x,quantity:Math.min(qty,x.product.stock)}:x)})),
  toggleWishlist:(id)=>set(s=>({wishlist:s.wishlist.includes(id)?s.wishlist.filter(x=>x!==id):[...s.wishlist,id]})),
  applyCoupon:(code,subtotal)=>{
    const coupons:Record<string,number>={WELCOME10:.10,FESTIVE20:.20,STYLE500:500,MAGIC100:100};
    const v=coupons[code.toUpperCase()];
    if(!v) return false;
    const discount=code.toUpperCase()==="STYLE500"?Math.min(500,subtotal):code.toUpperCase()==="MAGIC100"?Math.min(100,subtotal):Math.round(subtotal*v);
    set({coupon:{code:code.toUpperCase(),discount}});
    return true;
  },
  clearCoupon:()=>set({coupon:null}),
  placeOrder:(coinsUsed)=>{
    const s=get(); const subtotal=s.cart.reduce((a,x)=>a+x.product.price*x.quantity,0);
    const discount=s.coupon?.discount??0; const coinDiscount=coinValue(coinsUsed);
    const total=Math.max(0,subtotal-discount-coinDiscount);
    const earned=rewardForOrder(total);
    const order:Order={id:`ORD-${Date.now().toString().slice(-8)}`,items:s.cart,subtotal,discount,coinsUsed,coinsEarned:earned,total,status:"PLACED",createdAt:new Date().toISOString()};
    set({cart:[],coupon:null,coins:s.coins-coinsUsed+earned,orders:[order,...s.orders]});
    return order;
  }
}),{name:"aurelia-demo-store"}));