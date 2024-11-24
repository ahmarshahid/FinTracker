import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
        const LoggedIn = {firstName: "Ahmar", lastName: "Shahid"};

  return (
 <main className="flex h-screen w-full font-inter">
    <Sidebar user = {LoggedIn}/>
    <div className = "flex size flex-col">
      <div className="root-layout">
        <Image src = '/icons/bitcoin1.png' alt = 'logo' width = {30} height = {30}  
        />
        <div>
        <MobileNav user = {LoggedIn}/>
        </div>

      </div>

    </div>
    {children}
 </main>
  );
}
