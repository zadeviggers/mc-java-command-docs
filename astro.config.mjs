// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://mcdocs.zade.viggers.net/",
  integrations: [
    starlight({
      title: "MC:JE Reference Docs",
      social: {
        github: "https://github.com/zadeviggers/mc-java-command-docs",
      },
      components: {
        SiteTitle: "./src/components/SiteTitle.astro",
      },
      sidebar: [
        {
          label: "Components",
          autogenerate: { directory: "components" },
        },
      ],
    }),
  ],
});
