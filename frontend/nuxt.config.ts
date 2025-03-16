export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/tailwind.css", "~/assets/css/toaster.css"],
  postcss: {
    plugins: {
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devtools: { enabled: true },
  compatibilityDate: "2025-03-08",
});
