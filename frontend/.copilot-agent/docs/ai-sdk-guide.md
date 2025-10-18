# Vercel AI SDK Guide

## Overview
The AI SDK is a TypeScript toolkit for building AI-powered applications with frameworks like React, Next.js, Vue, Svelte, and Node.js.

## Key Components

### AI SDK Core
- **generateText**: For generating text for a given prompt and model, suitable for non-interactive use cases
- **streamText**: For streaming text from LLMs, ideal for interactive use cases

### AI SDK UI
- **useChat**: For building chat and generative user interfaces
- **useCompletion**: For text completion interfaces

## Migration from openai-edge

### Before (openai-edge):
```typescript
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const response = await openai.createChatCompletion({
  model: 'gpt-4',
  messages,
  stream: true,
});

const stream = OpenAIStream(response);
return new StreamingTextResponse(stream);
```

### After (Vercel AI SDK):
```typescript
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

const result = streamText({
  model: openai('gpt-4o'),
  messages,
});

return result.toDataStreamResponse();
```

## useChat Hook Features

### Basic Implementation
```typescript
'use client';

import { useChat } from '@ai-sdk/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({});

  return (
    <>
      {messages.map(message => (
        <div key={message.id}>
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
```

### Status Management
- `submitted`: Message sent to API, awaiting response start
- `streaming`: Response actively streaming from API
- `ready`: Full response received, new message can be submitted
- `error`: Error occurred during API request

### Advanced Features
- **Error handling**: Built-in error state management
- **Message modification**: setMessages for direct message manipulation
- **Controlled input**: Custom input handling with setInput and append
- **Cancellation**: stop() function to abort streaming
- **Regeneration**: reload() function to reprocess last message
- **Throttling**: experimental_throttle for UI update control

### Event Callbacks
- `onFinish`: Called when assistant message is completed
- `onError`: Called when an error occurs during fetch request
- `onResponse`: Called when response from API is received

### Attachments (Experimental)
- Support for FileList objects
- URL-based attachments
- Multi-modal content (images + text)
- Automatic conversion to data URLs

## API Route Configuration

### Basic Setup
```typescript
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4-turbo'),
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toDataStreamResponse();
}
```

### Advanced Configuration
- **Error messages**: Custom getErrorMessage function
- **Usage information**: Control with sendUsage option
- **Text streams**: Support for plain text with streamProtocol: 'text'
- **Reasoning**: Forward reasoning tokens with sendReasoning
- **Sources**: Include web sources with sendSources

## Environment Variables
```bash
# Required
OPENAI_API_KEY=your_openai_key_here

# Optional (depending on provider)
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_key
```

## Best Practices

1. **Always use TypeScript** for better type safety
2. **Handle errors gracefully** with proper error states
3. **Implement loading states** for better UX
4. **Use Server Components** when possible for better performance
5. **Secure API keys** properly in environment variables
6. **Implement rate limiting** for production applications
7. **Use proper CORS** configuration for cross-origin requests