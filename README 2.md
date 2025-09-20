# Finn Valley Athletics Club Website

A modern, responsive website for Finn Valley Athletics Club built with Next.js and Sanity CMS.

## Features

- **Next.js 15** with TypeScript and Tailwind CSS
- **Sanity CMS** integration for content management
- **Responsive design** that works on all devices
- **Event management** with registration and location features
- **News/Newsroom** for club updates and announcements
- **Optimized images** with WebP format for fast loading
- **Google Maps & Apple Maps** integration for directions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### 3. Running Sanity Studio (Content Management)

The Sanity Studio is located in the `../studio-fvac-newsroom/` directory (adjacent to this project).

**To run the Sanity Studio:**

1. **Open a new terminal window**
2. **Navigate to the studio directory:**
   ```bash
   cd ../studio-fvac-newsroom
   ```
3. **Install dependencies (first time only):**
   ```bash
   npm install
   ```
4. **Start the studio:**
   ```bash
   npm run dev
   ```
5. **Open the studio in your browser:** [http://localhost:3333](http://localhost:3333)

### 4. Managing Content

Once both servers are running:

- **Website**: http://localhost:3000 (public website)
- **Sanity Studio**: http://localhost:3333 (content management)

In the Sanity Studio, you can:
- ✅ **Create and edit Events** (competitions, training sessions, workshops)
- ✅ **Manage News posts** (announcements, results, updates)
- ✅ **Upload and optimize images**
- ✅ **Set event locations** (automatically handles Finn Valley AC address)
- ✅ **Manage registration links** and event details

### 5. Project Structure

```
finn-valley-ac/              # Main Next.js website
├── app/                     # Next.js App Router pages
│   ├── about/               # About page
│   ├── contact/             # Contact page  
│   ├── events/              # Events listing & individual event pages
│   ├── news/                # News listing & individual news pages
│   └── page.tsx             # Home page
├── components/              # Reusable React components
├── lib/                     # Utility functions (image optimization)
├── sanity/                  # Sanity client configuration
└── ...

../studio-fvac-newsroom/     # Sanity Studio (CMS)
├── schemaTypes/             # Content schemas (Event, Post)
└── ...
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
