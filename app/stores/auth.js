import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useAuthStore = defineStore("auth", () => {
  const $toast = useToast();
  const user = ref(null);

  const signUp = async (data) => {
    try {
      const result = await $fetch("/api/auth/sign-up", {
        headers: useRequestHeaders(["cookie"]),
        method: "POST",
        body: data,
      });
      $toast.success("Kullanıcı olusturuldu");
      return result;
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (data) => {
    try {
      const result = await $fetch("/api/auth/sign-in", {
        headers: useRequestHeaders(["cookie"]),
        method: "POST",
        body: data,
      });
      $toast.success("Giris yapildi");
      return result;
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const result = await $fetch("/api/auth/sign-out", {
        headers: useRequestHeaders(["cookie"]),
        method: "POST",
      });

      return result;
    } catch (error) {
      return { error };
    }
  };

  // const checkUser = async () => {
  //   try {
  //     const { data } = await useFetch("/api/auth/check-user", {
  //       headers: useRequestHeaders(["cookie"]),
  //       method: "GET",
  //     });

  //     user.value = data.value;
  //   } catch (error) {
  //     return { error };
  //   }
  // };

  const checkUser = async () => {
    try {
      const { data, error } = await useFetch("/api/auth/check-user", {
        headers: useRequestHeaders(["cookie"]),
        method: "GET",
      });

      if (error.value) {
        console.error("Kullanıcı kontrol hatası:", error.value);
        user.value = null; // Kullanıcı oturumu yoksa null atayın
        return;
      }

      if (data.value) {
        user.value = data.value;
      } else {
        user.value = null; // Kullanıcı bulunamazsa null
      }
    } catch (error) {
      console.error("Hata:", error);
      user.value = null; // Genel hata durumunda da null
    }
  };

  return { user, signUp, signIn, signOut, checkUser };
});
