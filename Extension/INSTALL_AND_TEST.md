# MindFlow Extension - Installation & Testing Guide

## 📦 Quick Installation (Developer Mode)

### Step 1: Prepare the Extension
No build step needed! The extension is ready to use as-is.

### Step 2: Load in Chrome/Edge

1. **Open Extensions Page**
   - Chrome: Navigate to `chrome://extensions/`
   - Edge: Navigate to `edge://extensions/`
   - Or: Menu → Extensions → Manage Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

3. **Load Extension**
   - Click "Load unpacked"
   - Navigate to: `C:\Users\Vansh\Desktop\Projects\MindFlow\Extension`
   - Click "Select Folder"

4. **Verify Installation**
   - Extension icon should appear in toolbar
   - Name: "MindFlow Capture"
   - Version: 1.0.0

### Step 3: Pin to Toolbar (Recommended)
- Click the puzzle piece icon in toolbar
- Find "MindFlow Capture"
- Click the pin icon

## 🔐 Authentication Setup

### First Time Login

1. **Click Extension Icon**
   - Opens popup with "Sign in with Google" button

2. **Sign In**
   - Click "Sign in with Google"
   - New tab opens with Google OAuth
   - Authorize MindFlow access
   - Tab closes automatically after success

3. **Verify Login**
   - Click extension icon again
   - Should see your profile with:
     - Avatar
     - Name
     - Email
     - "Open Dashboard" link
     - "Sign Out" button

## 🎯 Usage Guide

### Capturing Content

#### 1. Save Selected Text (Notes)
```
1. Visit any webpage
2. Select/highlight text
3. Right-click → "✨ Save to MindFlow"
4. Notification: "📝 note saved successfully!"
```

#### 2. Save Links
```
1. Right-click any link
2. Select "✨ Save to MindFlow"
3. Notification: "🔗 link saved successfully!"
```

#### 3. Save Images
```
1. Right-click any image
2. Select "✨ Save to MindFlow"
3. Notification: "🖼️ image saved successfully!"
```

#### 4. Save Videos
```
1. Right-click any video
2. Select "✨ Save to MindFlow"
3. Notification: "🎥 video saved successfully!"
```

#### 5. Save Entire Page
```
1. Right-click anywhere (not on link/image/video)
2. Select "✨ Save to MindFlow"
3. Saves page as a link bookmark
```

### What Gets Captured?

For each save, the extension captures:
- **Content**: Selected text, URL, or media link
- **Page URL**: Where you found it
- **Page Title**: Website title
- **Timestamp**: When you saved it

### Backend Processing

Once captured, the backend:
1. ✅ Saves to your account
2. 🤖 Runs AI analysis (Gemini)
3. 🏷️ Generates 6 relevant tags
4. 📁 Auto-categorizes (work, personal, learning, etc.)
5. 🎨 Suggests AI Space (if enabled)
6. 🔍 Creates embeddings for semantic search

## 🧪 Testing Checklist

### Pre-Test Setup
- [ ] Backend running on `http://localhost:8000`
- [ ] Frontend running on `http://localhost:5173`
- [ ] Extension loaded in Chrome
- [ ] No console errors

### Authentication Tests
- [ ] Click extension → popup opens
- [ ] Click "Sign in with Google"
- [ ] OAuth window opens
- [ ] Can complete Google sign-in
- [ ] Extension saves JWT token
- [ ] Popup shows user profile
- [ ] Avatar displays (or initials)
- [ ] "Open Dashboard" link works
- [ ] Can sign out successfully

### Content Capture Tests

**Test 1: Text Selection**
- [ ] Go to any article/blog
- [ ] Select a paragraph
- [ ] Right-click → "Save to MindFlow"
- [ ] See success notification
- [ ] Open dashboard → item appears as "note"
- [ ] AI tags generated
- [ ] Content matches selection

**Test 2: Link Saving**
- [ ] Right-click any link
- [ ] Select "Save to MindFlow"
- [ ] Success notification
- [ ] Dashboard shows as "link"
- [ ] URL captured correctly

**Test 3: Image Saving**
- [ ] Right-click an image
- [ ] Save to MindFlow
- [ ] Image appears in dashboard
- [ ] Type shows as "image"
- [ ] AI analyzes image content

**Test 4: Video Saving**
- [ ] Go to YouTube or video site
- [ ] Right-click video
- [ ] Save to MindFlow
- [ ] Video saved as "video" type

**Test 5: Page Bookmark**
- [ ] Right-click on page (not link/image)
- [ ] Save to MindFlow
- [ ] Page saved as link bookmark

### Error Handling Tests

**Test 6: Expired Token**
- [ ] Clear chrome.storage manually (DevTools)
- [ ] Try to save content
- [ ] See "Session expired" notification
- [ ] Click extension → prompted to sign in

**Test 7: Network Error**
- [ ] Stop backend server
- [ ] Try to save content
- [ ] See error notification
- [ ] Restart backend → try again → works

**Test 8: Not Signed In**
- [ ] Sign out from extension
- [ ] Try to save content
- [ ] See "Please sign in" notification
- [ ] Extension popup opens automatically

### Dashboard Integration Tests

**Test 9: Real-time Sync**
- [ ] Have dashboard open
- [ ] Save content from another tab
- [ ] Dashboard refreshes automatically
- [ ] New item appears instantly

**Test 10: Extension Detection**
- [ ] Open dashboard without extension
- [ ] See "Install Extension" floating button
- [ ] Install extension
- [ ] Refresh dashboard
- [ ] Button hides automatically

**Test 11: Settings Integration**
- [ ] Go to Settings page
- [ ] See "Browser Extension" section
- [ ] Shows "Installed" badge (green)
- [ ] Can open install modal from settings

### Performance Tests
- [ ] Extension doesn't slow page load
- [ ] Context menu appears instantly
- [ ] Saves complete within 2 seconds
- [ ] No memory leaks over time

## 🐛 Debugging Guide

### View Console Logs

**Background Service Worker:**
```
1. Go to chrome://extensions/
2. Find "MindFlow Capture"
3. Click "service worker" (blue link)
4. Console shows all background logs
```

**Popup:**
```
1. Right-click extension icon
2. Select "Inspect popup"
3. DevTools opens with popup console
```

**Content Script:**
```
1. Open any webpage
2. Press F12 (DevTools)
3. Console shows content script logs
4. Look for "🔌 MindFlow Extension: Content script loaded"
```

### Common Issues

**Extension Not Loading?**
- Check manifest.json for syntax errors
- Verify all files exist (background.js, popup/, etc.)
- Check Chrome Extensions page for errors
- Try removing and re-adding extension

**Context Menu Not Appearing?**
- Refresh the page after installing
- Check background worker console for errors
- Verify permissions in manifest.json

**Authentication Failing?**
- Check backend is running on port 8000
- Verify `/api/v1/auth/login` works in browser
- Check popup console for errors
- Clear storage: DevTools → Application → Storage

**Items Not Saving?**
- Check you're signed in (click extension icon)
- Verify backend `/api/v1/items/` endpoint works
- Check background worker console for API errors
- Verify token in chrome.storage.local

**Dashboard Not Detecting Extension?**
- Refresh dashboard page
- Check console for "PING_EXTENSION" messages
- Verify content script loaded
- Check localStorage for dismiss state

## 📊 Log Messages Reference

### Background Worker
- `🚀 Background service worker started` - Worker initialized
- `📦 Extension installed` - Installation complete
- `🖱️ Context menu clicked` - User right-clicked
- `✅ Token found` - User authenticated
- `📤 Sending to backend` - API request starting
- `✅ Successfully saved` - Item saved
- `❌ Token expired` - Need re-auth
- `❌ Network error` - API call failed

### Content Script
- `🔌 Content script loaded` - Script initialized
- `🏓 Received PING` - Dashboard detection
- `📢 Announcing presence` - Auto-announce
- `📨 Message from background` - Item saved notification
- `🎯 Content ready` - Right-click on saveable content

### Popup
- `🎨 Popup script loaded` - Popup opened
- `🔍 Checking auth status` - Checking if logged in
- `✅ User is authenticated` - Logged in
- `🔐 Sign in button clicked` - Starting OAuth
- `💾 Saving credentials` - Storing JWT
- `👋 Sign out button clicked` - Logging out

## 🚀 Distribution

### For Testing (Current)
Users can:
1. Download zip from GitHub
2. Extract folder
3. Load unpacked in Developer Mode

### For Production (Future)
1. Create proper icons (16x16, 48x48, 128x128)
2. Update URLs to production domain
3. Zip extension folder
4. Publish to Chrome Web Store
5. Users install with one click

## 📝 Development Workflow

### Making Changes
```bash
1. Edit files in Extension/ folder
2. Go to chrome://extensions/
3. Click refresh icon on MindFlow extension
4. Test changes
```

### Testing New Features
```bash
1. Check background worker console
2. Check popup console
3. Check page console
4. Look for error messages
5. Verify API calls in Network tab
```

## ✅ Success Criteria

Extension is working correctly if:
- ✅ Loads without errors
- ✅ Context menu appears on right-click
- ✅ OAuth sign-in works
- ✅ Can save all content types
- ✅ Notifications appear
- ✅ Items appear in dashboard
- ✅ AI tags generated
- ✅ Dashboard detects extension
- ✅ Can sign out and sign in again

## 🎉 You're Ready!

The extension is fully functional and ready to use. Start capturing content and building your knowledge base!

**Happy capturing! 🚀**
