# Logo Generation for Smarter with Science

This directory contains scripts to generate pixel art logos for the Smarter with Science website.

## Current Status

✅ **Placeholder logos created** (ready to use immediately):
- `/public/images/sws-logo-pixel-placeholder.png` - 64x64 main logo
- `/public/images/sws-logo-pixel-minimal-placeholder.png` - 32x32 minimal version

🔄 **AI-generated logos** (requires OpenAI API key):
- `generate-logo.py` - Script ready to generate 3 variations using DALL-E

## Quick Start (Use Placeholder Logos)

The placeholder logos are already generated and ready to use:

```typescript
// In your header component
<img 
  src="/images/sws-logo-pixel-placeholder.png" 
  alt="Smarter with Science" 
  className="h-8 w-8" 
/>
```

## Generate AI Logos (Optional)

To generate high-quality AI-created pixel art logos:

### 1. Get OpenAI API Key
- Go to https://platform.openai.com/api-keys
- Create a new API key
- Copy the key (starts with `sk-`)

### 2. Set Environment Variable
```bash
export OPENAI_API_KEY=your_api_key_here
```

### 3. Install Dependencies
```bash
pip install openai requests pillow
```

### 4. Generate Logos
```bash
python3 generate-logo.py
```

This will create:
- `public/images/sws-logo-pixel.png` - Main logo (detailed)
- `public/images/sws-logo-pixel-minimal.png` - Minimal version
- `public/images/sws-logo-pixel-detailed.png` - Highly detailed version

## Logo Specifications

All logos are designed for:
- **Color Scheme**: Purple and green cyberpunk theme
- **Style**: Retro pixel art (32x32 or 64x64)
- **Theme**: Science/technology with hexagonal elements
- **Symbols**: DNA helix, atoms, circuit patterns
- **Usage**: Website header navigation
- **Background**: Transparent (where possible)

## Files

- `create-placeholder-logo.py` - Creates simple placeholder logos using PIL
- `generate-logo.py` - Generates AI logos using OpenAI DALL-E
- `LOGO-GENERATION.md` - This documentation

## Integration Example

```tsx
// Header component example
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-2 flex items-center">
        <img 
          src="/images/sws-logo-pixel-placeholder.png" 
          alt="Smarter with Science Logo" 
          className="h-8 w-8 mr-3"
        />
        <h1 className="text-xl font-bold">Smarter with Science</h1>
      </div>
    </header>
  );
};

export default Header;
```

## Troubleshooting

**PIL/Pillow not installed:**
```bash
pip install Pillow
```

**OpenAI API errors:**
- Verify API key is correct
- Check API usage limits
- Ensure you have credits available

**File permissions:**
```bash
chmod +x generate-logo.py
chmod +x create-placeholder-logo.py
```