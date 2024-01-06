import * as React from "react";
import { Control, useController } from "react-hook-form";
import {
  AutocompleteProps,
  Autocomplete,
  Chip,
  TextField,
  Box,
} from "@mui/material";

export interface AutoCompleteFieldProps {
  isAddOption?: boolean;
  dataList: string[];
  disabled?: boolean;
  name: string;
  label?: string;
  placeholder?: string;
  control: Control<any>;
}

export function AutoCompleteField({
  isAddOption = true,
  name,
  disabled,
  control,
  dataList,
  label,
  placeholder,
}: AutoCompleteFieldProps) {
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  // handle type error object
  const dupBoard: { [index: string]: boolean } = {};
  const optList = dataList.filter(
    (opt: string) => !dupBoard[opt] && (dupBoard[opt] = true)
  );

  return (
    <Autocomplete
      disabled={disabled}
      onChange={(e, val) => {
        //Data submit on dynamodb is object so I has to convert to object
        const convertArrToObj = val.reduce(
          (acc: { [index: string]: boolean }, currentItem) => {
            acc[currentItem] = true;
            return acc;
          },
          {}
        );

        onChange(convertArrToObj);
      }}
      multiple
      id="tags-filled"
      options={optList.map((option) => option)}
      freeSolo={isAddOption}
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => {
          const { key, ...tagProps } = getTagProps({ index });

          return (
            <Chip
              key={"option_key_" + index + key}
              variant="outlined"
              label={option}
              {...tagProps}
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField
          name={name}
          value={value}
          ref={ref}
          {...params}
          variant="filled"
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
}
