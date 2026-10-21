/**
 * Preparation Hub Module
 * Interactive Notes, Formulas, Practice Quizzes, Flashcards, and STAR Guide
 * Covers: Aptitude, Technical (CS Core), HR, and DSA Conceptual Foundations.
 */

const PrepHub = {
  activePillar: 'aptitude', // 'aptitude' | 'technical' | 'hr' | 'dsa_cheatsheet'
  selectedAptitudeTopic: null,
  selectedTechSubject: 'os',
  quizState: {
    active: false,
    questions: [],
    currentIndex: 0,
    selectedOption: null,
    isSubmitted: false,
    score: 0,
    userAnswers: []
  },
  flashcardIndex: 0,
  flashcardFlipped: false,

  init() {
    this.selectedAptitudeTopic = window.PrepDB.AptitudeData.topics[0].id;
    this.render();
  },

  setPillar(pillar) {
    this.activePillar = pillar;
    this.quizState.active = false;
    this.flashcardIndex = 0;
    this.flashcardFlipped = false;
    this.render();
  },

  render() {
    const container = document.getElementById('module-container');
    if (!container) return;

    container.innerHTML = `
      <div class="space-y-8 animate-fadeIn">
        <!-- Header Banner -->
        <div class="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-8 md:p-10 shadow-xl relative overflow-hidden">
          <div class="relative z-10 max-w-3xl space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase">
              <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Comprehensive Placement Kit
            </div>
            <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight">
              Placement Preparation Hub
            </h1>
            <p class="text-emerald-100 text-sm md:text-base leading-relaxed">
              Master Aptitude shortcuts, review core CS fundamentals (OS, DBMS, Networks, System Design), tackle STAR behavioral HR questions, and reference algorithmic Big-O cheatsheets.
            </p>
          </div>
          <div class="absolute -right-10 -bottom-10 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        <!-- Pillar Selector Tabs -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onclick="PrepHub.setPillar('aptitude')"
            class="p-4 rounded-2xl border text-left transition flex items-center gap-3.5 ${this.activePillar === 'aptitude' ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20' : 'glass-card border-slate-200 dark:border-slate-800 hover:border-emerald-400'}"
          >
            <div class="w-10 h-10 rounded-xl flex items-center justify-center ${this.activePillar === 'aptitude' ? 'bg-white/20' : 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600'}">
              <i data-lucide="calculator" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="text-sm font-bold">1. Aptitude</div>
              <div class="text-xs ${this.activePillar === 'aptitude' ? 'text-emerald-100' : 'text-slate-500'}">Quant, Logical, Verbal</div>
            </div>
          </button>

          <button
            onclick="PrepHub.setPillar('technical')"
            class="p-4 rounded-2xl border text-left transition flex items-center gap-3.5 ${this.activePillar === 'technical' ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20' : 'glass-card border-slate-200 dark:border-slate-800 hover:border-blue-400'}"
          >
            <div class="w-10 h-10 rounded-xl flex items-center justify-center ${this.activePillar === 'technical' ? 'bg-white/20' : 'bg-blue-100 dark:bg-blue-950/40 text-blue-600'}">
              <i data-lucide="binary" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="text-sm font-bold">2. CS Core</div>
              <div class="text-xs ${this.activePillar === 'technical' ? 'text-blue-100' : 'text-slate-500'}">OS, DBMS, CN, System Design</div>
            </div>
          </button>

          <button
            onclick="PrepHub.setPillar('hr')"
            class="p-4 rounded-2xl border text-left transition flex items-center gap-3.5 ${this.activePillar === 'hr' ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20' : 'glass-card border-slate-200 dark:border-slate-800 hover:border-purple-400'}"
          >
            <div class="w-10 h-10 rounded-xl flex items-center justify-center ${this.activePillar === 'hr' ? 'bg-white/20' : 'bg-purple-100 dark:bg-purple-950/40 text-purple-600'}">
              <i data-lucide="users" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="text-sm font-bold">3. HR & Behavioral</div>
              <div class="text-xs ${this.activePillar === 'hr' ? 'text-purple-100' : 'text-slate-500'}">STAR Method, Top Q&A</div>
            </div>
          </button>

          <button
            onclick="PrepHub.setPillar('dsa_cheatsheet')"
            class="p-4 rounded-2xl border text-left transition flex items-center gap-3.5 ${this.activePillar === 'dsa_cheatsheet' ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20' : 'glass-card border-slate-200 dark:border-slate-800 hover:border-amber-400'}"
          >
            <div class="w-10 h-10 rounded-xl flex items-center justify-center ${this.activePillar === 'dsa_cheatsheet' ? 'bg-white/20' : 'bg-amber-100 dark:bg-amber-950/40 text-amber-600'}">
              <i data-lucide="zap" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="text-sm font-bold">4. DSA Cheatsheet</div>
              <div class="text-xs ${this.activePillar === 'dsa_cheatsheet' ? 'text-amber-100' : 'text-slate-500'}">Big-O & Patterns</div>
            </div>
          </button>
        </div>

        <!-- Dynamic Content Body -->
        <div id="pillar-content">
          ${this.renderActivePillarContent()}
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  },

  renderActivePillarContent() {
    switch (this.activePillar) {
      case 'aptitude': return this.renderAptitudeSection();
      case 'technical': return this.renderTechnicalSection();
      case 'hr': return this.renderHrSection();
      case 'dsa_cheatsheet': return this.renderDsaCheatsheetSection();
      default: return '';
    }
  },

  // -------------------------------------------------------------
  // PILLAR 1: APTITUDE (Notes & Interactive Quiz Engine)
  // -------------------------------------------------------------
  renderAptitudeSection() {
    const topics = window.PrepDB.AptitudeData.topics;
    const currentTopic = topics.find(t => t.id === this.selectedAptitudeTopic) || topics[0];

    // If quiz mode is active
    if (this.quizState.active) {
      return this.renderQuizMode();
    }

    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Left: Topics Sidebar -->
        <div class="lg:col-span-4 space-y-4">
          <div class="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Aptitude Modules</h3>
            <div class="space-y-2">
              ${topics.map(t => `
                <button
                  onclick="PrepHub.selectAptitudeTopic('${t.id}')"
                  class="w-full text-left p-3 rounded-xl transition text-sm font-semibold flex items-center justify-between ${t.id === currentTopic.id ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'}"
                >
                  <div class="flex items-center gap-2.5">
                    <span class="w-2 h-2 rounded-full ${t.category === 'Quantitative' ? 'bg-blue-500' : t.category === 'Logical' ? 'bg-purple-500' : 'bg-amber-500'}"></span>
                    <span>${t.title}</span>
                  </div>
                  <span class="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">${t.category}</span>
                </button>
              `).join('')}
            </div>

            <!-- Start Topic Quiz Button -->
            <div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onclick="PrepHub.startQuiz('${currentTopic.id}')"
                class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <i data-lucide="play" class="w-4 h-4"></i> Start Practice Quiz (${currentTopic.practiceQuestions.length} Questions)
              </button>
            </div>
          </div>
        </div>

        <!-- Right: Topic Notes & Formulas -->
        <div class="lg:col-span-8 space-y-6">
          <div class="glass-card rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
            <div class="flex items-start justify-between">
              <div>
                <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">${currentTopic.category} Aptitude</span>
                <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">${currentTopic.title}</h2>
                <p class="text-xs text-slate-500 mt-1">${currentTopic.summary}</p>
              </div>
              <button
                onclick="PrepHub.startQuiz('${currentTopic.id}')"
                class="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition flex items-center gap-1.5"
              >
                <i data-lucide="play" class="w-3.5 h-3.5"></i> Test Yourself
              </button>
            </div>

            <!-- Important Formulas -->
            ${currentTopic.formulas && currentTopic.formulas.length > 0 ? `
              <div class="space-y-3">
                <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <i data-lucide="bookmark-check" class="w-4 h-4 text-emerald-500"></i> Core Formulas & Shortcuts
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  ${currentTopic.formulas.map(f => `
                    <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div class="text-xs font-semibold text-slate-700 dark:text-slate-300">${f.label}</div>
                      <div class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800/80 p-2 rounded-lg border border-slate-100 dark:border-slate-700/60">
                        ${f.formula}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Key Conceptual Notes -->
            <div class="space-y-3">
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <i data-lucide="lightbulb" class="w-4 h-4 text-amber-500"></i> High-Yield Solving Tricks & Rules
              </h4>
              <ul class="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                ${currentTopic.keyNotes.map(note => `
                  <li class="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                    <span class="leading-relaxed">${note}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Sample Solved Practice Problems Preview -->
            <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <i data-lucide="help-circle" class="w-4 h-4 text-blue-500"></i> Sample Solved Examples
              </h4>
              <div class="space-y-4">
                ${currentTopic.practiceQuestions.map((q, idx) => `
                  <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div class="flex items-start gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                      <span class="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">Q${idx + 1}</span>
                      <span class="leading-relaxed">${q.question.replace(/\n/g, '<br>')}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 text-xs">
                      ${q.options.map((opt, oIdx) => `
                        <div class="p-2 rounded-lg border ${oIdx === q.correct ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 font-semibold' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}">
                          ${String.fromCharCode(65 + oIdx)}. ${opt} ${oIdx === q.correct ? '✓ (Correct)' : ''}
                        </div>
                      `).join('')}
                    </div>
                    <div class="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 text-[11px] text-emerald-900 dark:text-emerald-300 leading-relaxed border border-emerald-100 dark:border-emerald-900/30">
                      <strong>Detailed Explanation:</strong> ${q.explanation}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  selectAptitudeTopic(topicId) {
    this.selectedAptitudeTopic = topicId;
    this.render();
  },

  startQuiz(topicId) {
    const topic = window.PrepDB.AptitudeData.topics.find(t => t.id === topicId);
    if (!topic || !topic.practiceQuestions || topic.practiceQuestions.length === 0) return;

    this.quizState = {
      active: true,
      topicTitle: topic.title,
      questions: topic.practiceQuestions,
      currentIndex: 0,
      selectedOption: null,
      isSubmitted: false,
      score: 0,
      userAnswers: []
    };
    this.render();
  },

  renderQuizMode() {
    const q = this.quizState.questions[this.quizState.currentIndex];
    const total = this.quizState.questions.length;
    const progress = Math.round(((this.quizState.currentIndex) / total) * 100);

    // If quiz is finished
    if (this.quizState.currentIndex >= total) {
      return `
        <div class="max-w-2xl mx-auto glass-card rounded-3xl p-8 md:p-10 text-center space-y-6">
          <div class="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 mx-auto flex items-center justify-center">
            <i data-lucide="award" class="w-10 h-10"></i>
          </div>
          <div class="space-y-2">
            <h2 class="text-2xl font-black text-slate-900 dark:text-white">Quiz Completed!</h2>
            <p class="text-sm text-slate-500">You scored <strong>${this.quizState.score} out of ${total}</strong> (${Math.round((this.quizState.score / total) * 100)}%)</p>
          </div>
          <div class="flex items-center justify-center gap-3 pt-4">
            <button
              onclick="PrepHub.startQuiz('${this.selectedAptitudeTopic}')"
              class="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-200"
            >
              Retry Quiz
            </button>
            <button
              onclick="PrepHub.quizState.active = false; PrepHub.render();"
              class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-500/20"
            >
              Back to Study Notes
            </button>
          </div>
        </div>
      `;
    }

    return `
      <div class="max-w-3xl mx-auto glass-card rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        <!-- Progress Bar & Top Bar -->
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span class="text-xs font-bold text-emerald-600 uppercase">Live Practice</span>
            <h3 class="text-sm font-bold text-slate-800 dark:text-slate-200">${this.quizState.topicTitle}</h3>
          </div>
          <div class="text-right">
            <div class="text-xs font-semibold text-slate-500">Question ${this.quizState.currentIndex + 1} of ${total}</div>
            <div class="text-xs text-emerald-600 font-bold">Score: ${this.quizState.score}</div>
          </div>
        </div>

        <!-- Question -->
        <div class="text-base font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
          ${q.question.replace(/\n/g, '<br>')}
        </div>

        <!-- Options -->
        <div class="space-y-3">
          ${q.options.map((opt, idx) => {
            let optionClass = "border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300";
            if (this.quizState.isSubmitted) {
              if (idx === q.correct) {
                optionClass = "bg-emerald-100 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold";
              } else if (idx === this.quizState.selectedOption) {
                optionClass = "bg-rose-100 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200 font-bold";
              } else {
                optionClass = "opacity-50 border-slate-200 dark:border-slate-800";
              }
            } else if (this.quizState.selectedOption === idx) {
              optionClass = "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-semibold";
            }

            return `
              <button
                ${this.quizState.isSubmitted ? 'disabled' : ''}
                onclick="PrepHub.selectQuizOption(${idx})"
                class="w-full text-left p-4 rounded-xl border text-sm transition flex items-center justify-between ${optionClass}"
              >
                <div class="flex items-center gap-3">
                  <span class="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${this.quizState.selectedOption === idx ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-300 text-slate-500'}">
                    ${String.fromCharCode(65 + idx)}
                  </span>
                  <span>${opt}</span>
                </div>
                ${this.quizState.isSubmitted && idx === q.correct ? `<i data-lucide="check" class="w-5 h-5 text-emerald-600"></i>` : ''}
                ${this.quizState.isSubmitted && idx === this.quizState.selectedOption && idx !== q.correct ? `<i data-lucide="x" class="w-5 h-5 text-rose-600"></i>` : ''}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Explanation (Shown after submit) -->
        ${this.quizState.isSubmitted ? `
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 animate-fadeIn">
            <div class="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <i data-lucide="info" class="w-4 h-4 text-emerald-500"></i> Solution Breakdown:
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${q.explanation}</p>
          </div>
        ` : ''}

        <!-- Actions -->
        <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onclick="PrepHub.quizState.active = false; PrepHub.render();"
            class="text-xs text-slate-500 hover:text-slate-800 transition"
          >
            Exit Quiz
          </button>
          ${!this.quizState.isSubmitted ? `
            <button
              ${this.quizState.selectedOption === null ? 'disabled' : ''}
              onclick="PrepHub.submitQuizAnswer()"
              class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold transition shadow-md shadow-emerald-500/20"
            >
              Submit Answer
            </button>
          ` : `
            <button
              onclick="PrepHub.nextQuizQuestion()"
              class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-md shadow-blue-500/20 flex items-center gap-1.5"
            >
              <span>Next Question</span> <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          `}
        </div>
      </div>
    `;
  },

  selectQuizOption(idx) {
    if (this.quizState.isSubmitted) return;
    this.quizState.selectedOption = idx;
    this.render();
  },

  submitQuizAnswer() {
    if (this.quizState.selectedOption === null) return;
    const q = this.quizState.questions[this.quizState.currentIndex];
    this.quizState.isSubmitted = true;
    if (this.quizState.selectedOption === q.correct) {
      this.quizState.score++;
      window.App.showToast('Correct! Great job 🎯', 'success');
    } else {
      window.App.showToast('Incorrect option selected', 'error');
    }
    this.render();
  },

  nextQuizQuestion() {
    this.quizState.currentIndex++;
    this.quizState.selectedOption = null;
    this.quizState.isSubmitted = false;
    this.render();
  },

  // -------------------------------------------------------------
  // PILLAR 2: TECHNICAL / CS CORE (OS, DBMS, CN, System Design)
  // -------------------------------------------------------------
  renderTechnicalSection() {
    const subjects = window.PrepDB.TechnicalData.subjects;
    const currentSubject = subjects.find(s => s.id === this.selectedTechSubject) || subjects[0];
    const flashcards = currentSubject.flashcards || [];
    const currentFlashcard = flashcards[this.flashcardIndex] || flashcards[0];

    return `
      <div class="space-y-6">
        <!-- Subject Selector Pills -->
        <div class="flex flex-wrap items-center gap-2">
          ${subjects.map(s => `
            <button
              onclick="PrepHub.selectTechSubject('${s.id}')"
              class="px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${s.id === currentSubject.id ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}"
            >
              <i data-lucide="${s.icon}" class="w-4 h-4"></i>
              <span>${s.name}</span>
            </button>
          `).join('')}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Left: Topics & Notes (8 cols) -->
          <div class="lg:col-span-8 space-y-6">
            <div class="glass-card rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
              <div class="border-b border-slate-100 dark:border-slate-800 pb-4">
                <span class="text-xs font-bold text-blue-600 uppercase">Core Engineering</span>
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">${currentSubject.name}</h2>
                <p class="text-xs text-slate-500 mt-1">${currentSubject.description}</p>
              </div>

              <!-- Topics Accordion / Sections -->
              <div class="space-y-4">
                ${currentSubject.topics.map((t, idx) => `
                  <div class="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/40">
                    <div class="p-4 font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2.5 bg-slate-100/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800">
                      <span class="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs flex items-center justify-center font-black">
                        ${idx + 1}
                      </span>
                      <span>${t.title}</span>
                    </div>
                    <div class="p-4 text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed whitespace-pre-line">
                      ${t.content.trim()}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Right: Flashcards Quick-Revision Engine (4 cols) -->
          <div class="lg:col-span-4 space-y-4">
            <div class="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <i data-lucide="layers" class="w-4 h-4 text-purple-500"></i> Flashcard Drill
                </h3>
                <span class="text-[11px] font-semibold text-slate-400">Card ${this.flashcardIndex + 1} of ${flashcards.length}</span>
              </div>

              <!-- Interactive Flashcard Card -->
              <div
                onclick="PrepHub.flipFlashcard()"
                class="min-h-[220px] rounded-2xl p-6 border border-slate-200 dark:border-slate-700 flex flex-col justify-between cursor-pointer transition-all duration-300 ${this.flashcardFlipped ? 'bg-gradient-to-br from-indigo-900 to-purple-900 text-white shadow-xl' : 'bg-slate-50 dark:bg-slate-900 hover:border-blue-400'}"
              >
                <div>
                  <div class="text-[10px] font-bold uppercase tracking-wider ${this.flashcardFlipped ? 'text-indigo-200' : 'text-blue-600'}">
                    ${this.flashcardFlipped ? 'ANSWER / REASONING' : 'INTERVIEW QUESTION'}
                  </div>
                  <div class="text-sm font-bold mt-3 leading-snug ${this.flashcardFlipped ? 'text-slate-100 font-normal leading-relaxed text-xs' : 'text-slate-900 dark:text-slate-100'}">
                    ${this.flashcardFlipped ? currentFlashcard.a : currentFlashcard.q}
                  </div>
                </div>
                <div class="text-[11px] text-center pt-3 border-t ${this.flashcardFlipped ? 'border-white/10 text-indigo-200' : 'border-slate-200 dark:border-slate-800 text-slate-400'}">
                  ${this.flashcardFlipped ? 'Click card to see question' : 'Click card to reveal answer 🔄'}
                </div>
              </div>

              <!-- Flashcard Navigation Buttons -->
              <div class="flex items-center justify-between pt-1">
                <button
                  ${this.flashcardIndex === 0 ? 'disabled' : ''}
                  onclick="PrepHub.prevFlashcard()"
                  class="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Previous
                </button>
                <button
                  ${this.flashcardIndex >= flashcards.length - 1 ? 'disabled' : ''}
                  onclick="PrepHub.nextFlashcard()"
                  class="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold disabled:opacity-40 hover:bg-blue-700 shadow-sm"
                >
                  Next Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  selectTechSubject(subId) {
    this.selectedTechSubject = subId;
    this.flashcardIndex = 0;
    this.flashcardFlipped = false;
    this.render();
  },

  flipFlashcard() {
    this.flashcardFlipped = !this.flashcardFlipped;
    this.render();
  },

  nextFlashcard() {
    const subjects = window.PrepDB.TechnicalData.subjects;
    const currentSubject = subjects.find(s => s.id === this.selectedTechSubject) || subjects[0];
    if (this.flashcardIndex < currentSubject.flashcards.length - 1) {
      this.flashcardIndex++;
      this.flashcardFlipped = false;
      this.render();
    }
  },

  prevFlashcard() {
    if (this.flashcardIndex > 0) {
      this.flashcardIndex--;
      this.flashcardFlipped = false;
      this.render();
    }
  },

  // -------------------------------------------------------------
  // PILLAR 3: HR & BEHAVIORAL INTERVIEW (STAR Framework)
  // -------------------------------------------------------------
  renderHrSection() {
    const hrData = window.PrepDB.HRInterviewData;

    return `
      <div class="space-y-8">
        <!-- STAR Framework Card -->
        <div class="glass-card rounded-2xl p-6 md:p-8 border border-purple-200 dark:border-purple-900/40 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20 space-y-4">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
            <span class="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">${hrData.starMethod.title}</span>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-300 max-w-2xl">${hrData.starMethod.description}</p>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            ${hrData.starMethod.steps.map(step => `
              <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-900/30 shadow-sm space-y-1">
                <div class="w-8 h-8 rounded-lg bg-purple-600 text-white font-black text-sm flex items-center justify-center">
                  ${step.letter}
                </div>
                <div class="text-xs font-bold text-slate-900 dark:text-slate-100 pt-1">${step.title}</div>
                <p class="text-[11px] text-slate-500 leading-relaxed">${step.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Top HR Questions Archive -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">Top Behavioral & HR Questions</h3>
            <span class="text-xs text-slate-400">Curated from FAANG, Service & Startups</span>
          </div>

          <div class="space-y-4">
            ${hrData.questions.map((q, idx) => `
              <div class="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex items-start gap-3">
                    <span class="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-black flex items-center justify-center flex-shrink-0">
                      ${idx + 1}
                    </span>
                    <div>
                      <h4 class="text-base font-bold text-slate-900 dark:text-slate-100">${q.question}</h4>
                      <div class="text-[11px] text-purple-600 dark:text-purple-400 font-semibold mt-0.5">${q.category}</div>
                    </div>
                  </div>
                  <span class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-500">STAR Model</span>
                </div>

                <!-- Why this is asked -->
                <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div class="font-bold text-slate-700 dark:text-slate-200">Why Interviewers Ask This:</div>
                  <p class="text-[11px] text-slate-500 leading-relaxed">${q.whyAsked}</p>
                  <div class="text-[11px] text-blue-600 font-medium pt-1">💡 Strategy Tip: ${q.structureTip}</div>
                </div>

                <!-- Sample Winning Answer -->
                <div class="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 space-y-1.5">
                  <div class="text-xs font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                    <i data-lucide="check-circle" class="w-3.5 h-3.5 text-purple-600"></i> Sample High-Scoring Response:
                  </div>
                  <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">${q.sampleAnswer}</p>
                </div>

                <!-- Dos & Don'ts -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div class="p-3 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/20 space-y-1">
                    <div class="font-bold text-emerald-700 dark:text-emerald-400 text-[11px]">✓ DOs:</div>
                    <ul class="text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                      ${q.dos.map(d => `<li>• ${d}</li>`).join('')}
                    </ul>
                  </div>
                  <div class="p-3 rounded-xl bg-rose-50/40 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/20 space-y-1">
                    <div class="font-bold text-rose-700 dark:text-rose-400 text-[11px]">✕ DON'Ts:</div>
                    <ul class="text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                      ${q.donts.map(d => `<li>• ${d}</li>`).join('')}
                    </ul>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // PILLAR 4: DSA CHEATSHEET & BIG-O COMPLEXITY
  // -------------------------------------------------------------
  renderDsaCheatsheetSection() {
    return `
      <div class="space-y-6">
        <!-- Big-O Reference Card -->
        <div class="glass-card rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-4">
            <span class="text-xs font-bold text-amber-600 uppercase">Algorithmic Complexity Chart</span>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">Big-O Cheat Sheet for Common Operations</h2>
            <p class="text-xs text-slate-500 mt-1">Memorize average and worst-case complexities frequently tested in technical rounds.</p>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th class="py-3 px-3">Data Structure</th>
                  <th class="py-3 px-3">Access</th>
                  <th class="py-3 px-3">Search</th>
                  <th class="py-3 px-3">Insertion</th>
                  <th class="py-3 px-3">Deletion</th>
                  <th class="py-3 px-3">Space</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                <tr>
                  <td class="py-3 px-3 font-sans font-bold text-slate-900 dark:text-slate-100">Array</td>
                  <td class="py-3 px-3 text-emerald-600">O(1)</td>
                  <td class="py-3 px-3 text-amber-600">O(N)</td>
                  <td class="py-3 px-3 text-amber-600">O(N)</td>
                  <td class="py-3 px-3 text-amber-600">O(N)</td>
                  <td class="py-3 px-3 text-emerald-600">O(N)</td>
                </tr>
                <tr>
                  <td class="py-3 px-3 font-sans font-bold text-slate-900 dark:text-slate-100">Singly Linked List</td>
                  <td class="py-3 px-3 text-amber-600">O(N)</td>
                  <td class="py-3 px-3 text-amber-600">O(N)</td>
                  <td class="py-3 px-3 text-emerald-600">O(1)</td>
                  <td class="py-3 px-3 text-emerald-600">O(1)</td>
                  <td class="py-3 px-3 text-emerald-600">O(N)</td>
                </tr>
                <tr>
                  <td class="py-3 px-3 font-sans font-bold text-slate-900 dark:text-slate-100">Hash Table</td>
                  <td class="py-3 px-3 text-slate-400">N/A</td>
                  <td class="py-3 px-3 text-emerald-600">O(1) avg / O(N) worst</td>
                  <td class="py-3 px-3 text-emerald-600">O(1) avg</td>
                  <td class="py-3 px-3 text-emerald-600">O(1) avg</td>
                  <td class="py-3 px-3 text-emerald-600">O(N)</td>
                </tr>
                <tr>
                  <td class="py-3 px-3 font-sans font-bold text-slate-900 dark:text-slate-100">Binary Search Tree (Balanced)</td>
                  <td class="py-3 px-3 text-emerald-600">O(log N)</td>
                  <td class="py-3 px-3 text-emerald-600">O(log N)</td>
                  <td class="py-3 px-3 text-emerald-600">O(log N)</td>
                  <td class="py-3 px-3 text-emerald-600">O(log N)</td>
                  <td class="py-3 px-3 text-emerald-600">O(N)</td>
                </tr>
                <tr>
                  <td class="py-3 px-3 font-sans font-bold text-slate-900 dark:text-slate-100">Binary Heap (Priority Queue)</td>
                  <td class="py-3 px-3 text-slate-400">N/A</td>
                  <td class="py-3 px-3 text-amber-600">O(N)</td>
                  <td class="py-3 px-3 text-emerald-600">O(log N)</td>
                  <td class="py-3 px-3 text-emerald-600">O(log N) peek: O(1)</td>
                  <td class="py-3 px-3 text-emerald-600">O(N)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Algorithmic Patterns Cheat Sheet -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <h4 class="text-sm font-bold text-slate-900 dark:text-slate-100">When to use Two Pointers?</h4>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When dealing with a sorted array or linked list searching for pairs, triplets, palindromes, or partitioning (e.g. Two Sum II, 3Sum, Container with Most Water).
            </p>
            <div class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-[11px] font-mono text-slate-700 dark:text-slate-300">
              int l = 0, r = n - 1;<br>
              while (l &lt; r) { ... }
            </div>
          </div>

          <div class="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h4 class="text-sm font-bold text-slate-900 dark:text-slate-100">When to use Sliding Window?</h4>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When looking for longest, shortest, or target sub-segments with contiguous elements (e.g. Max Subarray of size K, Longest Substring Without Repeating Characters).
            </p>
            <div class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-[11px] font-mono text-slate-700 dark:text-slate-300">
              for (int r = 0; r &lt; n; r++) {<br>
              &nbsp;&nbsp;while (invalid) l++;<br>
              }
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

window.PrepHub = PrepHub;
