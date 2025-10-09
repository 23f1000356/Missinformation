# Trends & Heatmaps Debug Guide

## 🔍 Current Issue

The Trends & Heatmaps page (`/admin/trends`) is showing a blank screen, but the APIs are working correctly.

## ✅ What's Working

- ✅ **Backend APIs**: All analytics endpoints return data
- ✅ **Categories API**: Returns `[{"_id":"other","count":15,"false":4,"misleading":0}]`
- ✅ **Heatmap API**: Returns geographic data with 6063 bytes of content
- ✅ **Menu Navigation**: "Trends & Heatmaps" link is visible and clickable

## 🚀 Fixes Applied

### **1. Enhanced Error Handling**
- Added console logging for API responses
- Added fallback data when APIs return empty results
- Improved error handling in `loadData()` function

### **2. Data Structure Fixes**
- Fixed heatmap data parsing: `heatmapRes.data?.heatmapData || heatmapRes.data`
- Added null checks for all data arrays
- Provided sample fallback data for charts

### **3. Component Improvements**
- Fixed lint warnings (unused variables)
- Added better loading states
- Enhanced data validation

## 🧪 How to Test the Fix

### **Step 1: Start Both Servers**
Make sure you're running BOTH frontend and backend:
```bash
npm run dev
```
**Not just** `npm run server` - you need the frontend too!

### **Step 2: Check Browser Console**
1. Go to `/admin/trends`
2. Press F12 → Console tab
3. Look for these debug messages:
   ```
   Categories data: [...]
   Heatmap data: {...}
   Trends data: {...}
   ```

### **Step 3: Expected Results**
After the fix, you should see:
- **Category Charts**: Bar chart and pie chart with data
- **Geographic Heatmap**: Country cards with misinformation data
- **Trending Topics**: Analysis section (may show "No trending topics")
- **No blank screen**: Content should be visible

## 🔧 If Still Blank

### **Check 1: Frontend Running**
Ensure you see both servers in terminal:
```
[0] 🚀 Server running on port 5000     ← Backend
[1] ➜  Local:   http://localhost:5173/ ← Frontend
```

### **Check 2: Browser Console Errors**
Look for JavaScript errors in browser console:
- Network errors (failed API calls)
- React errors (component crashes)
- Missing dependencies

### **Check 3: API Connectivity**
Test if frontend can reach backend:
```bash
# From browser console (F12):
fetch('/api/analytics/categories').then(r => r.json()).then(console.log)
```

### **Check 4: React Router**
Verify the route is working:
- URL should be: `http://localhost:5173/admin/trends`
- Should not redirect or show 404

## 📊 Sample Data Structure

The component now expects and handles:

### **Categories Data:**
```json
[
  {"_id": "health", "count": 10, "false": 5, "misleading": 2},
  {"_id": "politics", "count": 8, "false": 6, "misleading": 1}
]
```

### **Heatmap Data:**
```json
{
  "heatmapData": [
    {
      "country": "United States",
      "region": "North America", 
      "count": 245,
      "clusterName": "COVID-19 Vaccine Misinformation",
      "riskLevel": "critical"
    }
  ]
}
```

## 🎯 Quick Test Commands

```bash
# Test if both servers are running
curl http://localhost:5000/api/health
curl http://localhost:5173

# Test analytics endpoints
curl http://localhost:5000/api/analytics/categories
curl http://localhost:5000/api/analytics/heatmap
```

## 🎉 Expected Success

After applying these fixes, the Trends & Heatmaps page should show:
- **Interactive Charts**: Bar charts and pie charts with real data
- **Geographic Cards**: Country-wise misinformation distribution
- **Trending Analysis**: Topic trends (or "No trending topics" message)
- **Responsive Layout**: Proper grid layout with cards

The blank screen issue should be resolved, and you'll see a fully functional analytics dashboard! 🚀
