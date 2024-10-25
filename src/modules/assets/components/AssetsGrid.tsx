import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Asset } from "../models";
import { ColDef, IRowNode, ValueFormatterParams } from "ag-grid-community";
import BooleanCellRenderer from "./BooleanCellRenderer";
import "./AssetsGrid.css";

const DEFAULT_COL_DEF = {
  filter: true,
  width: 250,
  valueFormatter: (params: ValueFormatterParams) => {
    return params.value === null || params.value === undefined
      ? "N/A"
      : params.value;
  },
};

export interface Props {
  rowData: Asset[];
  editMode: boolean;
  onRowDataChanged: (asset: Asset) => void;
}

export default function AssetsGrid({
  rowData,
  editMode,
  onRowDataChanged,
}: Props) {
  const columnDefs = [
    { headerName: "Id", field: "_id", width: 300 },
    { headerName: "Asset Name", field: "assetName", sort: "asc" },
    {
      headerName: "Owner name",
      field: "owner.name",
      valueGetter: (params) =>
        params.data?.owner?.name || params.data?.owner?.owner?.name,
    },
    {
      headerName: "Is Crown Jewel",
      field: "enriched.isCrownJewel",
      cellRenderer: BooleanCellRenderer,
      cellRendererParams: {
        editMode: editMode,
        onChange: (node: IRowNode<Asset>, value: boolean) => {
          const updatedAsset = {
            ...node.data,
            enriched: { ...node.data?.enriched, isCrownJewel: value },
          } as Asset;
          onRowDataChanged(updatedAsset);
        },
      },
    },
  ] as ColDef<Asset>[];

  return (
    <div className="assets-grid-wrapper">
      <div className="ag-theme-quartz assets-grid">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={DEFAULT_COL_DEF}
          onCellValueChanged={(params) => {
            if (editMode) {
              onRowDataChanged(params.data as Asset);
            }
          }}
          domLayout="normal"
        />
      </div>
    </div>
  );
}
