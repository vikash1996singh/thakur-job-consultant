export const initialCompanies = [
  {
    id: "comp-1",
    name: "Tata Consultancy Services (TCS)",
    website: "https://www.tcs.com",
    industry: "Information Technology",
    location: "Noida / Delhi NCR",
    verified: true,
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=120&auto=format&fit=crop&q=60",
    openJobs: 4,
    description: "Global leader in IT services, consulting, and business solutions."
  },
  {
    id: "comp-2",
    name: "HCL Technologies",
    website: "https://www.hcltech.com",
    industry: "IT & Services",
    location: "Noida, Sector 126",
    verified: true,
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=60",
    openJobs: 2,
    description: "Next-generation global technology company helping enterprises reimagine business."
  },
  {
    id: "comp-3",
    name: "Apex Logistics India",
    website: "https://apexlogistics.example.in",
    industry: "Supply Chain & Logistics",
    location: "Gurugram, Haryana",
    verified: true,
    logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=120&auto=format&fit=crop&q=60",
    openJobs: 3,
    description: "Leading warehouse logistics and domestic freight services in North India."
  },
  {
    id: "comp-4",
    name: "Thakur Corporate Services (Direct Placement)",
    website: "https://thakurconsultancy.com",
    industry: "Recruitment & Staffing",
    location: "Noida / Greater Noida",
    verified: true,
    logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=120&auto=format&fit=crop&q=60",
    openJobs: 5,
    description: "Official consultancy placement drives for manufacturing, finance, and operations roles."
  },
  {
    id: "comp-5",
    name: "FinEdge Wealth Advisory",
    website: "https://finedge.example.com",
    industry: "Banking & Financial Services",
    location: "New Delhi (Connaught Place)",
    verified: false,
    logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&auto=format&fit=crop&q=60",
    openJobs: 1,
    description: "Independent boutique wealth advisory and mutual fund distribution firm."
  }
];

export const initialJobs = [
  {
    id: "job-101",
    title: "Senior Full-Stack React & Node Developer",
    companyId: "comp-1",
    company: "Tata Consultancy Services (TCS)",
    verifiedCompany: true,
    location: "Noida / Delhi NCR",
    workMode: "Hybrid",
    jobType: "Full-Time",
    experience: "3 - 6 Years",
    salary: "₹12,00,000 - ₹18,00,000 P.A.",
    category: "IT Software",
    source: "Company Verified", // Company Verified, Consultancy Listed, Partner Feed
    sourceType: "company",
    applyMode: "onsite", // onsite or external
    externalUrl: "",
    status: "active", // active, pending, paused, closed
    openings: 3,
    deadline: "2026-12-15",
    postedDate: "2 days ago",
    description: "We are seeking an experienced Full Stack Engineer proficient with modern React.js, Node.js, and PostgreSQL to lead web product development for our enterprise client.",
    responsibilities: [
      "Architect and build high-performance, responsive React web applications",
      "Design robust REST APIs and manage PostgreSQL schemas",
      "Collaborate with UX designers and product managers to refine user stories",
      "Ensure unit test coverage and conduct peer code reviews"
    ],
    skills: ["React.js", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "REST APIs"],
    education: "B.Tech / B.E. / MCA in Computer Science or related field",
    screeningQuestions: [
      "How many years of hands-on React.js experience do you have?",
      "What is your current notice period?"
    ]
  },
  {
    id: "job-102",
    title: "HR Executive / Talent Acquisition Associate",
    companyId: "comp-4",
    company: "Thakur Corporate Services (Direct Placement)",
    verifiedCompany: true,
    location: "Noida, Sector 62",
    workMode: "On-site",
    jobType: "Full-Time",
    experience: "1 - 3 Years",
    salary: "₹3,50,000 - ₹5,00,000 P.A.",
    category: "HR & Recruitment",
    source: "Consultancy Listed",
    sourceType: "consultancy",
    applyMode: "onsite",
    externalUrl: "",
    status: "active",
    openings: 2,
    deadline: "2026-11-30",
    postedDate: "1 day ago",
    description: "Thakur Job Consultant is hiring a proactive Talent Acquisition Executive to manage candidate sourcing, screening interviews, and client alignment.",
    responsibilities: [
      "Source candidate resumes across portals and referral networks",
      "Conduct preliminary telephonic screening and check eligibility",
      "Schedule candidate interviews with client hiring managers",
      "Maintain candidate pipeline tracker and feedback loops"
    ],
    skills: ["Candidate Sourcing", "Screening", "Interview Coordination", "Portal Management", "MS Excel"],
    education: "MBA in HR / Graduate with strong communication skills",
    screeningQuestions: [
      "Do you have experience in non-IT or IT hiring?"
    ]
  },
  {
    id: "job-103",
    title: "Cloud DevOps & Kubernetes Engineer",
    companyId: "comp-2",
    company: "HCL Technologies",
    verifiedCompany: true,
    location: "Noida / Greater Noida",
    workMode: "Remote",
    jobType: "Full-Time",
    experience: "4 - 8 Years",
    salary: "₹15,00,000 - ₹24,00,000 P.A.",
    category: "DevOps & Cloud",
    source: "Company Verified",
    sourceType: "company",
    applyMode: "external",
    externalUrl: "https://www.hcltech.com/careers/apply/cloud-devops",
    status: "active",
    openings: 5,
    deadline: "2026-12-20",
    postedDate: "Just now",
    description: "Join HCL Cloud Native Labs to design automated CI/CD pipelines, Kubernetes clusters, and cloud infrastructure on AWS and Azure.",
    responsibilities: [
      "Manage multi-tenant Kubernetes clusters and Helm charts",
      "Automate infrastructure provisioning via Terraform and Ansible",
      "Monitor uptime, latency, and system health with Prometheus and Grafana",
      "Implement robust security controls and secret management"
    ],
    skills: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD Pipelines", "Linux"],
    education: "B.Tech/B.E. or equivalent experience",
    screeningQuestions: []
  },
  {
    id: "job-104",
    title: "Supply Chain Operations Supervisor",
    companyId: "comp-3",
    company: "Apex Logistics India",
    verifiedCompany: true,
    location: "Gurugram, Haryana",
    workMode: "On-site",
    jobType: "Full-Time",
    experience: "2 - 5 Years",
    salary: "₹4,20,000 - ₹6,00,000 P.A.",
    category: "Operations & Logistics",
    source: "Partner Feed",
    sourceType: "feed",
    applyMode: "onsite",
    externalUrl: "",
    status: "active",
    openings: 4,
    deadline: "2026-12-10",
    postedDate: "3 days ago",
    description: "Supervise daily dispatch operations, warehouse inventory receipts, and fleet dispatch coordination across North India hubs.",
    responsibilities: [
      "Oversee dock loading, unloading, and barcode scanning routines",
      "Supervise warehouse shift team of 15+ ground associates",
      "Track consignment delivery SLAs and handle transit escalations",
      "Coordinate with third-party logistics transporters"
    ],
    skills: ["Inventory Control", "Warehouse Management", "Dispatch Tracking", "Vendor Management"],
    education: "Graduate in any stream / Diploma in Logistics",
    screeningQuestions: [
      "Are you open to rotational day/night warehouse shifts?"
    ]
  },
  {
    id: "job-105",
    title: "Customer Support Executive (Voice / Blended)",
    companyId: "comp-4",
    company: "Thakur Corporate Services (Direct Placement)",
    verifiedCompany: true,
    location: "Delhi NCR (Noida / East Delhi)",
    workMode: "On-site",
    jobType: "Full-Time",
    experience: "Fresher to 2 Years",
    salary: "₹2,40,000 - ₹3,20,000 P.A.",
    category: "Customer Support / BPO",
    source: "Consultancy Listed",
    sourceType: "consultancy",
    applyMode: "onsite",
    externalUrl: "",
    status: "active",
    openings: 12,
    deadline: "2026-11-25",
    postedDate: "4 days ago",
    description: "Urgent mass hiring for international and domestic banking voice process. Excellent verbal Hindi and English required.",
    responsibilities: [
      "Answer inbound customer queries regarding account verification and KYC",
      "Resolve customer concerns empathetically within prescribed SLA",
      "Accurately document customer interactions into CRM software"
    ],
    skills: ["Customer Service", "Active Listening", "Hindi & English Fluency", "CRM Entry"],
    education: "12th Pass / Graduate (Freshers welcome)",
    screeningQuestions: [
      "Are you comfortable working in Day/General shifts in Noida?"
    ]
  },
  {
    id: "job-106",
    title: "Accounts & GST Specialist",
    companyId: "comp-5",
    company: "FinEdge Wealth Advisory",
    verifiedCompany: false,
    location: "New Delhi",
    workMode: "On-site",
    jobType: "Full-Time",
    experience: "2 - 4 Years",
    salary: "₹3,80,000 - ₹5,00,000 P.A.",
    category: "Finance & Accounts",
    source: "Company Verified",
    sourceType: "company",
    applyMode: "onsite",
    externalUrl: "",
    status: "pending", // Waiting for admin review!
    openings: 1,
    deadline: "2026-12-05",
    postedDate: "5 hours ago",
    description: "Handle financial entries, Tally Prime accounting, GST filing (GSTR-1, 3B), TDS reconciliation and vendor payments.",
    responsibilities: [
      "Maintain day-to-day books of accounts in Tally Prime",
      "Reconcile monthly bank statements and GST input tax credits",
      "Process vendor invoices, TDS deductions, and advance tax schedules"
    ],
    skills: ["Tally Prime", "GST Returns", "TDS", "Bank Reconciliation", "MS Excel"],
    education: "B.Com / M.Com / Inter CA",
    screeningQuestions: []
  }
];

export const initialCandidateProfile = {
  id: "cand-001",
  fullName: "Rahul Verma",
  headline: "Full-Stack Developer | React, Node.js & REST APIs",
  email: "rahul.verma@example.com",
  phone: "+91 98765 43210",
  verifiedPhone: true,
  city: "Noida, Uttar Pradesh",
  experienceYears: "3.5",
  noticePeriod: "15 Days",
  expectedSalary: "₹14,00,000 P.A.",
  preferredWorkMode: "Hybrid / Remote",
  profileCompletion: 85,
  skills: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Git"],
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "AKTU University, Uttar Pradesh",
      year: "2019 - 2023",
      score: "8.2 CGPA"
    }
  ],
  experience: [
    {
      role: "Frontend Developer",
      company: "Innovate Digital Labs",
      duration: "Aug 2023 - Present (2+ yrs)",
      description: "Developed modular enterprise portals with React and Tailwind. Improved page load speed by 35%."
    }
  ],
  resume: {
    fileName: "Rahul_Verma_Resume_2026.pdf",
    fileSize: "1.4 MB",
    uploadedAt: "01 Nov 2026",
    scanStatus: "Clean & Verified",
    mimeType: "application/pdf",
    isDefault: true
  }
};

export const initialApplications = [
  {
    id: "app-901",
    jobId: "job-101",
    jobTitle: "Senior Full-Stack React & Node Developer",
    company: "Tata Consultancy Services (TCS)",
    appliedDate: "02 Nov 2026",
    status: "Shortlisted", // Submitted, Viewed, Shortlisted, Interview, Rejected, Hired
    timeline: [
      { status: "Submitted", date: "02 Nov 2026, 11:30 AM", note: "Application received successfully" },
      { status: "Viewed", date: "02 Nov 2026, 03:45 PM", note: "Recruiter reviewed resume & portfolio" },
      { status: "Shortlisted", date: "03 Nov 2026, 09:15 AM", note: "Shortlisted for Round 1 Technical Interview" }
    ],
    refCode: "TK-2026-APP-8841"
  },
  {
    id: "app-902",
    jobId: "job-102",
    jobTitle: "HR Executive / Talent Acquisition Associate",
    company: "Thakur Corporate Services (Direct Placement)",
    appliedDate: "28 Oct 2026",
    status: "Interview",
    timeline: [
      { status: "Submitted", date: "28 Oct 2026, 10:00 AM", note: "Applied through Thakur portal" },
      { status: "Viewed", date: "29 Oct 2026, 02:00 PM", note: "Resume verified by consultancy desk" },
      { status: "Shortlisted", date: "30 Oct 2026, 04:30 PM", note: "Profile matched criteria" },
      { status: "Interview", date: "01 Nov 2026, 11:00 AM", note: "F2F Interview scheduled at Noida Sector 62 Office" }
    ],
    refCode: "TK-2026-APP-7712"
  }
];

export const initialCategories = [
  { name: "IT & Software", count: "480+ Jobs", icon: "Code" },
  { name: "Operations & Logistics", count: "210+ Jobs", icon: "Truck" },
  { name: "Sales & Marketing", count: "340+ Jobs", icon: "TrendingUp" },
  { name: "Finance & Accounts", count: "160+ Jobs", icon: "DollarSign" },
  { name: "HR & Recruitment", count: "95+ Jobs", icon: "Users" },
  { name: "Manufacturing & Engineering", count: "185+ Jobs", icon: "Cpu" },
  { name: "Customer Support / BPO", count: "310+ Jobs", icon: "Headphones" },
  { name: "Healthcare & Pharma", count: "70+ Jobs", icon: "Activity" }
];
