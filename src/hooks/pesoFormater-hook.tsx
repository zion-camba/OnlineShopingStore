export const usePesoFormatter = () => {
  let value = "";

  const formatedPeso = (price: number | bigint) => {
    value = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
    }).format(price);
    return value;
  };

  return { formatedPeso };
};
