<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <!-- Email Input -->
    <div>
      <form-input-email field-name="email" field-label="Email" />
    </div>

    <!-- Password Input -->
    <div>
      <form-input-password field-name="password" field-label="Password" />
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      class="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Giris Yap
    </button>

    <!-- Sign-Up Redirect Link -->
    <p class="text-sm text-center text-gray-600 mt-4">
      Hesabınız yok mu?
      <nuxt-link
        to="/sign/up"
        class="text-blue-600 hover:underline"
      >
        Kayıt Olun
      </nuxt-link>
    </p>
  </form>
</template>

<script setup>
const { signIn } = useAuthStore();

const { handleSubmit } = useForm({
  initialValues: {
    email: "",
    password: "",
  },
});

const onSubmit = handleSubmit(async (values) => {
  const result = await signIn({
    email: values.email,
    password: values.password,
  });

  if (result.error) {
    console.error(result.error);
  }
  navigateTo("/");
});
</script>
