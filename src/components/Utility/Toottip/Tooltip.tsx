import React, { useState } from 'react';
import Modal from './Modal';

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className="tooltip-wrapper" onClick={openModal}>
                {children}
            </div>
            {isModalOpen && <Modal text={text} onClose={closeModal} />}
        </>
    );
};

export default Tooltip;
