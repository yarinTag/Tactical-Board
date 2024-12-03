import React from 'react';

export interface ActionButton {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface ActionButtonsProps {
  buttons: ActionButton[];
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ buttons }) => {
  return (
    <div style={{ display: 'contents' }}>
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
