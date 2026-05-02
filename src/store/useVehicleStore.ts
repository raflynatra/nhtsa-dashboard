import type { VehicleMake } from "@/types/vehicle";
import { create } from "zustand";

export const DEFAULT_MAKES: VehicleMake[] = [
  { Make_ID: 448, Make_Name: "TOYOTA" },
  { Make_ID: 473, Make_Name: "MAZDA" },
  { Make_ID: 474, Make_Name: "HONDA" },
  { Make_ID: 481, Make_Name: "MITSUBISHI" },
  { Make_ID: 509, Make_Name: "SUZUKI" },
];

interface VehicleState {
  vehicleType: string;
  vehicleMakes: VehicleMake[];
  setVehicleType: (vehicleType: string) => void;
  setVehicleMakes: (vehicleType: VehicleMake[]) => void;
}

export const useVehicleStore = create<VehicleState>((set) => ({
  vehicleType: "",
  vehicleMakes: DEFAULT_MAKES,
  setVehicleType: (vehicleType) => set({ vehicleType }),
  setVehicleMakes: (vehicleMakes) => set({ vehicleMakes }),
}));
