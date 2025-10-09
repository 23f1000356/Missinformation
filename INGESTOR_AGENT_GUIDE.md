# Ingestor Agent - Interactive Data Collection & Normalization

## 🎯 Overview

The Ingestor Agent now has a dedicated interactive page where you can actually perform data ingestion tasks - collecting and normalizing data from social media, news, and files. This transforms the agent from a status display into a functional tool.

## ✅ What's Been Implemented

### **1. Dedicated Ingestor Agent Page**
- **Accessible from**: Streams & Agents → Click on "Ingestor" agent card
- **URL**: `/admin/ingestor`
- **Full functionality** for data collection and normalization

### **2. Four Main Sections (Tabs)**

#### **📡 Data Sources Tab**
- **Social Media Sources**:
  - **Twitter/X**: Configure keywords, hashtags, accounts
  - **Reddit**: Set subreddits and keywords
- **News Sources**:
  - **News Feeds**: Configure sources and categories
- **Toggle switches** to enable/disable each source
- **Start ingestion buttons** for each configured source

#### **📁 File Upload Tab**
- **Drag & drop interface** for file uploads
- **Supported formats**: TXT, PDF, DOCX, CSV, JSON
- **Multiple file selection** with progress tracking
- **File size limit**: 10MB per file
- **Real-time upload progress** with percentage indicator

#### **✍️ Manual Input Tab**
- **Direct text input** for immediate processing
- **Source type selection**: Manual, Social Media, News, Document, Other
- **Large text area** for content input
- **Instant submission** for processing

#### **📊 Ingestion Jobs Tab**
- **Live job monitoring** with status indicators
- **Job details**: Source, status, items processed, success rate, duration
- **Job controls**: Stop running jobs, view progress
- **Real-time updates** every 5 seconds

### **3. Agent Status Dashboard**
- **Real-time metrics**: Queue size, processed count, active jobs, success rate
- **Agent status indicator**: Running/Idle/Processing
- **Performance statistics** with visual indicators

### **4. Backend API Endpoints**
- `GET /api/agents/ingestor/status` - Agent status
- `GET /api/agents/ingestor/jobs` - Ingestion jobs list
- `POST /api/agents/ingestor/start` - Start source ingestion
- `POST /api/agents/ingestor/stop/:jobId` - Stop specific job
- `POST /api/agents/ingestor/upload` - File upload processing
- `POST /api/agents/ingestor/manual` - Manual text processing
- `GET /api/agents/ingestor/stats` - Ingestion statistics

## 🚀 How to Use

### **Step 1: Access the Ingestor Agent**
1. **Login as admin**: `admin@gmail.com` / `admin123`
2. **Go to Admin Dashboard**: `/admin`
3. **Click "Streams & Agents"** in sidebar
4. **Click on the "Ingestor" agent card** (it's now clickable!)

### **Step 2: Configure Data Sources**
1. **Social Media Setup**:
   - Toggle Twitter/Reddit switches ON
   - Enter keywords: `misinformation, fake news, conspiracy`
   - Enter hashtags: `#fakenews, #conspiracy, #debunked`
   - Click "Start Twitter Ingestion"

2. **News Sources Setup**:
   - Toggle News Feeds switch ON
   - Enter sources: `reuters, bbc, cnn`
   - Enter categories: `politics, health, science`
   - Click "Start News Ingestion"

### **Step 3: Upload Files**
1. **Go to File Upload tab**
2. **Drag files** into the upload area OR click "Select Files"
3. **Choose files**: Text documents, PDFs, CSVs with claims data
4. **Click "Upload Files"** and watch progress
5. **Files are processed** automatically for claim extraction

### **Step 4: Manual Text Input**
1. **Go to Manual Input tab**
2. **Select source type**: Social Media Post, News Article, etc.
3. **Paste text content**: Claims, articles, social media posts
4. **Click "Submit for Processing"**
5. **Text is normalized** and processed immediately

### **Step 5: Monitor Jobs**
1. **Go to Ingestion Jobs tab**
2. **View active jobs** with real-time status
3. **Monitor progress**: Items processed, success rates, duration
4. **Stop jobs** if needed using the pause button

## 📊 Sample Use Cases

### **Use Case 1: Social Media Monitoring**
1. Configure Twitter with keywords: `vaccine, covid, conspiracy`
2. Start ingestion → System collects tweets
3. Monitor job progress → See items processed in real-time
4. Claims are automatically extracted and added to database

### **Use Case 2: Document Processing**
1. Upload CSV file with social media posts
2. System processes each row as potential claim
3. Text is normalized and cleaned
4. Claims are extracted using AI agents

### **Use Case 3: News Article Analysis**
1. Configure news sources: `reuters, bbc`
2. Set categories: `health, politics`
3. Start ingestion → System fetches latest articles
4. Articles are processed for fact-checkable claims

### **Use Case 4: Manual Claim Submission**
1. Copy suspicious social media post
2. Paste into manual input
3. Select source type: "Social Media Post"
4. Submit → Claim is immediately processed

## 🔧 Technical Features

### **File Processing**
- **Automatic format detection**: TXT, PDF, DOCX, CSV, JSON
- **Text extraction**: From various file formats
- **Batch processing**: Multiple files simultaneously
- **Error handling**: Invalid files are rejected gracefully

### **Job Management**
- **Unique job IDs**: Each ingestion gets unique identifier
- **Status tracking**: Running, Completed, Failed, Paused
- **Progress monitoring**: Real-time updates on processing
- **Resource management**: Jobs can be stopped to free resources

### **Data Normalization**
- **Text cleaning**: Remove formatting, normalize encoding
- **Language detection**: Identify content language
- **Duplicate detection**: Avoid processing same content twice
- **Metadata extraction**: Source, timestamp, author information

### **Integration with Pipeline**
- **Automatic forwarding**: Processed data goes to ClaimExtractor
- **Queue management**: Maintains processing order
- **Error recovery**: Failed items are retried
- **Monitoring**: All activities are logged and tracked

## 🎯 Expected Results

After using the Ingestor Agent, you should see:

### **In the System:**
- ✅ **New claims** appearing in Claim Intelligence
- ✅ **Increased processed count** in agent status
- ✅ **Job completion notifications** in the interface
- ✅ **File uploads** processed and claims extracted

### **In the Database:**
- ✅ **Raw data** stored with source attribution
- ✅ **Normalized text** ready for claim extraction
- ✅ **Metadata** preserved (source, timestamp, etc.)
- ✅ **Processing logs** for audit trail

## 🔄 Real-Time Features

### **Live Updates:**
- **Agent status** refreshes every 5 seconds
- **Job progress** updates automatically
- **Queue size** changes in real-time
- **Success rates** calculated dynamically

### **Interactive Controls:**
- **Start/stop jobs** with immediate effect
- **Upload progress** with visual feedback
- **Form validation** with instant error messages
- **Status indicators** with color coding

## 🎉 Success Indicators

You'll know the Ingestor Agent is working when:

1. **✅ Agent Status** shows "Running" with active queue
2. **✅ Jobs appear** in the Ingestion Jobs tab
3. **✅ Progress updates** show items being processed
4. **✅ Success notifications** appear after operations
5. **✅ New claims** show up in other parts of the system

The Ingestor Agent is now a fully functional data collection and normalization tool that you can actively use to feed your misinformation detection pipeline! 🚀

## 🚀 Ready to Test

**Access the Ingestor Agent now**:
1. Go to `/admin/streams`
2. Click on the "Ingestor" agent card
3. Start collecting and normalizing data!

The agent transforms from a passive status display into an active data processing workstation.
