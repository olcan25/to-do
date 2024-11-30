<template>
  <!-- Header -->
  <header class="bg-blue-600 text-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Sol taraf: Uygulama İsmi -->
      <div class="text-lg font-bold">FCD To-Do</div>

      <!-- Ortadaki Linkler -->
      <nav class="flex space-x-6">
        <nuxt-link
          to="/projects"
          class="text-sm font-medium hover:underline"
          active-class="text-yellow-300"
        >
          Projeler
        </nuxt-link>
        <!-- <nuxt-link
          to="/tasks"
          class="text-sm font-medium hover:underline"
          active-class="text-yellow-300"
        >
          Görevler
        </nuxt-link> -->
      </nav>

      <!-- Sağ taraf: Kullanıcı ismi ve SignOut -->
      <div class="flex items-center space-x-4">
        <div>
          <span class="text-sm">Hoşgeldin,</span>
          <span class="font-semibold">{{ user.email }}</span>
        </div>
        <button
          @click="signOutUser"
          class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const { signOut } = useAuthStore();
const { user } = storeToRefs(useAuthStore());

// Sign out işlemine tıklanınca tetiklenecek fonksiyon
const signOutUser = async () => {
  await signOut();
  navigateTo("/sign/in"); // Çıkış sonrası giriş sayfasına yönlendirme
};
</script>
