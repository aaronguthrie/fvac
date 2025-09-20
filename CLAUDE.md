# Claude Code Guidelines for Finn Valley AC Project

## Project Overview
- **Framework**: Next.js 15.5.3 with TypeScript
- **CMS**: Sanity with next-sanity integration
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel (with strict build checks)

## Build Requirements
Vercel runs strict checks that MUST pass for deployment:
- ESLint linting (fails build on errors)
- TypeScript type checking (fails build on type errors)
- Next.js compilation

## Code Standards

### TypeScript
- Always use proper TypeScript types
- Import types from their source packages (e.g., `ImageFormat` from `@sanity/image-url`)
- Never use `any` type unless absolutely necessary
- Ensure all variables are used (no unused variable warnings)

### React/JSX
- Escape apostrophes in JSX content using `&apos;` not `'`
- Use Next.js `<Image>` component instead of `<img>` for performance
- Always provide `width` and `height` props for Image components

### Sanity Integration
- Use the custom `imageUtils.ts` helper for image optimization
- Stick to Sanity's supported image formats: `'jpg' | 'pjpg' | 'png' | 'webp'`
- Use `ImageFormat` type from `@sanity/image-url/lib/types/types`

### Code Style
- Follow existing patterns in the codebase
- Use Tailwind CSS classes for styling
- Maintain consistent component structure
- Import statements should be organized (external packages first, then local imports)

## Development Workflow
**CRITICAL: Always test locally before pushing to GitHub**

### Pre-Commit Checklist (MANDATORY)
Before committing ANY changes:

1. **Run full build locally:** `npm run build`
   - This catches ALL errors that Vercel will catch
   - Saves time vs waiting for Vercel deployment failures
   - Prevents broken deployments

2. **Run linting:** `npm run lint`
   - Fix any ESLint errors (warnings are okay but avoid them)

3. **Code quality checks:**
   - Ensure all images use Next.js `<Image>` component
   - Check that all apostrophes in JSX are properly escaped with `&apos;`
   - Verify no unused variables exist

4. **Only commit if build succeeds locally**

### Optimal Workflow
```bash
# 1. Make your changes
# 2. Test locally
npm run build          # MUST pass before pushing
npm run lint           # Check for issues

# 3. If everything passes, commit and push
git add .
git commit -m "..."
git push

# 4. Vercel will deploy successfully
```

**Why this matters:**
- Vercel has the same build process as local
- Failed Vercel deployments waste time and resources
- Local builds are faster than waiting for Vercel feedback
- Prevents client-facing broken deployments

## Common Issues to Avoid
1. **Unescaped apostrophes** - Use `&apos;` in JSX content
2. **Wrong image types** - Don't use `gif` format with Sanity
3. **Unused variables** - Remove or comment out unused declarations
4. **Missing Image imports** - Import `Image` from `next/image` when replacing `<img>`
5. **Incorrect type imports** - Use official types from package sources

## Testing Commands
```bash
npm run lint      # Check for linting errors
npm run build     # Full build with type checking
npm run dev       # Development server
```

## Sanity Studio Security
**CRITICAL: Studio must be secured for production**

### Authentication Setup Required:
1. **Sanity Project Access** (at [sanity.io/manage](https://sanity.io/manage)):
   - Go to your project → "Access" tab
   - Add staff members by email with "Editor" or "Admin" roles
   - Remove any anonymous/public access
   - Only approved users can access studio

2. **Studio Configuration** (already configured):
   - Authentication mode set to 'replace' (no anonymous access)
   - Clean studio layout without website header
   - Accessible at `/studio` route

### Staff Login Process:
- Staff visits `your-site.com/studio`
- Sanity prompts for authentication
- They sign in with approved Google/GitHub/email account
- Access granted only to project members

## File Structure Notes
- `/app` - Next.js App Router pages
- `/app/studio` - Sanity Studio with dedicated layout
- `/lib` - Utility functions (imageUtils.ts)
- `/components` - Reusable React components
- `/sanity` - Sanity CMS configuration and schema types