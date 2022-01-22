export const mapObject = (obj: any): any => {
  let mapObject: any = {};
  Object.keys(obj._doc).forEach((key) => {
    if (key === "_id") mapObject["id"] = obj[key];
    else if (key !== "__v") mapObject[key] = obj[key];
  });
  return mapObject;
};
