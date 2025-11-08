# External API Setup Guide

## Quick Setup - Just 2 Steps!

### Step 1: Add Environment Variables

Edit `backend/.env` file and add:

```env
EXTERNAL_API_URL=https://your-ai-api.com/parse
EXTERNAL_API_KEY=your-api-key-here
```

**Note**: If your API doesn't require authentication, you can omit `EXTERNAL_API_KEY`.

### Step 2: Restart Backend

```bash
cd backend
npm run dev
```

**Done!** The system will now automatically call your API when users upload files.

## Expected API Response

Your external API must return JSON with this structure:

```json
{
  "dataOfIssue": {
    "amharic": "",
    "oromiffa": ""
  },
  "fullName": {
    "amharic": "",
    "oromiffa": ""
  },
  "dateOfBirth": {
    "amharic": "",
    "oromiffa": ""
  },
  "sex": {
    "amharic": "",
    "oromiffa": ""
  },
  "expireDate": {
    "amharic": "",
    "oromiffa": ""
  },
  "FAN": "",
  "phoneNumber": "",
  "region": {
    "amharic": "",
    "oromiffa": ""
  },
  "city": {
    "amharic": "",
    "oromiffa": ""
  },
  "kebele": {
    "amharic": "",
    "oromiffa": ""
  },
  "whereRegistered": {
    "amharic": "",
    "oromiffa": ""
  },
  "FIN": "",
  "personelImage": "",
  "barcodeImage": ""
}
```

## API Requirements

### Request Format

- **Method**: `POST`
- **URL**: Your external AI endpoint (set in `EXTERNAL_API_URL`)
- **Headers**:
  - `Content-Type: application/pdf` (for PDF files)
  - `Content-Type: image/jpeg` (for JPEG images)
  - `Content-Type: image/png` (for PNG images)
  - `Content-Type: image/gif` (for GIF images)
  - `Content-Type: image/webp` (for WebP images)
  - `Authorization: Bearer {your-api-key}` (if you set `EXTERNAL_API_KEY`)
- **Body**: File buffer (raw binary data - PDF or image)

### Supported File Types

- **PDF**: `.pdf` files
- **Images**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp` files

## How It Works

1. User uploads a file (PDF or image) and clicks "Generate ID Card"
2. Backend calls your external API with the file
3. Your API returns parsed JSON data
4. Backend validates all required fields are present
5. If valid → Counts generation and returns success
6. Frontend displays the ID card

## Important Notes

- **No Mock Data**: The system will fail if `EXTERNAL_API_URL` is not set
- **All Fields Required**: All fields must be present in the response (can be empty strings)
- **Language Fields**: Fields like `fullName`, `dateOfBirth`, etc. must be objects with `amharic` and `oromiffa` properties
- **Automatic Validation**: The backend automatically checks for required fields

## Testing

1. Set `EXTERNAL_API_URL` in `backend/.env`
2. Restart backend
3. Upload a file and click "Generate ID Card"
4. Check backend console for logs:
   - `📡 Calling external AI API: ...`
   - `✅ External API response received`
   - `📄 Parse result: ✅ Success` or `❌ Failed`

## Troubleshooting

### API Not Being Called

- Check `EXTERNAL_API_URL` is set in `backend/.env`
- Restart backend after changing `.env`
- Check backend console for logs

### Validation Fails

- Check that your API returns all required fields
- Verify field names match exactly (case-sensitive)
- Check backend console for which fields are missing

### API Returns Error

- Check backend console for error details
- Verify API URL is correct
- Verify API key is correct (if required)
