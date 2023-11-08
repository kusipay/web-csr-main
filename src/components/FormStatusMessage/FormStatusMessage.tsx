import { CircularProgress, Stack, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
interface FormStatusMessageProps {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const FormStatusMessage: React.FC<FormStatusMessageProps> = ({
  isSubmitting,
  isSuccess,
  isError
}) => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);
  if (isSubmitting) {
    return (
      <Stack
        sx={{
          color: "grey.500",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        spacing={2}
        direction="row"
      >
        <CircularProgress color="secondary" />
      </Stack>
    );
  }

  if (showSuccess) {
    return <Alert severity="success">Registro Exitoso!</Alert>;
  }

  if (isError) {
    return <Alert severity="error">Error al enviar el formulario!</Alert>;
  }

  return null;
};

export default FormStatusMessage;
