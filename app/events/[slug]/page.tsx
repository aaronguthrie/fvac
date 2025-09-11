import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { createImageUrlBuilder, getOptimizedImageUrl, imagePresets } from "@/lib/imageUtils";
import Link from "next/link";

const EVENT_QUERY = `*[_type == "event" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  eventType,
  date,
  endDate,
  time,
  isAtFinnValley,
  location,
  address,
  description,
  image,
  registrationRequired,
  registrationDeadline,
  registrationLink,
  cost,
  ageCategories,
  contactPerson,
  contactEmail,
  contactPhone,
  status,
  results
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

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const event = await client.fetch<SanityDocument>(EVENT_QUERY, await params, options);
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/events" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Events
        </Link>
        <h1 className="text-4xl font-bold mb-6">Event Not Found</h1>
        <p className="text-gray-600">The event you're looking for doesn't exist.</p>
      </div>
    );
  }
  
  const eventImageUrl = event.image
    ? getOptimizedImageUrl(urlFor, event.image, imagePresets.eventHero)
    : null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isRegistrationOpen = event.status === 'registration-open' && event.registrationRequired;
  const isRegistrationClosed = event.registrationDeadline && 
    new Date(event.registrationDeadline) < new Date();

  // Finn Valley AC coordinates and address
  const finnValleyAddress = "Finn Valley Centre, Mill Brae, Stranorlar, Co. Donegal, F93 NV0T, Ireland";
  const finnValleyCoords = "54.8018134,-7.765362";
  
  const displayLocation = event.isAtFinnValley ? "Finn Valley AC" : event.location;
  const displayAddress = event.isAtFinnValley ? finnValleyAddress : event.address;
  
  const getGoogleMapsUrl = () => {
    if (event.isAtFinnValley) {
      return "https://www.google.com/maps/place/Finn+Valley+Centre/@54.8020908,-7.7682074,17z/data=!3m1!4b1!4m6!3m5!1s0x485fbed2cbf354dd:0x1945d592d29541b2!8m2!3d54.8020877!4d-7.7656271!16s%2Fg%2F1tfgj6w_?entry=ttu&g_ep=EgoyMDI1MDkwOS4wIKXMDSoASAFQAw%3D%3D";
    }
    return event.address 
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;
  };

  const getAppleMapsUrl = () => {
    if (event.isAtFinnValley) {
      return "https://maps.apple.com/place?place-id=IDFFDE667CE98239F&address=Finn+Valley+Centre%2C+Mill+Brae%2C+Stranorlar%2C+Co.+Donegal%2C+F93+NV0T%2C+Ireland&coordinate=54.8018134%2C-7.765362&name=Finn+Valley+Athletic+Club&_provider=9902";
    }
    return event.address 
      ? `http://maps.apple.com/?q=${encodeURIComponent(event.address)}`
      : `http://maps.apple.com/?q=${encodeURIComponent(event.location)}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/events" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Events
      </Link>
      
      {eventImageUrl && (
        <img
          src={eventImageUrl}
          alt={event.title}
          className="w-full aspect-video rounded-xl mb-8 object-cover"
          width="800"
          height="400"
        />
      )}
      
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`px-3 py-1 text-sm rounded-full border ${getEventTypeColor(event.eventType)}`}>
            {event.eventType.replace('-', ' ')}
          </span>
          <span className={`px-3 py-1 text-sm rounded-full ${getStatusBadge(event.status)}`}>
            {event.status.replace('-', ' ')}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold mb-6">{event.title}</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            
            <div className="flex items-start gap-3">
              <span className="text-xl">📅</span>
              <div>
                <p className="font-medium">Date</p>
                <p className="text-gray-600">{formatDate(event.date)}</p>
                {event.endDate && (
                  <p className="text-gray-600">to {formatDate(event.endDate)}</p>
                )}
              </div>
            </div>

            {event.time && (
              <div className="flex items-start gap-3">
                <span className="text-xl">🕐</span>
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-gray-600">{event.time}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <span className="text-xl">📍</span>
              <div className="flex-1">
                <p className="font-medium">Location</p>
                <p className="text-gray-600">{displayLocation}</p>
                {displayAddress && (
                  <p className="text-gray-500 text-sm mt-1">{displayAddress}</p>
                )}
                
                {event.isAtFinnValley && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={getGoogleMapsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      Google Maps
                    </a>
                    <a
                      href={getAppleMapsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      Apple Maps
                    </a>
                  </div>
                )}
              </div>
            </div>

            {event.cost && (
              <div className="flex items-start gap-3">
                <span className="text-xl">💰</span>
                <div>
                  <p className="font-medium">Cost</p>
                  <p className="text-gray-600">{event.cost}</p>
                </div>
              </div>
            )}

            {event.ageCategories && event.ageCategories.length > 0 && (
              <div className="flex items-start gap-3">
                <span className="text-xl">👥</span>
                <div>
                  <p className="font-medium">Age Categories</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {event.ageCategories.map((category: string) => (
                      <span 
                        key={category} 
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {category.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {event.registrationRequired && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Registration</h3>
                
                {event.registrationDeadline && (
                  <p className="text-sm text-gray-600 mb-3">
                    Registration closes: {formatDate(event.registrationDeadline)}
                  </p>
                )}
                
                {isRegistrationOpen && event.registrationLink ? (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Register Now →
                  </a>
                ) : isRegistrationClosed ? (
                  <p className="text-red-600 font-medium">Registration has closed</p>
                ) : (
                  <p className="text-gray-600">Registration details coming soon</p>
                )}
              </div>
            )}

            {(event.contactPerson || event.contactEmail || event.contactPhone) && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Contact</h3>
                
                {event.contactPerson && (
                  <p className="mb-2">
                    <span className="font-medium">Contact:</span> {event.contactPerson}
                  </p>
                )}
                
                {event.contactEmail && (
                  <p className="mb-2">
                    <span className="font-medium">Email:</span>{' '}
                    <a 
                      href={`mailto:${event.contactEmail}`}
                      className="text-blue-600 hover:underline"
                    >
                      {event.contactEmail}
                    </a>
                  </p>
                )}
                
                {event.contactPhone && (
                  <p>
                    <span className="font-medium">Phone:</span>{' '}
                    <a 
                      href={`tel:${event.contactPhone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {event.contactPhone}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
      
      {Array.isArray(event.description) && (
        <div className="prose prose-lg max-w-none mb-8">
          <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
          <PortableText value={event.description} />
        </div>
      )}

      {event.status === 'completed' && event.results && Array.isArray(event.results) && (
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Results</h2>
          <PortableText value={event.results} />
        </div>
      )}
    </div>
  );
}