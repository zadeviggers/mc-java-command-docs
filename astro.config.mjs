// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://mcdocs.zade.viggers.net/",
  integrations: [
    starlight({
      title: "Java Edition Reference Docs",
      social: {
        github: "https://github.com/zadeviggers/mc-java-command-docs",
      },
      components: {
        SiteTitle: "./src/components/override/SiteTitle.astro",
        MobileMenuFooter: "./src/components/override/MobileMenuFooter.astro",
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
      customCss: ["./src/theme.css"],
    }),
  ],
});
