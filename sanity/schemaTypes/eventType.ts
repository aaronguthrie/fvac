import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          {title: 'Track & Field Meet', value: 'track-field'},
          {title: 'Road Race', value: 'road-race'},
          {title: 'Cross Country', value: 'cross-country'},
          {title: 'Training Session', value: 'training'},
          {title: 'Competition', value: 'competition'},
          {title: 'Fun Run', value: 'fun-run'},
          {title: 'Championship', value: 'championship'},
          {title: 'Workshop', value: 'workshop'},
          {title: 'Social Event', value: 'social'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date (Optional)',
      type: 'datetime',
      description: 'For multi-day events',
    }),
    defineField({
      name: 'time',
      title: 'Start Time',
      type: 'string',
      description: 'e.g., "10:00 AM" or "18:30"',
    }),
    defineField({
      name: 'isAtFinnValley',
      title: 'Hosted at Finn Valley AC',
      type: 'boolean',
      description: 'Check this if the event is at our home track',
      initialValue: true,
    }),
    defineField({
      name: 'location',
      title: 'Venue/Location',
      type: 'string',
      validation: (rule) => rule.required(),
      hidden: ({parent}) => parent?.isAtFinnValley,
      description: 'Only fill this if event is NOT at Finn Valley AC',
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'text',
      rows: 3,
      hidden: ({parent}) => parent?.isAtFinnValley,
      description: 'Only fill this if event is NOT at Finn Valley AC',
    }),
    defineField({
      name: 'description',
      title: 'Event Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'registrationRequired',
      title: 'Registration Required',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'registrationDeadline',
      title: 'Registration Deadline',
      type: 'datetime',
      hidden: ({parent}) => !parent?.registrationRequired,
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      hidden: ({parent}) => !parent?.registrationRequired,
    }),
    defineField({
      name: 'cost',
      title: 'Entry Fee/Cost',
      type: 'string',
      description: 'e.g., "Free", "€10", "€5 members / €10 non-members"',
    }),
    defineField({
      name: 'ageCategories',
      title: 'Age Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Under 9', value: 'u9'},
          {title: 'Under 11', value: 'u11'},
          {title: 'Under 13', value: 'u13'},
          {title: 'Under 15', value: 'u15'},
          {title: 'Under 17', value: 'u17'},
          {title: 'Under 20', value: 'u20'},
          {title: 'Senior', value: 'senior'},
          {title: 'Masters', value: 'masters'},
          {title: 'All Ages', value: 'all-ages'},
        ],
      },
    }),
    defineField({
      name: 'contactPerson',
      title: 'Contact Person',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'email',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Event',
      type: 'boolean',
      initialValue: false,
      description: 'Show this event prominently on the homepage',
    }),
    defineField({
      name: 'status',
      title: 'Event Status',
      type: 'string',
      options: {
        list: [
          {title: 'Upcoming', value: 'upcoming'},
          {title: 'Registration Open', value: 'registration-open'},
          {title: 'Registration Closed', value: 'registration-closed'},
          {title: 'Completed', value: 'completed'},
          {title: 'Cancelled', value: 'cancelled'},
          {title: 'Postponed', value: 'postponed'},
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'results',
      title: 'Event Results',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Add results after the event is completed',
      hidden: ({parent}) => parent?.status !== 'completed',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      eventType: 'eventType',
      image: 'image',
    },
    prepare(selection) {
      const {title, date, eventType, image} = selection
      return {
        title,
        subtitle: `${eventType} • ${new Date(date).toLocaleDateString()}`,
        media: image,
      }
    },
  },
  orderings: [
    {
      title: 'Event Date, New',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Event Date, Old',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})