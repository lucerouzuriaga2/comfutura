import os

# Files to update
files_to_update = [
    "src/components/About.tsx",
    "src/components/Services.tsx",
    "src/components/Projects.tsx",
    "src/components/Blog.tsx",
    "src/components/Contact.tsx",
    "src/components/Portal.tsx"
]

replacements = {
    "bg-brand-dark-card": "bg-gray-50",
    "bg-brand-dark": "bg-white",
    "text-white": "text-gray-900",
    "text-gray-300": "text-gray-600",
    "text-gray-400": "text-gray-500",
    "border-white/5": "border-gray-200",
    "border-white/10": "border-gray-200",
    "border-white/20": "border-gray-300",
    "hover:text-white": "hover:text-brand-red",
    "text-brand-blue-light": "text-brand-blue",
    "bg-black/50": "bg-gray-100",
    "bg-black/20": "bg-gray-50",
    "from-brand-dark": "from-white",
    "bg-brand-dark/85": "bg-white/90",
    "bg-brand-dark/20": "bg-black/10",
    "border-white/50": "border-gray-400",
    "bg-white/5": "bg-white",
    "bg-white/10": "bg-gray-100",
    "ring-white/10": "ring-gray-200",
}

for file_path in files_to_update:
    full_path = os.path.join("c:/Users/User/Downloads/comfutura/comfutura", file_path)
    if os.path.exists(full_path):
        with open(full_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # We need to sort by length of replacement key to prevent partial matches
        for key in sorted(replacements.keys(), key=len, reverse=True):
            content = content.replace(key, replacements[key])
            
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {file_path}")
    else:
        print(f"File not found: {file_path}")
