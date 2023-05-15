export const formatDate = (value: string | number): string => {
  let dateString = "";
  if (!value) {
    return "";
  }

  if ("string" === typeof value) {
    const isZChar = value.toString().slice(-1) === "Z";
    if (!isZChar) {
      value = value + "Z";
    }
  }
  try {
    const date = new Date(value);
    dateString = new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(date);
  } catch (error) {}

  return dateString;
};
