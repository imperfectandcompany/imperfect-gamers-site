// Event.tsx
import type React from 'react'
import { useState } from 'react'

type EventItemProps = {
	title: string
	description: string
	link: string
}

/**
 * Renders a tooltip component that displays additional content when hovered over.
 *
 * @param children - The content to be rendered inside the tooltip.
 * @param content - The text content to be displayed in the tooltip.
 * @returns The tooltip component.
 */
function Tooltip({
	children,
	content,
}: {
	children: React.ReactNode
	content: string
}) {
	const [show, setShow] = useState(false)

	return (
		<div
			className="relative flex items-center gap-1.5"
			onMouseEnter={() => {
				setShow(true)
			}}
			onMouseLeave={() => {
				setShow(false)
			}}
		>
			{children}
			{show ? (
				<div className="absolute bottom-full z-10 mb-2 select-none rounded bg-black px-3 py-1 text-xs text-white shadow-lg">
					{content}
				</div>
			) : null}
		</div>
	)
}

/**
 * Renders an event item component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the event.
 * @param {string} props.description - The description of the event.
 * @param {string} props.link - The link to learn more about the event.
 * @returns {JSX.Element} The rendered EventItem component.
 */
const EventItem: React.FC<EventItemProps> = ({ title, description, link }) => {
	return (
		<div className="rounded-lg bg-gradient-to-br from-white/40 to-black/30 p-6 shadow-xl transition duration-500 hover:scale-105">
			<h3 className="mb-3 text-xl font-bold">{title}</h3>
			<p className="mb-4 text-gray-400">{description}</p>
			<Tooltip content="Related content coming soon">
				<span className="cursor-not-allowed select-none text-rose-600 hover:text-rose-400 ">
					Learn More
				</span>
			</Tooltip>
		</div>
	)
}

export default EventItem
