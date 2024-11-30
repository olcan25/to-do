<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <!-- Email Input -->
    <div>
      <form-input-email field-name="email" field-label="Email" />
    </div>

    <!-- Password Input -->
    <div>
      <form-input-password field-name="password" field-label="Sifre" />
    </div>

    <!-- Confirm Password Input -->
    <div>
      <form-input-password
        field-name="confirmPassword"
        field-label="Sifre Tekrar"
      />
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      class="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Kayit Ol
    </button>

    <!-- Sign-In Redirect Link -->
    <p class="text-sm text-center text-gray-600 mt-4">
      Zaten hesabınız var mı?
      <nuxt-link
        to="/sign/in"
        class="text-blue-600 hover:underline"
      >
        Giriş Yapın
      </nuxt-link>
    </p>
  </form>
</template>

<script setup>
const authStore = useAuthStore();

const { handleSubmit } = useForm({
  initialValues: {
    email: "",
    password: "",
    confirmPassword: "",
  },
});

const onSubmit = handleSubmit(async (values) => {
  if (values.password !== values.confirmPassword) {
    console.error("Sifreler uyusmuyor");
    return;
  }

  const result = await authStore.signUp({
    email: values.email,
    password: values.password,
  });

  if (result.error) {
    console.error(result.error);
  }

  navigateTo("/sign/in");
});
</script>
