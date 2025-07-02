#!/usr/bin/env python3
"""
Generate pixel art logos for Smarter with Science using OpenAI's DALL-E API.
Run this script after setting up your OPENAI_API_KEY environment variable.
"""

import os
import requests
from openai import OpenAI
from pathlib import Path

def generate_logos():
    # Check for API key
    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        print("Error: OPENAI_API_KEY environment variable not set.")
        print("Please set it with: export OPENAI_API_KEY=your_api_key_here")
        return False
    
    # Initialize OpenAI client
    client = OpenAI(api_key=api_key)
    
    # Create images directory if it doesn't exist
    Path('public/images').mkdir(parents=True, exist_ok=True)
    
    logos = [
        {
            "name": "sws-logo-pixel.png",
            "prompt": "Pixel art logo for 'Smarter with Science', small compact design suitable for website header navigation, purple and green cyberpunk color scheme, science/technology theme with hexagonal elements, clean 32x32 or 64x64 pixel style, transparent background if possible, includes scientific symbols like DNA helix, atoms, or circuit patterns, retro gaming aesthetic"
        },
        {
            "name": "sws-logo-pixel-minimal.png", 
            "prompt": "Minimalist pixel art logo for 'Smarter with Science', ultra-simple 32x32 pixel design, purple and green neon colors on dark background, single hexagon with atom symbol inside, clean geometric shapes, suitable for small website header, retro 8-bit style"
        },
        {
            "name": "sws-logo-pixel-detailed.png",
            "prompt": "Detailed pixel art logo for 'Smarter with Science', 64x64 pixel art style, vibrant purple and green cyberpunk palette, incorporates DNA double helix, atomic orbitals, and circuit board patterns, hexagonal frame, glowing neon effect, dark background, retro gaming aesthetic with modern science symbols"
        }
    ]
    
    generated_files = []
    
    for logo in logos:
        try:
            print(f"Generating {logo['name']}...")
            
            response = client.images.generate(
                model='dall-e-3',
                prompt=logo['prompt'],
                size='1024x1024',
                quality='standard',
                n=1
            )
            
            # Download and save the image
            image_url = response.data[0].url
            img_response = requests.get(image_url)
            
            file_path = f"public/images/{logo['name']}"
            with open(file_path, 'wb') as f:
                f.write(img_response.content)
            
            generated_files.append(file_path)
            print(f"✓ Saved to: {file_path}")
            
        except Exception as e:
            print(f"✗ Error generating {logo['name']}: {str(e)}")
    
    print(f"\nGeneration complete! Created {len(generated_files)} logos:")
    for file_path in generated_files:
        print(f"  - {file_path}")
    
    return True

if __name__ == "__main__":
    generate_logos()