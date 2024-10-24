import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AssetsPage from "./AssetsPage";
import { useAssets } from "./hooks/useAssets";
import { useToastContext } from "../../shared/hooks/useToastContext";
import { Asset } from "./models";

const mockAssets = [
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
] as Asset[];

// Mock the hooks
vi.mock("./hooks/useAssets");
vi.mock("../../shared/hooks/useToastContext");

describe("AssetsPage", () => {
  const mockUpdateAsset = vi.fn();
  const mockSaveChanges = vi.fn();
  const mockShowToast = vi.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Mock the hooks' return values
    vi.mocked(useAssets).mockReturnValue({
      assets: mockAssets,
      pendingChanges: [],
      updateAsset: mockUpdateAsset,
      saveChanges: mockSaveChanges,
    });

    vi.mocked(useToastContext).mockReturnValue({
      showToast: mockShowToast,
    });
  });

  it("should render the assets page with title", () => {
    // Arrange
    render(<AssetsPage />);

    // Act & Assert
    expect(screen.getByText("Assets")).toBeInTheDocument();
  });

  it("should toggle edit mode when switch is clicked", () => {
    // Arrange
    render(<AssetsPage />);
    const editSwitch = screen.getByRole("checkbox");

    // Assert initial state
    expect(editSwitch).not.toBeChecked();

    // Act
    fireEvent.click(editSwitch);

    // Assert
    expect(editSwitch).toBeChecked();
  });

  it("should display correct pending changes message for single change", () => {
    // Arrange
    vi.mocked(useAssets).mockReturnValue({
      assets: mockAssets,
      pendingChanges: [
        {
          _id: "1",
          enriched: {
            isCrownJewel: true,
          },
          assetName: "asset1",
          owner: {
            name: "owner1",
          },
        },
      ],
      updateAsset: mockUpdateAsset,
      saveChanges: mockSaveChanges,
    });

    // Act
    render(<AssetsPage />);

    // Assert
    expect(screen.getByText("1 unsaved change")).toBeInTheDocument();
  });

  it("should display plural message for multiple pending changes", () => {
    // Arrange
    vi.mocked(useAssets).mockReturnValue({
      assets: mockAssets,
      pendingChanges: [
        {
          _id: "1",
          enriched: {
            isCrownJewel: true,
          },
          assetName: "asset1",
          owner: {
            name: "owner1",
          },
        },
        {
          _id: "2",
          enriched: {
            isCrownJewel: false,
          },
          assetName: "asset2",
          owner: {
            owner: {
              name: "owner2",
            },
          },
        },
      ],
      updateAsset: mockUpdateAsset,
      saveChanges: mockSaveChanges,
    });

    // Act
    render(<AssetsPage />);

    // Assert
    expect(screen.getByText("2 unsaved changes")).toBeInTheDocument();
  });

  it("should disable save button when no changes or edit mode is off", () => {
    // Arrange
    render(<AssetsPage />);

    // Act
    const saveButton = screen.getByText("Save Changes");

    // Assert
    expect(saveButton).toBeDisabled();
  });

  it("should save changes successfully", async () => {
    // Arrange
    vi.mocked(useAssets).mockReturnValue({
      assets: mockAssets,
      pendingChanges: [
        {
          _id: "1",
          enriched: {
            isCrownJewel: true,
          },
          assetName: "asset1",
          owner: {
            name: "owner1",
          },
        },
      ],
      updateAsset: mockUpdateAsset,
      saveChanges: mockSaveChanges,
    });
    render(<AssetsPage />);

    // Act
    const editSwitch = screen.getByRole("checkbox");
    fireEvent.click(editSwitch);
    const saveButton = screen.getByText("Save Changes");
    fireEvent.click(saveButton);

    // Assert
    expect(mockSaveChanges).toHaveBeenCalledTimes(1);
    expect(mockShowToast).toHaveBeenCalledWith(
      "Asset changes saved successfully!",
      "success"
    );
  });

  it("should handle save error correctly", async () => {
    // Arrange
    vi.mocked(useAssets).mockReturnValue({
      assets: mockAssets,
      pendingChanges: [
        {
          _id: "1",
          enriched: {
            isCrownJewel: true,
          },
          assetName: "asset1",
          owner: {
            name: "owner1",
          },
        },
      ],
      updateAsset: mockUpdateAsset,
      saveChanges: vi.fn().mockImplementation(() => {
        throw new Error("Save failed");
      }),
    });
    render(<AssetsPage />);
    const editSwitch = screen.getByRole("checkbox");
    fireEvent.click(editSwitch);

    // Act
    const saveButton = screen.getByRole("button", { name: "Save Changes" });
    fireEvent.click(saveButton);

    // Assert
    expect(mockShowToast).toHaveBeenCalledWith(
      "Failed to save changes. Please try again.",
      "error"
    );
  });
});
