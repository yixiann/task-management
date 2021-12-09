import { Select } from "antd";

export const CustomMenu = ({language, fields, defaultValue, value, onSelect}) => {
  const { Option } = Select;
  return (
    <Select placeHolder="Select" value={value} defaultValue={defaultValue} style={{ width: 120 }} onSelect={(e) => onSelect(e)}>
      {
        Object.keys(fields).map(item => (
          <Option value={item}>{language?.[item]}</Option>
        ))
      }
    </Select>
  )
}