export const formatMoney = (amount = 0) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "AUS",
  }).format(amount);
};
