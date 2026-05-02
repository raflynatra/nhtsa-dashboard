export interface VehicleMake {
  Make_ID: number;
  Make_Name: string;
}

export interface VehicleMakesForType extends VehicleType {
  MakeName: string;
  MakeId: number;
}

export interface VehicleModel {
  Model_ID: number;
  Model_Name: string;
  Make_ID: number;
  Make_Name: string;
}

export interface VehicleType {
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export type VehicleModelForType = VehicleModel & VehicleType;

export interface NhtsaResponse<T> {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: T[];
}
