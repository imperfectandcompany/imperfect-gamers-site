// Heading.jsx
import React from 'react';

const Heading = ({ children, ...props }: { children: React.ReactNode }) => {
    return (
        <h1 className="text-4xl font-bold mb-2" {...props}>
            {children}
        </h1>
    );
};

export default Heading;