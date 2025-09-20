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

## Pre-Deployment Checklist
Before committing changes:
1. Run `npm run lint` to check for linting errors
2. Run `npm run build` to verify TypeScript compilation
3. Fix any ESLint errors (warnings are okay but avoid them)
4. Ensure all images use Next.js Image component
5. Check that all apostrophes in JSX are properly escaped

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

## File Structure Notes
- `/app` - Next.js App Router pages
- `/lib` - Utility functions (imageUtils.ts)
- `/components` - Reusable React components
- `/sanity` - Sanity CMS configuration