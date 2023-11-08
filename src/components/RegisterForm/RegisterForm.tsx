import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
  Box
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { validationSchema } from "@/utilities/registerValidators";
import { RegisterValues } from "@/models/registerValues";
import dayjs from "dayjs";
import FormStatusMessage from "../FormStatusMessage/FormStatusMessage";

const currencies = ["USD", "PEN"];
const initialValues: RegisterValues = {
  name: "",
  phone: "",
  codeLoan: "",
  idUser: "",
  currency: "",
  amount: "",
  paymentTimes: "",
  startAt: null,
  endAt: null,
  timezoneOffsetMinutes: 0,
  frecuencyType: ""
};
const RegisterForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (values.startAt) {
        const newStartDate = new Date(values.startAt);
        const epochTime = newStartDate.getTime() / 1000;
        values.startAt = epochTime;
      }
      if (values.endAt) {
        const newEndDate = new Date(values.endAt);
        const epochTime = newEndDate.getTime() / 1000;
        values.endAt = epochTime;
      }
      values.frecuencyType = "monthly";
      values.timezoneOffsetMinutes = new Date().getTimezoneOffset();

      setIsSubmitting(true);
      try {
        const response = await fetch(
          "https://o8tl97gvej.execute-api.us-east-1.amazonaws.com/v1/loans",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
          }
        );
        if (!response.ok) {
          setIsError(true);
          throw new Error("Error al enviar el formulario");
        } else {
          setIsSuccess(true);
        }
        // const data = await response.json();
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsSubmitting(false);
      }
      resetForm();
    }
  });

  return (
    <Container
      sx={{ margin: "2rem", border: "2px solid grey", borderRadius: "10px" }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ textAlign: "center", margin: " 1.5rem 0" }}
      >
        Registro de usuarios
      </Typography>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          paddingBottom: "1rem"
        }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nombres y apellidos"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Celular"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <TextField
          fullWidth
          id="codeLoan"
          name="codeLoan"
          label="Código de préstamo"
          value={formik.values.codeLoan}
          onChange={(e) => {
            formik.handleChange("codeLoan")(e.target.value.toUpperCase());
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.codeLoan && Boolean(formik.errors.codeLoan)}
          helperText={formik.touched.codeLoan && formik.errors.codeLoan}
        />
        <TextField
          fullWidth
          id="idUser"
          name="idUser"
          label="Id del usuario"
          value={formik.values.idUser}
          onChange={(e) => {
            formik.handleChange("idUser")(e.target.value.toUpperCase());
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.idUser && Boolean(formik.errors.idUser)}
          helperText={formik.touched.idUser && formik.errors.idUser}
        />
        <TextField
          fullWidth
          id="currency"
          name="currency"
          label="Tipo de moneda"
          select
          value={formik.values.currency}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.currency && Boolean(formik.errors.currency)}
          helperText={formik.touched.currency && formik.errors.currency}
        >
          {currencies.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          id="amount"
          name="amount"
          label="Capital"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
        />
        <TextField
          fullWidth
          id="paymentTimes"
          name="paymentTimes"
          label="número de cuotas"
          value={formik.values.paymentTimes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.paymentTimes && Boolean(formik.errors.paymentTimes)
          }
          helperText={formik.touched.paymentTimes && formik.errors.paymentTimes}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DatePicker
            label="Fecha de inicio"
            // views={["year", "month", "day"]}
            value={dayjs(formik.values.startAt)}
            onChange={(date) => {
              if (date) {
                formik.setFieldValue("startAt", date);
              }
            }}
            slotProps={{
              textField: {
                id: "startDate",
                name: "startDate",
                error: formik.touched.startAt && Boolean(formik.errors.startAt),
                helperText: formik.touched.startAt && formik.errors.startAt
              }
            }}
          />
          <DatePicker
            label="Fecha de término"
            value={dayjs(formik.values.endAt)}
            onChange={(date) => {
              if (date) {
                formik.setFieldValue("endAt", date);
              }
            }}
            slotProps={{
              textField: {
                id: "endDate",
                name: "endDate",
                error: formik.touched.endAt && Boolean(formik.errors.endAt),
                helperText: formik.touched.endAt && formik.errors.endAt
              }
            }}
          />
        </Box>
        <FormStatusMessage
          isSubmitting={isSubmitting}
          isSuccess={isSuccess}
          isError={isError}
        />
        <Button
          size="large"
          color="secondary"
          variant="contained"
          type="submit"
          sx={{ fontWeight: "bold" }}
        >
          Registrar
        </Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
