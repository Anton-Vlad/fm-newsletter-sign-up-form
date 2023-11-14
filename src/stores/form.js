import { defineStore } from "pinia";

export const useFormStore = defineStore("form", {
  state: () => {
    return {
      email: "",
      sub: false,
    };
  },
  actions: {
    submitForm() {
      this.sub = true;
    },
    resetForm() {
      this.sub = false;
    },
  },
});
