const { NumberFormat } = Intl

export default amount =>
  new NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: amount % 100 === 0 ? 0 : 2,
  }).format(amount / 100)
