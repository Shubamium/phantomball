import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import node from "@astrojs/node";
import keystatic from "@keystatic/astro";
import sanity from "@sanity/astro";

import icon from "astro-icon";

const staticBuild = process.env.STATIC_BUILD === "true";
const sanityProjectId = "oh69dl0b";
const sanityDataset = "production";

// https://astro.build/config
export default defineConfig({
  output: staticBuild ? "static" : "server",
  ...(!staticBuild && { adapter: node({ mode: "standalone" }) }),
  integrations: [
    react(),
    markdoc(),
    ...(!staticBuild ? [keystatic()] : []),
    sanity({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      useCdn: !staticBuild,
    }),
    icon(),
  ],
});
