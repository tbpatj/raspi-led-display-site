//util functions and things
export interface ChangeItem {
  path: string[];
  value: any;
}

export const jsonRecursion = (json: any, path: string[], value: any) => {
  if (path.length === 0) {
    return value;
  } else {
    const key = path[0];
    if (json[key] === undefined) {
      json[key] = {};
    }
    json[key] = jsonRecursion(json[key], path.slice(1), value);
    return json;
  }
};

export const getJsonValue = (json: any, paths: string[]) => {
  if (paths.length === 1) {
    return json?.[paths?.[0]];
  }
  let val = json;
  for (let i = 0; i < paths.length; i++) {
    if (val === undefined) return undefined;
    val = val?.[paths[i]];
  }
  return val;
};
