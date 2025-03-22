# Markdown Document Converter

🇬🇧 English | [🇨🇳 中文](README_CN.md) | [🇯🇵 日本語](README_JP.md)

A document conversion tool built on Cloudflare Workers AI, capable of efficiently converting various document formats to Markdown.

![CleanShot 2025-03-21 at 22 50 26@2x](https://github.com/user-attachments/assets/4e01dbb2-9f22-46e5-8cf7-b180c91b3c1b)

⬇️ One-click Deployment

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/YOUR_USERNAME/markdown-converter)

👉 **[Demo Site: markdown.jkaihub.com](https://markdown.jkaihub.com)**

Try self-hosting if you need this tool frequently ⬆️

## Features

- 🚀 **Multi-format Support**: Convert PDF, images, Office documents, HTML, and more
- 💡 **Intelligent Conversion**: Powered by Cloudflare Workers AI for smart recognition and processing
- 🖼️ **Image Recognition**: Intelligently analyze image content and generate appropriate Markdown descriptions
- 📊 **Beautiful Interface**: Clean and intuitive user interface with drag-and-drop upload
- 💾 **One-click Download**: Easily download or copy conversion results
- 🔎 **JSON Viewer**: View raw JSON data for debugging or advanced usage
- 🔒 **Rate Limiting**: Built-in anti-abuse protection to ensure stable service
- 🔐 **Password Protection**: Control access through password verification mechanism

## Supported Document Formats

| Format Type | File Extensions |
|-------------|----------------|
| PDF Documents | .pdf |
| Image Files | .jpeg, .jpg, .png, .webp, .svg |
| HTML Documents | .html |
| XML Documents | .xml |
| Office Documents | .xlsx, .xlsm, .xlsb, .xls |
| OpenDocument | .ods |
| CSV Files | .csv |
| Apple Documents | .numbers |

## Deployment Methods

### Quick Deployment Guide

1. **Log in to Cloudflare Console**
   - Visit [Cloudflare Dashboard](https://dash.cloudflare.com/) and log in to your account

2. **Create a New Worker**
   - In the left sidebar, click "Workers & Pages"
   - Click "Create Application"
   - Select "Create Worker"
   - Enter a Worker name (e.g., "markdown-converter")
   - Click "Create Worker" button

3. **Copy the Code**
   - In the Worker editor, delete the default code
   - Copy and paste the code from `src/index.js` into the editor

4. **Configure AI Binding and Environment Variables**
   - Click the "Settings" tab, then click "Variables"
   - In the "AI Bindings" section, click "Add binding"
     - Enter "AI" as the name (must be uppercase)
   - In the "Environment Variables" section, click "Add variable"
     - Enter "APP_PASSWORD" as the name
     - Enter your desired password as the value (e.g., `your_secure_password`)
   - Click "Save and Deploy"

5. **Test Your Application**
   - After deployment, visit `https://[worker-name].[your-account].workers.dev`
   - Enter your password to log in
   - Start using the document conversion features

### Method 1: One-click Deployment (Recommended)

Simply click the "Deploy to Cloudflare Workers" button above and follow the prompts:

1. After clicking the button, you'll be redirected to the Cloudflare deployment page
2. Log in to your Cloudflare account (if not already logged in)
3. Confirm the deployment settings (keep the default configuration)
4. Click the "Deploy" button
5. Wait for the deployment to complete, the system will automatically configure the AI binding
6. After deployment, click the generated link to access your application
7. **Important**: After deployment, remember to set the APP_PASSWORD environment variable to enable password protection
![CleanShot 2025-03-21 at 23 03 06@2x](https://github.com/user-attachments/assets/cb6d2ffb-6c1b-4573-9555-22656cb4f569)

> Note: One-click deployment requires you to authorize Cloudflare to access your GitHub repository.

### Method 2: Using the Wrangler CLI

If you prefer using the command line:
```bash
npm install -g wrangler
```

2. **Log in to Cloudflare**:
```bash
wrangler login
```

3. **Create a Project Directory**:
```bash
mkdir markdown-converter
cd markdown-converter
```

4. **Create wrangler.toml Configuration File**:
```toml
name = "markdown-converter"
main = "src/index.js"
compatibility_date = "2023-10-30"

[ai]
binding = "AI"

[vars]
APP_PASSWORD = "your_secure_password"  # Set access password
```

5. **Create src Directory and Add index.js File**:
```bash
mkdir src
# Copy the index.js code into this file
```

6. **Deploy the Worker**:
```bash
wrangler deploy
```

## How to Use

1. Visit the application URL
2. Enter the access password to log in
3. Click the "Select Files" button or drag and drop files into the upload area
4. Select one or more supported document files
5. Click the "Start Conversion" button
6. Wait for the conversion to complete and view the generated Markdown content
7. Copy the Markdown text or download it as a .md file

## Password Protection Feature

To prevent service abuse and control costs, the application includes password protection:

- You must enter the correct password to use the conversion features
- The password is set through the Cloudflare environment variable `APP_PASSWORD`
- After successful login, a session token valid for 24 hours is created
- You'll need to log in again after the session expires

To change the password:
1. In the Cloudflare Dashboard, go to the Workers section
2. Select your Worker application
3. Click the "Settings" tab, then click "Variables"
4. Modify the value of `APP_PASSWORD` in the "Environment Variables" section
5. Click "Save and Deploy"

## Customizing Rate Limits (Anti-abuse)

The application has built-in IP-based rate limiting to prevent abuse. By default, each IP is limited to 10 requests per hour. You can adjust this limit as needed:

```javascript
// Find and modify the following configuration at the beginning of the index.js file
const RATE_LIMIT = {
  maxRequests: 10,         // Maximum requests per IP per hour (modify this value)
  windowMs: 60 * 60 * 1000,  // Time window (1 hour, can be modified)
  ipCache: new Map()       // Stores IPs and their request counts
};
```

If your application needs a higher request frequency, or you want to completely disable rate limiting, you can adjust these settings accordingly. For private deployments, you might want to set `maxRequests` to a higher value.

## Developer Notes

If you want to develop or modify this project locally:

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/markdown-converter.git
cd markdown-converter
```

2. Install Wrangler CLI:
```bash
npm install -g wrangler
```

3. Local development:
```bash
wrangler dev
```

4. Deploy changes:
```bash
wrangler deploy
```

## Important Notes

- File size limit: According to Cloudflare Workers limitations, ensure uploaded files do not exceed 100MB
- Conversion quality: Quality may vary depending on the type of file
- Rate limiting: By default, each IP address is limited to 10 requests per hour, which can be adjusted by modifying the code
- Password protection: Use complex passwords for better security and change them periodically

## Free Usage Limits

- By default, Cloudflare Workers AI provides 100,000 free calls per day
- Image conversion uses two AI models, which may consume more quota
- After exceeding the free quota, you will be billed according to Cloudflare's pricing ($0.0005 per 1000 requests)
- Using password protection can effectively control usage and prevent rapid consumption of your quota

## License

MIT 
