import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "antd";
import { VehicleTable } from "../components/tables/VehicleTable";
import type { VehicleMake } from "@/types/vehicle";

const mockMakes: VehicleMake[] = [
  { Make_ID: 440, Make_Name: "Toyota" },
  { Make_ID: 474, Make_Name: "Honda" },
];

function renderTable(dataSource: VehicleMake[], loading = false) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <App>
        <VehicleTable dataSource={dataSource} loading={loading} />
      </App>
    </QueryClientProvider>,
  );
}

describe("VehicleTable", () => {
  it("renders all three column headers", () => {
    renderTable(mockMakes);

    // Ant Design renders headers twice (visible + hidden measurement row)
    expect(screen.getAllByText("Make ID").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Make Name").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Actions").length).toBeGreaterThan(0);
  });

  it("renders a row for each make in dataSource", () => {
    renderTable(mockMakes);

    expect(screen.getByText("Toyota")).toBeInTheDocument();
    expect(screen.getByText("Honda")).toBeInTheDocument();
  });

  it("renders a View button for each row", () => {
    renderTable(mockMakes);

    const viewButtons = screen.getAllByRole("button", { name: /view/i });
    expect(viewButtons).toHaveLength(mockMakes.length);
  });

  it("renders an empty table without crashing when dataSource is empty", () => {
    renderTable([]);

    expect(screen.getAllByText("Make ID").length).toBeGreaterThan(0);
    expect(screen.queryByText("Toyota")).not.toBeInTheDocument();
  });

  it("Make ID and Make Name column headers are marked as sortable", () => {
    renderTable(mockMakes);

    const makeIdHeader = screen.getAllByRole("columnheader", {
      name: /make id/i,
    })[0];
    const makeNameHeader = screen.getAllByRole("columnheader", {
      name: /make name/i,
    })[0];

    expect(makeIdHeader).toHaveAttribute("aria-description", "sortable");
    expect(makeNameHeader).toHaveAttribute("aria-description", "sortable");
  });
});
