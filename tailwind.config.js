/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
    "./node_modules/laravel-vue-pagination/src/TailwindPagination.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
