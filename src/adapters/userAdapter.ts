import { RegisterValues } from "@/models/registerValues";

export const adapterUser = (user: RegisterValues): Partial<RegisterValues> => ({
  name: user.name,
  phone: user.phone,
  codeLoan: user.codeLoan,
  currency: user.currency,
  monthlyPayment: user.monthlyPayment,
  startAt: user.startAt,
  endAt: user.endAt
});
