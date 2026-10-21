/**
 * Jobs Database & State Management
 */

const initialJobs = [
  {
    id: "job-1",
    title: "Software Development Engineer - 1 (SDE-1)",
    company: "Google",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    companyInitial: "G",
    companyColor: "bg-red-500",
    location: "Bangalore / Hyderabad, India",
    workplaceType: "Hybrid",
    type: "Full-time",
    experience: "0-2 Years (Freshers eligible)",
    salary: "₹24 - ₹32 LPA",
    salaryNumeric: 28,
    category: "Software Engineering",
    featured: true,
    postedDate: "2 days ago",
    deadline: "2026-11-15",
    skills: ["Data Structures", "Algorithms", "C++", "Java", "System Design Basics", "Distributed Systems"],
    description: "Join Google's core engineering team to build scalable services powering millions of global users. You will work alongside world-class engineers on challenging algorithmic problems, cloud scale architectures, and low-latency distributed storage.",
    responsibilities: [
      "Write clean, maintainable, and robust code in C++, Java, or Go.",
      "Design, implement, test, deploy, and maintain software solutions.",
      "Participate in architectural reviews and optimize performance of backend microservices.",
      "Collaborate with product managers, UX designers, and cross-functional teams."
    ],
    requirements: [
      "B.Tech / M.Tech in Computer Science, IT, or related technical field (or equivalent practical experience).",
      "Solid foundation in Data Structures, Algorithms, Complexity Analysis, and Object-Oriented Design.",
      "Proficiency in one or more general purpose programming languages: C++, Java, Python, Go.",
      "Good understanding of operating systems, multithreading, and network fundamentals."
    ],
    perks: [
      "Comprehensive medical, dental, and vision insurance",
      "Generous equity stock grants (GSUs)",
      "Free gourmet meals, micro-kitchens, and wellness allowances",
      "Hybrid work flexibility and continuous learning sponsorship"
    ]
  },
  {
    id: "job-2",
    title: "Frontend Engineer (React / TypeScript)",
    company: "Razorpay",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg",
    companyInitial: "R",
    companyColor: "bg-blue-600",
    location: "Bangalore, India",
    workplaceType: "Hybrid",
    type: "Full-time",
    experience: "1-3 Years",
    salary: "₹18 - ₹24 LPA",
    salaryNumeric: 21,
    category: "Frontend",
    featured: true,
    postedDate: "1 day ago",
    deadline: "2026-11-20",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "Web Performance"],
    description: "Razorpay is revolutionizing financial infrastructure in India. We are looking for a creative Frontend Engineer to build high-performance checkout flows, merchant dashboards, and developer portals that handle billions of dollars in volume.",
    responsibilities: [
      "Architect and build responsive, accessible, pixel-perfect user interfaces in React and TypeScript.",
      "Optimize web application performance (Core Web Vitals, code-splitting, bundle size reduction).",
      "Develop reusable component libraries conforming to company design systems.",
      "Integrate RESTful and GraphQL APIs with optimistic UI updates and robust error handling."
    ],
    requirements: [
      "Strong command over modern JavaScript (ES6+), TypeScript, HTML5, and CSS3.",
      "Experience with state management libraries (Redux Toolkit, Zustand, or React Query).",
      "Familiarity with browser internals, DOM manipulation, and caching strategies.",
      "Experience writing unit and integration tests using Jest and React Testing Library."
    ],
    perks: [
      "Competitive salary + Employee Stock Ownership (ESOPs)",
      "Annual health checkups and premium health insurance",
      "Home office setup reimbursement & high-end MacBook Pro",
      "Gym & wellness reimbursement"
    ]
  },
  {
    id: "job-3",
    title: "Backend Developer (Node.js & Go)",
    company: "Swiggy",
    companyLogo: "",
    companyInitial: "S",
    companyColor: "bg-orange-500",
    location: "Remote / Bangalore",
    workplaceType: "Remote",
    type: "Full-time",
    experience: "1-3 Years",
    salary: "₹16 - ₹22 LPA",
    salaryNumeric: 19,
    category: "Backend",
    featured: false,
    postedDate: "3 days ago",
    deadline: "2026-11-10",
    skills: ["Node.js", "Go", "PostgreSQL", "Kafka", "Redis", "Docker", "AWS"],
    description: "Work on Swiggy's high-throughput order dispatch, routing, and catalog engines serving millions of hungry customers in real-time.",
    responsibilities: [
      "Build high-throughput, low-latency microservices using Go and Node.js.",
      "Design database schemas, query optimizations, and Redis caching layers.",
      "Maintain event-driven pipelines using Apache Kafka and RabbitMQ.",
      "Monitor system health, set up alerting with Prometheus/Grafana, and participate in on-call."
    ],
    requirements: [
      "Solid knowledge of backend frameworks and concurrency in Node.js or Golang.",
      "Proficient in relational databases (PostgreSQL/MySQL) and NoSQL (MongoDB/DynamoDB).",
      "Understanding of REST API design, gRPC, and microservice communication patterns.",
      "Hands-on experience with Docker, Kubernetes, and cloud platforms like AWS or GCP."
    ],
    perks: [
      "100% Remote flexibility",
      "Swiggy One corporate subscription & food vouchers",
      "Health insurance for employee, spouse, children, and parents",
      "Paid parental leave & mental wellness sessions"
    ]
  },
  {
    id: "job-4",
    title: "SDE Graduate Intern (Summer 2027)",
    company: "Microsoft",
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    companyInitial: "M",
    companyColor: "bg-cyan-600",
    location: "Hyderabad / Noida, India",
    workplaceType: "On-site",
    type: "Internship",
    experience: "Fresher / College Students (2026/2027 batch)",
    salary: "₹1,25,000 / month Stipend",
    salaryNumeric: 15,
    category: "Software Engineering",
    featured: true,
    postedDate: "Just now",
    deadline: "2026-11-30",
    skills: ["Data Structures", "Algorithms", "C#", "C++", "Java", "Problem Solving"],
    description: "Kickstart your career at Microsoft with a 2-month or 6-month software engineering internship. Work on Azure cloud, Microsoft 365, Teams, or Windows, with direct mentorship and PPO (Pre-Placement Offer) potential.",
    responsibilities: [
      "Design and implement features in collaboration with full-time engineers.",
      "Write unit tests and end-to-end automation scripts.",
      "Present project results and architectural decisions at the internship showcase.",
      "Participate in hackathons and intern learning series."
    ],
    requirements: [
      "Currently pursuing B.Tech, M.Tech, Dual Degree, or MCA graduating in 2026 or 2027.",
      "CGPA 7.0+ with no active backlogs.",
      "Strong grasp of Data Structures, Algorithms, Recursion, and Math.",
      "Eager to learn new languages, frameworks, and cloud technologies."
    ],
    perks: [
      "High stipend (₹1.25 Lakh/month)",
      "Free round-trip flight tickets and luxury accommodation for 2 weeks",
      "High Pre-Placement Offer (PPO) conversion rate for full-time SDE roles",
      "Microsoft campus amenities, sports complexes, and equipment"
    ]
  },
  {
    id: "job-5",
    title: "Data Analyst & Business Intelligence",
    company: "Flipkart",
    companyLogo: "",
    companyInitial: "F",
    companyColor: "bg-yellow-500",
    location: "Bangalore, India",
    workplaceType: "Hybrid",
    type: "Full-time",
    experience: "0-2 Years",
    salary: "₹12 - ₹16 LPA",
    salaryNumeric: 14,
    category: "Data & Analytics",
    featured: false,
    postedDate: "4 days ago",
    deadline: "2026-11-18",
    skills: ["SQL", "Python", "PowerBI", "Tableau", "Pandas", "Statistical Analysis"],
    description: "Extract insights from petabytes of e-commerce data to optimize pricing, supply chain, delivery timelines, and customer personalization.",
    responsibilities: [
      "Formulate complex SQL queries to extract data from data warehouses (BigQuery / Redshift).",
      "Build automated KPI executive dashboards in PowerBI and Tableau.",
      "Conduct cohort analysis, A/B test evaluations, and exploratory data analysis (EDA).",
      "Partner with product managers to translate business metrics into analytical models."
    ],
    requirements: [
      "Strong proficiency in SQL (window functions, CTEs, joins, query optimization).",
      "Hands-on Python or R for data wrangling (Pandas, NumPy, Matplotlib/Seaborn).",
      "Solid understanding of statistics, hypothesis testing, and regression models.",
      "Strong communication and data storytelling skills."
    ],
    perks: [
      "Flipkart employee discounts and festive vouchers",
      "Comprehensive medical coverage",
      "Flexible working hours and hybrid policy",
      "Annual performance bonus"
    ]
  },
  {
    id: "job-6",
    title: "Cloud & DevOps Engineer",
    company: "Atlassian",
    companyLogo: "",
    companyInitial: "A",
    companyColor: "bg-blue-500",
    location: "Remote, India",
    workplaceType: "Remote",
    type: "Full-time",
    experience: "2-4 Years",
    salary: "₹22 - ₹30 LPA",
    salaryNumeric: 26,
    category: "DevOps & Cloud",
    featured: true,
    postedDate: "5 days ago",
    deadline: "2026-11-25",
    skills: ["AWS", "Kubernetes", "Terraform", "CI/CD", "Linux", "Python", "Docker"],
    description: "Support world-class developer tools like Jira, Confluence, and Bitbucket by building reliable infrastructure, automated CI/CD pipelines, and robust security posture.",
    responsibilities: [
      "Manage infrastructure as code (IaC) using Terraform and CloudFormation.",
      "Maintain Kubernetes (EKS) clusters, service meshes, and ingress controllers.",
      "Build resilient deployment pipelines using GitHub Actions and Jenkins.",
      "Participate in site reliability engineering (SRE) and root cause analysis (RCA)."
    ],
    requirements: [
      "Demonstrated experience running production workloads on AWS or GCP.",
      "In-depth knowledge of Linux internals, shell scripting, and networking.",
      "Experience with containerization (Docker) and orchestration (Kubernetes).",
      "Knowledge of observability tools like Datadog, Prometheus, Grafana, and ELK."
    ],
    perks: [
      "Work from anywhere in India with home office stipend",
      "Annual learning allowance of ₹75,000",
      "Generous equity and retirement savings plan",
      "Comprehensive parental support and mental health program"
    ]
  },
  {
    id: "job-7",
    title: "System Engineer / Digital Specialist",
    company: "Tata Consultancy Services (TCS)",
    companyLogo: "",
    companyInitial: "T",
    companyColor: "bg-indigo-600",
    location: "Pan India (Multiple Locations)",
    workplaceType: "On-site",
    type: "Full-time",
    experience: "Fresher (2025/2026 Batch)",
    salary: "₹7.0 - ₹9.2 LPA (Digital / Prime Track)",
    salaryNumeric: 8,
    category: "Software Engineering",
    featured: false,
    postedDate: "1 week ago",
    deadline: "2026-12-01",
    skills: ["Java", "Python", "SQL", "Data Structures", "Cloud Basics"],
    description: "TCS is hiring through TCS NQT for its premium Digital and Prime cadres. Work on next-generation digital transformation projects for Fortune 500 enterprise clients.",
    responsibilities: [
      "Develop enterprise application modules following Agile methodologies.",
      "Work with database systems, cloud platforms, and microservices.",
      "Participate in client meetings, requirement elicitation, and quality assurance.",
      "Continuously upgrade skills through TCS internal digital learning platforms."
    ],
    requirements: [
      "B.Tech / B.E / M.Tech / MCA with minimum 60% throughout 10th, 12th, and Degree.",
      "Maximum of 1 active backlog allowed at time of test (must clear before joining).",
      "Proficient in coding in any one language: Python, Java, C++, or C#.",
      "Good communication skills and adaptability to work in cross-functional teams."
    ],
    perks: [
      "Fast-track career advancement through TCS Elevate Wings program",
      "Corporate insurance covering family",
      "Global client exposure and onsite relocation opportunities",
      "Higher education tie-ups with leading institutes"
    ]
  },
  {
    id: "job-8",
    title: "AI / Machine Learning Engineer",
    company: "Zomato",
    companyLogo: "",
    companyInitial: "Z",
    companyColor: "bg-red-600",
    location: "Gurgaon / Delhi NCR, India",
    workplaceType: "Hybrid",
    type: "Full-time",
    experience: "1-3 Years",
    salary: "₹20 - ₹28 LPA",
    salaryNumeric: 24,
    category: "AI & Machine Learning",
    featured: true,
    postedDate: "3 days ago",
    deadline: "2026-11-28",
    skills: ["PyTorch", "TensorFlow", "NLP", "LLMs", "Recommendation Systems", "Python"],
    description: "Build cutting-edge recommendation algorithms, dynamic delivery ETA estimation, personalized restaurant ranking, and generative AI search assistants for Zomato.",
    responsibilities: [
      "Design, train, and deploy deep learning models for personalization and search ranking.",
      "Fine-tune Large Language Models (LLMs) and build RAG pipelines for customer support bot.",
      "Run offline and online A/B experimentation to measure model uplift.",
      "Collaborate with data engineers to optimize feature store pipelines."
    ],
    requirements: [
      "Degree in CS, Statistics, Mathematics, or equivalent.",
      "Hands-on experience with PyTorch, Scikit-Learn, and Hugging Face Transformers.",
      "Experience deploying ML models with FastAPI, TorchServe, or Triton Inference Server.",
      "Solid understanding of vector databases (Pinecone, Milvus, Qdrant) is a plus."
    ],
    perks: [
      "Competitive base + lucrative equity upside",
      "Zomato Gold membership + weekly dining credits",
      "Top-tier health and medical insurance",
      "Flexible leave policy"
    ]
  }
];

// Helper functions for Jobs state & LocalStorage
const JOBS_STORAGE_KEY = "portal_jobs_list";
const SAVED_JOBS_KEY = "portal_saved_jobs";
const APPLICATIONS_KEY = "portal_job_applications";

function getJobs() {
  const custom = localStorage.getItem(JOBS_STORAGE_KEY);
  if (!custom) {
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(initialJobs));
    return initialJobs;
  }
  try {
    return JSON.parse(custom);
  } catch (e) {
    return initialJobs;
  }
}

function saveJobToStorage(job) {
  const jobs = getJobs();
  jobs.unshift(job);
  localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
  return jobs;
}

function getSavedJobIds() {
  const saved = localStorage.getItem(SAVED_JOBS_KEY);
  return saved ? JSON.parse(saved) : [];
}

function toggleSaveJob(jobId) {
  const saved = getSavedJobIds();
  const index = saved.indexOf(jobId);
  let isSaved = false;
  if (index > -1) {
    saved.splice(index, 1);
    isSaved = false;
  } else {
    saved.push(jobId);
    isSaved = true;
  }
  localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(saved));
  return isSaved;
}

function getApplications() {
  const apps = localStorage.getItem(APPLICATIONS_KEY);
  return apps ? JSON.parse(apps) : [];
}

function submitJobApplication(application) {
  const apps = getApplications();
  const newApp = {
    id: "app-" + Date.now(),
    appliedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: "Under Review",
    ...application
  };
  apps.unshift(newApp);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps));
  return newApp;
}

window.JobsDB = {
  getJobs,
  saveJobToStorage,
  getSavedJobIds,
  toggleSaveJob,
  getApplications,
  submitJobApplication
};
