// R$00,00
export function numberToBRL(value: string) {
  if (!Number(value) && value.length < 2) return "";
  if (!value) return "";

  value = value.replace(".", "").replace(",", "").replace(/\D/g, "");

  const options = { minimumFractionDigits: 2 };
  const result = new Intl.NumberFormat("pt-BR", options).format(
    Number(value) / 100
  );

  return "R$ " + result;
}
