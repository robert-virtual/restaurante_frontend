import './Field.css';
const FieldSelect = ({
  name = "",
  labelText = "",
  value = "",
  options = [],
  valueField = "value",
  textField = "text",
  onChange = (e: React.ChangeEvent<HTMLSelectElement>) => { },
  ...rest
}) => {
  return (
    <fieldset className="input">
      <label htmlFor={name}>{labelText}</label>
      <select name={name} id={name} value={value} onChange={onChange} {...rest}>
        {options.map(option => (
          <option key={option[valueField]} value={option[valueField]}>{option[textField]}</option>
        ))}
      </select>
    </fieldset>
  );
}

export default FieldSelect;
