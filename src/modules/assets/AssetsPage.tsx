import { Button, Switch } from "@mui/material";
import AssetsGrid from "./components/AssetsGrid";
import { useState } from "react";
import "./AssetsPage.css";
import { useAssets } from "./hooks/useAssets";
import { useToastContext } from "../../shared/hooks/useToastContext";

export default function AssetsPage() {
  const { assets, pendingChanges, updateAsset, saveChanges } = useAssets();
  const { showToast } = useToastContext();
  const [editMode, setEditMode] = useState(false);

  const handleEditModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditMode(event.target.checked);
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default button behavior if needed
    event.preventDefault();

    try {
      saveChanges();
      showToast("Asset changes saved successfully!", "success");
      setEditMode(false);
    } catch (error) {
      showToast("Failed to save changes. Please try again.", "error");
    }
  };

  return (
    <div className="assets-page">
      <header className="assets-header">
        <h1 className="assets-title">Assets</h1>
        <div>
          <label>Edit Mode</label>
          <Switch
            checked={editMode}
            onChange={handleEditModeChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
      </header>

      <div className="assets-content">
        <div className="assets-grid-container">
          <AssetsGrid
            rowData={assets}
            editMode={editMode}
            onRowDataChanged={updateAsset}
          />
          <div className="assets-footer">
            <label
              className={`change-status ${
                pendingChanges.length > 0 ? "has-changes" : ""
              }`}
            >
              {pendingChanges.length > 0
                ? `${pendingChanges.length} unsaved change${
                    pendingChanges.length > 1 ? "s" : ""
                  }`
                : "No changes have been made"}
            </label>
            <Button
              variant="contained"
              disabled={!(editMode && pendingChanges.length > 0)}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
