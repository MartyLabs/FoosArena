import { createToaster } from "@meforma/vue-toaster";

export default defineNuxtPlugin((nuxtApp) => {
  const toaster = createToaster({
    position: "top-right",
    duration: 3000,
    max: 3,
    className: "custom-toaster",
  });

  nuxtApp.vueApp.provide("toaster", toaster);
  nuxtApp.provide("toaster", toaster);
});
// Update Sat Mar 15 08:29:16 PM CET 2025
