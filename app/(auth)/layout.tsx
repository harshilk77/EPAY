import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-evenly font-inter">
      <div className="auth-asset">
        <div>
          <Image
            src="/icons/auth-img.svg"
            alt="Auth image"
            width={427.5}
            height={427.5}
            className="object-contain"
          />
        </div>
      </div>
      {children}
    </main>
  );
}