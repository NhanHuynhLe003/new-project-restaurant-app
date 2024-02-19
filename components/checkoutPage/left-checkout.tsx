import { Box, Button, Stack, Typography } from "@mui/material";
import * as React from "react";
import styles from "../../styles/checkout/LeftCheckoutPage.module.css";
import { CheckoutModel } from "../../models";
import { Control, useForm } from "react-hook-form";
import { InputField } from "../form";
import SelectFieldForm from "../form/select-field-form";
import CheckBoxField from "../form/checkbox-field";

export interface LeftCheckoutProps {
  control: Control<CheckoutModel>;
  isSubmitting: Boolean;
}

export function LeftCheckout({ control, isSubmitting }: LeftCheckoutProps) {
  return (
    <Box>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
      >
        <Box className={styles.inputField}>
          <InputField
            name="firstName"
            label="First name"
            control={control}
            type="string"
            disabled={isSubmitting ? true : false}
          ></InputField>
        </Box>
        <Box className={styles.inputField}>
          <InputField
            name="lastName"
            label="Last name"
            control={control}
            type="string"
            disabled={isSubmitting ? true : false}
          ></InputField>
        </Box>
        <Box className={styles.inputField}>
          <InputField
            name="email"
            label="Email"
            control={control}
            type="string"
            disabled={isSubmitting ? true : false}
          ></InputField>
        </Box>
        <Box className={styles.inputField}>
          <InputField
            name="phone"
            label="Phone number"
            control={control}
            type="string"
            disabled={isSubmitting ? true : false}
          ></InputField>
        </Box>

        <Box className={styles.inputField}>
          <InputField
            name="street"
            label="Street"
            control={control}
            type="string"
            disabled={isSubmitting ? true : false}
          ></InputField>
        </Box>

        <Box className={styles.inputField}>
          <InputField
            name="district"
            label="District"
            control={control}
            type="string"
            disabled={isSubmitting ? true : false}
          ></InputField>
        </Box>
        <Box className={styles.inputField}>
          <SelectFieldForm
            style={{ marginTop: "0.5rem" }}
            control={control}
            name="city"
            label={"City"}
            disabled={isSubmitting ? true : false}
            options={["city1", "city2", "city3"]}
          ></SelectFieldForm>
        </Box>
        <Box className={styles.inputField}>
          <InputField
            name="zipCode"
            label="Zip Code"
            control={control}
            type="string"
            disabled={isSubmitting ? true : false}
          ></InputField>
        </Box>

        <Typography component={"h2"} variant="h5" width={"100%"} mt={"1.5rem"}>
          Billing Address
        </Typography>
        <Box className={styles.inputField}>
          <CheckBoxField
            control={control}
            name="billingAddress"
            disabled={isSubmitting ? true : false}
          >
            same as shipping address
          </CheckBoxField>
        </Box>
      </Stack>
    </Box>
  );
}
