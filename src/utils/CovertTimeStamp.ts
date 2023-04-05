export const convertTimestampToDate = (timestamp: number) => {
  const dateObj = new Date(timestamp);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = dateObj.getDate();
  const monthIndex = dateObj.getMonth();
  const year = dateObj.getFullYear();
  const formattedDate = `${date} ${monthNames[monthIndex]}, ${year}`;
  return formattedDate;
};
