/**
 * Preparation Database: Aptitude, DSA Concepts, Technical (CS Core), HR
 */

const AptitudeData = {
  topics: [
    {
      id: "quant-percentages",
      category: "Quantitative",
      title: "Percentages & Profit-Loss",
      summary: "Foundation of commercial arithmetic, calculating margins, markups, discounts, and compound variations.",
      formulas: [
        { label: "Percentage Change", formula: "\\frac{\\text{New Value} - \\text{Old Value}}{\\text{Old Value}} \\times 100\\%" },
        { label: "Profit Percentage", formula: "\\frac{\\text{SP} - \\text{CP}}{\\text{CP}} \\times 100\\%" },
        { label: "Loss Percentage", formula: "\\frac{\\text{CP} - \\text{SP}}{\\text{CP}} \\times 100\\%" },
        { label: "Successive Discount", formula: "\\text{Effective Discount} = (A + B - \\frac{A \\times B}{100})\\%" }
      ],
      keyNotes: [
        "If price increases by P%, consumption must decrease by [P / (100 + P)] * 100% to keep expenditure constant.",
        "Cost Price (CP) is always taken as 100% baseline when calculating profit or loss.",
        "Marked Price (MP) = CP + Markup. Discount is always calculated on Marked Price (MP)."
      ],
      practiceQuestions: [
        {
          id: "q-apt-1",
          question: "A shopkeeper marks an article 40% above cost price and allows a 20% discount on the marked price. What is his net profit percentage?",
          options: ["10%", "12%", "15%", "18%"],
          correct: 1,
          explanation: "Let CP = 100. Marked Price = 100 + 40% of 100 = 140. Discount = 20% of 140 = 28. Selling Price (SP) = 140 - 28 = 112. Profit % = [(112 - 100) / 100] * 100 = 12%."
        },
        {
          id: "q-apt-2",
          question: "If the salary of an employee is first increased by 20% and then decreased by 20%, what is the net percentage change in his salary?",
          options: ["No change", "4% decrease", "4% increase", "2% decrease"],
          correct: 1,
          explanation: "Using successive change formula: A + B + (AB / 100) = 20 + (-20) + (20 * -20 / 100) = 0 - 4 = -4%. Hence, 4% net decrease."
        }
      ]
    },
    {
      id: "quant-time-work",
      category: "Quantitative",
      title: "Time & Work, Pipes & Cisterns",
      summary: "Unitary work method, LCM approach for efficient rate calculation, and efficiency ratios.",
      formulas: [
        { label: "Combined Work (2 People)", formula: "T_{AB} = \\frac{A \\times B}{A + B}" },
        { label: "Men-Days-Hours Equivalence", formula: "\\frac{M_1 \\times D_1 \\times H_1}{W_1} = \\frac{M_2 \\times D_2 \\times H_2}{W_2}" },
        { label: "Efficiency & Time Relation", formula: "\\text{Efficiency} \\propto \\frac{1}{\\text{Time taken}}" }
      ],
      keyNotes: [
        "LCM Method: Assume total work = LCM of days taken by individual workers. This simplifies calculations to integer units/day.",
        "Negative work: Inlet pipe fills (+ rate), Outlet/drain pipe empties (- rate)."
      ],
      practiceQuestions: [
        {
          id: "q-apt-3",
          question: "A can complete a piece of work in 12 days and B can do it in 24 days. Working together, in how many days will they finish the work?",
          options: ["6 days", "8 days", "10 days", "16 days"],
          correct: 1,
          explanation: "Total work = LCM(12, 24) = 24 units. A's rate = 24/12 = 2 units/day. B's rate = 24/24 = 1 unit/day. Combined rate = 2 + 1 = 3 units/day. Days required = 24 / 3 = 8 days."
        },
        {
          id: "q-apt-4",
          question: "Pipe A can fill a tank in 10 hours and Pipe B can empty it in 15 hours. If both pipes are opened simultaneously, how long does it take to fill the tank?",
          options: ["20 hours", "25 hours", "30 hours", "35 hours"],
          correct: 2,
          explanation: "Capacity = LCM(10, 15) = 30 units. Pipe A filling rate = +3 units/hr. Pipe B emptying rate = -2 units/hr. Net rate = +3 - 2 = +1 unit/hr. Time required = 30 / 1 = 30 hours."
        }
      ]
    },
    {
      id: "quant-speed-distance",
      category: "Quantitative",
      title: "Speed, Time & Distance (Trains, Boats)",
      summary: "Relative speeds, train crossing poles/platforms, downstream vs upstream river current problems.",
      formulas: [
        { label: "Speed Conversion", formula: "1\\text{ km/hr} = \\frac{5}{18}\\text{ m/s}, \\quad 1\\text{ m/s} = \\frac{18}{5}\\text{ km/hr}" },
        { label: "Average Speed (Equal Distances)", formula: "\\text{Avg Speed} = \\frac{2xy}{x + y}" },
        { label: "Boats in Stream", formula: "\\text{Downstream} = u + v, \\quad \\text{Upstream} = u - v" }
      ],
      keyNotes: [
        "Relative speed: When two objects move in opposite directions, add speeds (S1 + S2). When in the same direction, subtract speeds (|S1 - S2|).",
        "Train crossing a pole/person: Distance = Length of Train.",
        "Train crossing a platform/bridge/tunnel: Distance = Length of Train + Length of Platform."
      ],
      practiceQuestions: [
        {
          id: "q-apt-5",
          question: "A train 180 meters long is running at 72 km/h. How long will it take to pass an electric pole?",
          options: ["7 seconds", "9 seconds", "10 seconds", "12 seconds"],
          correct: 1,
          explanation: "Speed in m/s = 72 * (5 / 18) = 20 m/s. Distance to cross pole = Train length = 180 m. Time = Distance / Speed = 180 / 20 = 9 seconds."
        }
      ]
    },
    {
      id: "logical-reasoning",
      category: "Logical",
      title: "Logical Deductions & Syllogisms",
      summary: "Venn diagram deductions, Blood relations, Direction senses, and Seating arrangement strategies.",
      formulas: [
        { label: "Venn Rule: All A are B", formula: "A \\subseteq B" },
        { label: "Venn Rule: Some A are B", formula: "A \\cap B \\neq \\emptyset" }
      ],
      keyNotes: [
        "In Syllogisms, a conclusion is valid only if it holds TRUE across ALL possible Venn diagrams.",
        "Blood relations: Always create generational tier diagrams (Grandparents -> Parents -> Self -> Children).",
        "Direction test: North is Up, South is Down, East is Right, West is Left. Clockwise 90° from North is East."
      ],
      practiceQuestions: [
        {
          id: "q-apt-6",
          question: "Statements: All cars are vehicles. Some vehicles are electric.\nConclusions:\nI. Some cars are electric.\nII. Some electric are vehicles.",
          options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
          correct: 1,
          explanation: "Statement II: 'Some vehicles are electric' inherently implies 'Some electric are vehicles' (conversion). However, cars might not intersect with the electric subset of vehicles, so I does not necessarily follow. Thus, only II follows."
        },
        {
          id: "q-apt-7",
          question: "Pointing to a photograph, Rohit said, 'She is the daughter of the only son of my grandfather.' How is the girl in the photo related to Rohit?",
          options: ["Daughter", "Sister", "Mother", "Cousin"],
          correct: 1,
          explanation: "My grandfather's only son = Rohit's father. Daughter of Rohit's father = Rohit's sister."
        }
      ]
    },
    {
      id: "verbal-ability",
      category: "Verbal",
      title: "Verbal Ability & Reading Comprehension",
      summary: "Grammar rules (Subject-Verb agreement, Parallelism), Sentence Correction, Idioms, and Contextual Vocabulary.",
      formulas: [],
      keyNotes: [
        "Subject-Verb Agreement: Neither...nor and Either...or take the verb agreeing with the closest subject.",
        "Modifiers must be placed adjacent to the word they describe to prevent dangling modifiers.",
        "In Reading Comprehension, distinguish between explicit facts and implied inferences."
      ],
      practiceQuestions: [
        {
          id: "q-apt-8",
          question: "Choose the grammatically correct sentence:",
          options: [
            "Neither the manager nor the employees was present at the conference.",
            "Neither the manager nor the employees were present at the conference.",
            "Neither the employees nor the manager were present at the conference.",
            "Neither the manager or the employees was present at the conference."
          ],
          correct: 1,
          explanation: "In 'Neither...nor', the verb agrees with the subject closest to it. In option B, 'employees' is plural and closest to 'were', which is correct."
        }
      ]
    }
  ]
};

const TechnicalData = {
  subjects: [
    {
      id: "os",
      name: "Operating Systems",
      icon: "cpu",
      color: "bg-blue-500",
      description: "Processes, Threads, CPU Scheduling, Deadlocks, Virtual Memory & Paging.",
      topics: [
        {
          title: "Process vs Thread",
          content: `
- **Process**: An instance of a program in execution. Has its own separate address space (Text, Data, Heap, Stack). Heavyweight; IPC (Inter-Process Communication) required for data sharing.
- **Thread**: Smallest unit of CPU execution within a process (often called lightweight process). Threads of the same process share code, data, open files, but have their own registers and stack.
- **Context Switch Overhead**: Process switching is slower (flushes CPU cache, updates page tables) compared to thread switching.
          `
        },
        {
          title: "Deadlock: Conditions & Handling",
          content: `
A deadlock occurs when a set of processes are blocked because each process is holding a resource and waiting for another resource held by some other process.
**4 Coffman Conditions (Must all hold simultaneously):**
1. **Mutual Exclusion**: At least one resource must be non-shareable.
2. **Hold and Wait**: A process holds resource(s) while waiting for others.
3. **No Preemption**: Resources cannot be forcibly confiscated.
4. **Circular Wait**: A closed chain of processes exists where P1 waits for P2, P2 waits for P3, and Pn waits for P1.
**Handling Methods**: Deadlock Prevention, Deadlock Avoidance (Banker's Algorithm), Deadlock Detection & Recovery, or Ignorance (Ostrich Algorithm).
          `
        },
        {
          title: "Virtual Memory, Paging & Page Faults",
          content: `
- **Virtual Memory**: Memory management technique providing an idealized abstraction of storage resources, allowing execution of processes not completely in physical RAM.
- **Paging**: Non-contiguous memory allocation where physical memory is broken into fixed-size **Frames** and logical memory into same-sized **Pages**.
- **Page Table**: Maps Virtual Page Number (VPN) to Physical Frame Number (PFN).
- **TLB (Translation Lookaside Buffer)**: High-speed hardware cache for page table lookups.
- **Page Fault**: Occurs when a program accesses a page mapped in address space but not loaded in physical RAM. Triggers OS trap to fetch page from disk.
- **Page Replacement Algorithms**: FIFO, LRU (Least Recently Used), Optimal (Belady's Anomaly applies to FIFO).
          `
        }
      ],
      flashcards: [
        { q: "What is Belady's Anomaly?", a: "Belady's anomaly is the phenomenon where increasing the number of page frames results in an increase in the number of page faults for certain page replacement algorithms, most notably FIFO." },
        { q: "What is the difference between preemptive and non-preemptive scheduling?", a: "In preemptive scheduling (e.g. Round Robin, SRTF), CPU can be taken away from a running process before it finishes. In non-preemptive (e.g. FCFS, SJF), once allocated, CPU is kept until completion or I/O wait." },
        { q: "What is a Race Condition?", a: "A condition where multiple processes or threads access and manipulate shared data concurrently, and the outcome depends on the particular order of execution. Prevented using Mutex, Semaphores, or Monitors." }
      ]
    },
    {
      id: "dbms",
      name: "DBMS & SQL",
      icon: "database",
      color: "bg-emerald-500",
      description: "Relational Models, ACID Properties, Normalization, Indexing (B+ Trees), Transactions & SQL Queries.",
      topics: [
        {
          title: "ACID Properties in Transactions",
          content: `
- **Atomicity**: 'All or nothing'. Either the entire transaction completes successfully or rolls back completely (managed via transaction logs).
- **Consistency**: The database must remain in a valid state satisfying all integrity constraints before and after the transaction.
- **Isolation**: Concurrent transactions execute independently without interfering with each other. Isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable.
- **Durability**: Once a transaction commits, its changes survive system crashes or power failures (written to non-volatile storage / WAL).
          `
        },
        {
          title: "Database Normalization (1NF to BCNF)",
          content: `
Normalization eliminates data redundancy and prevents insertion, update, and deletion anomalies.
- **1NF**: Atomic (indivisible) values in each column; no repeating groups.
- **2NF**: In 1NF + No partial dependency (all non-key attributes fully functionally dependent on whole primary key).
- **3NF**: In 2NF + No transitive dependency (non-key attribute must not depend on another non-key attribute). Rule: In X -> Y, either X is superkey or Y is prime attribute.
- **BCNF**: Stricter 3NF. For every functional dependency X -> Y, X must be a super key.
          `
        },
        {
          title: "Indexing & B+ Trees vs Hash Index",
          content: `
- **Indexes**: Data structures that accelerate data retrieval at the cost of additional write overhead and storage.
- **B+ Tree Index**: The industry standard for relational databases (MySQL InnoDB, Postgres). Balanced tree where all data records reside in leaf nodes, linked sequentially. Supports both exact point lookups $O(\\log N)$ and efficient range queries ($BETWEEN$).
- **Hash Index**: $O(1)$ lookup for exact equality match ($=$), but does NOT support range queries ($<, >, \\text{BETWEEN}$).
- **Clustered vs Non-Clustered**: Clustered index dictates the physical sorting order of rows on disk (only one per table). Non-clustered creates a separate lookup structure with pointers to actual rows.
          `
        }
      ],
      flashcards: [
        { q: "What is the difference between DELETE, TRUNCATE, and DROP?", a: "DELETE is DML, removes rows one by one with WHERE clause, can be rolled back, activates triggers. TRUNCATE is DDL, deallocates entire table data pages quickly, cannot be rolled back in some DBs, no triggers. DROP removes table structure entirely." },
        { q: "What is a SQL Window Function?", a: "A window function performs a calculation across a set of table rows that are related to the current row without collapsing rows like GROUP BY (e.g. ROW_NUMBER(), RANK(), DENSE_RANK(), LEAD(), LAG() OVER (PARTITION BY ... ORDER BY ...))." },
        { q: "What is the difference between Optimistic and Pessimistic Locking?", a: "Pessimistic locking locks records on read assuming conflicts will happen (SELECT FOR UPDATE). Optimistic locking allows reads without locks and validates a version timestamp at update time." }
      ]
    },
    {
      id: "cn",
      name: "Computer Networks",
      icon: "network",
      color: "bg-purple-500",
      description: "OSI 7 Layers, TCP/IP, TCP vs UDP, Three-Way Handshake, DNS, HTTP/HTTPS, SSL/TLS Handshake.",
      topics: [
        {
          title: "OSI 7 Layers vs TCP/IP Stack",
          content: `
1. **Physical Layer**: Bit transmission, cables, voltages, optical fibers.
2. **Data Link Layer**: Frame framing, MAC addressing, error detection (Ethernet, Switches).
3. **Network Layer**: Packet routing, IP addressing, ICMP (Routers, IP).
4. **Transport Layer**: End-to-end reliability, port addressing, flow & congestion control (TCP, UDP).
5. **Session Layer**: Establishing, maintaining, synchronizing sessions.
6. **Presentation Layer**: Data translation, encryption/decryption, compression.
7. **Application Layer**: User-facing protocols (HTTP, HTTPS, FTP, SMTP, DNS, SSH).
*(TCP/IP merges Application, Presentation, and Session into Application Layer)*
          `
        },
        {
          title: "TCP vs UDP & TCP 3-Way Handshake",
          content: `
- **TCP**: Connection-oriented, reliable, guaranteed order, flow control (Sliding Window), congestion control, heavier header (20-60 bytes). Used in Web (HTTP), Email, File Transfer.
- **UDP**: Connectionless, unreliable (best effort), no delivery guarantee, lightweight (8-byte header), low latency. Used in Video Streaming (VoIP), Gaming, DNS, Live broadcasts.
**TCP 3-Way Handshake (Connection Establishment):**
1. **Client -> Server**: SYN (Synchronize Sequence Number = x)
2. **Server -> Client**: SYN-ACK (Ack = x+1, Server Seq = y)
3. **Client -> Server**: ACK (Ack = y+1)
          `
        },
        {
          title: "What happens when you type google.com in browser?",
          content: `
1. **DNS Resolution**: Check Browser Cache -> OS Cache -> Router Cache -> ISP Resolver -> Root DNS (.) -> TLD DNS (.com) -> Authoritative Nameserver -> IP address returned.
2. **TCP Connection**: Client initiates 3-way handshake (SYN, SYN-ACK, ACK) with target server IP on port 443.
3. **TLS/SSL Handshake**: ClientHello, ServerHello, Certificate exchange, Key generation, symmetric cipher negotiated.
4. **HTTP Request**: Browser sends \`GET / HTTP/1.1\` with headers and cookies.
5. **Server Processing**: Web server / reverse proxy (Nginx) forwards request to application server; database queried.
6. **HTTP Response**: Server sends status \`200 OK\` with HTML body.
7. **DOM Rendering**: Browser parses HTML, fetches CSS/JS/images, builds DOM & CSSOM, constructs Render Tree, and paints pixels.
          `
        }
      ],
      flashcards: [
        { q: "What is the difference between HTTP/1.1, HTTP/2, and HTTP/3?", a: "HTTP/1.1 had head-of-line blocking on TCP connections. HTTP/2 introduced multiplexing multiple requests over single TCP connection and binary framing. HTTP/3 runs over QUIC protocol (UDP) solving TCP packet drop head-of-line blocking." },
        { q: "What is the function of ARP (Address Resolution Protocol)?", a: "ARP maps a known IP address (Layer 3) to its physical MAC address (Layer 2) on a local network segment." },
        { q: "What is CORS (Cross-Origin Resource Sharing)?", a: "A browser security mechanism that allows or restricts web applications running at one origin from requesting resources from a different origin using HTTP headers (Access-Control-Allow-Origin)." }
      ]
    },
    {
      id: "system-design",
      name: "System Design Basics",
      icon: "layout",
      color: "bg-amber-500",
      description: "Scalability, Caching, Load Balancing, CDN, CAP Theorem, Microservices vs Monolith.",
      topics: [
        {
          title: "Horizontal vs Vertical Scaling & Load Balancing",
          content: `
- **Vertical Scaling (Scale Up)**: Adding more CPU, RAM, or storage to a single server. Limited by hardware ceiling, single point of failure.
- **Horizontal Scaling (Scale Out)**: Adding more machine nodes to the cluster. Infinite scaling potential, fault tolerant, requires load balancing.
- **Load Balancers**: Distribute incoming network traffic across multiple servers (Layer 4 vs Layer 7). Algorithms: Round Robin, Weighted Round Robin, Least Connections, Consistent Hashing.
          `
        },
        {
          title: "Caching Strategies & Eviction Policies",
          content: `
- **Cache**: Fast in-memory storage (Redis, Memcached) placed between application and database to reduce read latency.
- **Read Strategies**:
  - *Cache-Aside (Lazy Loading)*: App checks cache first; if miss, reads DB and writes to cache.
  - *Read-Through*: App queries cache directly, cache library handles DB fetch on miss.
- **Write Strategies**:
  - *Write-Through*: Data written to cache and DB synchronously.
  - *Write-Behind (Write-Back)*: Data written to cache immediately; queued asynchronously to DB.
- **Eviction Policies**: LRU (Least Recently Used), LFU (Least Frequently Used), FIFO.
          `
        },
        {
          title: "CAP Theorem",
          content: `
In a distributed data store, you can only guarantee at most TWO of the following three properties during network partitions:
- **Consistency (C)**: Every read receives the most recent write or an error.
- **Availability (A)**: Every non-failing node returns a response (without guarantee that it contains the most recent write).
- **Partition Tolerance (P)**: System continues to operate despite arbitrary network dropped messages or node failures.
*(Since network partitions P are inevitable in real-world distributed networks, systems must choose between CP like HBase/MongoDB or AP like Cassandra/DynamoDB)*
          `
        }
      ],
      flashcards: [
        { q: "What is Consistent Hashing?", a: "A distributed hashing scheme that maps both servers and keys onto a circular ring (0 to 2^32-1). When a node is added or removed, only k/N keys need to be remapped, minimizing cache stampede." },
        { q: "What is a Message Queue and why use it?", a: "An asynchronous communication buffer (Kafka, RabbitMQ) decoupling producers from consumers, enabling rate smoothing, spike mitigation, and eventual consistency." }
      ]
    }
  ]
};

const HRInterviewData = {
  starMethod: {
    title: "The STAR Framework for Behavioral Questions",
    description: "The gold standard methodology recommended by Amazon, Google, and top recruiters to structure behavioral interview answers with clarity and impact.",
    steps: [
      { letter: "S", title: "Situation", desc: "Set the context. Briefly describe the project, company, challenge, or team setting. Keep it to 15-20% of your answer." },
      { letter: "T", title: "Task", desc: "Explain the specific responsibility or challenge you faced. What was the goal or deadline?" },
      { letter: "A", title: "Action", desc: "Describe the exact actions YOU took (use 'I', not 'we'). Detail tools used, decisions made, obstacles overcome (50-60% of your answer)." },
      { letter: "R", title: "Result", desc: "Quantify the outcome. Share metrics, latency improvements, bug reductions, team praise, or lessons learned." }
    ]
  },
  questions: [
    {
      id: "hr-1",
      question: "Tell me about yourself / Walk me through your resume.",
      category: "Introduction",
      whyAsked: "To assess communication clarity, professional trajectory, and your pitch for why you fit this role.",
      structureTip: "Use the Present -> Past -> Future formula. Spend 90-120 seconds.",
      sampleAnswer: "I am a final-year Computer Science student passionate about building scalable web applications and distributed systems. Recently, I completed a backend engineering internship where I optimized API latency by 35% using Redis caching and Go microservices. Prior to that, I built open-source projects including an algorithmic visualizer with 1,000+ active users. I've consistently practiced algorithmic problem solving, solving 400+ problems on LeetCode. What excites me most about this opportunity at your company is your focus on high-scale distributed architecture, and I'd love to contribute my problem-solving skills to your team.",
      dos: ["Keep it under 2 minutes", "Focus on technical achievements and impact", "Tailor closing sentence to the company"],
      donts: ["Don't recite your entire school history", "Don't mention personal family details", "Don't sound memorized or robotic"]
    },
    {
      id: "hr-2",
      question: "Why do you want to join our company?",
      category: "Culture & Motivation",
      whyAsked: "To see if you've researched the company and genuinely care, or if you're mass-applying.",
      structureTip: "Mention 1 specific product/engineering initiative + 1 culture attribute + how your goals align.",
      sampleAnswer: "I've been following your engineering blog, especially your recent migration towards event-driven microservices handling 50k requests/second. As an engineer who loves distributed systems, working on products at this scale is an incredible learning curve. Furthermore, your team's culture of developer autonomy, open-source contribution, and continuous mentorship aligns perfectly with where I want to grow my engineering career.",
      dos: ["Reference real engineering blogs, tech stack, or product features", "Highlight alignment with your career trajectory"],
      donts: ["Don't say 'Because of the high salary and perks'", "Don't give generic answers that could apply to any company"]
    },
    {
      id: "hr-3",
      question: "What are your greatest strengths and weaknesses?",
      category: "Self-Awareness",
      whyAsked: "Evaluates self-awareness, honesty, and whether you are proactively working on your blind spots.",
      structureTip: "Strength: Back with evidence. Weakness: Real, non-fatal weakness + how you actively mitigate it.",
      sampleAnswer: "Strength: My persistence in debugging and root-cause analysis. When facing a complex distributed bug, I methodically isolate variables and inspect logs rather than guessing.\n\nWeakness: Early on, I struggled with delegating and tended to take on too much code in group projects to ensure perfection. I realized this created bottlenecks, so I adopted agile task planning with Jira and clear acceptance criteria, which improved team velocity significantly.",
      dos: ["Pick a genuine weakness, not a fake compliment like 'I work too hard'", "Show tangible steps you took to improve"],
      donts: ["Don't pick a core requirement like 'I am bad at coding'", "Don't say 'I don't have any weaknesses'"]
    },
    {
      id: "hr-4",
      question: "Tell me about a time you had a conflict with a teammate and how you resolved it.",
      category: "Teamwork & Behavioral",
      whyAsked: "Evaluates emotional intelligence, conflict resolution, and maturity under stress.",
      structureTip: "Use the STAR method. Focus on objective data and shared user-centric goals, never personal attacks.",
      sampleAnswer: "During our final year capstone project, my teammate and I disagreed on the database choice. He preferred MongoDB for quick schema prototyping, while I advocated for PostgreSQL because our domain had strictly relational financial transactions. Instead of arguing opinion, I set up a quick benchmark with sample transaction queries demonstrating ACID constraints and joined latency. We discussed the trade-offs collaboratively and agreed to use Postgres for transactions while using MongoDB for activity logging. We completed the project 2 weeks ahead of schedule.",
      dos: ["Focus on the problem, not personal animosity", "Highlight mutual compromise and objective testing"],
      donts: ["Don't blame your teammate or claim they were simply wrong", "Don't say you ran to a manager/professor immediately"]
    },
    {
      id: "hr-5",
      question: "Where do you see yourself in 3 to 5 years?",
      category: "Vision & Career Growth",
      whyAsked: "Checks retention likelihood and whether your aspirations match the role's growth path.",
      structureTip: "Focus on mastery of engineering principles, taking ownership of architecture, and mentoring others.",
      sampleAnswer: "In the next 3 to 5 years, I see myself growing into a solid Senior Software Engineer with deep domain expertise in scalable backend architectures. I want to take ownership of end-to-end design decisions, contribute to technical roadmaps, and mentor junior engineers and interns. Ultimately, I want to be someone the team trusts to handle complex technical challenges.",
      dos: ["Emphasize learning, technical mastery, and responsibility", "Keep it aligned with an individual contributor (IC) or tech lead path"],
      donts: ["Don't say 'I want to be the CEO / start my own startup in 2 years'", "Don't say 'I haven't thought about it'"]
    },
    {
      id: "hr-6",
      question: "Do you have any questions for us?",
      category: "Closing / Engagement",
      whyAsked: "Tests your curiosity and engagement. Asking nothing is an immediate red flag.",
      structureTip: "Ask questions that reveal team culture, engineering practices, or upcoming challenges.",
      sampleAnswer: "Yes, thank you! I have a few:\n1. What does the onboarding process look like for a new engineer in the first 90 days?\n2. What is the biggest architectural challenge your team is tackling in the upcoming quarters?\n3. How does the engineering team balance building new product features versus tackling technical debt?",
      dos: ["Ask thoughtful questions about engineering culture and architecture", "Write down 2-3 questions in advance"],
      donts: ["Don't ask 'How many leaves do I get?' in a first round", "Don't say 'No, everything was clear'"]
    }
  ]
};

window.PrepDB = {
  AptitudeData,
  TechnicalData,
  HRInterviewData
};
