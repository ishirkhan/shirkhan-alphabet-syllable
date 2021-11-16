const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    minify: true,
    outDir: "dist",
    sourcemap: false,
    lib: {
      name: "shirkhan-alphabet-syllable",
      entry: path.resolve(__dirname, "src/syllable/index.ts"),
      fileName: (format) => `shirkhan-alphabet-syllable.${format}.js`,
    },
    rollupOptions: {},
  },
});
