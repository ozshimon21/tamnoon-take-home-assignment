import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AssetsGrid from "./AssetsGrid";
import { Asset } from "../models";

describe("AssetsGrid", () => {
  const mockAssets: Asset[] = [
    {
      _id: "1",
      assetName: "Asset 1",
      owner: { name: "Owner 1" },
      enriched: { isCrownJewel: false },
    },
    {
      _id: "2",
      assetName: "Asset 2",
      owner: { owner: { name: "Owner 2" } },
      enriched: { isCrownJewel: true },
    },
  ];

  const mockOnRowDataChanged = vi.fn();

  it("should render the grid with correct number of rows", () => {
    // Arrange
    render(
      <AssetsGrid
        rowData={mockAssets}
        editMode={false}
        onRowDataChanged={mockOnRowDataChanged}
      />
    );

    // Act
    const rows = screen.getAllByRole("row");

    // Assert
    // +1 for header row
    expect(rows).toHaveLength(mockAssets.length + 1);
  });

  it("should display correct column headers", () => {
    // Arrange
    render(
      <AssetsGrid
        rowData={mockAssets}
        editMode={false}
        onRowDataChanged={mockOnRowDataChanged}
      />
    );

    // Act & Assert
    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Asset Name")).toBeInTheDocument();
    expect(screen.getByText("Owner name")).toBeInTheDocument();
    expect(screen.getByText("Is Crown Jewel")).toBeInTheDocument();
  });

  it("should sort assets by name in ascending order by default", () => {
    // Arrange
    render(
      <AssetsGrid
        rowData={mockAssets}
        editMode={false}
        onRowDataChanged={mockOnRowDataChanged}
      />
    );

    // Act
    const rows = screen.getAllByRole("row");

    // Assert
    expect(rows[1]).toHaveTextContent("Asset 1");
    expect(rows[2]).toHaveTextContent("Asset 2");
  });

  it("should display owner name correctly for nested and non-nested structures", () => {
    // Arrange
    render(
      <AssetsGrid
        rowData={mockAssets}
        editMode={false}
        onRowDataChanged={mockOnRowDataChanged}
      />
    );

    // Act & Assert
    expect(screen.getByText("Owner 1")).toBeInTheDocument();
    expect(screen.getByText("Owner 2")).toBeInTheDocument();
  });

  it("should render 'Is Crown Jewel' as text when not in edit mode", () => {
    // Arrange
    render(
      <AssetsGrid
        rowData={mockAssets}
        editMode={false}
        onRowDataChanged={mockOnRowDataChanged}
      />
    );

    // Act & Assert
    expect(screen.getByText("False")).toBeInTheDocument();
    expect(screen.getByText("True")).toBeInTheDocument();
  });

  it("should render 'Is Crown Jewel' as dropdown when in edit mode", () => {
    // Arrange
    render(
      <AssetsGrid
        rowData={mockAssets}
        editMode={true}
        onRowDataChanged={mockOnRowDataChanged}
      />
    );

    // Act
    const dropdowns = screen.getAllByRole("combobox");

    // Assert
    expect(dropdowns).toHaveLength(2); // One for each row
  });

  it("should not allow editing when not in edit mode", () => {
    // Arrange
    render(
      <AssetsGrid
        rowData={mockAssets}
        editMode={false}
        onRowDataChanged={mockOnRowDataChanged}
      />
    );

    // Act & Assert
    expect(screen.queryAllByRole("combobox")).toHaveLength(0);
  });
});
