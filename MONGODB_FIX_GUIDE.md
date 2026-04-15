# MongoDB Connection Error - Fix Guide

## ❌ Current Error
```
DB ERROR ❌ querySrv ECONNREFUSED _mongodb._tcp.cluster0.gacap9b.mongodb.net
```

## ✅ Solution

The error indicates your **IP address is not whitelisted** in MongoDB Atlas. Follow these steps:

### Step 1: Go to MongoDB Atlas
1. Open https://www.mongodb.com/cloud/atlas
2. Log in with your account (manikandasridhar)
3. Go to your **Cluster0** project

### Step 2: Add Your IP to Network Access
1. Click **Network Access** (left sidebar)
2. Click **Add IP Address** button
3. Choose one of these options:
   - **ADD MY CURRENT IP ADDRESS** (easiest)
   - **Add 0.0.0.0/0** (allows all IPs - NOT recommended for production, but OK for development)
4. Click **Confirm**

### Step 3: Verify Connection String
Your `.env` file should have:
```
MONGO_URI=mongodb+srv://manikandasridhar:admin123@cluster0.gacap9b.mongodb.net/hrdesk?retryWrites=true&w=majority
```

**Note:** The password in .env is exposed in git - this is a security risk! For production:
1. Change your MongoDB Atlas password
2. Use `.env` in `.gitignore`
3. Store secrets in environment variables on your server

### Step 4: Test Connection
After whitelisting your IP, restart the server:
```bash
npm run dev
# or
npm start
```

You should see:
```
✅ MongoDB Atlas connected: cluster0-xxxxx.mongodb.net
```

## 🔧 Backend Improvements Done
✅ Removed deprecated `useNewUrlParser` and `useUnifiedTopology` options
✅ Proper error handling with troubleshooting tips
✅ Optimized connection pool settings

## 📝 Next Steps
- [ ] Whitelist your IP in MongoDB Atlas
- [ ] Verify connection string in .env includes database name
- [ ] Restart backend server
- [ ] Check frontend API calls in axios/fetch

---
**Common Issues:**
- IP not whitelisted ← **Most likely your issue**
- Wrong password → Reset in MongoDB Atlas
- Firewall blocking connection → Change network
- VPN/Proxy issues → Temporary disable to test
