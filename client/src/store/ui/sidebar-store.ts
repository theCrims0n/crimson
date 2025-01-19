import { create } from 'zustand';

interface State {
    isSideMenuOpen: boolean;
    isChatMenu: boolean;
    isUsersMenu: boolean;
    isDetail: boolean;
    isInformation: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
    openUsersSideMenu: () => void;
    closeUsersContactsMenu: () => void;
    openChatsSideMenu: () => void;
    closeChatsContactsMenu: () => void;
    openDetail: () => void;
    closeDetail: () => void;
    openInformation: (open: boolean) => void;
}

export const useUIStore = create<State>()((set) => ({
    isSideMenuOpen: false,
    isChatMenu: false,
    isUsersMenu: false,
    isDetail: false,
    isInformation: false,
    openSideMenu: () => set({ isSideMenuOpen: true }),
    closeSideMenu: () => set({ isSideMenuOpen: false }),
    openUsersSideMenu: () => set({ isUsersMenu: true }),
    closeUsersContactsMenu: () => set({ isUsersMenu: false }),
    openChatsSideMenu: () => set({ isChatMenu: true }),
    closeChatsContactsMenu: () => set({ isChatMenu: false }),
    openDetail: () => set({ isDetail: true }),
    closeDetail: () => set({ isDetail: false }),
    openInformation(open: boolean) { set({ isInformation: open }) },
}));