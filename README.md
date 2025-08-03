# DevTinder - Developer Networking Platform

A developer-focused networking platform for connecting tech professionals. Find your next collaboration, mentor, or coding partner.

## 🚀 Features

- **User Profiles**: Create and manage your developer profile
- **Smart Matching**: Connect with developers based on skills and interests
- **Connection Management**: Accept/reject connection requests
- **Responsive Design**: Works seamlessly on desktop and mobile
- **PWA Support**: Install as a progressive web app
- **Real-time Updates**: Instant notifications and updates

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS, DaisyUI
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Authentication**: JWT with cookies
- **PWA**: Service Worker, Web App Manifest

## 📦 Installation

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/dev-tinder-web.git
   cd dev-tinder-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🏗️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:prod` - Build with production optimizations
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage

### Project Structure

```
src/
├── api/              # API client and endpoints
├── components/       # React components
├── config/          # Environment configuration
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── store/           # Redux store and slices
├── util/            # Utility functions
├── App.jsx          # Main app component
└── main.jsx         # App entry point
```

## 🚀 Production Deployment

### 1. Build for Production

```bash
npm run build:prod
```

### 2. Environment Configuration

Create production environment variables:

```bash
# .env.production
VITE_API_BASE_URL=https://api.your-domain.com
VITE_APP_NAME=DevTinder
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false
VITE_ENABLE_PWA=true
```

### 3. Deployment Options

#### Option A: Static Hosting (Netlify, Vercel, etc.)

1. **Build the project**
   ```bash
   npm run build:prod
   ```

2. **Deploy the `dist` folder** to your hosting provider

3. **Configure redirects** for SPA routing:
   ```json
   {
     "redirects": [
       {
         "source": "/*",
         "destination": "/index.html"
       }
     ]
   }
   ```

#### Option B: Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine as builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build:prod

   FROM nginx:alpine
   COPY --from=builder /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and run**
   ```bash
   docker build -t devtinder-web .
   docker run -p 80:80 devtinder-web
   ```

#### Option C: CDN Deployment

1. **Upload build files** to your CDN
2. **Configure caching** for static assets
3. **Set up custom domain** and SSL

### 4. Performance Optimization

- **Enable compression** (gzip/brotli)
- **Configure caching headers**
- **Use CDN** for static assets
- **Enable HTTP/2**
- **Optimize images** and assets

### 5. Security Considerations

- **HTTPS only** in production
- **Content Security Policy** headers
- **X-Frame-Options** and other security headers
- **Rate limiting** on API endpoints
- **Input validation** and sanitization

## 📱 PWA Features

The app includes Progressive Web App features:

- **Installable** on mobile and desktop
- **Offline support** with service worker
- **App-like experience** with standalone display
- **Push notifications** (can be extended)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:7777` |
| `VITE_APP_NAME` | Application name | `DevTinder` |
| `VITE_ENABLE_ANALYTICS` | Enable analytics | `false` |
| `VITE_ENABLE_DEBUG` | Enable debug mode | `true` |
| `VITE_ENABLE_PWA` | Enable PWA features | `false` |

### Build Configuration

The app uses Vite for building with the following optimizations:

- **Code splitting** for better performance
- **Tree shaking** to reduce bundle size
- **Minification** in production
- **Source maps** in development only
- **Manual chunks** for vendor libraries

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test -- --watch
```

## 📊 Performance

### Lighthouse Scores (Target)

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+

### Bundle Analysis

- **Main bundle**: < 500KB
- **Vendor chunks**: Optimized splitting
- **CSS**: Purged unused styles

## 🔍 Monitoring

### Error Tracking

- **Error boundaries** for React errors
- **API error handling** with interceptors
- **Console logging** in development only

### Analytics (Optional)

- **User interactions** tracking
- **Performance metrics** monitoring
- **Error reporting** integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- **Issues**: [GitHub Issues](https://github.com/your-username/dev-tinder-web/issues)
- **Documentation**: [Wiki](https://github.com/your-username/dev-tinder-web/wiki)
- **Email**: support@your-domain.com

## 🔄 Changelog

### v1.0.0
- Initial release
- User authentication and profiles
- Connection management
- Responsive design
- PWA support