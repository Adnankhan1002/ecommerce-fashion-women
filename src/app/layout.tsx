import type { Metadata } from "next";
import "./globals.css"; import Header from "@/components/Header"; import Footer from "@/components/Footer"; import ChatAssistant from "@/components/ChatAssistant"; import Providers from "@/components/Providers";
export const metadata:Metadata={title:"Aurelia — Elegance, Reimagined",description:"Premium Indian fashion demo storefront"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Providers><Header/>{children}<Footer/>
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-ivory/95 backdrop-blur-xl border-t border-black/10 px-4 py-2">
          <div className="grid grid-cols-5 text-[9px] tracking-wider text-center">
            <a href="/" className="py-2">HOME</a>
            <a href="/shop" className="py-2">SHOP</a>
            <a href="/style-studio" className="py-2">STUDIO</a>
            <a href="/wishlist" className="py-2">WISHLIST</a>
            <a href="/cart" className="py-2">BAG</a>
          </div>
        </nav>
        <ChatAssistant/></Providers></body></html>}