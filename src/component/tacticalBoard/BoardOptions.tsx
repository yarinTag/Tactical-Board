import React from 'react';
import { selectOptions, SelectOptions } from './interface';

interface BoardOptionsProps {
  selectOption: SelectOptions;
  handleSelectedOption: (value: SelectOptions) => void;
}

const BoardOptions = (props: BoardOptionsProps) => {
  const [selectOption, setSelectOption] = React.useState(props.selectOption);

  const handleOptionChange = (value: string) => {
    switch (value) {
      case SelectOptions.DRAWLINE:
        setSelectOption(value);
        props.handleSelectedOption(value);
        break;
      case SelectOptions.BALLPASS:
        setSelectOption(value);
        props.handleSelectedOption(value);
        break;
      default:
        setSelectOption(SelectOptions.DRAWLINE);
        props.handleSelectedOption(SelectOptions.DRAWLINE);
        break;
    }
  };

  return (
    <div>
      <label>Select:</label>
      <select
        value={selectOption}
        onChange={(e) => handleOptionChange(e.target.value)}
      >
        {selectOptions.map((option) => (
          <option key={option.key} value={option.value}>
            {option.key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BoardOptions;
