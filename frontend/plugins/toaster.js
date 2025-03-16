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
