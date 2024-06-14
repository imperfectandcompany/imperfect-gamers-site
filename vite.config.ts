import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { remixDevTools } from 'remix-development-tools'
import { loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'
import MsClarity from './app/utils/msclarity.client';

installGlobals()

export default defineConfig({
	resolve: {
		alias: {
		  '~/': `${__dirname}/app/`
		}
	  },
    plugins: [
        remixDevTools(),
        !process.env.VITEST && remix(),
        tsconfigPaths(),
        MsClarity({ id: process.env.MS_CLARITY_ID, enableInDevMode: true }) // Configure as needed
    ],	
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
