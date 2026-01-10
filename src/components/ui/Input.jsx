import React from 'react';

const Input = ({
    label,
    id,
    type = 'text',
    error,
    className = '',
    ...props
}) => {
    return (
        <div className={`form-group ${className}`}>
            {label && <label htmlFor={id} className="form-label">{label}</label>}
            <input
                id={id}
                type={type}
                className="form-input"
                {...props}
            />
            {error && <span className="text-sm text-danger mt-1 block" style={{ color: 'var(--danger)' }}>{error}</span>}
        </div>
    );
};

export default Input;
