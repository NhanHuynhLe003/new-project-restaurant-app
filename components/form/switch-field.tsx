import React from "react";

import { Control, useController } from "react-hook-form";

import { SwitchProps, Switch } from "@mui/material";

export type SwitchFieldProps = SwitchProps & {
  //tat ca thuoc tinh trong day la bat buoc
  name: string;
  control: Control<any>; //kieu data tra ve la any
};
export default function SwitchField({
  name,
  control,
  //Tuyền các hàm bên dưới nhằm chặn user sửa props bên ngoài InputField
  onChange: extenalChangeInput,
  onBlur: externalBlurInput,
  value: externalValueInput,

  ...rest
}: SwitchFieldProps) {
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  return (
    <Switch
      value={value}
      ref={ref}
      onChange={onChange}
      name={name}
      {...rest}
    ></Switch>
  );
}
