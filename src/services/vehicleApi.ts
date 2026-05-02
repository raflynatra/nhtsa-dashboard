import { fetcher } from "@/lib/fetcher";
import type {
  NhtsaResponse,
  VehicleMake,
  VehicleModel,
  VehicleType,
  VehicleMakesForType,
  VehicleModelForType,
} from "@/types/vehicle";

const BASE_URL = "https://vpic.nhtsa.dot.gov/api";

export function getAllMakes() {
  return fetcher<NhtsaResponse<VehicleMake>>(
    `${BASE_URL}/vehicles/GetAllMakes?format=json`,
  );
}

export function getModelsForMakeId(makeId: number) {
  return fetcher<NhtsaResponse<VehicleModel>>(
    `${BASE_URL}/vehicles/GetModelsForMakeId/${makeId}?format=json`,
  );
}

export function getVehicleTypesForMakeId(makeId: number) {
  return fetcher<NhtsaResponse<VehicleType>>(
    `${BASE_URL}/vehicles/GetVehicleTypesForMakeId/${makeId}?format=json`,
  );
}

export function getMakesForVehicleType(type: string) {
  return fetcher<NhtsaResponse<VehicleMakesForType>>(
    `${BASE_URL}/vehicles/GetMakesForVehicleType/${encodeURIComponent(type)}?format=json`,
  );
}

export function getVehicleTypesByMake(makeId: number) {
  return fetcher<NhtsaResponse<VehicleType>>(
    `${BASE_URL}/vehicles/GetVehicleTypesForMakeId/${makeId}?format=json`,
  );
}

export function getModelsForMakeYear(make: string, vehicleType: string) {
  return fetcher<NhtsaResponse<VehicleModelForType>>(
    `${BASE_URL}/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(make)}/vehicletype/${encodeURIComponent(vehicleType)}?format=json`,
  );
}
