/**
 * Companies Hiring Process Database: Exam Pattern, Syllabus, Eligibility, CTC, Rounds Breakdown
 */

const CompaniesData = [
  {
    id: "google",
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    initial: "G",
    color: "bg-red-500",
    tier: "Product / Tier-1",
    category: "MAANG / Big Tech",
    ctcRange: "₹28 - ₹45 LPA (SDE-1 Base + Stocks + Bonus)",
    ctcBreakdown: {
      base: "₹18 - ₹22 Lakhs",
      stocks: "₹30 - ₹40 Lakhs (GSUs vested over 4 years, ~25% per year)",
      bonus: "15% annual target bonus",
      joiningBonus: "₹2 - ₹4 Lakhs"
    },
    eligibility: {
      degree: "B.Tech / B.E / M.Tech / Dual Degree / MCA in CS / IT / EE / ECE or allied disciplines",
      cgpa: "6.5+ CGPA or 65% with no active backlogs",
      gapYear: "Gap years allowed with valid justification",
      batches: "2025, 2026, 2027 (Intern & Grad)"
    },
    examPattern: {
      platform: "HackerEarth / Google Internal Coding Platform",
      duration: "60 - 90 Minutes",
      totalSections: 1,
      totalQuestions: "2 Coding Questions",
      negativeMarking: "No negative marking",
      sections: [
        { name: "Online Coding Assessment", count: "2 Questions", time: "60-90 Mins", difficulty: "Medium - Hard", topics: "Graphs, Dynamic Programming, Segment Trees, Trie, Greedy" }
      ]
    },
    syllabus: {
      coding: [
        "Graph Algorithms (BFS, DFS, Dijkstra, Bellman-Ford, Topological Sort)",
        "Dynamic Programming (Multidimensional, Tree DP, Bitmask DP)",
        "Disjoint Set Union (DSU) and Union-Find",
        "Binary Search on Answer, Two Pointers, Monotonic Queue/Stack",
        "Trees, Binary Search Trees, LCA (Lowest Common Ancestor)"
      ],
      coreSubjects: [
        "Time & Space Complexity analysis (Strict Big-O)",
        "System Architecture & concurrency basics for L3/L4",
        "Clean, production-quality code, modular functions, naming conventions"
      ]
    },
    rounds: [
      { round: "Round 1", name: "Online Assessment (OA)", format: "Coding (2 medium-hard algorithmic problems)", duration: "60-90 mins" },
      { round: "Round 2", name: "Technical Interview 1 (DSA)", format: "Live Google Meet + Google Docs coding (No IDE auto-complete)", duration: "45 mins" },
      { round: "Round 3", name: "Technical Interview 2 (DSA & Optimization)", format: "Edge cases, mathematical proofs, alternative approaches", duration: "45 mins" },
      { round: "Round 4", name: "Technical Interview 3 (DSA / Problem Solving)", format: "Deep algorithmic problem solving and trade-off discussions", duration: "45 mins" },
      { round: "Round 5", name: "Googliness & Leadership (HR)", format: "Culture fit, diversity, teamwork, ethics, and past experiences", duration: "45 mins" }
    ],
    interviewArchive: [
      "Find the median in a stream of running integers using two heaps.",
      "Given a 2D grid of buildings and obstacles, find the optimal location to build a store minimizing total Manhattan distance.",
      "Word Ladder II: Find all shortest transformation sequences from beginWord to endWord.",
      "Design an algorithm to find the maximum sum path between any two nodes in a binary tree."
    ],
    proTips: [
      "Always communicate your thought process out loud before typing any code.",
      "Google does not use syntax-highlighting IDEs in interviews; practice writing clean code on plain text or Google Docs.",
      "Always test your code with edge cases (empty input, single element, duplicates, negative numbers, overflow)."
    ]
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    initial: "M",
    color: "bg-blue-600",
    tier: "Product / Tier-1",
    category: "MAANG / Big Tech",
    ctcRange: "₹24 - ₹42 LPA (Full-time SDE-1)",
    ctcBreakdown: {
      base: "₹15 - ₹17 Lakhs",
      stocks: "$30,000 - $40,000 USD (vested over 4 years)",
      bonus: "10% - 20% annual performance bonus",
      joiningBonus: "₹3 - ₹5 Lakhs (first year) + ₹2 Lakhs (second year)"
    },
    eligibility: {
      degree: "B.Tech / M.Tech / Dual Degree in CS, IT, ECE, EEE or related branch",
      cgpa: "7.0+ CGPA (60%+ in 10th & 12th)",
      gapYear: "Up to 1 year gap allowed",
      batches: "Current graduating batches"
    },
    examPattern: {
      platform: "Codility / Mettl",
      duration: "70 - 90 Minutes",
      totalSections: 2,
      totalQuestions: "3 Coding Questions or 2 Coding + 1 Debugging",
      negativeMarking: "No negative marking",
      sections: [
        { name: "Coding Problems", count: "2-3 Questions", time: "70 Mins", difficulty: "Medium", topics: "Strings, Arrays, Trees, Hash Maps, Linked List" }
      ]
    },
    syllabus: {
      coding: [
        "String manipulation & parsing algorithms",
        "Binary Tree traversals (Inorder, Preorder, Postorder, Level Order), Views of Tree",
        "Dynamic Programming (LCS, Knapsack, House Robber variants)",
        "Stack, Queue, Priority Queue (Top K elements)",
        "Recursion & Backtracking (Subsets, Permutations)"
      ],
      coreSubjects: [
        "Object Oriented Programming (OOP: Inheritance, Polymorphism, Abstraction, Encapsulation)",
        "Operating Systems: Threads vs Processes, Virtual Memory, Mutex",
        "Database normalization and writing SQL joins",
        "Low-Level Design (LLD): Class diagrams for Parking Lot, Tic-Tac-Toe, Elevator System"
      ]
    },
    rounds: [
      { round: "Round 1", name: "Online Coding Test", format: "Codility platform (3 DSA questions)", duration: "75-90 mins" },
      { round: "Round 2", name: "Technical Round 1", format: "Data Structures (Trees, Linked Lists, Arrays) + Resume projects", duration: "45-60 mins" },
      { round: "Round 3", name: "Technical Round 2", format: "Algorithmic optimization, System Design / OOP design patterns", duration: "45-60 mins" },
      { round: "Round 4", name: "AA / Techno-Managerial Round", format: "As-Appropriate (AA) interview: Behavioral questions + cultural alignment + past project deep-dive", duration: "45-60 mins" }
    ],
    interviewArchive: [
      "Implement LRU Cache with $O(1)$ get and put operations.",
      "Check if a binary tree is symmetric / mirror of itself.",
      "Design an Object-Oriented model for a Parking Lot or Snake & Ladder game.",
      "Find the lowest common ancestor in a Binary Tree."
    ],
    proTips: [
      "Microsoft strongly values OOP concepts and modular code structure.",
      "Be prepared to explain your resume projects in deep detail, including trade-offs and tech stack justifications."
    ]
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "",
    initial: "A",
    color: "bg-amber-500",
    tier: "Product / Tier-1",
    category: "MAANG / Big Tech",
    ctcRange: "₹28 - ₹44 LPA (SDE-1)",
    ctcBreakdown: {
      base: "₹16 - ₹18 Lakhs",
      stocks: "$25,000 - $35,000 USD (5%, 15%, 40%, 40% vesting)",
      bonus: "₹6 - ₹9 Lakhs (Year 1 bonus) + ₹4 - ₹6 Lakhs (Year 2 bonus)",
      joiningBonus: "Relocation allowance"
    },
    eligibility: {
      degree: "B.Tech / M.Tech in CS/IT/Circuital branches",
      cgpa: "6.5+ CGPA or 65% across academics",
      gapYear: "Permissible with reasonable explanation",
      batches: "Fresher & Experienced"
    },
    examPattern: {
      platform: "HackerRank",
      duration: "90 - 105 Minutes",
      totalSections: 2,
      totalQuestions: "2 Coding + Work Style Simulation (20 scenarios)",
      negativeMarking: "No",
      sections: [
        { name: "Coding Assessment", count: "2 Questions", time: "70 Mins", difficulty: "Medium - Hard", topics: "Graphs, Trees, Strings, Sliding Window, DP" },
        { name: "Work Style Assessment", count: "20 Scenarios", time: "20 Mins", difficulty: "Amazon 16 Leadership Principles", topics: "Customer Obsession, Ownership, Bias for Action" }
      ]
    },
    syllabus: {
      coding: [
        "Priority Queue / Heap (Kth largest, merge k sorted lists)",
        "Breadth-First Search (BFS) and Depth-First Search (DFS) on 2D Matrix / Island problems",
        "Sliding Window & Two Pointers",
        "Trie & Prefix Trees (Autocomplete search)",
        "Dynamic Programming"
      ],
      coreSubjects: [
        "Amazon 16 Leadership Principles (Customer Obsession, Ownership, Bias for Action, Deliver Results, Earn Trust)",
        "System Architecture basics (API Gateway, Caching, Queues)",
        "Concurrency & Multithreading"
      ]
    },
    rounds: [
      { round: "Round 1", name: "Online Assessment (OA 1 & 2)", format: "Coding + Work Style Assessment", duration: "90 mins" },
      { round: "Round 2", name: "Technical Round 1", format: "DSA (1-2 problems) + 1-2 LP questions (Customer Obsession / Ownership)", duration: "60 mins" },
      { round: "Round 3", name: "Technical Round 2", format: "Data Structures + System Design / OOP + 2 LP questions", duration: "60 mins" },
      { round: "Round 4", name: "Bar Raiser Round", format: "Conducted by an independent Amazonian: Intense focus on Amazon Leadership Principles and problem-solving resilience", duration: "60 mins" }
    ],
    interviewArchive: [
      "Number of Islands (BFS/DFS on grid)",
      "Trapping Rain Water (Two pointers / Stack)",
      "Design an In-Memory File System (Trie / Tree)",
      "Course Schedule (Topological Sort / Cycle detection in directed graph)"
    ],
    proTips: [
      "Amazon NEVER conducts a round without Leadership Principle questions! Every technical round has 15-20 minutes reserved for LP questions using the STAR framework.",
      "Always start with a brute force approach, analyze its complexity, and then optimize."
    ]
  },
  {
    id: "tcs",
    name: "Tata Consultancy Services (TCS)",
    logo: "",
    initial: "T",
    color: "bg-indigo-600",
    tier: "Service / Mass Recruiter",
    category: "IT Enterprise Services",
    ctcRange: "Ninja: ₹3.36 LPA | Digital: ₹7.0 - ₹7.5 LPA | Prime: ₹9.0 - ₹11.5 LPA",
    ctcBreakdown: {
      base: "Fixed Base component + Retirals + Health benefits",
      stocks: "N/A",
      bonus: "Performance linked incentive (Xcelerate / Elevate Wings)",
      joiningBonus: "One-time digital readiness incentive for eligible certifications"
    },
    eligibility: {
      degree: "B.Tech / B.E / M.Tech / MCA / M.Sc (CS/IT)",
      cgpa: "Minimum 60% or 6.0 CGPA throughout 10th, 12th, Diploma, and Graduation",
      gapYear: "Maximum 24 months total academic gap permitted",
      batches: "Current batch (TCS NQT National Qualifier Test)"
    },
    examPattern: {
      platform: "TCS iON",
      duration: "165 Minutes",
      totalSections: 2,
      totalQuestions: "Foundation (65 Qs) + Advanced Section (Coding + Adv Aptitude)",
      negativeMarking: "No negative marking",
      sections: [
        { name: "Numerical Ability", count: "20 Questions", time: "25 Mins", difficulty: "Easy - Medium", topics: "Averages, Mixtures, Ratios, Speed-Distance, Time-Work" },
        { name: "Verbal Ability", count: "25 Questions", time: "25 Mins", difficulty: "Easy", topics: "Sentence Completion, Para Jumbles, Reading Comprehension" },
        { name: "Reasoning Ability", count: "20 Questions", time: "25 Mins", difficulty: "Medium", topics: "Data Sufficiency, Syllogisms, Blood Relations, Coding" },
        { name: "Advanced Aptitude & Coding", count: "3 Questions (Adv Quant & Reasoning) + 2 Hands-on Coding", time: "90 Mins", difficulty: "Medium", topics: "DSA, Arrays, Strings, Math logic" }
      ]
    },
    syllabus: {
      coding: [
        "Array manipulations and sorting algorithms",
        "String processing (Palindromes, Anagrams, Substrings)",
        "Matrix operations (Rotations, Spirals, Transpose)",
        "Basic Recursion and Number Theory (Prime factors, GCD, Modular math)",
        "Pointers and dynamic memory allocation"
      ],
      coreSubjects: [
        "DBMS: Basic SQL SELECT, WHERE, GROUP BY, HAVING, JOIN queries",
        "Operating System basics (Paging, Semaphores, Scheduling)",
        "OOP Principles: Encapsulation, Polymorphism, Inheritance",
        "SDLC models (Agile, Waterfall, Scrum terminology)"
      ]
    },
    rounds: [
      { round: "Round 1", name: "TCS National Qualifier Test (NQT)", format: "Cognitive + Hands-on Coding on TCS iON", duration: "165 mins" },
      { round: "Round 2", name: "Combined Technical + Managerial + HR Interview", format: "Panel interview (1 Technical lead, 1 Delivery Manager, 1 HR rep)", duration: "30-45 mins" }
    ],
    interviewArchive: [
      "Find the number of pairs in an array with sum equal to K.",
      "Write a program to print the matrix in spiral order.",
      "What is the difference between primary key, unique key, and foreign key in SQL?",
      "Explain the concept of method overloading vs method overriding in Java/C++."
    ],
    proTips: [
      "Solving both coding questions completely in the advanced section guarantees eligibility for the Digital / Prime interview shortlist (₹7 - 9+ LPA).",
      "In the panel interview, be thoroughly honest about project roles and maintain high confidence."
    ]
  },
  {
    id: "infosys",
    name: "Infosys",
    logo: "",
    initial: "I",
    color: "bg-blue-700",
    tier: "Service / Mass Recruiter",
    category: "IT Enterprise Services",
    ctcRange: "SE: ₹3.6 LPA | DSE: ₹6.25 LPA | Specialist Programmer (SP): ₹9.5 LPA",
    ctcBreakdown: {
      base: "SE: ₹3.6 LPA | DSE (Digital Specialist Engineer): ₹6.25 LPA | SP: ₹9.5 LPA",
      stocks: "N/A",
      bonus: "Annual performance bonus and certification incentives",
      joiningBonus: "N/A"
    },
    eligibility: {
      degree: "B.Tech / B.E / M.Tech / MCA",
      cgpa: "60% or 6.0 CGPA minimum in 10th, 12th, and Graduation (No active backlog)",
      gapYear: "Up to 2 years academic gap allowed",
      batches: "On-campus & InfyTQ / HackWithInfy"
    },
    examPattern: {
      platform: "Infosys Springboard / HackerEarth",
      duration: "100 - 180 Minutes",
      totalSections: 5,
      totalQuestions: "54 Questions (Cognitive) OR 3 Hard Coding (HackWithInfy)",
      negativeMarking: "No",
      sections: [
        { name: "Reasoning Ability", count: "15 Questions", time: "25 Mins", difficulty: "Medium", topics: "Puzzles, Syllogisms, Seating arrangement, Data sufficiency" },
        { name: "Mathematical Ability", count: "10 Questions", time: "35 Mins", difficulty: "Medium - High", topics: "Permutations, Probability, Geometry, Logarithms" },
        { name: "Verbal Ability", count: "20 Questions", time: "20 Mins", difficulty: "Easy - Medium", topics: "Error spotting, Cloze test, Fill in blanks" },
        { name: "Pseudocode", count: "5 Questions", time: "10 Mins", difficulty: "Tricky", topics: "Bitwise operators, Loop execution tracing, Recursion" },
        { name: "Puzzle Solving", count: "4 Questions", time: "10 Mins", difficulty: "Medium", topics: "Visual reasoning, Sudoku style deduction" }
      ]
    },
    syllabus: {
      coding: [
        "Dynamic Programming (InfyTQ / HackWithInfy rounds)",
        "Graph algorithms (Shortest path, Connected components)",
        "Strings & String pattern matching (KMP, Rolling hash)",
        "Array transformations & prefix sums"
      ],
      coreSubjects: [
        "Data Structures fundamentals",
        "Relational Databases and SQL queries",
        "Python / Java OOP concepts",
        "Software Engineering methodologies"
      ]
    },
    rounds: [
      { round: "Round 1", name: "Infosys Online Test (Cognitive + Pseudocode)", format: "MCQ based sectional assessment", duration: "100 mins" },
      { round: "Round 2", name: "Technical Interview", format: "Coding logic, CS Core (OOP, DBMS, OS), Project explanation", duration: "30-40 mins" },
      { round: "Round 3", name: "HR Interview", format: "Communication check, relocation willingness, shift flexibility", duration: "15-20 mins" }
    ],
    interviewArchive: [
      "Explain the four pillars of Object Oriented Programming with real-world examples.",
      "Write a query to find the second highest salary in an Employee table.",
      "What is normalisation and why do we need 3NF?",
      "Solve: Given a string, count all palindromic substrings."
    ],
    proTips: [
      "Infosys Pseudocode section is the biggest eliminator in the online test! Practice tracing variable states through while loops and bitwise operations.",
      "Participating in 'HackWithInfy' is the fastest direct path to the Specialist Programmer (₹9.5 LPA) role."
    ]
  },
  {
    id: "accenture",
    name: "Accenture",
    logo: "",
    initial: "A",
    color: "bg-purple-600",
    tier: "Service / Consulting",
    category: "IT & Global Consulting",
    ctcRange: "Associate Software Engineer (ASE): ₹4.5 LPA | Advanced ASE: ₹6.5 LPA",
    ctcBreakdown: {
      base: "Fixed ₹3.8 - ₹5.4 LPA",
      stocks: "Employee share purchase plan at discount",
      bonus: "Annual individual performance bonus (up to 15%)",
      joiningBonus: "Joining bonus for select early joiners"
    },
    eligibility: {
      degree: "B.Tech / B.E / MCA / M.Tech (All branches eligible)",
      cgpa: "6.5 CGPA or 65% aggregate throughout",
      gapYear: "Maximum 1 year educational gap allowed",
      batches: "Current passing batch"
    },
    examPattern: {
      platform: "Wheebox / Mettl",
      duration: "90 + 45 Minutes",
      totalSections: 2,
      totalQuestions: "Cognitive & Technical (90 Qs) + Coding (2 Qs)",
      negativeMarking: "No negative marking (Sectional cut-offs apply)",
      sections: [
        { name: "Cognitive Assessment", count: "50 Questions", time: "50 Mins", difficulty: "Easy - Medium", topics: "English Ability, Critical Thinking, Abstract Reasoning" },
        { name: "Technical Assessment", count: "40 Questions", time: "40 Mins", difficulty: "Medium", topics: "Common Application & MS Office, Pseudocode, Cloud & Network Security" },
        { name: "Coding Test", count: "2 Questions", time: "45 Mins", difficulty: "Easy - Medium", topics: "Array operations, String parsing, Hash tables" }
      ]
    },
    syllabus: {
      coding: [
        "String reversing, anagrams, vowel transformations",
        "Array element replacement, max sub-array sum",
        "Number conversions (Binary, Octal, Hexadecimal)",
        "Sorting & searching algorithms"
      ],
      coreSubjects: [
        "Cloud Computing fundamentals (IaaS, PaaS, SaaS, AWS/Azure concepts)",
        "Network Security (Firewalls, Antivirus, Cryptography basics)",
        "Pseudocode syntax & conditional evaluations",
        "MS Office & Outlook shortcut keys and macro concepts"
      ]
    },
    rounds: [
      { round: "Round 1", name: "Cognitive & Technical Assessment", format: "90 MCQs (Qualifying round)", duration: "90 mins" },
      { round: "Round 2", name: "Coding Assessment", format: "2 Coding problems (Unlocked immediately after passing Round 1)", duration: "45 mins" },
      { round: "Round 3", name: "Communication Assessment", format: "Automated AI speech & listening test (Reading, repeating sentences, retelling stories)", duration: "20 mins" },
      { round: "Round 4", name: "Virtual Interview", format: "Techno-Behavioral interview covering projects and Accenture core values", duration: "25-30 mins" }
    ],
    interviewArchive: [
      "Given an array of integers, find the sum of all elements that are multiples of 3 and 5.",
      "Explain the difference between Symmetric and Asymmetric encryption.",
      "How do cloud models IaaS, PaaS, and SaaS differ?",
      "Describe a project you worked on and the biggest technical hurdle you faced."
    ],
    proTips: [
      "The Communication Assessment is graded by AI for fluency, pronunciation, and vocabulary. Use a quality headset and speak clearly without long pauses.",
      "Sectional cut-offs apply for every section in the cognitive test; do not leave sections incomplete."
    ]
  },
  {
    id: "razorpay",
    name: "Razorpay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg",
    initial: "R",
    color: "bg-blue-600",
    tier: "Product / Fintech",
    category: "Fintech Unicorn",
    ctcRange: "₹20 - ₹32 LPA (Software Engineer)",
    ctcBreakdown: {
      base: "₹18 - ₹24 Lakhs",
      stocks: "Lucrative ESOPs (Employee Stock Option Plan)",
      bonus: "Annual performance bonus",
      joiningBonus: "₹1 - ₹2 Lakhs"
    },
    eligibility: {
      degree: "B.Tech / M.Tech in CS/IT or related field",
      cgpa: "7.0+ CGPA preferred",
      gapYear: "Flexible based on skills and projects",
      batches: "Freshers & Lateral"
    },
    examPattern: {
      platform: "HackerRank",
      duration: "90 Minutes",
      totalSections: 2,
      totalQuestions: "3 Coding Questions (DSA & Concurrency)",
      negativeMarking: "No",
      sections: [
        { name: "Coding & Problem Solving", count: "3 Questions", time: "90 Mins", difficulty: "Medium - Hard", topics: "Transactions, Rate Limiting, Sliding Window, DP, Trees" }
      ]
    },
    syllabus: {
      coding: [
        "Data Structures: Trees, Graphs, Hash Maps, Priority Queues",
        "Sliding Window, Binary Search, Dynamic Programming",
        "Concurrency, Multi-threaded processing, Race Condition avoidance"
      ],
      coreSubjects: [
        "High-throughput Backend architecture & REST APIs",
        "Relational Databases: Indexing, ACID compliance, Deadlocks",
        "System Design: Designing Rate Limiters, Payment Gateways, Webhook dispatchers"
      ]
    },
    rounds: [
      { round: "Round 1", name: "Online Coding Assessment", format: "3 Coding problems on HackerRank", duration: "90 mins" },
      { round: "Round 2", name: "Machine Coding / Technical Round 1", format: "Live coding or Low-Level Design (LLD) (e.g., In-Memory Rate Limiter, Splitwise)", duration: "60-90 mins" },
      { round: "Round 3", name: "DSA & Problem Solving", format: "Algorithmic problem solving and edge-case handling", duration: "60 mins" },
      { round: "Round 4", name: "High-Level Architecture & Cultural Fit", format: "System design basics, database choices, and culture alignment", duration: "45-60 mins" }
    ],
    interviewArchive: [
      "Design a Thread-safe In-Memory Key-Value store with TTL (Time-to-Live) expiry.",
      "Design and implement a Sliding Window Rate Limiter.",
      "How would you ensure idempotency in payment transaction API processing?",
      "Given a stream of transactions, detect duplicate payments within a 5-second sliding window."
    ],
    proTips: [
      "Razorpay heavily evaluates Machine Coding and clean code design (Separation of Concerns, SOLID principles).",
      "Understand idempotency, database transactions, and how webhook delivery systems handle retries."
    ]
  }
];

window.CompaniesDB = {
  CompaniesData
};
