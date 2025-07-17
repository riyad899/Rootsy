# Vercel Deployment Guide for Gardening Project

## Prerequisites
- ✅ Git repository (completed)
- ✅ Build configuration (completed)
- ✅ Vercel.json configuration (completed)
- 🔄 Environment variables (needs setup)
- 🔄 Vercel account and deployment

## Deployment Steps

### Method 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project directory:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Choose your team/account
   - Set project name (e.g., "gardening-rootsy")
   - Confirm settings

4. **Production deployment:**
   ```bash
   vercel --prod
   ```

### Method 2: Deploy via Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with GitHub, GitLab, or Bitbucket
3. **Import your repository:**
   - Click "New Project"
   - Connect your Git provider
   - Select this repository
4. **Configure project:**
   - Framework: Vite (auto-detected)
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

## Environment Variables Setup

### Required Environment Variables:
Add these in Vercel Dashboard → Project Settings → Environment Variables:

```env
# ImgBB API (Required for image uploads)
VITE_IMGBB_API_KEY=your_imgbb_api_key_here

# Firebase Configuration (Required for authentication)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Optional: Cloudinary (if used)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_API_SECRET=your_api_secret
```

### How to add Environment Variables in Vercel:
1. Go to your project dashboard on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with its value
4. Select environments: Production, Preview, Development
5. Save and redeploy

## Post-Deployment Checklist

### 1. Verify Deployment
- [ ] Site loads correctly
- [ ] Navigation works (React Router)
- [ ] Images load properly
- [ ] Firebase authentication works
- [ ] Plant listing/selling functionality works

### 2. Test Key Features
- [ ] User registration/login
- [ ] Image upload (ImgBB integration)
- [ ] Plant selling form submission
- [ ] Garden calendar functionality
- [ ] Browse gardeners section
- [ ] Tips and messaging features

### 3. Performance Optimization
- [ ] Check Core Web Vitals in Vercel Analytics
- [ ] Monitor bundle size warnings
- [ ] Enable Vercel Speed Insights (optional)

## Custom Domain Setup (Optional)

1. **Purchase domain** from any registrar
2. **Add domain in Vercel:**
   - Project Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions
3. **Configure DNS** with your registrar
4. **Wait for propagation** (up to 24 hours)

## Automatic Deployments

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create pull requests
- **Development**: For branch pushes (optional)

## Troubleshooting Common Issues

### Build Failures
```bash
# Local test build
npm run build

# Check for TypeScript errors
npm run lint
```

### Environment Variable Issues
- Ensure all `VITE_` prefixed variables are set
- Check variable names match exactly
- Redeploy after adding new variables

### Routing Issues (404 on refresh)
- ✅ Already configured in `vercel.json` with rewrites

### Large Bundle Warnings
- Current bundle is large due to rich UI libraries
- Consider code splitting for production optimization

## Monitoring and Analytics

### Enable Vercel Analytics:
1. Project Settings → Analytics
2. Enable Web Analytics
3. View performance metrics

### Monitor Deployment Logs:
1. Functions tab in project dashboard
2. Real-time logs for debugging

## Branch Protection and CI/CD

### Recommended Git Workflow:
1. Create feature branches for new features
2. Use pull requests for code review
3. Merge to main for production deployment

### Environment Strategy:
- **Production**: `main` branch → yourapp.vercel.app
- **Staging**: `develop` branch → yourapp-staging.vercel.app
- **Preview**: Feature branches → automatic preview URLs

## Security Considerations

### Environment Variables:
- Never commit sensitive keys to git
- Use Vercel's environment variable system
- Rotate API keys regularly

### Firebase Security:
- Configure proper security rules
- Limit Firebase API key domains in console

### HTTPS:
- ✅ Automatically provided by Vercel
- ✅ Custom domains get free SSL certificates

## Commands Quick Reference

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View project info
vercel inspect

# Pull environment variables locally
vercel env pull
```

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [React Router on Vercel](https://vercel.com/guides/deploying-react-with-vercel)

---

## Next Steps After Deployment

1. **Test all functionality** on the live site
2. **Set up monitoring** and error tracking
3. **Configure custom domain** (optional)
4. **Set up analytics** to track usage
5. **Plan CI/CD workflow** for future updates

Your gardening project is now ready for Vercel deployment! 🌱
