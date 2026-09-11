"use client";
import Link from "next/link";
import { Search, Heart, ShoppingBag, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { useShopStore } from "@/store/useShopStore";
export default function Header(){
 const [open,setOpen]=useState(false); const cart=useShopStore(s=>s.cart); const coins=useShopStore(s=>s.coins);
 return <><div className="bg-burgundy text-white text-center text-xs tracking-[.2em] py-2">✨ SHOP ₹500+ AND EARN MAGIC COINS ✨</div>
 <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur border-b border-black/5">
  <div className="container h-20 flex items-center justify-between gap-6">
   <button className="md:hidden" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X/>:<Menu/>}</button>
   <Link href="/" className="serif text-3xl tracking-tight">AURELIA<span className="text-burgundy">.</span></Link>
   <nav className="hidden md:flex gap-6 text-sm"><Link href="/shop">Women</Link><Link href="/shop?category=Sarees">Sarees</Link><Link href="/shop?category=Salwar%20Suits">Suits</Link><Link href="/shop?category=Kurtis">Kurtis</Link><Link href="/style-studio">Style Studio</Link></nav>
   <div className="flex items-center gap-3">
    <Link href="/shop" aria-label="Search"><Search size={19}/></Link>
    <Link href="/wishlist" className="hidden sm:block"><Heart size={19}/></Link>
    <Link href="/magic-coins" className="hidden sm:flex items-center gap-1 text-sm"><Sparkles size={17}/>{coins}</Link>
    <Link href="/cart" className="relative"><ShoppingBag size={20}/>{cart.length>0&&<span className="absolute -right-2 -top-2 text-[10px] bg-burgundy text-white rounded-full w-4 h-4 grid place-items-center">{cart.length}</span>}</Link>
   </div>
  </div>
  {open&&<nav className="md:hidden border-t p-5 grid gap-4 bg-ivory"><Link onClick={()=>setOpen(false)} href="/shop">Shop</Link><Link onClick={()=>setOpen(false)} href="/style-studio">Style Studio</Link><Link onClick={()=>setOpen(false)} href="/wishlist">Wishlist</Link><Link onClick={()=>setOpen(false)} href="/magic-coins">Magic Coins</Link></nav>}
 </header></> }