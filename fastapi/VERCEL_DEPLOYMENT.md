# Deploying FastAPI to Vercel

This guide will walk you through deploying your FastAPI application to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. [Vercel CLI](https://vercel.com/docs/cli) installed (optional, but recommended)

## Deployment Steps

### Option 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI if you haven't already:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Navigate to your FastAPI project directory:
   ```bash
   cd /path/to/your/fastapi/project
   ```

4. Deploy to Vercel:
   ```bash
   vercel
   ```

5. Follow the prompts to complete the deployment.

### Option 2: Using Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).

2. Log in to [Vercel Dashboard](https://vercel.com/dashboard).

3. Click "New Project".

4. Import your repository.

5. Configure the project:
   - Framework Preset: Other
   - Root Directory: `./fastapi` (if your FastAPI code is in a subdirectory)
   - Build Command: Leave empty
   - Output Directory: Leave empty

6. Click "Deploy".

## Environment Variables

Make sure to set up your environment variables in the Vercel dashboard:

1. Go to your project in the Vercel dashboard.
2. Navigate to "Settings" > "Environment Variables".
3. Add the following environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key

## Important Notes

1. Vercel has a 10-second execution limit for serverless functions on the free tier. If your API calls take longer, consider upgrading your plan.

2. The streaming response functionality might behave differently on Vercel compared to your local environment due to the serverless nature of Vercel functions.

3. For production use, you might want to consider other hosting options that are more suitable for long-running processes or streaming responses.

## Testing Your Deployment

After deployment, you can test your API using the following curl command:

```bash
curl -X POST "https://your-vercel-deployment-url.vercel.app/api/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "id": "msg_1",
        "role": "user",
        "message": "Generate a bar chart showing sales data for different product categories"
      }
    ]
  }'
```

Replace `your-vercel-deployment-url` with your actual Vercel deployment URL.
