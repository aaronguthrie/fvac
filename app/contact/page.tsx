export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">info@finnvalleyac.ie</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Phone</h3>
              <p className="text-gray-600">+353 (0)74 123 4567</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Address</h3>
              <p className="text-gray-600">
                Finn Valley Athletics Track<br/>
                Stranorlar, Co. Donegal<br/>
                Ireland
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Join Our Club</h2>
          <p className="mb-4">
            Interested in joining Finn Valley AC? We welcome new members of all ages and abilities.
          </p>
          <p className="mb-4">
            Contact us to learn more about membership options, training schedules, and upcoming events.
          </p>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded">
            <h3 className="font-semibold text-blue-800 mb-2">Training Times</h3>
            <p className="text-blue-700 text-sm">
              Come along to any of our training sessions to meet the coaches and see what we're all about!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}