// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///home/project/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      port: 8080,
      overlay: false
    },
    watch: {
      usePolling: false
    }
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
    global: "globalThis",
    "__TYPESCRIPT_SUPPRESSIONS__": "true"
  },
  plugins: [
    react({
      // Optimisations React SWC pour performance maximale
      plugins: [
        // Configuration pour l'application algérienne
      ]
    }),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-popover",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-tabs",
      "clsx",
      "class-variance-authority",
      "pdfjs-dist"
    ],
    exclude: ["@huggingface/transformers"],
    force: true
  },
  worker: {
    format: "es"
  },
  esbuild: {
    loader: "tsx",
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
    target: "es2020",
    minifyIdentifiers: mode === "production",
    tsconfigRaw: {
      compilerOptions: {
        skipLibCheck: true,
        noEmit: true,
        strict: false,
        noImplicitAny: false,
        strictNullChecks: false
      }
    }
  },
  build: {
    target: "es2020",
    minify: mode === "production" ? "esbuild" : false,
    cssMinify: mode === "production",
    chunkSizeWarningLimit: 500,
    // Avertir à 500KB au lieu de 1MB
    sourcemap: mode === "development",
    emptyOutDir: true,
    // Optimisations de taille et performance
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    // Inline assets < 4KB
    reportCompressedSize: mode === "production",
    rollupOptions: {
      // Optimisations avancées
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      },
      output: {
        // Laisser Vite optimiser automatiquement les chunks
        format: "es",
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
        // Optimisations avancées
        compact: mode === "production",
        generatedCode: {
          arrowFunctions: true,
          constBindings: true,
          objectShorthand: true
        }
      },
      // Optimisations externes
      external: (id) => {
        return id.includes("@huggingface/transformers");
      },
      onwarn: (warning, warn) => {
        if (mode === "production" && (warning.code === "CIRCULAR_DEPENDENCY" || warning.code === "THIS_IS_UNDEFINED")) {
          return;
        }
        warn(warning);
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjsvLyBDb25maWd1cmF0aW9uIFZpdGUgb3B0aW1pc1x1MDBFOWUgcG91ciBsJ2FwcGxpY2F0aW9uIGFsZ1x1MDBFOXJpZW5uZSBEYWxpbC5kelxuLy8gMTAwJSBsb2NhbGUgZXQgaW5kXHUwMEU5cGVuZGFudGUgLSBQZXJmb3JtYW5jZSBtYXhpbWFsZVxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiOjpcIixcbiAgICBwb3J0OiA4MDgwLFxuICAgIGhtcjoge1xuICAgICAgcG9ydDogODA4MCxcbiAgICAgIG92ZXJsYXk6IGZhbHNlLFxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgIHVzZVBvbGxpbmc6IGZhbHNlLFxuICAgIH1cbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgJ3Byb2Nlc3MuZW52Lk5PREVfRU5WJzogSlNPTi5zdHJpbmdpZnkobW9kZSksXG4gICAgZ2xvYmFsOiAnZ2xvYmFsVGhpcycsXG4gICAgJ19fVFlQRVNDUklQVF9TVVBQUkVTU0lPTlNfXyc6ICd0cnVlJyxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KHtcbiAgICAgIC8vIE9wdGltaXNhdGlvbnMgUmVhY3QgU1dDIHBvdXIgcGVyZm9ybWFuY2UgbWF4aW1hbGVcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgLy8gQ29uZmlndXJhdGlvbiBwb3VyIGwnYXBwbGljYXRpb24gYWxnXHUwMEU5cmllbm5lXG4gICAgICBdLFxuICAgIH0pLFxuICAgIG1vZGUgPT09ICdkZXZlbG9wbWVudCcgJiYgY29tcG9uZW50VGFnZ2VyKCksXG4gIF0uZmlsdGVyKEJvb2xlYW4pLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFtcbiAgICAgICdyZWFjdCcsXG4gICAgICAncmVhY3QtZG9tJyxcbiAgICAgICdyZWFjdC1yb3V0ZXItZG9tJyxcbiAgICAgICdsdWNpZGUtcmVhY3QnLFxuICAgICAgJ0ByYWRpeC11aS9yZWFjdC1kaWFsb2cnLFxuICAgICAgJ0ByYWRpeC11aS9yZWFjdC1wb3BvdmVyJyxcbiAgICAgICdAcmFkaXgtdWkvcmVhY3QtZHJvcGRvd24tbWVudScsXG4gICAgICAnQHJhZGl4LXVpL3JlYWN0LXNlbGVjdCcsXG4gICAgICAnQHJhZGl4LXVpL3JlYWN0LXRvb2x0aXAnLFxuICAgICAgJ0ByYWRpeC11aS9yZWFjdC10YWJzJyxcbiAgICAgICdjbHN4JyxcbiAgICAgICdjbGFzcy12YXJpYW5jZS1hdXRob3JpdHknLFxuICAgICAgJ3BkZmpzLWRpc3QnXG4gICAgXSxcbiAgICBleGNsdWRlOiBbJ0BodWdnaW5nZmFjZS90cmFuc2Zvcm1lcnMnXSxcbiAgICBmb3JjZTogdHJ1ZVxuICB9LFxuICB3b3JrZXI6IHtcbiAgICBmb3JtYXQ6ICdlcydcbiAgfSxcbiAgZXNidWlsZDoge1xuICAgIGxvYWRlcjogJ3RzeCcsXG4gICAgaW5jbHVkZTogL3NyY1xcLy4qXFwuW2p0XXN4PyQvLFxuICAgIGV4Y2x1ZGU6IFtdLFxuICAgIHRhcmdldDogJ2VzMjAyMCcsXG4gICAgbWluaWZ5SWRlbnRpZmllcnM6IG1vZGUgPT09ICdwcm9kdWN0aW9uJyxcbiAgICB0c2NvbmZpZ1Jhdzoge1xuICAgICAgY29tcGlsZXJPcHRpb25zOiB7XG4gICAgICAgIHNraXBMaWJDaGVjazogdHJ1ZSxcbiAgICAgICAgbm9FbWl0OiB0cnVlLFxuICAgICAgICBzdHJpY3Q6IGZhbHNlLFxuICAgICAgICBub0ltcGxpY2l0QW55OiBmYWxzZSxcbiAgICAgICAgc3RyaWN0TnVsbENoZWNrczogZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiAnZXMyMDIwJyxcbiAgICBtaW5pZnk6IG1vZGUgPT09ICdwcm9kdWN0aW9uJyA/ICdlc2J1aWxkJyA6IGZhbHNlLFxuICAgIGNzc01pbmlmeTogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nLFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogNTAwLCAvLyBBdmVydGlyIFx1MDBFMCA1MDBLQiBhdSBsaWV1IGRlIDFNQlxuICAgIHNvdXJjZW1hcDogbW9kZSA9PT0gJ2RldmVsb3BtZW50JyxcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICBcbiAgICAvLyBPcHRpbWlzYXRpb25zIGRlIHRhaWxsZSBldCBwZXJmb3JtYW5jZVxuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgICBhc3NldHNJbmxpbmVMaW1pdDogNDA5NiwgLy8gSW5saW5lIGFzc2V0cyA8IDRLQlxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBtb2RlID09PSAncHJvZHVjdGlvbicsXG4gICAgXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gT3B0aW1pc2F0aW9ucyBhdmFuY1x1MDBFOWVzXG4gICAgICB0cmVlc2hha2U6IHtcbiAgICAgICAgbW9kdWxlU2lkZUVmZmVjdHM6IGZhbHNlLFxuICAgICAgICBwcm9wZXJ0eVJlYWRTaWRlRWZmZWN0czogZmFsc2UsXG4gICAgICAgIHVua25vd25HbG9iYWxTaWRlRWZmZWN0czogZmFsc2VcbiAgICAgIH0sXG4gICAgICBcbiAgICAgIG91dHB1dDoge1xuICAgICAgICAvLyBMYWlzc2VyIFZpdGUgb3B0aW1pc2VyIGF1dG9tYXRpcXVlbWVudCBsZXMgY2h1bmtzXG4gICAgICAgIGZvcm1hdDogJ2VzJyxcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLltleHRdJyxcbiAgICAgICAgXG4gICAgICAgIC8vIE9wdGltaXNhdGlvbnMgYXZhbmNcdTAwRTllc1xuICAgICAgICBjb21wYWN0OiBtb2RlID09PSAncHJvZHVjdGlvbicsXG4gICAgICAgIGdlbmVyYXRlZENvZGU6IHtcbiAgICAgICAgICBhcnJvd0Z1bmN0aW9uczogdHJ1ZSxcbiAgICAgICAgICBjb25zdEJpbmRpbmdzOiB0cnVlLFxuICAgICAgICAgIG9iamVjdFNob3J0aGFuZDogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXG4gICAgICAvLyBPcHRpbWlzYXRpb25zIGV4dGVybmVzXG4gICAgICBleHRlcm5hbDogKGlkKSA9PiB7XG4gICAgICAgIHJldHVybiBpZC5pbmNsdWRlcygnQGh1Z2dpbmdmYWNlL3RyYW5zZm9ybWVycycpO1xuICAgICAgfSxcbiAgICAgIFxuICAgICAgb253YXJuOiAod2FybmluZywgd2FybikgPT4ge1xuICAgICAgICAvLyBTdXBwcmltZXIgbGVzIHdhcm5pbmdzIG5vbiBjcml0aXF1ZXMgZW4gcHJvZHVjdGlvblxuICAgICAgICBpZiAobW9kZSA9PT0gJ3Byb2R1Y3Rpb24nICYmIChcbiAgICAgICAgICB3YXJuaW5nLmNvZGUgPT09ICdDSVJDVUxBUl9ERVBFTkRFTkNZJyB8fFxuICAgICAgICAgIHdhcm5pbmcuY29kZSA9PT0gJ1RISVNfSVNfVU5ERUZJTkVEJ1xuICAgICAgICApKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHdhcm4od2FybmluZyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFMaEMsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDSCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsWUFBWTtBQUFBLElBQ2Q7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTix3QkFBd0IsS0FBSyxVQUFVLElBQUk7QUFBQSxJQUMzQyxRQUFRO0FBQUEsSUFDUiwrQkFBK0I7QUFBQSxFQUNqQztBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBO0FBQUEsTUFFSixTQUFTO0FBQUE7QUFBQSxNQUVUO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxTQUFTLGlCQUFpQixnQkFBZ0I7QUFBQSxFQUM1QyxFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUyxDQUFDLDJCQUEyQjtBQUFBLElBQ3JDLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsUUFBUTtBQUFBLElBQ1IsU0FBUztBQUFBLElBQ1QsU0FBUyxDQUFDO0FBQUEsSUFDVixRQUFRO0FBQUEsSUFDUixtQkFBbUIsU0FBUztBQUFBLElBQzVCLGFBQWE7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLFFBQ2YsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLFFBQ1IsUUFBUTtBQUFBLFFBQ1IsZUFBZTtBQUFBLFFBQ2Ysa0JBQWtCO0FBQUEsTUFDcEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsUUFBUSxTQUFTLGVBQWUsWUFBWTtBQUFBLElBQzVDLFdBQVcsU0FBUztBQUFBLElBQ3BCLHVCQUF1QjtBQUFBO0FBQUEsSUFDdkIsV0FBVyxTQUFTO0FBQUEsSUFDcEIsYUFBYTtBQUFBO0FBQUEsSUFHYixjQUFjO0FBQUEsSUFDZCxtQkFBbUI7QUFBQTtBQUFBLElBQ25CLHNCQUFzQixTQUFTO0FBQUEsSUFFL0IsZUFBZTtBQUFBO0FBQUEsTUFFYixXQUFXO0FBQUEsUUFDVCxtQkFBbUI7QUFBQSxRQUNuQix5QkFBeUI7QUFBQSxRQUN6QiwwQkFBMEI7QUFBQSxNQUM1QjtBQUFBLE1BRUEsUUFBUTtBQUFBO0FBQUEsUUFFTixRQUFRO0FBQUEsUUFDUixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQTtBQUFBLFFBR2hCLFNBQVMsU0FBUztBQUFBLFFBQ2xCLGVBQWU7QUFBQSxVQUNiLGdCQUFnQjtBQUFBLFVBQ2hCLGVBQWU7QUFBQSxVQUNmLGlCQUFpQjtBQUFBLFFBQ25CO0FBQUEsTUFDRjtBQUFBO0FBQUEsTUFHQSxVQUFVLENBQUMsT0FBTztBQUNoQixlQUFPLEdBQUcsU0FBUywyQkFBMkI7QUFBQSxNQUNoRDtBQUFBLE1BRUEsUUFBUSxDQUFDLFNBQVMsU0FBUztBQUV6QixZQUFJLFNBQVMsaUJBQ1gsUUFBUSxTQUFTLHlCQUNqQixRQUFRLFNBQVMsc0JBQ2hCO0FBQ0Q7QUFBQSxRQUNGO0FBQ0EsYUFBSyxPQUFPO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
