import { socket } from "../socket/socket";
import axios from "../axios/axios";
import { Users } from "../interface/users";
import { create } from "zustand";
import { persist } from 'zustand/middleware'

interface AuthStore {
    token: string;
    isLoading: boolean;
    isAuthentic: boolean;
    user: Users[];
    errorMessage: string,
    login: (body: Users) => void;
    logout: () => void;
    veryfy: () => void;
    signup: (body: Users) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist((set, get) => ({
        token: '',
        isLoading: true,
        isAuthentic: false,
        user: [],
        errorMessage: '',
        login: async (body) => {
            try {
                set({ isLoading: true })
                const result = await axios.post('/api/auth/login', body)
                if (result.status != 200) {
                    set({ isLoading: false, isAuthentic: false })
                    return
                }
                const { user, token } = result.data
                socket.connect()
                socket.emit('register', user)
                set({ isLoading: false, isAuthentic: true, user: user, token: token, errorMessage: '' })
                return result
            } catch (error: any) {
                const { mssge } = error.response.data
                set({ isLoading: false, isAuthentic: false, errorMessage: mssge })
            }
        },
        logout: async () => {
            try {
                set({ isLoading: true })
                const result = await axios.get('/api/auth/logout')
                if (result.status != 200) {
                    set({ isLoading: false, isAuthentic: false, user: [], token: '' })
                    return
                }
                set({ isLoading: false, isAuthentic: false, user: [], token: '' })
                socket.disconnect()
                return result
            } catch (error) {
                console.log(error)
                set({ isLoading: false, isAuthentic: false, user: [], token: '' })
            }
        },
        veryfy: async () => {
            try {
                set({ isLoading: true })
                const result = await axios.get(`/api/auth/verify`)
                if (result.status != 200) {
                    set({ isAuthentic: false, isLoading: false })
                    socket.disconnect()
                }
                set({ isAuthentic: true, isLoading: false })
                return result
            } catch (error) {
                console.log(error)
                set({ isAuthentic: false, isLoading: false, user: [], token: '' })
            }
        },
        signup: async (body) => {
            try {
                set({ isLoading: true })
                const result = await axios.post(`/api/auth/signup`, body)
                if (result.status != 200) {
                    set({ isLoading: false })
                    return
                }
                set({ isLoading: false, errorMessage: '' })
                return result
            } catch (error: any) {
                const { mssge } = error.response.data
                set({ isLoading: false, errorMessage: mssge })
            }
        },
    }), {
        name: 'useAuthStore'
    })
)