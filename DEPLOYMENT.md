# Deployment Guide - Smarter With Science Platform

## 🚀 Quick Start

### GitHub Repository
The project is available at: **https://github.com/ScienceStanley/smarter-with-science-platform**

### Local Development
```bash
npm install
npm run dev
```

## 🌐 Vercel CLI Setup

### 1. Initial Authentication
Choose one of these methods:

#### Option A: Email Authentication (Recommended)
```bash
npx vercel login
# Select "Continue with Email"
# Enter your email and check for verification link
```

#### Option B: GitHub OAuth
```bash
npx vercel login
# Select "Continue with GitHub" 
# Follow browser authentication flow
```

#### Option C: Token-based (Advanced)
```bash
# 1. Create token at https://vercel.com/account/tokens
# 2. Set environment variable or use directly:
npx vercel login --token YOUR_TOKEN
```

### 2. Link Project
After authentication, link your local project:
```bash
npx vercel link
# Follow prompts to connect to your Vercel project
```

### 3. Deploy

#### Quick Deployment Commands
```bash
# Preview deployment
npm run deploy:preview

# Production deployment  
npm run deploy:prod

# Or use Vercel CLI directly
npx vercel                # Preview
npx vercel --prod         # Production
```

#### Manual Deployment
```bash
# Build and test locally first
npm run build
npm run preview

# Deploy preview
npx vercel

# Deploy to production
npx vercel --prod
```

## 📦 Build Process

The build includes:
- **TypeScript checking** with `astro check`
- **Static site generation** with optimized assets
- **Tailwind CSS compilation** with design tokens
- **Content collection processing** for projects

### Build Validation
```bash
npm run build     # Full build with type checking
npm run preview   # Test built version locally
```

## 🔧 Configuration

### Vercel Settings
The project includes optimized `vercel.json` with:
- **Framework**: Auto-detected as Astro
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Security Headers**: Content-Type, Frame, XSS protection
- **Caching**: Optimized for static assets

### Environment Variables
Copy `.env.example` to `.env.local` and configure:
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

## 🚦 Deployment Workflow

### Automatic Deployments
- **Production**: Pushes to `master` branch
- **Preview**: All other branches and PRs
- **URL Generation**: Unique URLs for each deployment

### Manual Quality Checks
Before deployment:
1. **Build Test**: `npm run build`
2. **Local Preview**: `npm run preview`
3. **Visual Review**: Check design system compliance
4. **Performance**: Verify Lighthouse scores >90

### Deployment Script Features
The `scripts/deploy.sh` includes:
- Build validation before deployment
- Git status checking for uncommitted changes
- Environment-specific deployment (preview/production)
- Success confirmation

## 🎯 Best Practices

### Pre-Deployment Checklist
- [ ] All changes committed to git
- [ ] Build passes locally (`npm run build`)
- [ ] Visual review matches design system
- [ ] No console errors in browser
- [ ] Responsive design tested
- [ ] Accessibility compliance checked

### Branch Strategy
- `master`: Production-ready code
- Feature branches: Development work
- Vercel auto-deploys previews for all branches

### Performance Monitoring
- Monitor Lighthouse scores on each deployment
- Check Core Web Vitals in Vercel dashboard
- Verify loading performance on mobile

## 🐛 Troubleshooting

### Common Issues

#### Authentication Problems
```bash
# Clear auth and re-login
rm -rf ~/.vercel
npx vercel login
```

#### Build Failures
```bash
# Check TypeScript errors
npm run astro check

# Clean build
rm -rf dist .astro
npm run build
```

#### Deployment Timeouts
- Reduce bundle size
- Optimize images with Sharp
- Check for infinite loops in components

### Getting Help
- **Vercel Docs**: https://vercel.com/docs
- **Astro Docs**: https://docs.astro.build
- **Project Issues**: GitHub repository issues

## 📊 Monitoring

### After Deployment
1. **Verify URL**: Check production/preview URL works
2. **Test Navigation**: All internal links function
3. **Performance**: Lighthouse audit in Vercel dashboard
4. **Analytics**: Monitor Core Web Vitals

### Ongoing Monitoring
- Weekly performance reviews
- Monthly dependency updates
- Quarterly security audits

---

**Ready to deploy the future of science collaboration! 🧬✨**