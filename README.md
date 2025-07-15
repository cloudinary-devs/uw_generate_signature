# Cloudinary Signature Generator

This project provides a server-side implementation for generating Cloudinary signatures, which is required for secure client-side uploads to Cloudinary.

## Features

- Express.js server with signature generation endpoint
- CORS enabled for cross-origin requests
- Demo HTML page with Cloudinary upload widget
- Environment-based configuration

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory with your Cloudinary credentials:

```bash
cp env.example .env
```

Then edit the `.env` file with your actual Cloudinary credentials:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3000
```

### 3. Get Your Cloudinary Credentials

1. Sign up for a Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Go to your Dashboard
3. Copy your Cloud Name, API Key, and API Secret

### 4. Run the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## Usage

### Server Endpoint

The signature generation endpoint is available at:
```
GET /my_generate_signature?data=<json_string>
```

### Client-Side JavaScript

Your existing JavaScript snippet will work with this server:

```javascript
var generateSignature = function(callback, params_to_sign){
  $.ajax({
   url     : "http://localhost:3000/my_generate_signature",
   type    : "GET",
   dataType: "text",
   data    : { data: params_to_sign},
   complete: function() {console.log("complete")},
   success : function(signature, textStatus, xhr) { callback(signature); },
   error   : function(xhr, status, error) { console.log(xhr, status, error); }
  });
}
```

### Example Usage

```javascript
// Parameters to sign (example)
const params = {
  timestamp: Math.round((new Date).getTime() / 1000),
  folder: 'my-uploads',
  public_id: 'unique-file-id'
};

// Generate signature
generateSignature(function(signature) {
  console.log('Generated signature:', signature);
  // Use the signature with Cloudinary upload
}, JSON.stringify(params));
```

## Demo

Visit `http://localhost:3000` to see a working demo with:
- Signature generation test
- Cloudinary upload widget
- Real-time feedback

## Security Notes

- Never expose your Cloudinary API Secret in client-side code
- Always generate signatures server-side
- Use HTTPS in production
- Consider implementing rate limiting for the signature endpoint

## API Reference

### GET /my_generate_signature

Generates a Cloudinary signature for the provided parameters.

**Query Parameters:**
- `data` (required): JSON string of parameters to sign

**Response:**
- Success: Plain text signature
- Error: JSON error object

**Example:**
```bash
curl "http://localhost:3000/my_generate_signature?data={\"timestamp\":1234567890,\"folder\":\"test\"}"
```

## Troubleshooting

### Common Issues

1. **"Missing data parameter"**: Make sure you're passing the `data` query parameter
2. **"Failed to generate signature"**: Check your Cloudinary credentials in `.env`
3. **CORS errors**: The server includes CORS headers, but ensure your client is making requests to the correct URL

### Debug Mode

Enable debug logging by setting the environment variable:
```bash
DEBUG=* npm start
```

## License

MIT 