// Mock data for Tapan Gupta's Portfolio

export const profileData = {
  name: "Tapan Gupta",
  title: "Electronics Engineer | VLSI Design & Technology",
  subtitle: "Red Hat Certified System Administrator | Aspiring VLSI Engineer",
  tagline: "Designing the future, one circuit at a time",
  email: "tapan.gupta@example.com",
  location: "Pune, Maharashtra, India",
  linkedIn: "https://linkedin.com/in/tapangupta",
  github: "https://github.com/tapangupta",
  about: "As an aspiring engineer with a strong foundation in Electronics and Computer Engineering, I am passionate about leveraging technology to solve real-world problems. Currently pursuing Bachelor's in Electronics Engineering with specialization in VLSI Design and Technology from AISSMS College of Engineering, Pune. Ranked #1 throughout my diploma with First Class Distinction from MIT Polytechnic, CSN. My journey combines practical experience in Python programming, Linux systems, embedded systems, and a Red Hat certification in System Administration. I thrive on hands-on projects and innovative problem-solving, always eager to explore the intersection of hardware and software."
};

export const skills = [
  {
    category: "VLSI & Electronics",
    icon: "Cpu",
    items: [
      "VLSI Design",
      "PCB Design",
      "Circuit Design & Simulation",
      "Embedded Systems",
      "8051 Microcontroller",
      "Arduino",
      "Soldering & Hardware Troubleshooting"
    ]
  },
  {
    category: "Programming & Automation",
    icon: "Code",
    items: [
      "Python (Programming & Automation)",
      "Logic Programming",
      "Hardware Programming",
      "PLC Programming",
      "Web Technologies (HTML, CSS, JavaScript)",
      "Bash Scripting"
    ]
  },
  {
    category: "System Administration",
    icon: "Server",
    items: [
      "Red Hat Enterprise Linux (RHEL)",
      "Ubuntu/Linux System Administration",
      "System Configuration",
      "Networking Technology",
      "Cyber Threat Intelligence (CTI)",
      "Cyber Threat Hunting (CTH)"
    ]
  },
  {
    category: "Technologies & Tools",
    icon: "Wrench",
    items: [
      "IoT Development",
      "MQTT Protocol",
      "WebRTC",
      "Selenium WebDriver",
      "Computer Simulations",
      "Version Control (Git)"
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "Web-Controlled Car with Live Camera Streaming",
    category: "IoT & Embedded Systems",
    description: "Built an IoT-enabled robotic car using ESP-01, MQTT, and WebRTC, enabling remote control via a custom web interface with real-time video streaming. Integrated motor control, camera feed, and MQTT-based communication for a seamless user experience.",
    technologies: ["ESP-01", "MQTT", "WebRTC", "Arduino", "Python", "Web Technologies"],
    highlights: [
      "Real-time video streaming using WebRTC",
      "MQTT-based bidirectional communication",
      "Custom web interface for remote control",
      "Integrated motor driver circuits"
    ],
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23",
    featured: true
  },
  {
    id: 2,
    title: "Crypto Faucet Automation with CAPTCHA Bypass",
    category: "Automation & Security Research",
    description: "Developed an educational proof-of-concept demonstrating vulnerabilities in weak CAPTCHA implementations using Python and Selenium WebDriver. Automated faucet claim process by analyzing predictable CSS patterns and image sources.",
    technologies: ["Python", "Selenium", "WebDriver", "Chrome DevTools", "XPath"],
    highlights: [
      "WebSocket debugger integration for browser control",
      "Image source comparison algorithm",
      "Automated claim cycle with zero manual input",
      "Educational security research project"
    ],
    image: "https://images.unsplash.com/photo-1675602488512-bdd631490fcb",
    featured: true
  }
];

export const experience = [
  {
    id: 1,
    company: "Shrividya Robotics",
    position: "Electronics & Programming Intern",
    duration: "Apr 2024 - Jun 2024 · 3 months",
    location: "Chhatrapati Sambhajinagar, Maharashtra, India",
    type: "Part-time · On-site",
    responsibilities: [
      "Developed practical skills in Python programming with focus on logic building, automation, and hardware interfacing",
      "Learned PLC programming and 8051 microcontroller development, including circuit design, simulation, and real-world application",
      "Gained hands-on experience in physical electronics: soldering, PCB design basics, and component-level troubleshooting",
      "Worked on embedded systems projects integrating hardware and software"
    ],
    skills: ["8051 Microcontroller", "Arduino", "PLC Programming", "Python", "Soldering", "PCB Design"]
  }
];

export const certifications = [
  {
    id: 1,
    title: "Red Hat Certified System Administrator (RHCSA)",
    issuer: "Red Hat",
    issueDate: "February 2025",
    expiryDate: "February 2028",
    credentialId: "250-024-189",
    credentialUrl: "https://www.credly.com/badges/rhcsa",
    description: "Industry-recognized certification demonstrating competency in Red Hat Enterprise Linux system administration tasks.",
    skills: ["RHEL", "Linux System Administration", "System Configuration", "Bash Scripting"],
    featured: true
  },
  {
    id: 2,
    title: "Getting Started with Threat Intelligence and Hunting",
    issuer: "IBM",
    issueDate: "March 2025",
    credentialUrl: "#",
    description: "Completed comprehensive training in cyber threat intelligence (CTI) and cyber threat hunting (CTH) methodologies.",
    skills: ["Cyber Threat Intelligence", "Cyber Threat Hunting", "Security Analysis"],
    featured: true
  },
  {
    id: 3,
    title: "2024 Red Hat Academy - Program Learner",
    issuer: "Red Hat Academy",
    issueDate: "2024",
    description: "Completed Red Hat Academy curriculum covering Linux system administration and open-source technologies.",
    skills: ["Linux", "System Administration", "Open Source Technologies"]
  }
];

export const education = [
  {
    id: 1,
    institution: "AISSMS College of Engineering",
    degree: "Bachelor's Degree in Electronics Engineering",
    specialization: "VLSI Design and Technology",
    duration: "Aug 2025 - Aug 2028",
    location: "Pune, Maharashtra, India",
    description: "Currently pursuing specialization in VLSI Design and Technology, focusing on integrated circuit design, semiconductor technology, and digital system design.",
    current: true
  },
  {
    id: 2,
    institution: "Maharashtra Institute of Technology (MIT Polytechnic)",
    degree: "Diploma in Electronics and Computer Engineering",
    duration: "Jun 2022 - Jun 2025",
    location: "Aurangabad (CSN), Maharashtra, India",
    grade: "#1 Rank with First Class Distinction",
    description: "Secured 1st Rank across all three consecutive years. Comprehensive coursework in electronics, programming languages, and embedded systems.",
    achievement: "Ranked #1 in all three years consecutively",
    current: false
  }
];

export const achievements = [
  {
    id: 1,
    title: "#1 Rank - Diploma Program",
    description: "Secured 1st Rank across all three consecutive years in Diploma in Electronics and Computer Engineering at MIT Polytechnic, CSN",
    year: "2022-2025",
    icon: "Trophy"
  },
  {
    id: 2,
    title: "Red Hat Certification",
    description: "Achieved Red Hat Certified System Administrator (RHCSA) certification",
    year: "2025",
    icon: "Award"
  },
  {
    id: 3,
    title: "IoT Innovation",
    description: "Developed Web-Controlled Car with Live Camera Streaming using advanced IoT protocols",
    year: "2024",
    icon: "Lightbulb"
  }
];
