import { MenuItem, Select } from "@mui/material";
import { IRowNode } from "ag-grid-community";
import { useState } from "react";

interface Props {
  value: boolean;
  onChange: (node: IRowNode, value: boolean) => void;
  editMode: boolean;
  node: IRowNode;
}

function BooleanCellRenderer({ value, editMode, onChange, node }: Props) {
  const [cellValue, setCellValue] = useState(value);

  const onValueChangeHandler = (event) => {
    const eventValue = event.target.value ? true : false;
    onChange(node, eventValue);
    setCellValue(eventValue);
  };

  if (!editMode) {
    return <div>{cellValue ? "True" : "False"}</div>;
  }

  return (
    <div>
      <Select
        value={cellValue ? 1 : 0}
        onChange={onValueChangeHandler}
        sx={{ height: 30, width: "100%" }}
      >
        <MenuItem value={1}> True </MenuItem>
        <MenuItem value={0}> False </MenuItem>
      </Select>
    </div>
  );
}

export default BooleanCellRenderer;
