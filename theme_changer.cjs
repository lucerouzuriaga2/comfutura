const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    "src/components/About.tsx",
    "src/components/Services.tsx",
    "src/components/Projects.tsx",
    "src/components/Blog.tsx",
    "src/components/Contact.tsx",
    "src/components/Portal.tsx"
];

const replacements = {
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
};

const keys = Object.keys(replacements).sort((a, b) => b.length - a.length);

filesToUpdate.forEach(filePath => {
    const fullPath = path.join("c:/Users/User/Downloads/comfutura/comfutura", filePath);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        keys.forEach(key => {
            // Escape special regex characters in the key (e.g. '/')
            const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // We use global replacement
            content = content.replace(new RegExp(escapedKey, 'g'), replacements[key]);
        });
        
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    } else {
        console.log(`File not found: ${filePath}`);
    }
});
