import type {Config} from 'tailwindcss';

/**
 * Represents the configuration for the Tailwind CSS framework.
 *
 * @remarks
 * This configuration file is used to customize the theme, colors, background images, box shadows, and variants of Tailwind CSS.
 *
 * @see {@link https://tailwindcss.com/docs/configuration|Tailwind CSS Configuration}
 */
export default {
	content: ['./app/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			// Use `extend` to add to the existing colors rather than overwrite them
			colors: {
				'imperfect-black': '#0d0d0d', // Our custom color tokens
				'gradient-start': '#640000', // Gradient start for our buttons
				'gradient-end': '#ae0000', // Gradient end for our buttons
				'secondary-color': '#7D7D7D', // Our secondary color
				'secondary-dark': '#555555', // Our darker secondary color
			},
			backgroundImage: {
				'radial-at-c':
          'radial-gradient(circle at center, var(--tw-gradient-stops))',
			},
			boxShadow: {
				// Custom shadow styles specifically for our design
				custom: '0 5px 15px rgba(0, 0, 0, 0.5)',
				'custom-hover': '0 2px 5px rgba(0, 0, 0, 0.3)',
				'custom-active': '0 1px 3px rgba(0, 0, 0, 0.2)',
			},
			// Add any additional extensions here
		},
		variants: {
			extend: {
				borderColor: [
					'hover',
					'focus',
					'valid',
					'invalid',
					'hover:valid',
					'hover:invalid',
				],
			},
		},
		// If we want to customize the existing styles without using `extend`
		// (not recommended unless we truly want to override),
		// we would place them outside the `extend` object.
	},
	plugins: [],
} satisfies Config;
