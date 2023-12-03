export const handleConvertObjectDdb = (dataList: any[]) => {
  let newData = [...dataList];
  newData.map((data, index) => {
    Object.keys(data).forEach((keyType) => {
      if (typeof data[keyType] === "object" && data[keyType] !== null) {
        //1 key chi co 1 ky tu
        const dataStrVal = Object.values(data[keyType])[0];
        // Trả về một mảng string
        data[keyType] = dataStrVal;
      }
    });
    return data;
  });
  return newData;
};
