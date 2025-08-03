# CORS Troubleshooting Guide

## 🚨 Common CORS Issues and Solutions

### Issue: CORS Error in Browser Console
```
Access to fetch at 'http://localhost:7777/login' from origin 'http://localhost:3000' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the target resource.
```

## 🔧 Solutions

### 1. **Use Vite Proxy (Recommended for Development)**

The app is now configured with Vite proxy to handle CORS automatically:

```javascript
// vite.config.js
server: {
  proxy: {
    '/login': {
      target: 'http://localhost:7777',
      changeOrigin: true,
      secure: false
    },
    // ... other endpoints
  }
}
```

**Benefits:**
- ✅ No CORS issues in development
- ✅ Automatic request forwarding
- ✅ Works with cookies and credentials
- ✅ No backend changes needed

### 2. **Backend CORS Configuration (Alternative)**

If you prefer to configure CORS on the backend:

#### For Express.js:
```javascript
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
```

#### For Node.js with http module:
```javascript
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
res.setHeader('Access-Control-Allow-Credentials', 'true');
```

### 3. **Check Your Setup**

#### Frontend (React App):
- ✅ Running on `http://localhost:3000`
- ✅ Using relative URLs in development
- ✅ Vite proxy configured

#### Backend Server:
- ✅ Running on `http://localhost:7777`
- ✅ CORS headers configured (if not using proxy)
- ✅ Accepting credentials

### 4. **Debugging Steps**

1. **Check if backend is running:**
   ```bash
   curl http://localhost:7777/health
   # or
   curl http://localhost:7777/
   ```

2. **Test API endpoint directly:**
   ```bash
   curl -X POST http://localhost:7777/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password"}'
   ```

3. **Check browser network tab:**
   - Look for preflight OPTIONS requests
   - Check if CORS headers are present in response
   - Verify request/response headers

4. **Check console for specific errors:**
   - Network errors
   - CORS policy violations
   - Authentication errors

### 5. **Common Mistakes**

#### ❌ Wrong Backend URL
```javascript
// Wrong - hardcoded localhost:7777
API_BASE_URL: 'http://localhost:7777'

// Correct - relative URL with proxy
API_BASE_URL: ''
```

#### ❌ Missing Credentials
```javascript
// Wrong - no credentials
axios.get('/api/data')

// Correct - with credentials
axios.get('/api/data', { withCredentials: true })
```

#### ❌ Wrong CORS Headers
```javascript
// Wrong - wildcard with credentials
'Access-Control-Allow-Origin': '*'

// Correct - specific origin with credentials
'Access-Control-Allow-Origin': 'http://localhost:3000'
```

### 6. **Production Considerations**

For production deployment:

1. **Use HTTPS** for both frontend and backend
2. **Configure proper CORS origins** (not wildcards)
3. **Set up proper domain names**
4. **Use environment variables** for URLs

```javascript
// Production environment
production: {
  API_BASE_URL: 'https://api.yourdomain.com',
  // ...
}
```

### 7. **Quick Fix Commands**

#### Restart Development Servers:
```bash
# Stop both servers (Ctrl+C)
# Then restart:

# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

#### Clear Browser Cache:
```bash
# Chrome DevTools
# Network tab → Disable cache (checked)
# Then refresh page
```

#### Check Network Tab:
1. Open DevTools (F12)
2. Go to Network tab
3. Check "Preserve log"
4. Make a request
5. Look for CORS errors

## 🎯 Current Configuration

The app is now configured to use **Vite proxy** for development, which should resolve CORS issues automatically. If you're still experiencing problems:

1. **Restart the development server** (`npm run dev`)
2. **Check that your backend is running** on port 7777
3. **Clear browser cache** and refresh
4. **Check the browser console** for specific error messages

## 📞 Still Having Issues?

If you're still experiencing CORS issues:

1. **Check the browser console** for specific error messages
2. **Verify your backend server** is running and accessible
3. **Test with a simple curl command** to isolate the issue
4. **Check if your backend has CORS middleware** configured properly

The Vite proxy configuration should handle most CORS issues automatically in development mode. 