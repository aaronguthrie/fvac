import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { createImageUrlBuilder, getOptimizedImageUrl, imagePresets } from "@/lib/imageUtils";
import Link from "next/link";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = createImageUrlBuilder(projectId, dataset);

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/news" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to News
        </Link>
        <h1 className="text-4xl font-bold mb-6">Post Not Found</h1>
        <p className="text-gray-600">The post you're looking for doesn't exist.</p>
      </div>
    );
  }
  
  const postImageUrl = post.image
    ? getOptimizedImageUrl(urlFor, post.image, imagePresets.newsHero)
    : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/news" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to News
      </Link>
      
      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post.title}
          className="w-full aspect-video rounded-xl mb-8 object-cover"
          width="800"
          height="400"
        />
      )}
      
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-600">
          <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        </div>
      </header>
      
      <article className="prose prose-lg max-w-none">
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </article>
    </div>
  );
}