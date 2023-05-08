import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';

const useAuthStore = create((set, get) => ({
    user: null,
    token: Cookies.get('token'),

    getUser: async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URI}/auth/customer`, {
                headers: {
                    'x-access-token': get().token
                }
            });
            const { customer } = response.data;
            set({ user: customer });
        } catch (error) {

        }
    },

    loginUser: async (email, password) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URI}/auth/login/customer`, {
                email,
                password,
            });
            const { customer, token } = response.data;
            console.log(customer, token);
            Cookies.set('token', token, { expires: 7 }); // store token in cookie
            set({ user: customer, token });
        } catch (error) {
            console.error(error);
        }
    },

    signupUser: async (name, email, password, dob, gender) => {
        console.log(name, email, password, gender, dob);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URI}/auth/register/customer`, {
                name,
                email,
                password,
                dob,
                gender,
            });
            const { user, token } = response.data;
            Cookies.set('token', token, { expires: 7 }); // store token in cookie
            set({ user, token });
        } catch (error) {
            console.error(error);
        }
    },
    setUser: (user) => set({ user }),
    logoutUser: () => {
        Cookies.remove('token'); // remove token from cookie
        set({ user: null, token: null })
    },

    //wishlist
    addToWishlist: async (item) => {
        try {
            let token = get().token;
            const response = await axios.post(`${import.meta.env.VITE_BASE_URI}/wishlist`, {
                item_id: item._id,
                token
            }, {});
            const { customer } = response.data;
            set({ user: { ...get().user, wishlist: customer.wishlist } });
        } catch (error) {
            console.error(error);
        }
    },

    removeFromWishlist: async (item) => {
        try {
            let token = get().token;
            const response = await axios.post(`${import.meta.env.VITE_BASE_URI}/wishlist/remove/${item._id}`, {
                token
            }, {});
            const { customer } = response.data;
            set({ user: { ...get().user, wishlist: customer.wishlist } });
        } catch (error) {
            console.error(error);
        }
    },
    getAllWishlistItems: async () => {
        try {
            let token = get().token;
            const response = await axios.get(`${import.meta.env.VITE_BASE_URI}/wishlist/getAll`, {
                headers: {
                    'x-access-token': token
                }
            });
            return response.data.items; 
        } catch (error) {
            
        }
    }

}));

export default useAuthStore;
