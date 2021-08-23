export const getSequenceArray = (start, end, interval) => {
  const temp = [];
  for (let i = start; i < end; ) {
    temp.push(('0' + i.toString()).slice(-2));
    i += interval;
  }
  return temp;
};
