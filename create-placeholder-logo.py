#!/usr/bin/env python3
"""
Create a simple placeholder pixel art logo for Smarter with Science
using PIL (Python Imaging Library)
"""

from PIL import Image, ImageDraw, ImageFont
import numpy as np

def create_pixel_logo():
    # Create a 64x64 pixel image with transparency
    size = 64
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Colors - purple and green cyberpunk theme
    purple = (138, 43, 226, 255)  # Purple
    green = (0, 255, 136, 255)    # Neon green
    dark_purple = (75, 0, 130, 255)  # Dark purple
    
    # Draw hexagonal background
    center = size // 2
    hex_radius = 28
    
    # Calculate hexagon points
    import math
    hex_points = []
    for i in range(6):
        angle = i * math.pi / 3
        x = center + hex_radius * math.cos(angle)
        y = center + hex_radius * math.sin(angle)
        hex_points.append((x, y))
    
    # Draw hexagon outline
    draw.polygon(hex_points, outline=purple, width=2)
    
    # Draw atom symbol in center
    atom_center = center
    atom_radius = 8
    
    # Draw nucleus (small circle)
    nucleus_size = 4
    draw.ellipse(
        [atom_center - nucleus_size//2, atom_center - nucleus_size//2,
         atom_center + nucleus_size//2, atom_center + nucleus_size//2],
        fill=green
    )
    
    # Draw electron orbits (ellipses)
    orbit_width = 2
    
    # Horizontal orbit
    draw.ellipse(
        [atom_center - atom_radius*2, atom_center - atom_radius//2,
         atom_center + atom_radius*2, atom_center + atom_radius//2],
        outline=purple, width=orbit_width
    )
    
    # Diagonal orbit 1
    draw.ellipse(
        [atom_center - atom_radius*1.5, atom_center - atom_radius,
         atom_center + atom_radius*1.5, atom_center + atom_radius],
        outline=green, width=orbit_width
    )
    
    # Add small dots for electrons
    electron_positions = [
        (atom_center + atom_radius*1.5, atom_center - 2),
        (atom_center - atom_radius*1.5, atom_center + 2),
        (atom_center + 2, atom_center - atom_radius//2)
    ]
    
    for pos in electron_positions:
        draw.ellipse([pos[0]-1, pos[1]-1, pos[0]+1, pos[1]+1], fill=green)
    
    # Add corner accents (small squares for circuit board feel)
    accent_size = 3
    corners = [
        (5, 5), (size-8, 5), (5, size-8), (size-8, size-8)
    ]
    
    for corner in corners:
        draw.rectangle([corner[0], corner[1], corner[0]+accent_size, corner[1]+accent_size], 
                      fill=dark_purple)
    
    return img

def create_minimal_logo():
    # Create a smaller, more minimal version
    size = 32
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    purple = (138, 43, 226, 255)
    green = (0, 255, 136, 255)
    
    center = size // 2
    
    # Simple hexagon
    hex_radius = 12
    import math
    hex_points = []
    for i in range(6):
        angle = i * math.pi / 3
        x = center + hex_radius * math.cos(angle)
        y = center + hex_radius * math.sin(angle)
        hex_points.append((x, y))
    
    draw.polygon(hex_points, outline=purple, width=2)
    
    # Simple atom (just nucleus and one orbit)
    draw.ellipse([center-2, center-2, center+2, center+2], fill=green)
    draw.ellipse([center-8, center-4, center+8, center+4], outline=purple, width=1)
    
    return img

# Generate the logos
try:
    # Main logo
    logo = create_pixel_logo()
    logo.save('public/images/sws-logo-pixel-placeholder.png')
    print("✓ Created: public/images/sws-logo-pixel-placeholder.png")
    
    # Minimal version
    minimal_logo = create_minimal_logo()
    minimal_logo.save('public/images/sws-logo-pixel-minimal-placeholder.png')
    print("✓ Created: public/images/sws-logo-pixel-minimal-placeholder.png")
    
    print("\nPlaceholder logos created successfully!")
    print("These are temporary logos you can use immediately.")
    print("Run generate-logo.py with an OpenAI API key for AI-generated versions.")
    
except ImportError:
    print("PIL (Pillow) not installed. Installing...")
    import subprocess
    subprocess.run(['pip', 'install', 'Pillow'])
    print("Please run this script again after PIL installation.")
except Exception as e:
    print(f"Error creating placeholder logos: {e}")