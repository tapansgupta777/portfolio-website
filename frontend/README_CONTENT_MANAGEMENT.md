# Portfolio Content Management Guide

This guide explains how to easily add, edit, or remove content from your portfolio website.

## 📍 Where to Edit Content

All portfolio content is stored in a single file for easy management:

**File Location:** `/app/frontend/src/data/mockData.js`

## 🎯 How to Add New Content

### Adding a New Project

1. Open `/app/frontend/src/data/mockData.js`
2. Find the `export const projects = [...]` section
3. Add a new object to the array:

```javascript
{
  id: 3,  // Increment from last project
  title: "Your Project Title",
  category: "Project Category",
  description: "Detailed description of your project...",
  technologies: ["Tech1", "Tech2", "Tech3"],
  highlights: [
    "Key feature 1",
    "Key feature 2",
    "Key feature 3"
  ],
  image: "https://images.unsplash.com/photo-...",  // Use relevant image URL
  featured: true  // Set to false for non-featured projects
}
```

### Adding a New Certification

1. Open `/app/frontend/src/data/mockData.js`
2. Find the `export const certifications = [...]` section
3. Add a new object:

```javascript
{
  id: 4,  // Increment from last certification
  title: "Certification Name",
  issuer: "Issuing Organization",
  issueDate: "Month Year",
  expiryDate: "Month Year",  // Optional
  credentialId: "CRED-12345",  // Optional
  credentialUrl: "https://...",  // Optional
  description: "Brief description of the certification...",
  skills: ["Skill 1", "Skill 2", "Skill 3"],
  featured: true  // Set to false for non-featured certifications
}
```

### Adding New Skills

1. Open `/app/frontend/src/data/mockData.js`
2. Find the `export const skills = [...]` section
3. Either add to existing category:

```javascript
{
  category: "VLSI & Electronics",
  icon: "Cpu",
  items: [
    "VLSI Design",
    "PCB Design",
    "Your New Skill Here"  // Add at the end
  ]
}
```

Or add a new category:

```javascript
{
  category: "New Category Name",
  icon: "Cpu",  // Options: Cpu, Code, Server, Wrench
  items: [
    "Skill 1",
    "Skill 2",
    "Skill 3"
  ]
}
```

### Adding Work Experience

1. Open `/app/frontend/src/data/mockData.js`
2. Find the `export const experience = [...]` section
3. Add new experience:

```javascript
{
  id: 2,
  company: "Company Name",
  position: "Your Position",
  duration: "Month Year - Month Year · X months",
  location: "City, State, Country",
  type: "Full-time · Remote",  // or Part-time, Internship, etc.
  responsibilities: [
    "Responsibility 1",
    "Responsibility 2",
    "Responsibility 3"
  ],
  skills: ["Skill1", "Skill2", "Skill3"]
}
```

### Updating Personal Information

1. Open `/app/frontend/src/data/mockData.js`
2. Find the `export const profileData = {...}` section
3. Update any field:

```javascript
export const profileData = {
  name: "Your Name",
  title: "Your Professional Title",
  subtitle: "Your Subtitle",
  tagline: "Your Tagline",
  email: "your.email@example.com",
  location: "Your Location",
  linkedIn: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourprofile",
  about: "Your detailed about text..."
};
```

## 🎨 Finding Good Images

### For Circuit/Electronics Images:
- [Unsplash](https://unsplash.com) - Search: "circuit board", "microchip", "pcb", "electronics"
- [Pexels](https://pexels.com) - Search: "technology", "circuit", "chip"

### Getting Image URLs:
1. Right-click on the image
2. Select "Copy image address" or "Copy image link"
3. Paste the URL in the `image` field

## 📝 Quick Tips

### Making Changes Visible
- After editing `mockData.js`, save the file
- The website will automatically reload (hot reload enabled)
- No need to restart the server

### Order of Items
- Items appear in the same order as they are in the array
- Move objects up/down in the array to reorder them

### Featured Items
- Set `featured: true` to highlight important projects/certifications
- Featured items get special styling (highlighted border)

### Removing Items
- Simply delete the entire object from the array
- Don't forget to remove the comma if it's the last item

### ID Numbers
- Always increment IDs (1, 2, 3, 4...)
- Keep them unique within each section
- They don't need to be sequential across sections

## 🚀 Example: Adding a New Project

**Before:**
```javascript
export const projects = [
  {
    id: 1,
    title: "Project 1",
    // ... existing project
  },
  {
    id: 2,
    title: "Project 2",
    // ... existing project
  }
];
```

**After:**
```javascript
export const projects = [
  {
    id: 1,
    title: "Project 1",
    // ... existing project
  },
  {
    id: 2,
    title: "Project 2",
    // ... existing project
  },
  {
    id: 3,
    title: "Smart Home Automation System",
    category: "IoT & Home Automation",
    description: "Developed a comprehensive home automation system using ESP32...",
    technologies: ["ESP32", "Node.js", "React Native", "MQTT"],
    highlights: [
      "Voice control integration",
      "Real-time sensor monitoring",
      "Mobile app for remote access"
    ],
    image: "https://images.unsplash.com/photo-1558002038-1055907df827",
    featured: true
  }
];
```

## 💡 Need Help?

If you need to make more complex changes:
1. Backup `mockData.js` before making major changes
2. Test changes by saving and viewing the website
3. If something breaks, restore from backup

---

**Happy Editing! 🎉**
