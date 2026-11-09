import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import node from "@astrojs/node";
import keystatic from "@keystatic/astro";

import icon from "astro-icon";

const staticBuild = process.env.STATIC_BUILD === "true";

// https://astro.build/config
export default defineConfig({
  output: staticBuild ? "static" : "server",
  ...(!staticBuild && { adapter: node({ mode: "standalone" }) }),
  integrations: [
    react(),
    markdoc(),
    ...(!staticBuild ? [keystatic()] : []),
    icon(),
  ],
});
