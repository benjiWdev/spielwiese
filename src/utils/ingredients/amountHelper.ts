import { Amount, Measurements } from '@/models'

export const getMeasurementDisplayValue = (measurement?: Measurements): string => {
  const measurementDisplayValues = {
    [Measurements.PIECE]: 'Stück',
    [Measurements.TL]: 'tl',
    [Measurements.EL]: 'el',
    [Measurements.ML]: 'ml',
    [Measurements.G]: 'g',
  }

  return measurement ? measurementDisplayValues[measurement] : ''
}

export const getAmountMeasurementString = (amount: Amount): string => {
  if (amount.measurement === Measurements.ML || amount.measurement === Measurements.G) {
    return `${amount.count}${getMeasurementDisplayValue(amount.measurement)}`
  } else {
    return `${amount.count} ${getMeasurementDisplayValue(amount.measurement)}`
  }
}
