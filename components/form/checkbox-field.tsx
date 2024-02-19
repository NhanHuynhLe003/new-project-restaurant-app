import * as React from "react";
import { Checkbox, CheckboxProps } from "@mui/material";
import { Control, useController } from "react-hook-form";
export type CheckBoxFieldProps = CheckboxProps & {
  name: string;
  control: Control<any>;

  children: React.ReactNode;
};

export default function CheckBoxField({
  children,
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
    <label style={{ cursor: "pointer" }} htmlFor={"checkbox-" + name}>
      <Checkbox
        id={"checkbox-" + name}
        name={name}
        checked={Boolean(value)}
        ref={ref}
        onChange={onChange}
        {...rest}
      ></Checkbox>
      {children}
    </label>
  );
}
