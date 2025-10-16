# 🔧 Extension Troubleshooting Guide

## Issue: Verification Box Not Appearing

If the verification box doesn't show up after selecting text, follow these steps:

---

## ✅ Quick Fixes (Try These First)

### 1. **Reload the Extension**

```
1. Go to chrome://extensions/
2. Find "Misinformation Detector - Universal AI Fact Checker"
3. Click the "Reload" button (circular arrow icon)
4. Refresh your test page
```

### 2. **Check Server is Running**

```bash
cd Missinformation
npm start
```

Visit: http://localhost:5000/api/verification/status

Should see: `{"pipeline_steps": [...], ...}`

### 3. **Check Browser Console**

```
1. Press F12 to open DevTools
2. Click "Console" tab
3. Look for these messages:
   ✅ "🔍 Misinformation Detector extension loaded and ready!"
   ✅ "🚀 Misinformation Detector background service worker active"
```

---

## 🔍 Detailed Troubleshooting

### Step 1: Verify Extension is Loaded

1. Go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Find your extension
4. Check:
   - ✅ Extension is **enabled** (toggle is blue)
   - ✅ No errors shown
   - ✅ "Manifest version: 3"

**If you see errors:**

- Click "Errors" button
- Fix any issues in the files
- Click "Reload" extension

---

### Step 2: Test on Simple Page

**Open the test page:**

```
1. Navigate to: file:///E:/Missinformation/Missinformation/extension/test-verification.html
2. Or use: extension/test-verification.html (from your project folder)
```

**Try selecting text:**

- Select any claim (at least 10 characters)
- A purple "Verify Fact" button should appear
- Click it

**Check console (F12):**

```
Expected logs:
✅ 🔍 Misinformation Detector extension loaded and ready!
✅ 📦 Creating verification box with data: loading
✅ 📍 Box positioned at: {left: X, top: Y}
✅ ✅ Box appended to body
✅ ✨ Box made visible
```

---

### Step 3: Check Common Issues

#### Issue A: "Verify Fact" Button Doesn't Appear

**Cause:** Text selection is too short

**Fix:**

- Select at least **10 characters** of text
- Watch console for: "⚠️ Text too short (need 10+ chars, got X)"

---

#### Issue B: Button Appears but Nothing Happens When Clicked

**Cause:** Server not running or API not responding

**Fix:**

1. Check server is running:

   ```bash
   npm start
   ```

2. Test API manually:

   ```
   Visit: http://localhost:5000/api/verification/status
   ```

3. Check console for errors:

   ```
   ❌ Cannot connect to verification server
   ❌ fetch failed
   ❌ NetworkError
   ```

4. **Ensure .env file has API key:**
   ```env
   GEMINI_API_KEY=your_key_here
   # OR
   OPENAI_API_KEY=your_key_here
   ```

---

#### Issue C: Box Created But Not Visible

**Cause:** Z-index or positioning issue

**Fix Applied:** ✅ Already fixed in latest version

- Updated z-index to maximum: `2147483647`
- Fixed positioning calculation
- Added `!important` flags
- Added debug logging

**Verify fix:**

1. Reload extension
2. Check console shows: "📦 Creating verification box"
3. If you see that log but no box, check for CSS conflicts

---

#### Issue D: Extension Not Injecting Content Script

**Cause:** Permissions or manifest issue

**Check manifest.json:**

```json
{
  "content_scripts": [
    {
      "matches": ["<all_urls>"], // ✅ Should work everywhere
      "js": ["content.js"],
      "css": ["content.css"],
      "run_at": "document_end"
    }
  ]
}
```

**Fix:**

1. Verify manifest.json has correct content
2. Reload extension
3. Refresh the page you're testing on

---

### Step 4: Check Specific Error Messages

#### "Cannot connect to verification server"

```
Problem: Server not running or wrong port

Fix:
1. Start server: npm start
2. Check port in .env: PORT=5000
3. Check background.js uses correct URL
```

#### "AI service not configured"

```
Problem: No API key in .env

Fix:
1. Create/edit .env file
2. Add: GEMINI_API_KEY=your_key_here
3. Restart server
```

#### "NetworkError when attempting to fetch resource"

```
Problem: CORS or server not responding

Fix:
1. Check server logs for errors
2. Verify server is on http://localhost:5000
3. Check firewall isn't blocking localhost
```

---

## 🧪 Debug Mode Testing

### Enable Verbose Logging

The latest version includes debug logging:

```javascript
// In browser console, you'll see:
📦 Creating verification box with data: loading
📍 Box positioned at: {left: 100, top: 200}
✅ Box appended to body, element: <div>
✨ Box made visible
```

### Manual Testing Steps

1. **Test Extension Loading:**

   ```javascript
   // In browser console:
   console.log(
     "Extension loaded:",
     !!document.querySelector("#misinfo-verify-btn")
   );
   ```

2. **Test Text Selection:**

   ```javascript
   // After selecting text:
   console.log("Selected:", window.getSelection().toString().length, "chars");
   ```

3. **Test Box Creation:**
   ```javascript
   // After clicking verify:
   console.log(
     "Box exists:",
     !!document.querySelector("#misinfo-verification-box")
   );
   console.log(
     "Box visible:",
     document
       .querySelector("#misinfo-verification-box")
       ?.classList.contains("visible")
   );
   ```

---

## 🔧 Advanced Fixes

### Reset Extension Completely

1. **Remove extension:**

   - Go to chrome://extensions/
   - Click "Remove"

2. **Clear browser cache:**

   - Press Ctrl+Shift+Delete
   - Clear "Cached images and files"

3. **Reload extension:**
   - Click "Load unpacked"
   - Select: `E:/Missinformation/Missinformation/extension`

### Check for Conflicts

**Other extensions might interfere:**

1. Disable all other extensions
2. Test your extension
3. Re-enable one by one to find conflict

**Page CSP (Content Security Policy) might block:**

- Check console for CSP errors
- Test on simple HTML page first

---

## 📋 Checklist for Working Extension

Run through this checklist:

- [ ] Extension loaded in chrome://extensions/
- [ ] Extension is enabled (toggle is blue)
- [ ] Server running on http://localhost:5000
- [ ] .env file has API key (GEMINI_API_KEY or OPENAI_API_KEY)
- [ ] Browser console shows: "🔍 Misinformation Detector extension loaded"
- [ ] Selecting 10+ chars shows "Verify Fact" button
- [ ] Clicking button shows loading box
- [ ] Console shows: "📦 Creating verification box"
- [ ] Console shows: "✨ Box made visible"
- [ ] Verification box appears on screen

---

## 🎯 Test Sequence

Follow this exact sequence to test:

### Test 1: Extension Basics

```
1. Open chrome://extensions/
2. Verify extension is loaded and enabled
3. Open test page: extension/test-verification.html
4. Open console (F12)
5. Look for: "🔍 Misinformation Detector extension loaded and ready!"
```

### Test 2: Text Selection

```
1. Select this text: "Water boils at 100°C at sea level"
2. Purple button should appear
3. Console should log: "✅ Text selected (length: 38)"
```

### Test 3: Verification Flow

```
1. Click "Verify Fact" button
2. Console should show:
   - 📦 Creating verification box
   - 🔍 Verifying claim
   - 📡 Calling primary verification endpoint
   - 📍 Box positioned at
   - ✅ Box appended to body
   - ✨ Box made visible
3. Verification box should appear with loading animation
```

### Test 4: API Response

```
1. Wait for verification (2-5 seconds)
2. Console should show:
   - ✅ Verification response received
   - ✅ Primary verification successful
3. Box should update with verdict
```

---

## 🆘 Still Not Working?

If you've tried everything above:

### 1. Check Files Exist

```bash
cd Missinformation/extension
ls -la

# Should see:
# - content.js
# - content.css
# - background.js
# - manifest.json
# - popup.html
# - popup.js
```

### 2. Check File Permissions

```bash
# Files should be readable
# If on Windows, ensure no "read-only" attribute
```

### 3. Try Different Browser

- Test in Chrome Incognito mode
- Test in Microsoft Edge
- Test in Brave browser

### 4. Check System

**Windows:**

- Antivirus might block localhost connections
- Firewall might block port 5000
- Try running as administrator

**Ports:**

```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000
```

---

## 📞 Getting More Help

### Collect Debug Info

If still having issues, collect this info:

```javascript
// Run in browser console:
console.log({
  extensionLoaded: !!document.querySelector("#misinfo-verify-btn"),
  contentScriptActive: typeof verifySelectedText === "function",
  boxExists: !!document.querySelector("#misinfo-verification-box"),
  serverReachable: fetch("http://localhost:5000/api/verification/status")
    .then((r) => r.ok)
    .catch(() => false),
});
```

### Common Solutions Summary

| Issue                           | Solution                                |
| ------------------------------- | --------------------------------------- |
| Button doesn't appear           | Select 10+ characters                   |
| Button appears, nothing happens | Start server, check API key             |
| Box created but not visible     | Reload extension (fix applied)          |
| Server connection error         | Check server running, check .env        |
| Extension not loading           | Reload in chrome://extensions/          |
| No console logs                 | Extension not injecting, check manifest |

---

## ✅ Success Criteria

You'll know it's working when:

1. ✅ Select text → Button appears immediately
2. ✅ Click button → Loading box shows
3. ✅ Wait 2-5 seconds → Verdict displays
4. ✅ Box is draggable and closeable
5. ✅ Console shows debug logs
6. ✅ Works on ANY website

---

**Last Updated:** After fixing z-index and positioning issues
**Version:** 3.0.0
**Status:** All known issues resolved ✅
