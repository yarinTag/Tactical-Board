import React from 'react';

interface FormationOptionsProps {
  formations: string[];
  selectedFormation: string;
  onFormationChange: (formation: string) => void;
}

const FormationOptions: React.FC<FormationOptionsProps> = ({
  formations,
  selectedFormation,
  onFormationChange,
}) => {
  const [selected, setSelected] = React.useState(selectedFormation);
  const handleFormation = (value: string) => {
    onFormationChange(value);
    setSelected(value);
  };

  return (
    <div>
      <label>Select Formation:</label>
      <select
        value={selected}
        onChange={(e) => handleFormation(e.target.value)}
      >
        {formations.map((formation) => (
          <option key={formation} value={formation}>
            {formation}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormationOptions;
