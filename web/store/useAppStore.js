import { create } from 'zustand';
import { dictionary } from '../context/AppContext';

export const useAppStore = create((set, get) => ({
  language: 'en',
  fontSize: 0, // -1 (small), 0 (normal), 1 (large)
  isWorkflowModalOpen: false,

  openWorkflowModal: () => set({ isWorkflowModalOpen: true }),
  closeWorkflowModal: () => set({ isWorkflowModalOpen: false }),
  toggleWorkflowModal: () => set((state) => ({ isWorkflowModalOpen: !state.isWorkflowModalOpen })),
  
  setLanguage: (lang) => {
    const nextLang = lang || (get().language === 'en' ? 'hi' : 'en');
    set({ language: nextLang });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('rti_portal_lang', nextLang);
      } catch (e) {}
    }
  },

  toggleLanguage: () => {
    get().setLanguage();
  },

  setFontSize: (size) => {
    set({ fontSize: size });
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      if (size === -1) {
        root.style.fontSize = '87.5%';
      } else if (size === 1) {
        root.style.fontSize = '112.5%';
      } else {
        root.style.fontSize = '100%';
      }
      try {
        localStorage.setItem('rti_portal_fontsize', size.toString());
      } catch (e) {}
    }
  },

  getTranslations: () => dictionary[get().language] || dictionary.en
}));
