export const formatNumber = (number: number, decimalPlaces = 0): string => {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  })
}

export const formatPercent = (num: number): string => {
  return num.toFixed(2)
}
