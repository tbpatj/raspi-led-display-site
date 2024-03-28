import { useCallback } from "react";
import { ChangeItem, jsonRecursion } from "../Resources/JsonChange";
import { cloneDeep } from "lodash";

interface UseJsonChangeProps {
  json: any;
  onChange: (json: any, items: ChangeItem[]) => void;
}

interface UseJsonChange {
  update: (items: ChangeItem[]) => void;
}

const useJsonChange: (props: UseJsonChangeProps) => UseJsonChange = ({
  json,
  onChange,
}) => {
  const update = useCallback(
    (items: ChangeItem[]) => {
      let nJson = cloneDeep(json);
      for (const item of items) {
        nJson = jsonRecursion(nJson, item.path, item.value);
      }
      onChange(nJson, items);
    },
    [json]
  );

  return { update };
};

export default useJsonChange;
