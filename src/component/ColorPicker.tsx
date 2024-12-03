import React from 'react';
import '../styles/modal.css';

const colorsMap: Map<string, string> = new Map([
  ['Black', 'rgb(0, 0, 0)'],
  ['Red', 'rgb(255, 0, 0)'],
  ['Green', 'rgb(0, 255, 0)'],
  ['Blue', 'rgb(0, 0, 255)'],
  ['Yellow', 'rgb(255, 255, 0)'],
  ['Magenta', 'rgb(255, 0, 255)'],
  ['Cyan', 'rgb(0, 255, 255)'],
  ['Maroon', 'rgb(128, 0, 0)'],
  ['GreenDark', 'rgb(0, 128, 0)'],
  ['BlueDark', 'rgb(0, 0, 128)'],
  ['Olive', 'rgb(128, 128, 0)'],
  ['Purple', 'rgb(128, 0, 128)'],
]);

function getKeyByValue(map: Map<string, string>, searchValue: string): string {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) {
      return key;
    }
  }
  return 'Blue';
}

const ColorPickerDialog: React.FC<{
  onClose: (shirtColor: string, pantsColor: string) => void;
  pantsC: string;
  shirtC: string;
}> = ({ onClose, pantsC, shirtC }) => {
  const [shirtColor, setShirtColor] = React.useState<string>(
    getKeyByValue(colorsMap, shirtC)
  );
  const [pantsColor, setPantsColor] = React.useState<string>(
    getKeyByValue(colorsMap, pantsC)
  );

  const handleShirtColorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setShirtColor(event.target.value);
  };

  const handlePantsColorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPantsColor(event.target.value);
  };

  const handleApplyColors = () => {
    onClose(
      colorsMap.get(shirtColor) || shirtC,
      colorsMap.get(pantsColor) || pantsC
    );
  };

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div style={{ padding: '20px' }}>
          <h3>Choose Shirt Color:</h3>
          <select
            value={shirtColor}
            onChange={handleShirtColorChange}
            className='select'
          >
            {Array.from(colorsMap.entries()).map(([colorName]) => (
              <option key={colorName} value={colorName}>
                {colorName}
              </option>
            ))}
          </select>
          <h3>Choose Pants Color:</h3>
          <select
            value={pantsColor}
            onChange={handlePantsColorChange}
            className='select'
          >
            {Array.from(colorsMap.entries()).map(([colorName]) => (
              <option key={colorName} value={colorName}>
                {colorName}
              </option>
            ))}
          </select>
          <br />
          <button
            style={{ width: '100%', padding: '10px 20px', fontSize: '16px' }}
            onClick={handleApplyColors}
          >
            Apply Colors
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerDialog;
