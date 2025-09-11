import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { createImageUrlBuilder, getOptimizedImageUrl, imagePresets } from "@/lib/imageUtils";

const EVENTS_QUERY = `*[
  _type == "event"
  && defined(slug.current)
]|order(date asc)[0...20]{
  _id, 
  title, 
  slug, 
  eventType,
  date, 
  time,
  isAtFinnValley,
  location,
  description,
  image,
  status,
  isFeatured,
  cost,
  registrationRequired
}`;

const { projectId, dataset } = client.config();
const urlFor = createImageUrlBuilder(projectId, dataset);

const options = { next: { revalidate: 30 } };

const getEventTypeColor = (eventType: string) => {
  const colors: Record<string, string> = {
    'track-field': 'border-blue-500 bg-blue-50 text-blue-800',
    'road-race': 'border-red-500 bg-red-50 text-red-800',
    'cross-country': 'border-green-500 bg-green-50 text-green-800',
    'training': 'border-purple-500 bg-purple-50 text-purple-800',
    'competition': 'border-orange-500 bg-orange-50 text-orange-800',
    'fun-run': 'border-pink-500 bg-pink-50 text-pink-800',
    'championship': 'border-yellow-500 bg-yellow-50 text-yellow-800',
    'workshop': 'border-indigo-500 bg-indigo-50 text-indigo-800',
    'social': 'border-gray-500 bg-gray-50 text-gray-800',
  };
  return colors[eventType] || 'border-gray-500 bg-gray-50 text-gray-800';
};

const getStatusBadge = (status: string) => {
  const badges: Record<string, string> = {
    'upcoming': 'bg-blue-100 text-blue-800',
    'registration-open': 'bg-green-100 text-green-800',
    'registration-closed': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-gray-100 text-gray-800',
    'cancelled': 'bg-red-100 text-red-800',
    'postponed': 'bg-orange-100 text-orange-800',
  };
  return badges[status] || 'bg-gray-100 text-gray-800';
};

export default async function Events() {
  const events = await client.fetch<SanityDocument[]>(EVENTS_QUERY, {}, options);
  
  const featuredEvents = events.filter(event => event.isFeatured);
  const upcomingEvents = events.filter(event => 
    event.status === 'upcoming' || event.status === 'registration-open'
  );
  const trainingEvents = events.filter(event => event.eventType === 'training');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Events & Training</h1>
      
      {featuredEvents.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => {
              const eventImageUrl = event.image
                ? getOptimizedImageUrl(urlFor, event.image, imagePresets.eventCard)
                : null;
              
              return (
                <div key={event._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  {eventImageUrl && (
                    <img
                      src={eventImageUrl}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getEventTypeColor(event.eventType)}`}>
                        {event.eventType.replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(event.status)}`}>
                        {event.status.replace('-', ' ')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      <Link 
                        href={`/events/${event.slug.current}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {event.title}
                      </Link>
                    </h3>
                    <div className="text-gray-600 text-sm space-y-1">
                      <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                      {event.time && <p>🕐 {event.time}</p>}
                      <p>📍 {event.isAtFinnValley ? 'Finn Valley AC' : event.location}</p>
                      {event.cost && <p>💰 {event.cost}</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event._id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getEventTypeColor(event.eventType)}`}>
                        {event.eventType.replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(event.status)}`}>
                        {event.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    <Link 
                      href={`/events/${event.slug.current}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {event.title}
                    </Link>
                  </h3>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                    {event.time && <p>🕐 {event.time}</p>}
                    <p>📍 {event.isAtFinnValley ? 'Finn Valley AC' : event.location}</p>
                    {event.cost && <p>💰 {event.cost}</p>}
                    {event.registrationRequired && (
                      <p className="text-blue-600 font-medium">📝 Registration Required</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No upcoming events scheduled.</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Regular Training</h2>
          {trainingEvents.length > 0 ? (
            <div className="space-y-4">
              {trainingEvents.map((event) => (
                <div key={event._id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    <Link 
                      href={`/events/${event.slug.current}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {event.title}
                    </Link>
                  </h3>
                  <div className="text-gray-600 text-sm space-y-1">
                    {event.time && <p>🕐 {event.time}</p>}
                    <p>📍 {event.isAtFinnValley ? 'Finn Valley AC' : event.location}</p>
                    {event.cost && <p>💰 {event.cost}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Default Training Schedule</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold">Track & Field Training</h4>
                  <p className="text-gray-600">Tuesdays & Thursdays, 6:30 PM</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold">Junior Athletics</h4>
                  <p className="text-gray-600">Saturdays, 10:00 AM</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold">Distance Running</h4>
                  <p className="text-gray-600">Sundays, 9:00 AM</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}