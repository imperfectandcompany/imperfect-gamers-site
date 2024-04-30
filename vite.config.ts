import {
	vitePlugin as remix,
  } from "@remix-run/dev";
import { installGlobals } from '@remix-run/node'
import { remixDevTools } from 'remix-development-tools'
import { defineConfig } from "vitest/config";
import tsconfigPaths from 'vite-tsconfig-paths'
import { loadEnv } from 'vite';

/// <reference types="vitest" />
/// <reference types="vite/client" />


installGlobals()

export default defineConfig({
	plugins: [remixDevTools(), !process.env.VITEST && remix(), tsconfigPaths()],
	define: {
		__DEV__: process.env.NODE_ENV === 'development',
	},
	ssr: {
		noExternal: ['remix-utils', 'is-ip'],
	},
	test: {
		globals: true,
		environment: "jsdom",
		env: loadEnv("test", process.cwd(), ""),
		setupFiles: ["./test/setup-test-env.ts"],
		include: [
			"./app/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
			"./app/tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"
		],
		watchExclude: [
			".*\\/node_modules\\/.*",
			".*\\/build\\/.*",
		],
	},
})
