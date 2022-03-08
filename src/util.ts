export const calculatePrice = (weight: number, unitPrice: number) => {
  return weight * unitPrice;
};

export const convertNumberFormat = (value: number) => {
  return new Intl.NumberFormat('ko').format(value);
};
