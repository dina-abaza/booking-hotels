
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useAuthStore = create(
  persist(
  
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (userData) => {
      set({ user: userData, isLoggedIn: true });
    },

       logout: async () => {
        try {
          // إرسال طلب للباك اند لمسح الكوكيز
          await axios.post(
            "https://booking-hotels-back-end-api.vercel.app/api/Auth/logout",
            null,
            { withCredentials: true }
          );

          // تنظيف الستور بعد نجاح الطلب
          set({ user: null, isLoggedIn: false });
          console.log("✅ تم تسجيل الخروج بنجاح");
        } catch (error) {
          console.error(
            "❌ فشل تسجيل الخروج:",
            error.response ? error.response.data.message : error.message
          );
          // حتى لو الباك اند رجع خطأ، امسح البيانات محليًا عشان ما يفضلش المستخدم لوج إن
          set({ user: null, isLoggedIn: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export default useAuthStore;
