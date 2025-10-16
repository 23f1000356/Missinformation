# Extension Troubleshooting Guide

## Quick Diagnostic Checklist

### ✅ Server Status

1. **Is server running?**

   - Open terminal and run: `npm start`
   - Should see: `🚀 Server running on port 5000`

2. **Test API endpoint:**
   - Open browser: `http://localhost:5000/api/verification/status`
   - Should return JSON with status info

### ✅ Extension Status

1. **Open Chrome Extensions:**

   - Go to: `chrome://extensions/`
   - Enable "Developer mode" (top right toggle)

2. **Load Extension:**

   - Click "Load unpacked"
   - Navigate to: `E:\Missinformation\Missinformation\extension`
   - Extension should appear in the list

3. **Check Extension Console:**
   - Click "service worker" link under your extension
   - Look for: `🚀 Misinformation Detector background service worker active`

### ✅ Testing on Webpage

1. **Open any website** (try Wikipedia.org)

2. **Open Browser Console:**

   - Press F12 or right-click → Inspect
   - Go to Console tab

3. **Select text:**

   - Highlight at least 10 characters
   - You should see in console: `🔍 Misinformation Detector extension loaded and ready!`

4. **Click "Verify Fact" button:**

   - Button should appear near selected text
   - Click it
   - Watch console for API call logs

5. **Check for Results:**
   - Loading popup should appear immediately
   - Results should display after ~6 seconds

## Common Error Messages

### "Cannot connect to verification server"

**Solution:** Start the server with `npm start`

### "AI service not configured"

**Solution:** Check your `.env` file has `GEMINI_API_KEY`

### "Network error" or "Failed to fetch"

**Solution:**

- Check server is running on port 5000
- Check firewall settings
- Try `http://localhost:5000` in browser

### No button appears when selecting text

**Solution:**

- Refresh the webpage
- Check console for JavaScript errors
- Make sure you selected at least 10 characters

### Popup appears but shows error

**Check server terminal for errors:**

- Look for red error messages
- Check if Gemini API key is valid
- Verify MongoDB is connected

## Manual Test

Run this in browser console on any webpage:

```javascript
chrome.runtime.sendMessage(
  {
    action: "verifyClaim",
    text: "The Earth revolves around the Sun",
  },
  (response) => {
    console.log("Response:", response);
  }
);
```

If this works, the issue is with the UI, not the backend.

## Still Not Working?

Share these details:

1. Any error messages from browser console
2. Any error messages from server terminal
3. Screenshot of what you see when you try to verify text
4. Chrome version: Go to `chrome://version/`
