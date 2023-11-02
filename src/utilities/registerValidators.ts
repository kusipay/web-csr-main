import * as yup from "yup";
export const validationSchema = yup.object({
  name: yup
    .string()
    .required("Nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(50, "El nombre no debe exceder los 50 caracteres"),
  phone: yup
    .number()
    .typeError("El teléfono debe ser un número")
    .max(999999999, "El teléfono no debe exceder los 9 dígitos")
    .required("Teléfono es requerido"),
  codeLoan: yup.string().required("Código de préstamo requerido"),
  idUser: yup.string().required("Id del usuario requerido"),
  amount: yup
    .number()
    .typeError("El capital debe ser un número")
    .required("El valor de capital es requerido"),
  currency: yup.string().required("Tipo de moneda requerido"),
  paymentTimes: yup
    .number()
    .typeError("Las cuotas deben ser un número")
    .positive("Las cuotas deben ser un número positivo")
    .required("El capital es requerido"),
  // monthlyPayment: yup
  //   .number()
  //   .typeError("El pago mensual debe ser un número")
  //   .positive("Los pagos mensuales deben ser un número positivo")
  //   .required("El pago mensual  es requerido"),
  startAt: yup.date().required("La fecha de inicio es requerido"),
  endAt: yup.date().required("La fecha de término es requerido")
  // role: yup.string().required("Debes seleccionar un rol"),
  // status: yup.string().required("Debes seleccionar un estatus")
});
