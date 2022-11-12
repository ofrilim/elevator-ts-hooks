
export function getBuildingData(numOfFloors: number, numOfElevators: number) {
  return {
    floorsInBuilding: createBuildingFloors(numOfFloors),
    elevators: createElevators(numOfElevators) 
  }; 
};

function createBuildingFloors(numOfFloors: number) {
  const initialArray = Array.from(Array(numOfFloors).keys());
  const floors = initialArray.map((floorId) => {
    return {
      number: floorId,
      condition: 'call',
    }
  });

  return floors;
}

function createElevators(numOfElevators: number) {
  const initialArray = Array.from(Array(numOfElevators).keys());
  const elevators = initialArray.map((elevatorId) => {
    return {
      id: elevatorId,
      isOccupied: false,
      isDoorOpen: false,
      inFloor: 0,
      position: 0,
    }
  });

  return elevators;
}