// components/CrateWidget.js
import { useEffect } from 'react'

const CrateWidget = () => {
	useEffect(() => {
		// Create a script element
		const script = document.createElement('script')
		script.src =
			'https://cdn.imperfectgamers.org/inc/assets/npm/widget/crate.js'
		script.async = true
		script.defer = true

		// Append script to the document body
		document.body.appendChild(script)

		// Initialize the Crate widget after the script is loaded
		script.onload = () => {
			new (window as any).Crate({
				server: '193909594270072832',
				channel: '366373736766636042',
				shard: 'https://e.widgetbot.io',
				color: '#ff3535',
			})
		}

		// Cleanup function
		return () => {
			document.body.removeChild(script)
		}
	}, [])

	return null // This component does not render anything
}

export default CrateWidget
