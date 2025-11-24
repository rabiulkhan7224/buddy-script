import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Buddy Script!</h1>
      <p className="text-lg text-center mb-12">
        A social platform for developers to connect, share knowledge, and collaborate on projects.
      </p>
    </main>
  );
}
