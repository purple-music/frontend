export const days = [1, 3, 7, 14, 31];

export const getPresetLabel = (days: number) => {
  const dayNames: Record<number, string> = {
    1: "День",
    3: "Три дня",
    7: "Неделя",
    14: "Две недели",
    31: "Месяц",
  };

  return dayNames[days] ?? `${days} дней`;
};
