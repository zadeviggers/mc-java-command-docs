// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://mcdocs.zade.viggers.net/",

  integrations: [
    starlight({
      title: "Java Edition Reference Docs",
      description:
        "Unofficial docs for Minecraft: Java Edition, with information about item components, item model formats, and colour systems",
      social: {
        github: "https://github.com/zadeviggers/mc-java-command-docs",
      },
      components: {
        SiteTitle: "./src/components/override/SiteTitle.astro",
        // MobileMenuFooter: "./src/components/override/MobileMenuFooter.astro",
      },
      sidebar: [
        {
          label: "Items",
          autogenerate: { directory: "items" },
        },
        {
          label: "Other",
          autogenerate: { directory: "other" },
        },
      ],
      lastUpdated: true,
      credits: true,
      customCss: ["./src/main.css"],
    }),
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
});
