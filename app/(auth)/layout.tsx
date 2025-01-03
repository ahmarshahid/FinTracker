import Image from "next/image";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 <main className = "flex min-h-screen w-full justify-between font-inter">
    {children}
    <div className = "auth-asset">
    <Image 
    src = "/icons/auth-image.svg" 
    alt = "Auth image"
    width = {510}
    height = {510}
    />
    </div>
 </main>
  );
}
