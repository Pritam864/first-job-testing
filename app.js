/**
 * Main Application Controller & Router
 */

const App = {
  currentModule: 'jobs', // 'jobs' | 'prep' | 'companies' | 'dsa' | 'resume'
  isDarkMode: false,

  init() {
    this.initTheme();
    this.bindEvents();
    this.navigate('jobs');
  },

  initTheme() {
    const saved = localStorage.getItem('portal_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    } else {
      this.isDarkMode = false;
      document.documentElement.classList.remove('dark');
    }
  },

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portal_theme', 'dark');
      this.showToast('Dark mode enabled 🌙', 'info');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portal_theme', 'light');
      this.showToast('Light mode enabled ☀️', 'info');
    }
    this.updateThemeButton();
  },

  updateThemeButton() {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.innerHTML = this.isDarkMode 
        ? `<i data-lucide="sun" class="w-5 h-5 text-amber-400"></i>` 
        : `<i data-lucide="moon" class="w-5 h-5 text-slate-600"></i>`;
      if (window.lucide) window.lucide.createIcons();
    }
  },

  navigate(moduleName) {
    this.currentModule = moduleName;
    
    // Update navigation active states
    document.querySelectorAll('[data-nav]').forEach(el => {
      const target = el.getAttribute('data-nav');
      if (target === moduleName) {
        el.className = el.className.replace(/text-slate-\d+/g, '').replace(/hover:bg-\S+/g, '');
        el.classList.add('bg-blue-600', 'text-white', 'shadow-md', 'shadow-blue-500/20');
        el.classList.remove('text-slate-600', 'dark:text-slate-400', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
      } else {
        el.classList.remove('bg-blue-600', 'text-white', 'shadow-md', 'shadow-blue-500/20');
        el.classList.add('text-slate-600', 'dark:text-slate-400', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
      }
    });

    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render corresponding module
    switch (moduleName) {
      case 'jobs':
        window.JobPortal.init();
        break;
      case 'prep':
        window.PrepHub.init();
        break;
      case 'companies':
        window.CompaniesModule.init();
        break;
      case 'dsa':
        window.DsaSheetModule.init();
        break;
      case 'resume':
        window.ResumeCheckerModule.init();
        break;
      default:
        window.JobPortal.init();
    }

    if (window.lucide) window.lucide.createIcons();
  },

  bindEvents() {
    // Backdrop click on modal
    const modal = document.getElementById('global-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    }

    // ESC key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const m = document.getElementById('global-modal');
        if (m) m.classList.add('hidden');
      }
    });
  },

  showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `p-4 rounded-2xl shadow-xl border text-xs font-semibold flex items-center gap-2.5 transition-all duration-300 transform translate-y-4 opacity-0 ${
      type === 'success' ? 'bg-emerald-600 text-white border-emerald-500' :
      type === 'error' ? 'bg-rose-600 text-white border-rose-500' :
      'bg-slate-900 text-white border-slate-700 dark:bg-slate-100 dark:text-slate-900'
    }`;

    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-triangle' : 'info';
    toast.innerHTML = `<i data-lucide="${icon}" class="w-4 h-4 flex-shrink-0"></i><span>${message}</span>`;

    toastContainer.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    // Trigger animation in
    setTimeout(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    }, 10);

    // Auto remove after 3.5s
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

window.App = App;

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
