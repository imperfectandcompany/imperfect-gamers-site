// components/molecules/ModalContent/ModalContent.tsx
import React, {type ReactNode} from 'react';
import Heading from '~/components/atoms/Heading/Heading';
import Link from '~/components/atoms/Link/Link';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';

type ModalContentProps = {
	title: string;
	content: ReactNode;
};

/**
 * Renders the content of a modal.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the modal.
 * @param {string | React.ReactNode} props.content - The content of the modal.
 * @returns {React.ReactNode} The rendered modal content.
 */
const ModalContent: React.FC<ModalContentProps> = ({title, content}) => {
	return (
		<>
			<Heading>{title}</Heading>
			{typeof content === 'string' ? (
				<Paragraph>
					{content}
					<br />
					{/* 
                    TODO Setup passable footer

                    example content:
                    For now, head over to our{' '}
                    <Link href="https://imperfectgamers.org/discord/">Discord</Link> or
                    directly to the{' '}
                    <Link href="https://discord.com/channels/193909594270072832/641373370944061451">
                    #ban-appeals
                    </Link>{' '}
                    channel to sort out appeals. We're working on bringing this feature
                    directly to you here, so stay tuned!
                    */}
				</Paragraph>
			) : (
				content
			)}
		</>
	);
};

export default ModalContent;
