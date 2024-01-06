import * as React from "react";
import { Control, useController } from "react-hook-form";

import { TextareaAutosizeProps, TextareaAutosize } from "@mui/material";

export interface TextAreaFieldProps extends TextareaAutosizeProps {
  //tat ca thuoc tinh trong day la bat buoc
  name: string; //name co the truyen tu ben ngoai, Component ko nhat thiet co name. nhưng Component chứa phải có Name để truyền vào useController
  label: string;
  control: Control<any>; //kieu data tra ve la any
}
export function InputArea({
  name,
  control,
  //Tuyền các hàm bên dưới nhằm chặn user sửa props bên ngoài InputField
  onChange: extenalChangeInput,
  onBlur: externalBlurInput,
  value: externalValueInput,
  ...rest
}: TextAreaFieldProps) {
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    // <TextField
    //   value={value}
    //   ref={ref}
    //   onChange={onChange}
    //   name={name}
    //   fullWidth
    //   error={!!error}
    //   helperText={error?.message}
    //   margin="normal"
    //   {...rest}
    // ></TextField>
    <TextareaAutosize
      value={value}
      ref={ref}
      onChange={onChange}
      name={name}
      {...rest}
    ></TextareaAutosize>
  );
}
