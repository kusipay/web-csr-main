export interface RegisterValues {
  name: string;
  phone: string;
  codeLoan: string;
  idUser: string;
  currency: string;
  amount: string;
  paymentTimes: string;
  startAt: Date | null | number;
  endAt: Date | null | number;
  timezoneOffsetMinutes: number;
  frecuencyType: string;
}
