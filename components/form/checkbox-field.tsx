import * as React from "react";
import { Checkbox, CheckboxProps } from "@mui/material";
import { Control, useController } from "react-hook-form";
export type CheckBoxFieldProps = CheckboxProps & {
  name: string;
  control: Control<any>;
};

export default function CheckBoxField({
  name,
  control,
  //Tuyền các hàm bên dưới nhằm chặn user sửa props bên ngoài InputField
  onChange: extenalChangeInput,
  onBlur: externalBlurInput,
  value: externalValueInput,

  ...rest
}: CheckBoxFieldProps) {
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  return (
    <Checkbox
      name={name}
      value={value}
      ref={ref}
      onChange={onChange}
      {...rest}
    ></Checkbox>
  );
}
