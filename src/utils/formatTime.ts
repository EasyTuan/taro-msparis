export const formatNumber = (num: number | string): string => {
  num = num.toString();
  return num[1] ? num : "0" + num;
};
//数字格式化为字符串，例：1会变为01，11还是11
export const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth()+1 ;
  const day = date.getDay()+1;
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const arr1 = [year, month, day];
  const arr2 = [hour, minute, second];
  return (
    arr1.map(formatNumber).join("-") + " " + arr2.map(formatNumber).join(":")
  );
}; //时间格式化，例：2020年11月1号12点18分2秒会变成2020-11-01 12:18:02
