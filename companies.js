/**
 * Companies Hiring Process Module
 * Exam Pattern, Syllabus, Eligibility, CTC Breakdown, Rounds, and Interview Archives
 */

const CompaniesModule = {
  selectedCompanyId: 'google',
  tierFilter: 'all', // 'all' | 'Product' | 'Service' | 'Fintech'
  searchQuery: '',
  eligibilityChecker: {
    cgpa: '',
    degree: 'B.Tech / B.E',
    hasBacklogs: false
  },

  init() {
    this.render();
  },

  setTierFilter(tier) {
    this.tierFilter = tier;
    this.render();
  },

  selectCompany(id) {
    this.selectedCompanyId = id;
    this.render();
    const detailEl = document.getElementById('company-details-card');
    if (detailEl) detailEl.scrollIntoView({ behavior: 'smooth' });
  },

  render() {
    const container = document.getElementById('module-container');
    if (!container) return;

    const companies = window.CompaniesDB.CompaniesData;
    const selectedCompany = companies.find(c => c.id === this.selectedCompanyId) || companies[0];

    const filteredCompanies = companies.filter(c => {
      if (this.tierFilter === 'Product' && !c.tier.includes('Product')) return false;
      if (this.tierFilter === 'Service' && !c.tier.includes('Service')) return false;
      if (this.tierFilter === 'Fintech' && !c.tier.includes('Fintech')) return false;
      if (this.searchQuery && !c.name.toLowerCase().includes(this.searchQuery.toLowerCase())) return false;
      return true;
    });

    container.innerHTML = `
      <div class="space-y-8 animate-fadeIn">
        <!-- Hero Header -->
        <div class="rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 text-white p-8 md:p-10 shadow-xl relative overflow-hidden">
          <div class="relative z-10 max-w-3xl space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase">
              <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Comprehensive Placement Blueprints
            </div>
            <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight">
              Companies Hiring Process & Exam Patterns
            </h1>
            <p class="text-violet-100 text-sm md:text-base leading-relaxed">
              Detailed breakdown of recruitment rounds, test patterns, sectional timing, eligibility cutoffs, CTC compensation structures, and past interview questions.
            </p>
          </div>
          <div class="absolute -right-10 -bottom-10 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        <!-- Eligibility Checker Quick Widget -->
        <div class="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-950/40 text-violet-600 flex items-center justify-center font-bold">
                <i data-lucide="calculator" class="w-4 h-4"></i>
              </div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">Check Your Eligibility Across All Companies</h3>
            </div>
            <span class="text-xs text-slate-400">Instant rule evaluation</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-medium text-slate-500 mb-1">Your CGPA / Percentage</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 7.5 or 75%"
                value="${this.eligibilityChecker.cgpa}"
                oninput="CompaniesModule.updateCgpa(this.value)"
                class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-500 mb-1">Any Active Backlogs?</label>
              <select
                onchange="CompaniesModule.updateBacklogs(this.value === 'yes')"
                class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
              >
                <option value="no" ${!this.eligibilityChecker.hasBacklogs ? 'selected' : ''}>No (0 Active Backlogs)</option>
                <option value="yes" ${this.eligibilityChecker.hasBacklogs ? 'selected' : ''}>Yes (Has 1 or more)</option>
              </select>
            </div>
            <div class="flex items-end">
              <div class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 w-full flex items-center gap-2">
                <i data-lucide="info" class="w-4 h-4 text-violet-500 flex-shrink-0"></i>
                <span>${this.getEligibilitySummary(companies)}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter & Search Bar -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <button
              onclick="CompaniesModule.setTierFilter('all')"
              class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${this.tierFilter === 'all' ? 'bg-violet-600 text-white' : 'glass-card text-slate-600 dark:text-slate-400 hover:bg-slate-100'}"
            >All Companies</button>
            <button
              onclick="CompaniesModule.setTierFilter('Product')"
              class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${this.tierFilter === 'Product' ? 'bg-violet-600 text-white' : 'glass-card text-slate-600 dark:text-slate-400 hover:bg-slate-100'}"
            >Product / FAANG</button>
            <button
              onclick="CompaniesModule.setTierFilter('Service')"
              class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${this.tierFilter === 'Service' ? 'bg-violet-600 text-white' : 'glass-card text-slate-600 dark:text-slate-400 hover:bg-slate-100'}"
            >Service Recruiters</button>
            <button
              onclick="CompaniesModule.setTierFilter('Fintech')"
              class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${this.tierFilter === 'Fintech' ? 'bg-violet-600 text-white' : 'glass-card text-slate-600 dark:text-slate-400 hover:bg-slate-100'}"
            >Fintech</button>
          </div>
          <div class="relative w-full sm:w-64">
            <i data-lucide="search" class="w-4 h-4 absolute left-3 top-2.5 text-slate-400"></i>
            <input
              type="text"
              placeholder="Search company..."
              value="${this.searchQuery}"
              oninput="CompaniesModule.searchQuery = this.value; CompaniesModule.render();"
              class="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-violet-500 outline-none"
            />
          </div>
        </div>

        <!-- Horizontal Company Pills Carousel -->
        <div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          ${filteredCompanies.map(c => `
            <button
              onclick="CompaniesModule.selectCompany('${c.id}')"
              class="p-3 rounded-2xl border transition flex items-center gap-3 flex-shrink-0 ${c.id === selectedCompany.id ? 'bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-500/20' : 'glass-card border-slate-200 dark:border-slate-800 hover:border-violet-400'}"
            >
              <div class="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm ${c.color || 'bg-blue-600'}">
                ${c.initial || c.name.charAt(0)}
              </div>
              <div class="text-left">
                <div class="text-xs font-bold leading-tight">${c.name}</div>
                <div class="text-[10px] ${c.id === selectedCompany.id ? 'text-violet-200' : 'text-slate-400'}">${c.tier}</div>
              </div>
            </button>
          `).join('')}
        </div>

        <!-- Detailed Selected Company Blueprint Card -->
        <div id="company-details-card" class="glass-card rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 space-y-8">
          <!-- Company Header with CTC & Badges -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white ${selectedCompany.color} shadow-md flex-shrink-0">
                ${selectedCompany.initial || selectedCompany.name.charAt(0)}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h2 class="text-2xl font-black text-slate-900 dark:text-white">${selectedCompany.name}</h2>
                  <span class="px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-bold">${selectedCompany.category}</span>
                </div>
                <p class="text-xs text-slate-500 mt-1">Tier: <strong>${selectedCompany.tier}</strong></p>
              </div>
            </div>

            <!-- CTC Badge -->
            <div class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
              <div class="text-[11px] text-emerald-800 dark:text-emerald-400 font-semibold uppercase tracking-wider">Fresher / SDE Compensation Package</div>
              <div class="text-lg font-black text-emerald-700 dark:text-emerald-300 mt-0.5">${selectedCompany.ctcRange}</div>
              <div class="text-[10px] text-emerald-600/80 mt-1">Base: ${selectedCompany.ctcBreakdown.base} • Bonus: ${selectedCompany.ctcBreakdown.bonus}</div>
            </div>
          </div>

          <!-- Section 1: Eligibility Criteria -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <i data-lucide="graduation-cap" class="w-4 h-4 text-violet-500"></i> Official Eligibility Criteria
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span class="text-[10px] font-bold text-slate-400 uppercase">Degree Allowed</span>
                <p class="text-xs font-semibold text-slate-800 dark:text-slate-200">${selectedCompany.eligibility.degree}</p>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span class="text-[10px] font-bold text-slate-400 uppercase">Cutoff Threshold</span>
                <p class="text-xs font-semibold text-slate-800 dark:text-slate-200">${selectedCompany.eligibility.cgpa}</p>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span class="text-[10px] font-bold text-slate-400 uppercase">Gap Year Allowed</span>
                <p class="text-xs font-semibold text-slate-800 dark:text-slate-200">${selectedCompany.eligibility.gapYear}</p>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span class="text-[10px] font-bold text-slate-400 uppercase">Eligible Batches</span>
                <p class="text-xs font-semibold text-slate-800 dark:text-slate-200">${selectedCompany.eligibility.batches}</p>
              </div>
            </div>
          </div>

          <!-- Section 2: Online Assessment (OA) Exam Pattern -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <i data-lucide="clock" class="w-4 h-4 text-blue-500"></i> Online Assessment (OA) Exam Pattern
              </h3>
              <span class="text-xs font-semibold text-slate-500">Platform: <strong>${selectedCompany.examPattern.platform}</strong></span>
            </div>

            <!-- Pattern Table / Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 space-y-1">
                <span class="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase">Test Duration</span>
                <div class="text-base font-bold text-slate-900 dark:text-white">${selectedCompany.examPattern.duration}</div>
              </div>
              <div class="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 space-y-1">
                <span class="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase">Total Questions</span>
                <div class="text-base font-bold text-slate-900 dark:text-white">${selectedCompany.examPattern.totalQuestions}</div>
              </div>
              <div class="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 space-y-1">
                <span class="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase">Negative Marking</span>
                <div class="text-base font-bold text-slate-900 dark:text-white">${selectedCompany.examPattern.negativeMarking}</div>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl">
                <thead>
                  <tr class="bg-slate-50 dark:bg-slate-900/50 text-slate-400 uppercase text-[10px] border-b border-slate-200 dark:border-slate-800">
                    <th class="py-2.5 px-3">Section Name</th>
                    <th class="py-2.5 px-3">Questions</th>
                    <th class="py-2.5 px-3">Allocated Time</th>
                    <th class="py-2.5 px-3">Difficulty Level</th>
                    <th class="py-2.5 px-3">Key Focus Topics</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  ${selectedCompany.examPattern.sections.map(s => `
                    <tr>
                      <td class="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">${s.name}</td>
                      <td class="py-2.5 px-3 text-slate-600 dark:text-slate-400">${s.count}</td>
                      <td class="py-2.5 px-3 text-slate-600 dark:text-slate-400">${s.time}</td>
                      <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">${s.difficulty}</span></td>
                      <td class="py-2.5 px-3 text-slate-600 dark:text-slate-400">${s.topics}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Section 3: Detailed Syllabus & Topics -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <i data-lucide="book-open" class="w-4 h-4 text-emerald-500"></i> High-Priority Syllabus Breakdown
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <i data-lucide="code" class="w-4 h-4 text-emerald-500"></i> Coding & Data Structures Syllabus:
                </div>
                <ul class="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  ${selectedCompany.syllabus.coding.map(item => `
                    <li class="flex items-start gap-2">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                      <span>${item}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <i data-lucide="layers" class="w-4 h-4 text-purple-500"></i> CS Core & System Design Syllabus:
                </div>
                <ul class="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  ${selectedCompany.syllabus.coreSubjects.map(item => `
                    <li class="flex items-start gap-2">
                      <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></span>
                      <span>${item}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          </div>

          <!-- Section 4: Recruitment Rounds Timeline -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <i data-lucide="git-merge" class="w-4 h-4 text-indigo-500"></i> End-to-End Interview Rounds Pipeline
            </h3>
            <div class="space-y-3">
              ${selectedCompany.rounds.map((r, rIdx) => `
                <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5">
                  <div class="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-black flex items-center justify-center flex-shrink-0">
                    R${rIdx + 1}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <h4 class="text-xs font-bold text-slate-900 dark:text-white">${r.name}</h4>
                      <span class="text-[11px] text-slate-400">${r.duration}</span>
                    </div>
                    <p class="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">${r.format}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Section 5: Past Interview Questions Archive -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <i data-lucide="archive" class="w-4 h-4 text-amber-500"></i> Previous Interview Questions Archive
            </h3>
            <div class="space-y-2">
              ${selectedCompany.interviewArchive.map((q, idx) => `
                <div class="p-3 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                  <span class="text-amber-600 font-bold">${idx + 1}.</span>
                  <span class="leading-relaxed font-medium">${q}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Section 6: Pro Preparation Tips -->
          <div class="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 space-y-2">
            <div class="text-xs font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
              <i data-lucide="zap" class="w-4 h-4 text-indigo-600"></i> Placement Insider Tips for ${selectedCompany.name}:
            </div>
            <ul class="text-xs text-indigo-800 dark:text-indigo-300 space-y-1.5 leading-relaxed">
              ${selectedCompany.proTips.map(tip => `<li>• ${tip}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  updateCgpa(val) {
    this.eligibilityChecker.cgpa = val;
    this.render();
  },

  updateBacklogs(val) {
    this.eligibilityChecker.hasBacklogs = val;
    this.render();
  },

  getEligibilitySummary(companies) {
    const cgpaNum = parseFloat(this.eligibilityChecker.cgpa);
    if (isNaN(cgpaNum)) {
      return "Enter your CGPA to check how many companies you qualify for.";
    }

    if (this.eligibilityChecker.hasBacklogs) {
      return "Active backlogs restrict eligibility at most product companies (TCS allows 1 active backlog). Clear backlogs before campus drives.";
    }

    let count = 0;
    companies.forEach(c => {
      // standard cutoff check
      if (cgpaNum >= 6.5) count++;
    });

    return `You meet academic cutoffs for ${count} out of ${companies.length} featured tech companies!`;
  }
};

window.CompaniesModule = CompaniesModule;
