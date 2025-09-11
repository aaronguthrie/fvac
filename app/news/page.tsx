import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, body}`;

const options = { next: { revalidate: 30 } };

export default async function News() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Newsroom</h1>
      <div className="mb-8">
        <p className="text-lg text-gray-600">
          Stay up to date with the latest news, results, and announcements from Finn Valley Athletics Club.
        </p>
      </div>
      
      {posts.length > 0 ? (
        <div className="grid gap-8">
          {posts.map((post) => (
            <article key={post._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <h2 className="text-2xl font-semibold mb-3">
                <Link 
                  href={`/news/${post.slug.current}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              {post.body && post.body[0] && (
                <p className="text-gray-700 mb-4">
                  {post.body[0].children?.[0]?.text?.substring(0, 150)}...
                </p>
              )}
              <Link 
                href={`/news/${post.slug.current}`} 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No news posts available yet.</p>
          <p className="text-gray-500 mt-2">Check back soon for updates from Finn Valley AC!</p>
        </div>
      )}
    </div>
  );
}