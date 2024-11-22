import React from 'react';

interface ActionButton {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

interface ActionButtonsProps {
  buttons: ActionButton[];
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ buttons }) => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => button.onClick()}
          disabled={button.disabled}
        >
          {button.title}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;
