import { create } from 'zustand';

interface State {
    isSideMenuOpen: boolean;
    isContactsOpen: boolean;
    isSideMenuOpenWidth: boolean;

    openSideMenu: () => void;
    closeSideMenu: () => void;

    openContacsSideMenu: () => void;
    closeSideContactsMenu: () => void;

    openContacsSideMenuWidth: () => void;
    closeSideContactsMenuWidth: () => void;
}

export const useUIStore = create<State>()((set) => ({
    isSideMenuOpen: false,
    isContactsOpen: false,
    isSideMenuOpenWidth: false,

    openSideMenu: () => set({ isSideMenuOpen: true }),
    closeSideMenu: () => set({ isSideMenuOpen: false }),

    openContacsSideMenu: () => set({ isContactsOpen: true }),
    closeSideContactsMenu: () => set({ isContactsOpen: false }),

    
    openContacsSideMenuWidth: () => set({ isSideMenuOpenWidth: true }),
    closeSideContactsMenuWidth: () => set({ isSideMenuOpenWidth: false }),
}));