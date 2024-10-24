import { renderHook, act } from "@testing-library/react";
import { useAssets } from "./useAssets";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { getAssets } from "../services/assets.service";
import { waitFor } from "@testing-library/react";
import { Asset } from "../models";

// Global mock data
const mockData = [
  {
    _id: "1",
    enriched: {
      isCrownJewel: false,
    },
    assetName: "asset1",
    owner: {
      name: "owner1",
    },
  },
  {
    _id: "2",
    enriched: {
      isCrownJewel: true,
    },
    assetName: "asset2",
    owner: {
      owner: {
        name: "owner2",
      },
    },
  },
];

// Mock the external dependencies
vi.mock("../services/assets.service");

describe("useAssets hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should initialize with correct initial states", () => {
    // Arrange & Act
    const { result } = renderHook(() => useAssets());

    // Assert
    expect(result.current.assets).toEqual([]);
    expect(result.current.pendingChanges).toEqual([]);
  });

  it("should fetch assets from localStorage if available", async () => {
    // Arrange
    const mockGetAssets = vi.mocked(getAssets);
    mockGetAssets.mockResolvedValue(mockData);
    localStorage.setItem("assets", JSON.stringify(mockData));

    // Act
    const { result } = renderHook(() => useAssets());

    // Assert
    await waitFor(() => {
      expect(result.current.assets).toEqual(mockData);
      expect(getAssets).not.toHaveBeenCalled();
    });
  });

  it("should fetch assets from API if localStorage is empty", async () => {
    // Arrange
    const mockGetAssets = vi.mocked(getAssets);
    mockGetAssets.mockResolvedValue(mockData);

    // Act
    const { result } = renderHook(() => useAssets());

    // Assert
    await waitFor(() => {
      expect(getAssets).toHaveBeenCalled();
      expect(result.current.assets).toEqual(mockData);
    });
    expect(localStorage.getItem("assets")).toEqual(JSON.stringify(mockData));
  });

  it("should update pending changes correctly", async () => {
    // Arrange
    localStorage.setItem("assets", JSON.stringify(mockData));
    const { result } = renderHook(() => useAssets());
    const updatedAsset = {
      ...mockData[0],
      assetName: "Updated Asset 1",
    } as Asset;

    // Act
    await waitFor(() => {
      expect(result.current.assets).toEqual(mockData);
    });
    act(() => {
      result.current.updateAsset(updatedAsset);
    });

    // Assert
    expect(result.current.pendingChanges).toEqual([updatedAsset]);
  });

  it("should save changes and update localStorage", async () => {
    // Arrange
    localStorage.setItem("assets", JSON.stringify(mockData));
    const { result } = renderHook(() => useAssets());
    const updatedAsset = {
      ...mockData[0],
      assetName: "Updated Asset 1",
    } as Asset;

    // Act
    await waitFor(() => {
      expect(result.current.assets).toEqual(mockData);
    });
    act(() => {
      result.current.updateAsset(updatedAsset);
    });
    act(() => {
      result.current.saveChanges();
    });

    // Assert
    await waitFor(() => {
      const updatedAssets = mockData.map((asset) =>
        asset._id === updatedAsset._id ? updatedAsset : asset
      );
      expect(result.current.assets).toEqual(updatedAssets);
      expect(localStorage.getItem("assets")).toEqual(
        JSON.stringify(updatedAssets)
      );
      expect(result.current.pendingChanges).toEqual([]);
    });
  });
});
