export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();

  await auth.checkUser();

  const {user} = storeToRefs(auth);

  if (!user.value) {
    return navigateTo("/sign/in");
  }
});

