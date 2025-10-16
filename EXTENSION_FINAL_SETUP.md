# 🔍 Extension - FINAL SETUP & TESTING

## ✅ All Issues Fixed!

I've fixed the following:

1. ✅ Added proper DOM ready check
2. ✅ Fixed event listener initialization
3. ✅ Added preventDefault to button clicks
4. ✅ Improved manifest configuration
5. ✅ Added comprehensive logging

## 🚀 Complete Setup (Step by Step)

### Step 1: Start Server

```bash
cd E:\Missinformation\Missinformation
npm start
```

**Wait for:** `🚀 Server running on port 5000`

### Step 2: RELOAD Extension (IMPORTANT!)

1. Open Chrome
2. Go to: `chrome://extensions/`
3. Find "Misinformation Detector"
4. Click the **🔄 RELOAD** button (very important!)
5. Extension ID should appear below

### Step 3: Test on Minimal Page

1. Open: `E:\Missinformation\Missinformation\extension\test-minimal.html`
2. Press `F12` to open Console
3. You should see these logs:
   ```
   🌐 Test page loaded
   🚀 Misinformation Detector content script starting...
   🎯 Initializing Misinformation Detector...
   ✅ Event listeners attached
   🔍 Misinformation Detector extension loaded and ready!
   ```

### Step 4: Test Selection

1. **Select text** from the page (at least 10 characters)
2. In Console you should see:
   ```
   📝 Text selected: X characters
   📍 Selection: The Earth revolves...
   ```
3. A **BLUE "Verify Fact" BUTTON** should appear near your selection

### Step 5: Test Verification

1. **Click the blue button**
2. In Console you should see:
   ```
   🎯 verifySelectedText called
   📝 Selected text: ...
   🔍 Sending verification request to background script...
   📡 Calling primary verification endpoint...
   ✅ Verification response received: ...
   📊 Showing results in UI...
   ```
3. **Result popup** should appear on the page (NOT in terminal!)

## 🎯 What You Should See

### On the Webpage:

1. **Loading Box** appears immediately with spinner
2. After ~6 seconds: **Result Box** with:
   - ✅ or ❌ Verdict
   - 📊 Confidence percentage (e.g., 99%)
   - 💬 Detailed explanation from Gemini AI
   - 📚 Key facts

### In Server Terminal:

```
🔍 Verifying claim: "The Earth revolves..."
🤖 AI-Only Mode: Skipping web scraping and ML
🤖 Step 4: AI Verification
✅ Verification pipeline completed
```

### In Browser Console:

```
✅ Event listeners attached
🎯 verifySelectedText called
✅ Verification response received
📊 Showing results in UI...
```

## ❌ Troubleshooting

### Issue: No logs in console

**Solution:**

1. Make sure you RELOADED the extension
2. Refresh the test page
3. Check `chrome://extensions/` - extension should be enabled

### Issue: Logs appear but no button

**Solution:**

1. Select at least 10 characters
2. Check Console for errors
3. Try selecting different text

### Issue: Button appears but nothing happens

**Solution:**

1. Check if server is running
2. Look for errors in Console (red text)
3. Check server terminal for errors

### Issue: Loading appears but no result

**Check Console for:**

- Network errors → Server not running
- "Cannot connect" → Check `http://localhost:5000/api/verification/status`
- "Timeout" → Increase timeout or check Gemini API key

## 🧪 Quick Test Commands

### In Browser Console:

#### Test 1: Check if extension loaded

```javascript
console.log(
  "Extension loaded:",
  document.querySelector("#misinfo-verify-btn") !== null ||
    "Not yet - select text first"
);
```

#### Test 2: Manual verification

```javascript
chrome.runtime.sendMessage(
  {
    action: "verifyClaim",
    text: "The Earth revolves around the Sun",
  },
  (response) => {
    console.log("✅ Response:", response);
    alert("Verdict: " + response.result.verdict);
  }
);
```

#### Test 3: Check server

Open in browser: `http://localhost:5000/api/verification/status`

## ✅ Success Checklist

- [ ] Server running (terminal shows port 5000)
- [ ] Extension reloaded in Chrome
- [ ] Test page shows console logs
- [ ] Text selection shows button
- [ ] Button click shows loading
- [ ] Result appears after ~6 seconds
- [ ] Result shows verdict and explanation

## 🎉 If Everything Works:

The extension is now ready! It will work on **ANY website**:

- News sites (CNN, BBC, etc.)
- Social media (Twitter, Facebook, Reddit)
- Wikipedia
- Blogs, forums, emails
- ANY webpage with text!

## 📞 Still Not Working?

Share:

1. **Screenshot** of what you see
2. **Console logs** (copy all text from Console tab)
3. **Server terminal output**
4. Which step fails
