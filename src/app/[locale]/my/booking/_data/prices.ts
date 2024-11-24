export const getPriceRate = (hour: number, peopleCount: number) => {
  const basePrice = 50;
  const hourlyRate = hour >= 8 && hour < 18 ? 100 : 75;
  return basePrice + hourlyRate * peopleCount;
};
