import * as React from "react";
import { Control, useController } from "react-hook-form";

import clsx from "clsx";
import { MenuItem, Select, SelectProps } from "@mui/material";
export type SelectFieldFormProps = SelectProps & {
  name: string;
  label: string;
  control: Control<any>; //kieu data tra ve la any
  options: string[];
};

export default function SelectFieldForm({
  name,
  control,
  label,
  options,
  //Tuyền các hàm bên dưới nhằm chặn user sửa props bên ngoài InputField
  onChange: extenalChangeInput,
  onBlur: externalBlurInput,
  value: externalValueInput,

  ...rest
}: SelectFieldFormProps) {
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Select
      // label="Age"
      renderValue={() => value || label}
      defaultValue={options[0]}
      displayEmpty
      value={value}
      ref={ref}
      name={name}
      onChange={onChange}
      fullWidth
      {...rest}
    >
      {options &&
        options.map((opt, index) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
    </Select>
  );
}
