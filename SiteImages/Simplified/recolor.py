from PIL import Image
import os

def recolor_image(input_path, output_path, hex_color):
    # Convert hex to RGB
    rgb_color = tuple(int(hex_color.lstrip('#')[i:i+2], 16) for i in (0, 2, 4))
    
    with Image.open(input_path) as img:
        img = img.convert("RGBA")
        
        # 2. Extract just the Alpha channel (the transparency "map")
        alpha = img.split()[3]
        
        # 3. Create a solid block of the new color the same size as the image
        new_layer = Image.new("RGB", img.size, rgb_color)
        
        # 4. Paste the original alpha channel onto the new solid color
        new_layer.putalpha(alpha)
        
        # 5. Save the result
        new_layer.save(output_path)

# Example Usage:
folder = "black"
replacement_color = "#c62b69"

for filename in os.listdir(folder):
    if filename.lower().endswith((".png", ".webp")):
        recolor_image(
            os.path.join(folder, filename), 
            os.path.join("black", filename), 
            replacement_color
        )

print("Processing complete!")
