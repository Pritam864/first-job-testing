/**
 * Job Portal Module
 * Handles job search, filtering, detail views, application flow, saved jobs, and custom job posting.
 */

const JobPortal = {
  currentTab: 'browse', // 'browse' | 'saved' | 'applications'
  activeFilters: {
    search: '',
    category: 'all',
    type: 'all',
    experience: 'all',
    workplace: 'all',
    quickFilter: 'all'
  },

  init() {
    this.render();
  },

  setTab(tab) {
    this.currentTab = tab;
    this.render();
  },

  setQuickFilter(filter) {
    this.activeFilters.quickFilter = filter;
    this.render();
  },

  render() {
    const container = document.getElementById('module-container');
    if (!container) return;

    const savedCount = window.JobsDB.getSavedJobIds().length;
    const appsCount = window.JobsDB.getApplications().length;

    container.innerHTML = `
      <div class="space-y-8 animate-fadeIn">
        <!-- Hero Header -->
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-8 md:p-12 shadow-xl">
          <div class="relative z-10 max-w-3xl space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase">
              <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              2,450+ Verified Tech Jobs & Internships
            </div>
            <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Land Your Dream Job at Top Tech Companies
            </h1>
            <p class="text-blue-100 text-sm md:text-base leading-relaxed">
              Explore curated software engineering, frontend, backend, data, and intern roles with transparent salaries, comprehensive hiring criteria, and direct easy-apply.
            </p>
            <div class="flex flex-wrap items-center gap-3 pt-2">
              <button onclick="JobPortal.openPostJobModal()" class="px-5 py-2.5 rounded-xl bg-white text-blue-700 font-semibold text-sm hover:bg-blue-50 transition shadow-lg flex items-center gap-2">
                <i data-lucide="plus-circle" class="w-4 h-4"></i> Post a Job (Recruiters)
              </button>
              <button onclick="JobPortal.setTab('saved')" class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-medium text-sm transition flex items-center gap-2">
                <i data-lucide="bookmark" class="w-4 h-4"></i> Saved Jobs (${savedCount})
              </button>
              <button onclick="JobPortal.setTab('applications')" class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-medium text-sm transition flex items-center gap-2">
                <i data-lucide="send" class="w-4 h-4"></i> My Applications (${appsCount})
              </button>
            </div>
          </div>
          <div class="absolute -right-10 -bottom-10 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <button onclick="JobPortal.setTab('browse')" class="px-4 py-2 rounded-xl text-sm font-semibold transition ${this.currentTab === 'browse' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}">
              Explore All Jobs
            </button>
            <button onclick="JobPortal.setTab('saved')" class="px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${this.currentTab === 'saved' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}">
              Saved Jobs <span class="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 font-bold">${savedCount}</span>
            </button>
            <button onclick="JobPortal.setTab('applications')" class="px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${this.currentTab === 'applications' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}">
              Application Tracker <span class="px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 font-bold">${appsCount}</span>
            </button>
          </div>
        </div>

        <!-- Tab Content -->
        ${this.currentTab === 'browse' ? this.renderBrowseSection() : ''}
        ${this.currentTab === 'saved' ? this.renderSavedSection() : ''}
        ${this.currentTab === 'applications' ? this.renderApplicationsSection() : ''}
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  renderBrowseSection() {
    const allJobs = window.JobsDB.getJobs();
    const savedIds = window.JobsDB.getSavedJobIds();

    // Filtering logic
    const filteredJobs = allJobs.filter(job => {
      // Search query
      if (this.activeFilters.search) {
        const query = this.activeFilters.search.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesSkills = job.skills.some(s => s.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCompany && !matchesSkills) return false;
      }

      // Category
      if (this.activeFilters.category !== 'all' && job.category !== this.activeFilters.category) {
        return false;
      }

      // Type
      if (this.activeFilters.type !== 'all' && job.type !== this.activeFilters.type) {
        return false;
      }

      // Workplace
      if (this.activeFilters.workplace !== 'all' && job.workplaceType !== this.activeFilters.workplace) {
        return false;
      }

      // Quick filter
      if (this.activeFilters.quickFilter === 'remote' && job.workplaceType !== 'Remote') return false;
      if (this.activeFilters.quickFilter === 'internship' && job.type !== 'Internship') return false;
      if (this.activeFilters.quickFilter === 'highSalary' && job.salaryNumeric < 20) return false;
      if (this.activeFilters.quickFilter === 'fresher' && !job.experience.toLowerCase().includes('fresher') && !job.experience.toLowerCase().includes('0-')) return false;

      return true;
    });

    return `
      <!-- Search & Filters Container -->
      <div class="glass-card rounded-2xl p-6 space-y-4">
        <!-- Search bar row -->
        <div class="flex flex-col md:flex-row gap-3">
          <div class="relative flex-1">
            <i data-lucide="search" class="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400"></i>
            <input
              type="text"
              id="job-search-input"
              value="${this.activeFilters.search}"
              oninput="JobPortal.handleSearch(this.value)"
              placeholder="Search by job title, company name, or skills (e.g. React, Python, SDE)..."
              class="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div class="flex flex-wrap gap-2">
            <!-- Category dropdown -->
            <select
              onchange="JobPortal.handleFilterChange('category', this.value)"
              class="px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Software Engineering" ${this.activeFilters.category === 'Software Engineering' ? 'selected' : ''}>Software Engineering</option>
              <option value="Frontend" ${this.activeFilters.category === 'Frontend' ? 'selected' : ''}>Frontend</option>
              <option value="Backend" ${this.activeFilters.category === 'Backend' ? 'selected' : ''}>Backend</option>
              <option value="Data & Analytics" ${this.activeFilters.category === 'Data & Analytics' ? 'selected' : ''}>Data & Analytics</option>
              <option value="DevOps & Cloud" ${this.activeFilters.category === 'DevOps & Cloud' ? 'selected' : ''}>DevOps & Cloud</option>
              <option value="AI & Machine Learning" ${this.activeFilters.category === 'AI & Machine Learning' ? 'selected' : ''}>AI & ML</option>
            </select>

            <!-- Job Type dropdown -->
            <select
              onchange="JobPortal.handleFilterChange('type', this.value)"
              class="px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="Full-time" ${this.activeFilters.type === 'Full-time' ? 'selected' : ''}>Full-time</option>
              <option value="Internship" ${this.activeFilters.type === 'Internship' ? 'selected' : ''}>Internship</option>
            </select>

            <!-- Workplace dropdown -->
            <select
              onchange="JobPortal.handleFilterChange('workplace', this.value)"
              class="px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Workplaces</option>
              <option value="Remote" ${this.activeFilters.workplace === 'Remote' ? 'selected' : ''}>Remote</option>
              <option value="Hybrid" ${this.activeFilters.workplace === 'Hybrid' ? 'selected' : ''}>Hybrid</option>
              <option value="On-site" ${this.activeFilters.workplace === 'On-site' ? 'selected' : ''}>On-site</option>
            </select>

            <button
              onclick="JobPortal.resetFilters()"
              class="px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5"
              title="Reset Filters"
            >
              <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Reset
            </button>
          </div>
        </div>

        <!-- Quick filter pills -->
        <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <span class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Quick Filters:</span>
          <button
            onclick="JobPortal.setQuickFilter('all')"
            class="px-3 py-1 rounded-full text-xs font-medium transition ${this.activeFilters.quickFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}"
          >All Jobs</button>
          <button
            onclick="JobPortal.setQuickFilter('fresher')"
            class="px-3 py-1 rounded-full text-xs font-medium transition ${this.activeFilters.quickFilter === 'fresher' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}"
          >Freshers / 0-2 Yrs</button>
          <button
            onclick="JobPortal.setQuickFilter('internship')"
            class="px-3 py-1 rounded-full text-xs font-medium transition ${this.activeFilters.quickFilter === 'internship' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}"
          >Internships</button>
          <button
            onclick="JobPortal.setQuickFilter('remote')"
            class="px-3 py-1 rounded-full text-xs font-medium transition ${this.activeFilters.quickFilter === 'remote' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}"
          >Remote Only</button>
          <button
            onclick="JobPortal.setQuickFilter('highSalary')"
            class="px-3 py-1 rounded-full text-xs font-medium transition ${this.activeFilters.quickFilter === 'highSalary' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}"
          >₹20+ LPA Tier</button>
        </div>
      </div>

      <!-- Result Count -->
      <div class="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 px-1">
        <div>Showing <strong class="text-slate-900 dark:text-slate-200">${filteredJobs.length}</strong> matching openings</div>
      </div>

      <!-- Job Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        ${filteredJobs.length === 0 ? `
          <div class="col-span-2 text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 space-y-3">
            <i data-lucide="briefcase-off" class="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600"></i>
            <h3 class="text-base font-semibold text-slate-800 dark:text-slate-200">No matching jobs found</h3>
            <p class="text-sm text-slate-500 max-w-sm mx-auto">Try resetting filters or searching with broader keywords like 'SDE' or 'Engineer'.</p>
            <button onclick="JobPortal.resetFilters()" class="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition">Reset All Filters</button>
          </div>
        ` : filteredJobs.map(job => this.renderJobCard(job, savedIds.includes(job.id))).join('')}
      </div>
    `;
  },

  renderJobCard(job, isSaved) {
    return `
      <div class="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-blue-400 dark:hover:border-blue-500 transition-all group">
        <div class="space-y-4">
          <!-- Top Row: Logo, Company, Title, Bookmark -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-3.5">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white shadow-sm flex-shrink-0 ${job.companyColor || 'bg-blue-600'}">
                ${job.companyInitial || job.company.charAt(0)}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">${job.company}</span>
                  ${job.featured ? `<span class="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-[10px] font-bold tracking-wider">FEATURED</span>` : ''}
                </div>
                <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug">
                  ${job.title}
                </h3>
              </div>
            </div>
            <button
              onclick="JobPortal.toggleSave('${job.id}')"
              class="p-2 rounded-xl text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-slate-800 transition flex-shrink-0"
              title="${isSaved ? 'Remove from saved' : 'Save job'}"
            >
              <i data-lucide="bookmark" class="w-5 h-5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}"></i>
            </button>
          </div>

          <!-- Badges Row: Location, Type, Workplace, Experience -->
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400"></i> ${job.location}
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium">
              <i data-lucide="briefcase" class="w-3.5 h-3.5"></i> ${job.type}
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 font-medium">
              <i data-lucide="wifi" class="w-3.5 h-3.5"></i> ${job.workplaceType}
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
              <i data-lucide="user-check" class="w-3.5 h-3.5"></i> ${job.experience}
            </span>
          </div>

          <!-- Description preview -->
          <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            ${job.description}
          </p>

          <!-- Skills tags -->
          <div class="flex flex-wrap gap-1.5 pt-1">
            ${job.skills.slice(0, 4).map(skill => `
              <span class="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                ${skill}
              </span>
            `).join('')}
            ${job.skills.length > 4 ? `
              <span class="px-1.5 py-0.5 rounded-md text-[11px] font-medium text-slate-400">
                +${job.skills.length - 4} more
              </span>
            ` : ''}
          </div>
        </div>

        <!-- Footer: Salary & Actions -->
        <div class="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <div class="text-[11px] text-slate-400 uppercase font-medium">Offered Compensation</div>
            <div class="text-base font-extrabold text-slate-900 dark:text-white text-emerald-600 dark:text-emerald-400">
              ${job.salary}
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              onclick="JobPortal.openJobDetails('${job.id}')"
              class="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              Details
            </button>
            <button
              onclick="JobPortal.openApplyModal('${job.id}')"
              class="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm flex items-center gap-1.5"
            >
              <i data-lucide="send" class="w-3.5 h-3.5"></i> Easy Apply
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderSavedSection() {
    const allJobs = window.JobsDB.getJobs();
    const savedIds = window.JobsDB.getSavedJobIds();
    const savedJobs = allJobs.filter(j => savedIds.includes(j.id));

    if (savedJobs.length === 0) {
      return `
        <div class="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 space-y-4">
          <div class="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 mx-auto flex items-center justify-center">
            <i data-lucide="bookmark" class="w-8 h-8"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">No Saved Jobs Yet</h3>
          <p class="text-sm text-slate-500 max-w-md mx-auto">
            Click the bookmark icon on any job card in the explore tab to save it for quick review and one-click application.
          </p>
          <button onclick="JobPortal.setTab('browse')" class="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
            Explore Open Positions
          </button>
        </div>
      `;
    }

    return `
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Your Bookmarked Openings (${savedJobs.length})</h2>
          <button onclick="JobPortal.setTab('browse')" class="text-sm font-medium text-blue-600 hover:underline">Back to All Jobs</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          ${savedJobs.map(job => this.renderJobCard(job, true)).join('')}
        </div>
      </div>
    `;
  },

  renderApplicationsSection() {
    const apps = window.JobsDB.getApplications();

    if (apps.length === 0) {
      return `
        <div class="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 space-y-4">
          <div class="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 mx-auto flex items-center justify-center">
            <i data-lucide="send" class="w-8 h-8"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">No Applications Submitted Yet</h3>
          <p class="text-sm text-slate-500 max-w-md mx-auto">
            Use "Easy Apply" on any job opening to submit your application. You will be able to track status updates right here.
          </p>
          <button onclick="JobPortal.setTab('browse')" class="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
            Browse Jobs Now
          </button>
        </div>
      `;
    }

    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Application Pipeline (${apps.length})</h2>
            <p class="text-xs text-slate-500">Track and monitor your ongoing interview and screening stages.</p>
          </div>
        </div>

        <div class="space-y-4">
          ${apps.map(app => `
            <div class="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="space-y-2">
                <div class="flex items-center gap-3">
                  <span class="px-2.5 py-1 rounded-full text-xs font-semibold ${
                    app.status === 'Offer Received' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                    app.status === 'Interview Scheduled' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  }">
                    ● ${app.status}
                  </span>
                  <span class="text-xs text-slate-400">Applied on: ${app.appliedAt}</span>
                </div>
                <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">${app.jobTitle}</h3>
                <div class="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-3">
                  <span><strong>Company:</strong> ${app.company}</span>
                  <span>•</span>
                  <span><strong>Candidate:</strong> ${app.fullName}</span>
                  <span>•</span>
                  <span><strong>Email:</strong> ${app.email}</span>
                </div>
              </div>
              <div class="flex items-center gap-2 self-start md:self-center">
                <span class="text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                  Resume: ${app.resumeName || 'Attached'}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  handleSearch(val) {
    this.activeFilters.search = val;
    this.render();
    // refocus input
    const input = document.getElementById('job-search-input');
    if (input) {
      input.focus();
      input.setSelectionRange(val.length, val.length);
    }
  },

  handleFilterChange(field, val) {
    this.activeFilters[field] = val;
    this.render();
  },

  resetFilters() {
    this.activeFilters = {
      search: '',
      category: 'all',
      type: 'all',
      experience: 'all',
      workplace: 'all',
      quickFilter: 'all'
    };
    this.render();
  },

  toggleSave(jobId) {
    const isSaved = window.JobsDB.toggleSaveJob(jobId);
    window.App.showToast(isSaved ? 'Job saved to your bookmarks!' : 'Job removed from bookmarks', 'info');
    this.render();
  },

  openJobDetails(jobId) {
    const job = window.JobsDB.getJobs().find(j => j.id === jobId);
    if (!job) return;

    const modal = document.getElementById('global-modal');
    const modalContent = document.getElementById('global-modal-content');

    modalContent.innerHTML = `
      <div class="p-6 md:p-8 space-y-6">
        <!-- Header -->
        <div class="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl text-white ${job.companyColor || 'bg-blue-600'} flex-shrink-0">
              ${job.companyInitial || job.company.charAt(0)}
            </div>
            <div>
              <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">${job.company}</span>
              <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">${job.title}</h2>
              <div class="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-500">
                <span>📍 ${job.location}</span>
                <span>•</span>
                <span>💼 ${job.type} (${job.workplaceType})</span>
                <span>•</span>
                <span>⏳ ${job.experience}</span>
              </div>
            </div>
          </div>
          <button onclick="JobPortal.closeModal()" class="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Compensation Banner -->
        <div class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-between">
          <div>
            <div class="text-xs text-emerald-800 dark:text-emerald-400 font-semibold uppercase">Offered Compensation</div>
            <div class="text-xl font-black text-emerald-700 dark:text-emerald-300">${job.salary}</div>
          </div>
          <div class="text-xs text-emerald-600 dark:text-emerald-400 font-medium text-right">
            <span>Posted ${job.postedDate}</span><br>
            <span>Deadline: ${job.deadline}</span>
          </div>
        </div>

        <!-- About Job -->
        <div class="space-y-3">
          <h4 class="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">About the Role</h4>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${job.description}</p>
        </div>

        <!-- Key Responsibilities -->
        <div class="space-y-3">
          <h4 class="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Key Responsibilities</h4>
          <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            ${job.responsibilities.map(r => `
              <li class="flex items-start gap-2.5">
                <i data-lucide="check-circle-2" class="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5"></i>
                <span>${r}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Requirements -->
        <div class="space-y-3">
          <h4 class="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Qualifications & Requirements</h4>
          <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            ${job.requirements.map(req => `
              <li class="flex items-start gap-2.5">
                <i data-lucide="arrow-right-circle" class="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5"></i>
                <span>${req}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Tech Stack -->
        <div class="space-y-2">
          <h4 class="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Skills & Technologies</h4>
          <div class="flex flex-wrap gap-2">
            ${job.skills.map(s => `
              <span class="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200">${s}</span>
            `).join('')}
          </div>
        </div>

        <!-- Perks -->
        <div class="space-y-3">
          <h4 class="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Perks & Benefits</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
            ${job.perks.map(p => `
              <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <i data-lucide="gift" class="w-4 h-4 text-purple-500 flex-shrink-0"></i>
                <span>${p}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button onclick="JobPortal.closeModal()" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">
            Close
          </button>
          <button onclick="JobPortal.closeModal(); JobPortal.openApplyModal('${job.id}')" class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2">
            <i data-lucide="send" class="w-4 h-4"></i> Apply Now
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  },

  openApplyModal(jobId) {
    const job = window.JobsDB.getJobs().find(j => j.id === jobId);
    if (!job) return;

    const modal = document.getElementById('global-modal');
    const modalContent = document.getElementById('global-modal-content');

    modalContent.innerHTML = `
      <div class="p-6 md:p-8 space-y-6">
        <div class="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div class="text-xs font-semibold text-blue-600 uppercase">1-Click Easy Apply</div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">${job.title}</h2>
            <p class="text-xs text-slate-500">${job.company} • ${job.location}</p>
          </div>
          <button onclick="JobPortal.closeModal()" class="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form onsubmit="JobPortal.handleApplicationSubmit(event, '${job.id}')" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
              <input type="text" required name="fullName" placeholder="e.g. Rahul Sharma" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
              <input type="email" required name="email" placeholder="rahul@example.com" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
              <input type="tel" required name="phone" placeholder="+91 98765 43210" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Graduation Batch / Year *</label>
              <select name="gradYear" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="2027">2027 (Pre-final year)</option>
                <option value="2026" selected>2026 (Final year)</option>
                <option value="2025">2025 (Fresh Graduate)</option>
                <option value="2024">2024 or earlier (Experienced)</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">LinkedIn Profile</label>
              <input type="url" name="linkedin" placeholder="https://linkedin.com/in/username" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">GitHub / Portfolio</label>
              <input type="url" name="github" placeholder="https://github.com/username" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <!-- Resume Upload Simulation -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Upload Resume (PDF, DOCX) *</label>
            <div class="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-900/50 transition cursor-pointer">
              <i data-lucide="upload-cloud" class="w-8 h-8 mx-auto text-blue-500 mb-1"></i>
              <div class="text-xs font-semibold text-slate-700 dark:text-slate-200">Rahul_Sharma_Resume_2026.pdf</div>
              <div class="text-[11px] text-slate-400 mt-0.5">Click or drag new file to replace (Max 5MB)</div>
            </div>
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Why are you a great fit? (Optional)</label>
            <textarea name="coverNote" rows="2" placeholder="Highlight your relevant projects, LeetCode rank, or internship achievements..." class="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
          </div>

          <!-- Actions -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <button type="button" onclick="JobPortal.closeModal()" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">
              Cancel
            </button>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2">
              <i data-lucide="check-circle" class="w-4 h-4"></i> Submit Application
            </button>
          </div>
        </form>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  },

  handleApplicationSubmit(event, jobId) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const job = window.JobsDB.getJobs().find(j => j.id === jobId);

    const application = {
      jobId,
      jobTitle: job ? job.title : 'Software Role',
      company: job ? job.company : 'Tech Corp',
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      gradYear: formData.get('gradYear'),
      linkedin: formData.get('linkedin'),
      github: formData.get('github'),
      resumeName: 'Resume_' + formData.get('fullName').replace(/\s+/g, '_') + '.pdf',
      coverNote: formData.get('coverNote')
    };

    window.JobsDB.submitJobApplication(application);
    this.closeModal();
    window.App.showToast(`🎉 Application successfully submitted to ${job.company}!`, 'success');
    this.setTab('applications');
  },

  openPostJobModal() {
    const modal = document.getElementById('global-modal');
    const modalContent = document.getElementById('global-modal-content');

    modalContent.innerHTML = `
      <div class="p-6 md:p-8 space-y-6">
        <div class="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div class="text-xs font-semibold text-blue-600 uppercase">Recruiter Portal</div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">Post a New Job Opening</h2>
            <p class="text-xs text-slate-500">Reach 50,000+ vetted student developers and engineers.</p>
          </div>
          <button onclick="JobPortal.closeModal()" class="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form onsubmit="JobPortal.handlePostJobSubmit(event)" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name *</label>
              <input type="text" required name="company" placeholder="e.g. Stripe, Postman, Flipkart" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Role / Title *</label>
              <input type="text" required name="title" placeholder="e.g. Full Stack Developer, SDE-1" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Category *</label>
              <select name="category" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="Software Engineering">Software Engineering</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Data & Analytics">Data & Analytics</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Type *</label>
              <select name="type" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Workplace *</label>
              <select name="workplaceType" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Location *</label>
              <input type="text" required name="location" placeholder="e.g. Bangalore, India / Remote" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Offered Salary / CTC *</label>
              <input type="text" required name="salary" placeholder="e.g. ₹15 - ₹20 LPA" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Required Skills (Comma separated) *</label>
            <input type="text" required name="skills" placeholder="e.g. React, Node.js, PostgreSQL, Docker" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Description *</label>
            <textarea required name="description" rows="3" placeholder="Provide an overview of the role, challenges, and team..." class="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
          </div>

          <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <button type="button" onclick="JobPortal.closeModal()" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">
              Cancel
            </button>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2">
              <i data-lucide="plus" class="w-4 h-4"></i> Publish Job Opening
            </button>
          </div>
        </form>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  },

  handlePostJobSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const colors = ['bg-blue-600', 'bg-indigo-600', 'bg-purple-600', 'bg-emerald-600', 'bg-rose-600', 'bg-cyan-600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newJob = {
      id: 'job-custom-' + Date.now(),
      title: formData.get('title'),
      company: formData.get('company'),
      companyInitial: formData.get('company').charAt(0).toUpperCase(),
      companyColor: randomColor,
      category: formData.get('category'),
      type: formData.get('type'),
      workplaceType: formData.get('workplaceType'),
      location: formData.get('location'),
      salary: formData.get('salary'),
      salaryNumeric: 18,
      experience: "0-3 Years",
      featured: true,
      postedDate: "Just now",
      deadline: "30 days left",
      skills: formData.get('skills').split(',').map(s => s.trim()).filter(Boolean),
      description: formData.get('description'),
      responsibilities: [
        "Develop high-quality features adhering to company standards.",
        "Collaborate with product and cross-functional teams.",
        "Participate in design and architectural discussions."
      ],
      requirements: [
        "Strong understanding of core Computer Science principles.",
        "Hands-on experience in the required tech stack."
      ],
      perks: [
        "Competitive compensation package",
        "Learning and conference sponsorship",
        "Flexible working arrangement"
      ]
    };

    window.JobsDB.saveJobToStorage(newJob);
    this.closeModal();
    window.App.showToast(`✨ Successfully posted ${newJob.title} at ${newJob.company}!`, 'success');
    this.setTab('browse');
  },

  closeModal() {
    const modal = document.getElementById('global-modal');
    if (modal) modal.classList.add('hidden');
  }
};

window.JobPortal = JobPortal;
