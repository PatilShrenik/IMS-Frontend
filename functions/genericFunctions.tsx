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
export function replacePeriodsWithUnderscoresnested(obj: any) {
  const result: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        // If the value is an object, recursively replace periods in nested object
        result[key.replace(/\./g, "_")] =
          replacePeriodsWithUnderscoresSingleObject(obj[key]);
      } else {
        // Replace period with underscore
        const newKey = key.replace(/\./g, "_");
        result[newKey] = obj[key];
      }
    }
  }

  return result;
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

export function replaceDotsWithUnderscores(obj: any) {
  const newObj: any = [];

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      newObj[key.replace(/\./g, "_")] = replaceDotsWithUnderscores(obj[key]);
    } else {
      newObj[key.replace(/\./g, "_")] = obj[key];
    }
  }

  return newObj;
}
export function replaceDotsWithUnderscoresSEC(obj: any) {
  const newObj: any = {};

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      newObj[key.replace(/\./g, "_")] = replaceDotsWithUnderscoresSEC(obj[key]);
    } else {
      newObj[key.replace(/\./g, "_")] = obj[key];
    }
  }

  return newObj;
}

export function replaceUnderscoresWithDotsNested(obj: any) {
  const newObj: any = {};

  for (const key in obj) {
    if (key === "_id" || typeof obj[key] !== "object" || obj[key] === null) {
      newObj[key] = obj[key];
    } else {
      newObj[key.replace(/_/g, ".")] = replaceUnderscoresWithDots(obj[key]);
    }
  }

  return newObj;
}
export function isValidIpAddress(ipAddress: any) {
  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ipAddress);
}
export function getAllKeys(obj: any) {
  let keysArray: any[] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      keysArray.push(key);

      if (typeof obj[key] === "object" && obj[key] !== null) {
        // Recursively call the function for nested objects
        keysArray = keysArray.concat(getAllKeys(obj[key]));
      }
    }
  }

  return keysArray;
}
