import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				back1: "#fafbfe",
				back2: "#a3c3f7",
				textprimary: "#0056e0",
				textsecondary: "#3e79d6",
			},
			fontFamily: {
				main: ["PeydaWeb", "sans-serif"],
			},
		},
	},
	plugins: [],
};
export default config;
