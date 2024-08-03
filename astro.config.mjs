import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
	build: {
		inlineStylesheets: "always",
	},
	compressHTML: true,
	prefetch: true,
	devToolbar: {
		enabled: false,
	},
	output: "server",
	integrations: [tailwind(), db()],
});