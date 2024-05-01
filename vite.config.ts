import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { remixDevTools } from 'remix-development-tools'
import { loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

installGlobals()

export default defineConfig({
	plugins: [remixDevTools(), !process.env.VITEST && remix(), tsconfigPaths()],
	ssr: {
		noExternal: ['remix-utils', 'is-ip'],
	},
	test: {
		globals: true,
		environment: 'jsdom',
		env: loadEnv('test', process.cwd(), ''),
		setupFiles: ['./test/setup-test-env.ts'],
		include: [
			'./app/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
			'./app/tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
		],
		watchExclude: ['.*\\/node_modules\\/.*', '.*\\/build\\/.*'],
	},
})
