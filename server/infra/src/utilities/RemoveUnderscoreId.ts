export const mapObject = (obj: any, normalObject?: boolean): any => {
  let mapObject: any = {};
  if (normalObject) {
    Object.keys(obj).forEach((key) => {
      if (key === "_id") mapObject["id"] = obj[key];
      else if (key !== "__v") mapObject[key] = obj[key];
    });
  } else {
    Object.keys(obj._doc).forEach((key) => {
      if (key === "_id") mapObject["id"] = obj[key];
      else if (key !== "__v") mapObject[key] = obj[key];
    });
  }
  return mapObject;
};
