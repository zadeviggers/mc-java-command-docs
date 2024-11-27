// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "MC:JE Technical Docs",
			social: {
				github: "https://github.com/zadeviggers/mc-java-command-docs",
			},
			components: {
				SiteTitle: "./src/components/SiteTitle.astro",
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
		}),
	],
});
