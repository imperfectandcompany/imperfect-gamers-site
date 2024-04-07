import React from 'react';

const Paragraph = ({ children, ...props }: { children: React.ReactNode }) => {
    return (
        <p className="mb-4 mt-2" {...props}>
            {children}
        </p>
    );
};

export default Paragraph;