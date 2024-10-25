import { useState, useEffect } from "react";
import { Asset } from "../models/Asset";
import { getAssets } from "../services/assets.service";

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [pendingChanges, setPendingChanges] = useState<Asset[]>([]);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    // First try to get assets from local storage
    const savedAssets = localStorage.getItem("assets");
    if (savedAssets) {
      const parsedAssets = JSON.parse(savedAssets);
      setAssets(parsedAssets);
    } else {
      // If not exists, call API to retrieve data
      const fetchedAssets = await getAssets();
      setAssets(fetchedAssets);
      localStorage.setItem("assets", JSON.stringify(fetchedAssets));
    }
  };

  const updateAsset = (asset: Asset) => {
    setPendingChanges((prev) => {
      // Note: if we want to do more rubush comparision we can compare objects
      // but here we just change one field(Yes, No) so it easy to track the changes.
      const isPendingChangeExist =
        prev.findIndex((item) => item._id === asset._id) != -1;

      // Check if already exists in the pending changes
      if (!isPendingChangeExist) {
        return [...prev, asset];
      }

      // Remove the asset from the pending changes
      return prev.filter((item) => item._id !== asset._id);
    });
  };

  const saveChanges = () => {
    const updatedAssets = assets.map((originalAsset) => {
      const modifiedAsset = pendingChanges.find(
        (change) => change._id === originalAsset._id
      );
      return modifiedAsset
        ? { ...originalAsset, ...modifiedAsset }
        : originalAsset;
    });

    setAssets(updatedAssets);
    localStorage.setItem("assets", JSON.stringify(updatedAssets));
    setPendingChanges([]);
  };

  return {
    assets,
    pendingChanges,
    updateAsset,
    saveChanges,
  };
}
