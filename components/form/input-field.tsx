import * as React from "react";
import { Control, useController } from "react-hook-form";

import { TextField, TextFieldProps } from "@mui/material";

export type InputFieldProps = TextFieldProps & {
  //tat ca thuoc tinh trong day la bat buoc
  name: string; //name co the truyen tu ben ngoai, Component ko nhat thiet co name. nhưng Component chứa phải có Name để truyền vào useController
  label: string;
  control: Control<any>; //kieu data tra ve la any
};
export function InputField({
  name,
  control,
  //Tuyền các hàm bên dưới nhằm chặn user sửa props bên ngoài InputField
  onChange: extenalChangeInput,
  onBlur: externalBlurInput,
  value: externalValueInput,
  ...rest
}: InputFieldProps) {
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      value={value}
      ref={ref}
      onChange={onChange}
      name={name}
      fullWidth
      error={!!error}
      helperText={error?.message}
      margin="normal"
      {...rest}
    ></TextField>
  );
}
