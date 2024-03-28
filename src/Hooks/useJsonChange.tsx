import { useCallback } from "react";
import { ChangeItem, jsonRecursion } from "../Resources/JsonChange";
import { cloneDeep } from "lodash";
import { ServerResponse } from "../Resources/ServerResponseResources";

interface UseJsonChangeProps {
  json: any;
  onChange: (json: any, items: ChangeItem[]) => Promise<ServerResponse>;
}

interface UseJsonChange {
  update: (items: ChangeItem[]) => Promise<ServerResponse>;
}

const useJsonChange: (props: UseJsonChangeProps) => UseJsonChange = ({
  json,
  onChange,
}) => {
  const update = useCallback(
    async (items: ChangeItem[]) => {
      let nJson = cloneDeep(json);
      for (const item of items) {
        nJson = jsonRecursion(nJson, item.path, item.value);
      }
      return await onChange(nJson, items);
    },
    [json]
  );

  return { update };
};

export default useJsonChange;
