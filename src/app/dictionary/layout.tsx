export default function DictionaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto w-full min-h-screen max-w-3xl justify-center p-4 pb-12">
      {children}
    </div>
  );
}
