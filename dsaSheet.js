/**
 * Dedicated DSA Topic-Wise Preparation Sheet Module
 * Striver / NeetCode / Blind 75 style interactive sheet with full multi-language solutions,
 * progress metrics, status toggles, bookmarks, and personal notes.
 */

const DsaSheetModule = {
  activeTopicFilter: 'all',
  activeDifficultyFilter: 'all',
  activeStatusFilter: 'all',
  bookmarkedOnly: false,
  searchQuery: '',
  selectedProblemForSolution: null,
  activeCodeLanguage: 'cpp', // 'cpp' | 'java' | 'python'

  init() {
    this.render();
  },

  setFilter(type, value) {
    if (type === 'topic') this.activeTopicFilter = value;
    if (type === 'difficulty') this.activeDifficultyFilter = value;
    if (type === 'status') this.activeStatusFilter = value;
    this.render();
  },

  toggleBookmarkedFilter() {
    this.bookmarkedOnly = !this.bookmarkedOnly;
    this.render();
  },

  render() {
    const container = document.getElementById('module-container');
    if (!container) return;

    const sheet = window.DsaDB.getDsaSheet();
    const stats = window.DsaDB.getDsaStats();

    // Unique topics
    const topics = Array.from(new Set(sheet.map(p => p.topic)));

    // Filtering logic
    const filteredProblems = sheet.filter(p => {
      if (this.activeTopicFilter !== 'all' && p.topic !== this.activeTopicFilter) return false;
      if (this.activeDifficultyFilter !== 'all' && p.difficulty !== this.activeDifficultyFilter) return false;
      if (this.activeStatusFilter !== 'all' && p.status !== this.activeStatusFilter) return false;
      if (this.bookmarkedOnly && !p.bookmarked) return false;
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesCompany = p.companies.some(c => c.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany) return false;
      }
      return true;
    });

    container.innerHTML = `
      <div class="space-y-8 animate-fadeIn">
        <!-- Hero Header -->
        <div class="rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white p-8 md:p-10 shadow-xl relative overflow-hidden">
          <div class="relative z-10 max-w-3xl space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase">
              <i data-lucide="flame" class="w-3.5 h-3.5 text-yellow-300"></i> Top-Tier DSA Interview Sheet
            </div>
            <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight">
              Topic-Wise DSA Preparation Sheet
            </h1>
            <p class="text-amber-100 text-sm md:text-base leading-relaxed">
              Curated high-frequency algorithmic problems with detailed step-by-step intuition, time/space complexities, complete solutions in C++, Java, and Python, and personal progress tracking.
            </p>
            <div class="pt-2 flex flex-wrap items-center gap-3">
              <button
                onclick="DsaSheetModule.pickRandomProblem()"
                class="px-4 py-2 rounded-xl bg-white text-amber-700 font-bold text-xs hover:bg-amber-50 transition shadow-md flex items-center gap-2"
              >
                <i data-lucide="shuffle" class="w-4 h-4"></i> Pick Random Problem
              </button>
              <button
                onclick="DsaSheetModule.toggleBookmarkedFilter()"
                class="px-4 py-2 rounded-xl ${this.bookmarkedOnly ? 'bg-amber-900/60 text-white border border-amber-300' : 'bg-white/10 hover:bg-white/20 text-white'} text-xs font-bold transition flex items-center gap-2"
              >
                <i data-lucide="star" class="w-4 h-4 ${this.bookmarkedOnly ? 'fill-yellow-300 text-yellow-300' : ''}"></i>
                <span>${this.bookmarkedOnly ? 'Showing Starred Only' : 'Filter Starred'}</span>
              </button>
            </div>
          </div>
          <div class="absolute -right-10 -bottom-10 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        <!-- Metrics & Progress Overview Bar -->
        <div class="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <!-- Overall Progress -->
            <div class="space-y-1.5 flex-1">
              <div class="flex items-center justify-between text-xs font-bold">
                <span class="text-slate-700 dark:text-slate-300">Overall Sheet Progress</span>
                <span class="text-amber-600 dark:text-amber-400 font-black">${stats.solved} / ${stats.total} Solved (${stats.percentage}%)</span>
              </div>
              <div class="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
                <div class="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500" style="width: ${stats.percentage}%;"></div>
              </div>
            </div>

            <!-- Difficulty Breakdown Badges -->
            <div class="flex items-center gap-3">
              <div class="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-center">
                <div class="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase">Easy</div>
                <div class="text-xs font-black text-emerald-700 dark:text-emerald-300">${stats.easy.solved}/${stats.easy.total}</div>
              </div>
              <div class="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-center">
                <div class="text-[10px] font-bold text-amber-800 dark:text-amber-400 uppercase">Medium</div>
                <div class="text-xs font-black text-amber-700 dark:text-amber-300">${stats.medium.solved}/${stats.medium.total}</div>
              </div>
              <div class="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40 text-center">
                <div class="text-[10px] font-bold text-rose-800 dark:text-rose-400 uppercase">Hard</div>
                <div class="text-xs font-black text-rose-700 dark:text-rose-300">${stats.hard.solved}/${stats.hard.total}</div>
              </div>
            </div>
          </div>

          <!-- Topic Wise Progress Pills -->
          <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span class="text-[10px] font-bold text-slate-400 uppercase flex-shrink-0">Topic Progress:</span>
            ${Object.keys(stats.topicsMap).map(topic => {
              const data = stats.topicsMap[topic];
              const pct = Math.round((data.solved / data.total) * 100);
              return `
                <div class="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-medium flex items-center gap-2 flex-shrink-0">
                  <span class="text-slate-700 dark:text-slate-300">${topic}</span>
                  <span class="font-bold text-xs ${pct === 100 ? 'text-emerald-600' : 'text-slate-500'}">${data.solved}/${data.total}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Filter Controls -->
        <div class="glass-card rounded-2xl p-5 space-y-4 border border-slate-200 dark:border-slate-800">
          <div class="flex flex-col md:flex-row items-center justify-between gap-3">
            <div class="relative w-full md:w-80">
              <i data-lucide="search" class="w-4 h-4 absolute left-3 top-3 text-slate-400"></i>
              <input
                type="text"
                id="dsa-search-input"
                placeholder="Search problem or company (e.g. Kadane, Google)..."
                value="${this.searchQuery}"
                oninput="DsaSheetModule.handleSearch(this.value)"
                class="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <!-- Topic Dropdown -->
              <select
                onchange="DsaSheetModule.setFilter('topic', this.value)"
                class="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 outline-none"
              >
                <option value="all">All Topics (${sheet.length})</option>
                ${topics.map(t => `<option value="${t}" ${this.activeTopicFilter === t ? 'selected' : ''}>${t}</option>`).join('')}
              </select>

              <!-- Difficulty Dropdown -->
              <select
                onchange="DsaSheetModule.setFilter('difficulty', this.value)"
                class="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 outline-none"
              >
                <option value="all">All Difficulties</option>
                <option value="Easy" ${this.activeDifficultyFilter === 'Easy' ? 'selected' : ''}>Easy</option>
                <option value="Medium" ${this.activeDifficultyFilter === 'Medium' ? 'selected' : ''}>Medium</option>
                <option value="Hard" ${this.activeDifficultyFilter === 'Hard' ? 'selected' : ''}>Hard</option>
              </select>

              <!-- Status Dropdown -->
              <select
                onchange="DsaSheetModule.setFilter('status', this.value)"
                class="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="todo" ${this.activeStatusFilter === 'todo' ? 'selected' : ''}>To Do</option>
                <option value="in_progress" ${this.activeStatusFilter === 'in_progress' ? 'selected' : ''}>In Progress</option>
                <option value="done" ${this.activeStatusFilter === 'done' ? 'selected' : ''}>Solved</option>
                <option value="revision" ${this.activeStatusFilter === 'revision' ? 'selected' : ''}>Need Revision</option>
              </select>

              <button
                onclick="DsaSheetModule.resetFilters()"
                class="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1"
                title="Reset Filters"
              >
                <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> Reset
              </button>
            </div>
          </div>
        </div>

        <!-- Problems Table -->
        <div class="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th class="py-3 px-3 w-10 text-center">Status</th>
                  <th class="py-3 px-3">Problem Title</th>
                  <th class="py-3 px-3">Topic</th>
                  <th class="py-3 px-3">Difficulty</th>
                  <th class="py-3 px-3">Companies</th>
                  <th class="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
                ${filteredProblems.length === 0 ? `
                  <tr>
                    <td colspan="6" class="py-12 text-center text-slate-400">
                      No problems match the current filters.
                    </td>
                  </tr>
                ` : filteredProblems.map(p => this.renderProblemRow(p)).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  renderProblemRow(p) {
    const isDone = p.status === 'done';
    const isProgress = p.status === 'in_progress';
    const isRevision = p.status === 'revision';

    let diffBadge = 'badge-easy';
    if (p.difficulty === 'Medium') diffBadge = 'badge-medium';
    if (p.difficulty === 'Hard') diffBadge = 'badge-hard';

    return `
      <tr class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
        <!-- Status Toggle -->
        <td class="py-3.5 px-3 text-center">
          <select
            onchange="DsaSheetModule.updateStatus('${p.id}', this.value)"
            class="text-[11px] font-bold rounded-lg px-2 py-1 outline-none border cursor-pointer ${
              isDone ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300' :
              isProgress ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 text-blue-700 dark:text-blue-300' :
              isRevision ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 text-purple-700 dark:text-purple-300' :
              'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500'
            }"
          >
            <option value="todo" ${p.status === 'todo' ? 'selected' : ''}>○ To Do</option>
            <option value="in_progress" ${p.status === 'in_progress' ? 'selected' : ''}>◐ Working</option>
            <option value="done" ${p.status === 'done' ? 'selected' : ''}>● Solved</option>
            <option value="revision" ${p.status === 'revision' ? 'selected' : ''}>★ Revision</option>
          </select>
        </td>

        <!-- Problem Title & Star -->
        <td class="py-3.5 px-3 font-semibold text-slate-900 dark:text-slate-100">
          <div class="flex items-center gap-2">
            <button
              onclick="DsaSheetModule.toggleBookmark('${p.id}')"
              class="text-slate-300 dark:text-slate-600 hover:text-amber-500 transition"
              title="Bookmark / Star problem"
            >
              <i data-lucide="star" class="w-4 h-4 ${p.bookmarked ? 'fill-amber-400 text-amber-400' : ''}"></i>
            </button>
            <span class="${isDone ? 'line-through text-slate-400 dark:text-slate-500' : ''}">${p.title}</span>
          </div>
        </td>

        <!-- Topic -->
        <td class="py-3.5 px-3 text-slate-600 dark:text-slate-400 font-medium">
          <span class="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold">${p.topic}</span>
        </td>

        <!-- Difficulty -->
        <td class="py-3.5 px-3">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${diffBadge}">${p.difficulty}</span>
        </td>

        <!-- Companies -->
        <td class="py-3.5 px-3">
          <div class="flex flex-wrap gap-1 max-w-[200px]">
            ${p.companies.slice(0, 3).map(c => `
              <span class="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">${c}</span>
            `).join('')}
            ${p.companies.length > 3 ? `<span class="text-[10px] text-slate-400">+${p.companies.length - 3}</span>` : ''}
          </div>
        </td>

        <!-- Actions: Practice Link, Solution Modal, Notes Modal -->
        <td class="py-3.5 px-3 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button
              onclick="DsaSheetModule.openNotesModal('${p.id}')"
              class="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Personal Notes"
            >
              <i data-lucide="file-text" class="w-4 h-4"></i>
            </button>
            <a
              href="${p.practiceUrl}"
              target="_blank"
              class="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Solve on LeetCode / GFG"
            >
              <i data-lucide="external-link" class="w-4 h-4"></i>
            </a>
            <button
              onclick="DsaSheetModule.openSolutionModal('${p.id}')"
              class="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] transition shadow-sm"
            >
              Solution
            </button>
          </div>
        </td>
      </tr>
    `;
  },

  handleSearch(val) {
    this.searchQuery = val;
    this.render();
    const input = document.getElementById('dsa-search-input');
    if (input) {
      input.focus();
      input.setSelectionRange(val.length, val.length);
    }
  },

  resetFilters() {
    this.activeTopicFilter = 'all';
    this.activeDifficultyFilter = 'all';
    this.activeStatusFilter = 'all';
    this.bookmarkedOnly = false;
    this.searchQuery = '';
    this.render();
  },

  updateStatus(problemId, newStatus) {
    window.DsaDB.updateProblemStatus(problemId, newStatus);
    this.render();
  },

  toggleBookmark(problemId) {
    window.DsaDB.toggleDsaBookmark(problemId);
    this.render();
  },

  pickRandomProblem() {
    const sheet = window.DsaDB.getDsaSheet();
    const unsolved = sheet.filter(p => p.status !== 'done');
    const pool = unsolved.length > 0 ? unsolved : sheet;
    const random = pool[Math.floor(Math.random() * pool.length)];

    window.App.showToast(`🎯 Random Pick: ${random.title} (${random.topic})`, 'info');
    this.openSolutionModal(random.id);
  },

  openSolutionModal(problemId) {
    const sheet = window.DsaDB.getDsaSheet();
    const problem = sheet.find(p => p.id === problemId);
    if (!problem) return;

    this.selectedProblemForSolution = problem;
    const modal = document.getElementById('global-modal');
    const modalContent = document.getElementById('global-modal-content');

    modalContent.innerHTML = `
      <div class="p-6 md:p-8 space-y-6">
        <!-- Header -->
        <div class="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-amber-600 uppercase">${problem.topic}</span>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${problem.difficulty === 'Easy' ? 'badge-easy' : problem.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}">${problem.difficulty}</span>
            </div>
            <h2 class="text-2xl font-black text-slate-900 dark:text-white mt-1">${problem.title}</h2>
            <div class="flex items-center gap-2 mt-1 text-xs text-slate-400">
              <span>Asked by: ${problem.companies.join(', ')}</span>
            </div>
          </div>
          <button onclick="DsaSheetModule.closeModal()" class="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Problem Statement -->
        <div class="space-y-2">
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Problem Statement</h4>
          <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${problem.description}</p>
        </div>

        <!-- Approaches Breakdown -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div class="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <i data-lucide="arrow-right-circle" class="w-4 h-4 text-slate-400"></i> Brute Force Intuition:
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${problem.bruteForce}</p>
          </div>

          <div class="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-1.5">
            <div class="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <i data-lucide="zap" class="w-4 h-4 text-emerald-500"></i> Optimal Solution Approach:
            </div>
            <p class="text-xs text-emerald-900/80 dark:text-emerald-200/80 leading-relaxed">${problem.optimal}</p>
          </div>
        </div>

        <!-- Complexity Chips -->
        <div class="flex items-center gap-4 text-xs">
          <div class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
            <strong>Time Complexity:</strong> ${problem.timeComplexity}
          </div>
          <div class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
            <strong>Space Complexity:</strong> ${problem.spaceComplexity}
          </div>
        </div>

        <!-- Multi-language Code Box -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button
                onclick="DsaSheetModule.switchCodeLanguage('cpp')"
                class="px-3 py-1 rounded-lg text-xs font-bold transition ${this.activeCodeLanguage === 'cpp' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}"
              >C++</button>
              <button
                onclick="DsaSheetModule.switchCodeLanguage('java')"
                class="px-3 py-1 rounded-lg text-xs font-bold transition ${this.activeCodeLanguage === 'java' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}"
              >Java</button>
              <button
                onclick="DsaSheetModule.switchCodeLanguage('python')"
                class="px-3 py-1 rounded-lg text-xs font-bold transition ${this.activeCodeLanguage === 'python' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}"
              >Python</button>
            </div>
            <button
              onclick="DsaSheetModule.copyCurrentCode()"
              class="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5"
            >
              <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy Code
            </button>
          </div>

          <pre id="code-snippet-box" class="code-block text-xs font-mono select-all"><code>${this.escapeHtml(problem.code[this.activeCodeLanguage] || problem.code.cpp)}</code></pre>
        </div>

        <!-- Footer Actions -->
        <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <a
            href="${problem.practiceUrl}"
            target="_blank"
            class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 transition flex items-center gap-1.5"
          >
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i> Practice on LeetCode
          </a>
          <button
            onclick="DsaSheetModule.markSolvedFromModal('${problem.id}')"
            class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <i data-lucide="check-circle" class="w-4 h-4"></i> Mark as Solved
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  },

  switchCodeLanguage(lang) {
    this.activeCodeLanguage = lang;
    if (this.selectedProblemForSolution) {
      const box = document.getElementById('code-snippet-box');
      if (box) {
        box.innerHTML = `<code>${this.escapeHtml(this.selectedProblemForSolution.code[lang] || '')}</code>`;
      }
      this.openSolutionModal(this.selectedProblemForSolution.id);
    }
  },

  copyCurrentCode() {
    if (!this.selectedProblemForSolution) return;
    const code = this.selectedProblemForSolution.code[this.activeCodeLanguage];
    navigator.clipboard.writeText(code).then(() => {
      window.App.showToast('Code copied to clipboard! 📋', 'success');
    });
  },

  markSolvedFromModal(id) {
    this.updateStatus(id, 'done');
    this.closeModal();
    window.App.showToast('Problem marked as Solved! Keep up the momentum 🚀', 'success');
  },

  openNotesModal(problemId) {
    const sheet = window.DsaDB.getDsaSheet();
    const problem = sheet.find(p => p.id === problemId);
    if (!problem) return;

    const currentNotes = window.DsaDB.getProblemNotes(problemId);
    const modal = document.getElementById('global-modal');
    const modalContent = document.getElementById('global-modal-content');

    modalContent.innerHTML = `
      <div class="p-6 md:p-8 space-y-6">
        <div class="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div class="text-xs font-bold text-amber-600 uppercase">Personal Notes & Insights</div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">${problem.title}</h2>
          </div>
          <button onclick="DsaSheetModule.closeModal()" class="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Your notes, key traps, or reminders for this question:</label>
          <textarea
            id="user-problem-notes-input"
            rows="6"
            placeholder="e.g. Remember to handle negative numbers. The trick is to reset running sum to 0 when it drops below zero..."
            class="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed"
          >${currentNotes}</textarea>
        </div>

        <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button onclick="DsaSheetModule.closeModal()" class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 hover:bg-slate-100">
            Cancel
          </button>
          <button onclick="DsaSheetModule.saveNotes('${problem.id}')" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-md shadow-blue-500/20 flex items-center gap-1.5">
            <i data-lucide="save" class="w-3.5 h-3.5"></i> Save Notes
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  },

  saveNotes(problemId) {
    const input = document.getElementById('user-problem-notes-input');
    if (input) {
      window.DsaDB.saveProblemNotes(problemId, input.value);
      this.closeModal();
      window.App.showToast('Notes saved successfully! 📝', 'success');
    }
  },

  closeModal() {
    const modal = document.getElementById('global-modal');
    if (modal) modal.classList.add('hidden');
  },

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
};

window.DsaSheetModule = DsaSheetModule;
