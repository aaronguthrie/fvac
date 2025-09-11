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

## Deployment

### Deploying the Website

1. **Vercel (Recommended):**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Netlify:**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`

### Deploying Sanity Studio

From the `studio-fvac-newsroom` directory:

```bash
npm run deploy
```

This will deploy your Studio to `https://your-studio-name.sanity.studio`

## Environment Variables

If deploying to production, you may need to set up environment variables for Sanity:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=t79osmcf
NEXT_PUBLIC_SANITY_DATASET=production
```

## Troubleshooting

### Common Issues

**1. Sanity Studio won't start:**
- Make sure you're in the correct directory: `../studio-fvac-newsroom`
- Run `npm install` first
- Check if port 3333 is already in use

**2. Images not loading:**
- Verify the Sanity project ID is correct in `sanity/client.ts`
- Make sure images are published (not drafts) in Sanity Studio

**3. "Module not found" errors:**
- Run `npm install` in both directories
- Restart both development servers

### Getting Help

- **Next.js Issues**: [Next.js Documentation](https://nextjs.org/docs)
- **Sanity Issues**: [Sanity Documentation](https://www.sanity.io/docs)
- **General Issues**: Check the [GitHub Issues](https://github.com/aaronguthrie/fvac/issues)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`  
3. Make your changes
4. Commit: `git commit -m "Add some feature"`
5. Push: `git push origin feature-name`
6. Create a Pull Request

## License

This project is private and proprietary to Finn Valley Athletics Club.
