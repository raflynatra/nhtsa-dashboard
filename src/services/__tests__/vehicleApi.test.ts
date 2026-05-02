import { getAllMakes, getModelsForMakeId } from "@/services/vehicleApi";
import { ApiError } from "@/lib/fetcher";

const mockResponse = (ok: boolean, data?: unknown, status = 200) =>
  Promise.resolve({
    ok,
    status,
    statusText: ok ? "OK" : "Not Found",
    json: () => Promise.resolve(data),
  } as Response);

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("vehicleApi", () => {
  describe("getAllMakes", () => {
    it("calls the correct NHTSA endpoint", async () => {
      vi.mocked(fetch).mockReturnValue(
        mockResponse(true, { Count: 0, Message: "", SearchCriteria: null, Results: [] }),
      );

      await getAllMakes();

      expect(fetch).toHaveBeenCalledWith(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json",
      );
    });

    it("returns parsed response data", async () => {
      const mockData = {
        Count: 1,
        Message: "OK",
        SearchCriteria: null,
        Results: [{ Make_ID: 1, Make_Name: "Toyota" }],
      };
      vi.mocked(fetch).mockReturnValue(mockResponse(true, mockData));

      const result = await getAllMakes();

      expect(result.Results).toHaveLength(1);
      expect(result.Results[0].Make_Name).toBe("Toyota");
    });
  });

  describe("getModelsForMakeId", () => {
    it("calls the correct endpoint with the given makeId", async () => {
      vi.mocked(fetch).mockReturnValue(
        mockResponse(true, { Count: 0, Message: "", SearchCriteria: null, Results: [] }),
      );

      await getModelsForMakeId(440);

      expect(fetch).toHaveBeenCalledWith(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/440?format=json",
      );
    });
  });

  describe("error handling", () => {
    it("throws ApiError when response is not ok", async () => {
      vi.mocked(fetch).mockReturnValue(mockResponse(false, undefined, 404));

      await expect(getAllMakes()).rejects.toThrow(ApiError);
    });

    it("includes the HTTP status in the thrown ApiError", async () => {
      vi.mocked(fetch).mockReturnValue(mockResponse(false, undefined, 500));

      await expect(getAllMakes()).rejects.toMatchObject({ status: 500 });
    });
  });
});
