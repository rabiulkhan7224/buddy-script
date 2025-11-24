import PostFeed from "@/components/feed/postFeed";
import PostComposer from "@/components/home/postComposer";
import Stories from "@/components/home/storys";

export default function Home() {
  return (
    <main className="flex w-full flex-col justify-center bg-[#F0F2F5]  border">
      <Stories />
      <PostComposer /> 
    <PostFeed />
    </main>
  );
}
