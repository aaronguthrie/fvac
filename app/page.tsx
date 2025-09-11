import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to Finn Valley Athletics Club
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Premier athletics club serving the local community with excellence in track and field sports. 
            Join us and discover your potential in athletics.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Join Now
            </Link>
            <Link
              href="/about"
              className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🏃</div>
              <h3 className="text-xl font-semibold mb-3">Track & Field</h3>
              <p className="text-gray-600">
                Professional training in sprints, distance running, jumping, and throwing events.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">👶</div>
              <h3 className="text-xl font-semibold mb-3">Youth Development</h3>
              <p className="text-gray-600">
                Specialized programs for young athletes to develop fundamental skills and love for athletics.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-3">Competition</h3>
              <p className="text-gray-600">
                Regular competitions and championships for athletes at all levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Whether you're a complete beginner or an experienced athlete, 
            Finn Valley AC has a place for you. Come and be part of our athletic family.
          </p>
          <Link
            href="/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
}
