import React from 'react';

const Card = ({ children, className = '', title, actions, ...props }) => {
    return (
        <div className={`card ${className}`} {...props}>
            {(title || actions) && (
                <div className="flex justify-between items-center mb-4">
                    {title && <h3 className="text-xl font-bold">{title}</h3>}
                    {actions && <div>{actions}</div>}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
