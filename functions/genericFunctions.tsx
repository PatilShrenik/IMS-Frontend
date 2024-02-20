export default function replacePeriodsWithUnderscoresSingleObject(obj: any) {
    const result: any = {};
  
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = key.replace(/\./g, "_"); // Replace all periods with underscores
        result[newKey] = obj[key];
      }
    }
  
    return result;
  }
  
  export function replacePeriodsWithUnderscores(arrayOfObjects: any) {
    return (
      arrayOfObjects &&
      arrayOfObjects.map((object: any) => {
        const newObject: any = {};
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const newKey = key.replace(/\./g, "_"); // Replace all periods with underscores
            newObject[newKey] = object[key];
          }
        }
        return newObject;
      })
    );
  }
  export function replaceUnderscoresWithDots(obj: any) {
    if (obj && typeof obj === "object") {
      const newObj: any = Array.isArray(obj) ? [] : {};
  
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const newKey = key.startsWith("_") ? key : key.replace(/_/g, ".");
          newObj[newKey] = replaceUnderscoresWithDots(obj[key]);
        }
      }
  
      return newObj;
    } else {
      return obj;
    }
  }
  export function replacePeriodsWithUnderscoresArrayOfObjects(arr: any[]) {
    const result: any[] = [];
    // console.log("-----array",arr)
    for (const obj of arr) {
      const newObj: any = {};
  
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const newKey = key.replace(/\./g, "_"); // Replace all periods with underscores
          newObj[newKey] = obj[key];
        }
      }
  
      result.push(newObj);
    }
    // console.log("result---------",result)
    return result;
  }
  
  export function convertEpochToDateMonthYear(epochTimeInSeconds: any) {
    const epochTimeInMilliseconds = epochTimeInSeconds * 1000;
    const date = new Date(epochTimeInMilliseconds);
  
    const options: any = { year: "numeric", month: "numeric", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
  
    return formattedDate;
  }
  