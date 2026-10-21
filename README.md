# PrepPortal — All-in-One Job Portal & Placement Preparation Website

A modern, responsive, zero-configuration web application tailored for students, campus graduates, and software engineers preparing for tech interviews and job applications.

---

## 🌟 Key Modules & Features

### 1. 💼 Job Portal
- **Rich Job Database**: Real-world job openings spanning Software Engineering (SDE-1), Frontend, Backend, Full Stack, Data & Analytics, DevOps & Cloud, AI/ML, and Internships.
- **Search & Multi-Dimensional Filters**:
  - Filter by Category, Job Type (Full-time, Internship), Workplace (Remote, Hybrid, On-site).
  - Quick pills: Freshers / 0-2 Yrs, Internships, Remote Only, ₹20+ LPA High-paying Tier.
- **Job Details View**: Comprehensive responsibilities, qualifications, tech stacks, and company perks.
- **1-Click Easy Apply**: Candidate form with resume upload simulation, batch selection, and links.
- **Application Pipeline Tracker**: Real-time tracker for submitted applications (Applied, Under Review, Interview Scheduled, Offer Received).
- **Bookmarks & Saved Jobs**: Bookmark openings to review or apply later.
- **Recruiter Post-a-Job**: Interactive modal allowing recruiters to publish custom openings stored directly in persistent browser storage (`localStorage`).

### 2. 📚 Preparation Hub (Aptitude, CS Core, HR, DSA Cheatsheet)
- **Aptitude**:
  - **Quantitative Aptitude**: Percentages, Profit-Loss, Time & Work, Speed-Distance, Trains & Boats with key formulas and shortcut tricks.
  - **Logical Reasoning**: Syllogisms, Blood Relations, Seating Arrangements, Direction Senses.
  - **Verbal Ability**: Subject-Verb Agreement, Sentence Correction, Reading Comprehension rules.
  - **Interactive Practice Quizzes**: Timed MCQs with real-time score tracking, instant right/wrong feedback, and detailed step-by-step explanations.
- **CS Core Fundamentals**:
  - **Operating Systems**: Processes vs Threads, CPU Scheduling, Deadlocks & Coffman conditions, Virtual Memory, Paging, Page Faults, Belady's Anomaly.
  - **DBMS & SQL**: ACID transactions, Normalization (1NF to BCNF), Indexing (B+ Trees vs Hash), Optimistic vs Pessimistic locking.
  - **Computer Networks**: OSI 7 Layers vs TCP/IP, TCP 3-Way Handshake, DNS resolution walkthrough, HTTP/1.1 vs HTTP/2 vs HTTP/3.
  - **System Design Basics**: Horizontal vs Vertical scaling, Load Balancing algorithms, Caching strategies, CAP Theorem.
  - **Interactive Flashcard Drill**: 3D flip card mode for rapid interview question recall.
- **HR & Behavioral Preparation**:
  - **The STAR Method**: Situation, Task, Action, Result framework breakdown.
  - **Top 25 HR Questions**: "Tell me about yourself", "Why this company?", "Strengths & Weaknesses", "Conflict resolution", "5-year plan".
  - Includes *Why interviewers ask this*, *Sample winning answers*, and *DOs & DON'Ts*.
- **DSA Conceptual Cheatsheet**:
  - Big-O Complexity master table for all primary data structures (Array, Linked List, Hash Table, BST, Heap).
  - Algorithmic pattern identification cheat sheets (Two Pointers vs Sliding Window vs Monotonic Stack).

### 3. 🏢 Companies Hiring Process & Blueprints
- **Company Profiles**: Google, Microsoft, Amazon, Tata Consultancy Services (TCS), Infosys, Accenture, Razorpay.
- **Detailed Exam Patterns**: Online Assessment duration, section breakdowns, question counts, testing platforms (HackerRank, HackerEarth, TCS iON, Codility, Wheebox), and negative marking rules.
- **Comprehensive Syllabus**: Coding and algorithmic topics + CS core subjects.
- **End-to-End Recruitment Pipeline**: Round-by-round walkthrough (OA -> Tech Round 1 -> Tech Round 2 -> System Design / Bar Raiser -> HR).
- **Previous Interview Questions Archive**: Real questions asked in past placement drives.
- **Interactive Eligibility Checker**: Input your CGPA and backlog status to see which companies you qualify for instantly.

### 4. ⚡ Dedicated Topic-Wise DSA Preparation Sheet
- **Curated High-Yield Sheet**: Inspired by Striver's SDE Sheet, NeetCode 150, and Blind 75 across:
  - Arrays & Hashing
  - Two Pointers & Sliding Window
  - Linked Lists
  - Stacks & Queues
  - Binary Search
  - Trees & Binary Search Trees
  - Graphs & Island Problems
  - Dynamic Programming (1D & 2D)
- **Features**:
  - Status Toggle (To Do, In Progress, Solved, Revision Needed).
  - Star / Bookmark toggle.
  - Progress metrics bar & circular topic indicators.
  - Direct practice links to LeetCode / GeeksforGeeks.
  - **Solution Drawer**: Brute force intuition, optimal approach, Time/Space complexities, and full clean code with language tab switcher (**C++**, **Java**, and **Python**).
  - **Personal Notes**: Auto-saved note pad per question for reminders, edge cases, and personal insights.
  - **Random Problem Picker**: Daily practice spinner to pick an unsolved challenge.

### 5. 🎯 ATS Resume & Keyword Match Scanner
- Scan your resume plain text against any job posting in the portal.
- Calculates ATS match percentage score.
- Identifies matched keywords vs missing critical skills.
- Provides actionable formatting and bullet point optimization advice.

---

## 🚀 How to Run the Website

### Option 1: Direct Double-Click (Zero Setup!)
Since this web application uses pure modern standards (HTML5, Tailwind CSS via CDN, Lucide Icons, and modular ES6 JavaScript), you can simply:
1. Navigate to:
   `C:\Users\Shriparna Prasad\.gemini\antigravity\scratch\job-portal-prep\`
2. Double click `index.html` to open it in Google Chrome, Microsoft Edge, Firefox, or any modern web browser.
3. Everything is fully functional immediately!

### Option 2: Run with Any Local HTTP Server
If you prefer running via a local web server (e.g. VS Code Live Server or Python):
```bash
cd "C:\Users\Shriparna Prasad\.gemini\antigravity\scratch\job-portal-prep"
python -m http.server 3000
# or npx serve .
```
Then visit `http://localhost:3000`.

---

## 📁 File Structure

```
job-portal-prep/
├── index.html                  # Main application shell with navbar, router, theme, notifications
├── css/
│   └── styles.css              # Custom styling, animations, glassmorphism, scrollbars, code blocks
├── js/
│   ├── app.js                  # Main controller, navigation routing, global state, toast notifications
│   ├── data/
│   │   ├── jobsData.js         # Jobs database, company details, filters, application models
│   │   ├── prepData.js         # Aptitude notes & MCQs, CS Core notes (OS, DBMS, CN), HR questions & STAR method
│   │   ├── companiesData.js    # Comprehensive company hiring patterns, syllabus, eligibility, CTC
│   │   └── dsaSheetData.js     # 150+ topic-wise curated DSA problems with multi-language solutions & hints
│   └── modules/
│       ├── jobPortal.js        # Job portal rendering, search, filtering, detail modal, application flow, saved jobs
│       ├── prepHub.js          # Aptitude quiz engine, notes reader, CS core flashcards, HR guide
│       ├── companies.js        # Company exam pattern browser, comparison, eligibility filter, interview archive
│       ├── dsaSheet.js         # DSA sheet table, progress metrics, status toggle, notes modal, random picker
│       └── resumeChecker.js    # Quick ATS & keyword match analyzer tool
└── README.md                   # Complete documentation and user guide
```

---

## 💾 Data Persistence
All progress (Solved DSA questions, personal problem notes, bookmarked jobs, custom job postings, submitted applications, and dark/light mode preference) is preserved locally in your browser's `localStorage`. You can refresh or close the page anytime without losing your preparation streak!
