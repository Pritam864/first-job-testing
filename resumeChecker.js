/**
 * Interactive Resume & ATS Keyword Analyzer Module
 * Helps candidates evaluate their resume match against job postings
 */

const ResumeCheckerModule = {
  selectedJobId: null,
  resumeText: '',
  analysisResult: null,

  init() {
    this.render();
  },

  render() {
    const container = document.getElementById('module-container');
    if (!container) return;

    const jobs = window.JobsDB.getJobs();

    container.innerHTML = `
      <div class="space-y-8 animate-fadeIn max-w-4xl mx-auto">
        <!-- Header -->
        <div class="rounded-3xl bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 text-white p-8 md:p-10 shadow-xl relative overflow-hidden">
          <div class="relative z-10 max-w-2xl space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase">
              <i data-lucide="scan" class="w-3.5 h-3.5"></i> ATS Optimization Engine
            </div>
            <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight">
              Resume & ATS Match Checker
            </h1>
            <p class="text-cyan-100 text-sm leading-relaxed">
              Scan your resume against job postings to detect missing keywords, calculate match score, and optimize your application for applicant tracking systems.
            </p>
          </div>
        </div>

        <!-- Analyzer Inputs -->
        <div class="glass-card rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left: Target Job Selection -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                1. Select Target Job Opening
              </label>
              <select
                id="target-job-selector"
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
              >
                ${jobs.map(j => `<option value="${j.id}">${j.company} - ${j.title} (${j.category})</option>`).join('')}
              </select>
              <p class="text-[11px] text-slate-400">Our engine extracts required skills and keywords from this job posting.</p>
            </div>

            <!-- Right: Sample Resume Loader -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                2. Quick Sample Resume
              </label>
              <button
                onclick="ResumeCheckerModule.loadSampleResume()"
                class="w-full py-2.5 rounded-xl border border-dashed border-teal-500 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/20 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <i data-lucide="file-plus" class="w-4 h-4"></i> Load Sample Software Engineer Resume
              </button>
              <p class="text-[11px] text-slate-400">Or paste your resume text in the box below.</p>
            </div>
          </div>

          <!-- Resume Text Area -->
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Paste Resume Text / Plain Text
            </label>
            <textarea
              id="resume-text-input"
              rows="8"
              placeholder="Paste your resume content (Summary, Experience, Projects, Skills, Education)..."
              class="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-teal-500 outline-none font-mono leading-relaxed"
            >${this.resumeText}</textarea>
          </div>

          <!-- Analyze Action Button -->
          <button
            onclick="ResumeCheckerModule.runAnalysis()"
            class="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
          >
            <i data-lucide="zap" class="w-4 h-4"></i> Run ATS Match & Keyword Audit
          </button>
        </div>

        <!-- Analysis Results Container -->
        ${this.analysisResult ? this.renderAnalysisResult() : ''}
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  loadSampleResume() {
    this.resumeText = `
Rahul Sharma | Bangalore, India | rahul@example.com | github.com/rahul | linkedin.com/in/rahul

TECHNICAL SKILLS:
- Languages: C++, Java, Python, JavaScript, TypeScript, SQL
- Technologies/Frameworks: React, Node.js, Express, Next.js, Tailwind CSS, Redis
- Tools: Git, Docker, AWS (EC2, S3), Linux, Postman
- Concepts: Data Structures, Algorithms, Object-Oriented Design, Operating Systems, Database Management Systems

WORK EXPERIENCE:
Software Development Intern | Razorpay | Jan 2026 - Present
- Architected and built high-performance merchant dashboard components in React and TypeScript.
- Reduced API response times by 35% through Redis caching and query optimization in PostgreSQL.
- Authored unit test coverage using Jest, increasing test reliability to 88%.

PROJECTS:
Algorithmic Code Visualizer | React, TypeScript, Web Workers
- Built interactive tool visualizing Graph BFS/DFS and Dynamic Programming recursion trees.
- Attracted 1,200+ monthly active users and 250+ GitHub stars.

EDUCATION:
B.Tech in Computer Science & Engineering | Tier-1 Institute | CGPA: 8.4 / 10
    `.trim();

    const input = document.getElementById('resume-text-input');
    if (input) input.value = this.resumeText;
    window.App.showToast('Sample resume loaded! Click "Run ATS Match" to scan.', 'info');
  },

  runAnalysis() {
    const selector = document.getElementById('target-job-selector');
    const input = document.getElementById('resume-text-input');
    if (!selector || !input) return;

    this.selectedJobId = selector.value;
    this.resumeText = input.value;

    if (!this.resumeText.trim()) {
      window.App.showToast('Please paste your resume text first!', 'error');
      return;
    }

    const job = window.JobsDB.getJobs().find(j => j.id === this.selectedJobId);
    if (!job) return;

    // Keyword matching algorithm
    const resumeLower = this.resumeText.toLowerCase();
    const matched = [];
    const missing = [];

    job.skills.forEach(skill => {
      const sLower = skill.toLowerCase();
      if (resumeLower.includes(sLower)) {
        matched.push(skill);
      } else {
        missing.push(skill);
      }
    });

    const score = Math.round((matched.length / job.skills.length) * 100);

    this.analysisResult = {
      jobTitle: job.title,
      company: job.company,
      score,
      matched,
      missing,
      totalKeywords: job.skills.length
    };

    this.render();
    window.App.showToast(`Audit Complete: ${score}% match with ${job.company}`, 'success');
  },

  renderAnalysisResult() {
    const res = this.analysisResult;
    let scoreColor = 'text-emerald-500';
    let scoreBadge = 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300';
    if (res.score < 60) {
      scoreColor = 'text-rose-500';
      scoreBadge = 'bg-rose-50 dark:bg-rose-950/30 border-rose-300';
    } else if (res.score < 80) {
      scoreColor = 'text-amber-500';
      scoreBadge = 'bg-amber-50 dark:bg-amber-950/30 border-amber-300';
    }

    return `
      <div class="glass-card rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 space-y-6 animate-fadeIn">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div>
            <span class="text-xs font-bold text-teal-600 uppercase">Analysis Results</span>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-0.5">Match Report for ${res.jobTitle} at ${res.company}</h3>
          </div>
          <div class="p-4 rounded-2xl border ${scoreBadge} text-center flex-shrink-0">
            <div class="text-[10px] uppercase font-bold text-slate-500">ATS Match Score</div>
            <div class="text-3xl font-black ${scoreColor}">${res.score}%</div>
          </div>
        </div>

        <!-- Matched vs Missing Keywords -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Matched -->
          <div class="p-4 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/30 space-y-2">
            <div class="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i> Matched Keywords (${res.matched.length}/${res.totalKeywords}):
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${res.matched.map(m => `<span class="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 text-xs font-semibold">✓ ${m}</span>`).join('')}
            </div>
          </div>

          <!-- Missing -->
          <div class="p-4 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-800/30 space-y-2">
            <div class="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <i data-lucide="alert-circle" class="w-4 h-4 text-rose-600"></i> Missing Critical Keywords (${res.missing.length}):
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${res.missing.length === 0 ? `<span class="text-xs text-emerald-600 font-medium">None! Your resume covers all core keywords!</span>` : res.missing.map(m => `<span class="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200 text-xs font-semibold">✕ ${m}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <i data-lucide="lightbulb" class="w-4 h-4 text-amber-500"></i> ATS Optimization Recommendations:
          </div>
          <ul class="space-y-1.5 text-slate-600 dark:text-slate-400">
            ${res.missing.length > 0 ? `<li>• Add the missing skills (<strong>${res.missing.join(', ')}</strong>) under your projects or skills summary section to bypass ATS filters.</li>` : ''}
            <li>• Ensure you have quantifiable numbers (e.g. <em>"improved latency by 35%"</em>, <em>"scaled to 10k users"</em>) in your bullet points.</li>
            <li>• Save and upload your resume strictly in PDF format with standard headings (Experience, Projects, Skills, Education).</li>
          </ul>
        </div>
      </div>
    `;
  }
};

window.ResumeCheckerModule = ResumeCheckerModule;
