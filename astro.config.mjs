// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "MC Java Command Docs",
			social: {
				github: "https://github.com/zadeviggers/mc-java-command-docs",
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
