export const getInputDateString = (date:Date) => {
  return date.toISOString().split("T")[0];
};

export const getDateFromInputString = (dateString:string) => {
  const [year, month, day] = dateString.split("-");
  return new Date(+year, +month - 1, +day);
};
