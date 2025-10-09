# ML-Powered Claim Verification System

This document explains the comprehensive claim verification system that combines web scraping, machine learning models, and AI to provide accurate fact-checking results.

## 🎯 Output Format

The system now provides results in your requested format:

```
✅ Supported (Confidence: 89%)
❌ Refuted (Confidence: 77%)
⚪ Not Enough Information (Confidence: 64%)
```

## 🔄 Verification Pipeline

### 1. Data Collection (Web Scraping + APIs)
- **Web Scraping**: Searches fact-checking sites (Snopes, PolitiFact, FactCheck.org, AFP, Alt News, Boom Live)
- **Database Evidence**: Retrieves similar claims from your database
- **API Integration**: Ready for Google Fact Check Tools API, NewsAPI, etc.

### 2. Data Preprocessing
- **Text Cleaning**: Removes HTML tags, normalizes text, handles special characters
- **Tokenization**: Prepares text for ML model input
- **Deduplication**: Removes duplicate evidence sources

### 3. Evidence Retrieval
- **Semantic Similarity**: Uses cosine similarity to find relevant evidence
- **Relevance Scoring**: Ranks evidence by relevance to the claim
- **Top-N Selection**: Selects the most relevant evidence items

### 4. ML Verification (BERT/RoBERTa)
- **Natural Language Inference**: Uses transformer models for claim-evidence comparison
- **Model Options**: 
  - `facebook/bart-large-mnli` (primary)
  - `microsoft/deberta-v3-large-mnli` (fallback)
  - `roberta-large-mnli` (fallback)
- **Confidence Scoring**: Provides probability-based confidence scores

### 5. Result Formatting
- **Classification**: Maps ML output to Supported/Refuted/Not Enough Information
- **Confidence Calculation**: Converts probabilities to percentage confidence
- **Evidence Summary**: Provides detailed evidence analysis

## 🚀 Setup Instructions

### Prerequisites
- Node.js 16+
- Python 3.8+
- MongoDB

### Quick Setup
```bash
# Run the automated setup script
node setup-ml-verification.js
```

### Manual Setup
```bash
# Install Node.js dependencies
npm install

# Install Python ML dependencies
pip install transformers==4.35.2 torch==2.1.1 sentence-transformers==2.2.2 numpy==1.24.3 scikit-learn==1.3.2 datasets==2.14.6

# Start the server
npm start
```

## 📊 API Endpoints

### Verify Claim
```http
POST /api/verification/verify-claim
Content-Type: application/json

{
  "claim": "Vaccines cause autism"
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "classification": "❌ Refuted (Confidence: 95%)",
    "verdict": "refuted",
    "confidence": 0.95,
    "confidencePercent": 95,
    "emoji": "❌",
    "formattedVerdict": "Refuted",
    "evidence": [...],
    "reasoning": "Multiple scientific studies contradict this claim",
    "pipeline": {
      "steps_completed": 5,
      "total_time_ms": 3500,
      "evidence_sources": ["Snopes", "PolitiFact", "Scientific Studies"],
      "verification_method": "ml-analysis"
    },
    "explanation": {
      "short": "Refuted with 95% confidence",
      "medium": "Analysis of 5 evidence sources indicates this claim is refuted (95% confidence)",
      "long": "Our comprehensive verification pipeline analyzed this claim...",
      "eli5": "Scientists have proven this is not true."
    }
  }
}
```

### Check Service Status
```http
GET /api/verification/status
```

### Initialize ML Models
```http
POST /api/verification/initialize-ml
```

## 🧠 ML Models Used

### Primary Models
1. **BART-Large-MNLI**: Natural Language Inference for claim verification
2. **Sentence-BERT**: Semantic similarity for evidence retrieval
3. **All-MiniLM-L6-v2**: Lightweight sentence embeddings

### Training Data
- **FEVER Dataset**: Fact Extraction and Verification
- **MNLI**: Multi-Genre Natural Language Inference
- **LIAR Dataset**: Political fact-checking statements

## 🔧 Configuration

### Environment Variables
```env
# AI Service (fallback)
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key

# Database
MONGODB_URI=mongodb://localhost:27017/misinformation-platform

# Server
PORT=5000
CLIENT_URL=http://localhost:5173
```

### ML Model Configuration
Edit `server/services/MLVerificationService.js`:
```javascript
this.supportedModels = [
  'facebook/bart-large-mnli',        // Primary
  'microsoft/deberta-v3-large-mnli', // High accuracy
  'roberta-large-mnli'               // Fallback
];
```

## 📈 Performance Optimization

### Model Loading
- Models are cached after first load
- Supports CPU and GPU inference
- Automatic fallback to smaller models if memory is limited

### Batch Processing
- Evidence items are processed in batches
- Configurable batch sizes for different hardware

### Caching
- Results are cached in MongoDB
- Similar claims reuse existing evidence

## 🔍 Troubleshooting

### Common Issues

#### Python Dependencies
```bash
# Windows users may need:
pip install torch --index-url https://download.pytorch.org/whl/cpu

# For CUDA support:
pip install torch --index-url https://download.pytorch.org/whl/cu118
```

#### Memory Issues
```bash
# Reduce model size in MLVerificationService.js
# Use smaller models like 'distilbert-base-uncased-mnli'
```

#### Model Download Issues
```bash
# Pre-download models
python -c "from transformers import pipeline; pipeline('text-classification', model='facebook/bart-large-mnli')"
```

### Debug Mode
Set `NODE_ENV=development` for detailed logging:
```bash
NODE_ENV=development npm start
```

## 📊 Monitoring

### Health Check
```http
GET /api/health
```

### Verification Statistics
The system tracks:
- Total verifications performed
- Average confidence scores
- Evidence source reliability
- Processing times

## 🔄 Fallback Strategy

1. **ML Models** (Primary)
2. **AI Service** (Gemini/OpenAI)
3. **Web Scraping Only**
4. **Basic Pattern Matching**

## 🚀 Future Enhancements

### Planned Features
- [ ] Custom model fine-tuning on your data
- [ ] Real-time model updates
- [ ] Multi-language support
- [ ] Advanced evidence ranking
- [ ] Explainable AI visualizations

### API Integrations
- [ ] Google Fact Check Tools API
- [ ] NewsAPI integration
- [ ] Social media monitoring
- [ ] Academic paper search

## 📝 Example Usage

```javascript
// Server-side usage
const ComprehensiveVerificationService = require('./services/ComprehensiveVerificationService');

const result = await ComprehensiveVerificationService.verifyClaim(
  "Climate change is caused by human activities"
);

console.log(result.classification); // "✅ Supported (Confidence: 92%)"
```

```javascript
// Client-side usage
const response = await fetch('/api/verification/verify-claim', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ claim: "The Earth is flat" })
});

const data = await response.json();
console.log(data.result.classification); // "❌ Refuted (Confidence: 98%)"
```

## 📚 Additional Resources

- [Transformers Documentation](https://huggingface.co/docs/transformers)
- [FEVER Dataset](https://fever.ai/)
- [Fact-Checking Best Practices](https://www.poynter.org/fact-checking/)

## 🤝 Contributing

To add new verification methods or improve the ML pipeline:

1. Extend `ComprehensiveVerificationService`
2. Add new models to `MLVerificationService`
3. Update the pipeline steps
4. Test with diverse claims
5. Update documentation

---

**Note**: First-time setup may take 10-15 minutes to download ML models. Subsequent runs will be much faster due to caching.
