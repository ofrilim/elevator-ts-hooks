import { useState, useEffect } from 'react';
import { getBuildingData } from 'data/building';
import { Floor } from 'components/Floor/Floor';
import { Form } from 'components/Form/Form';
import './Building.css';

interface FloorInBuildingProps {
  number: number;
  condition: string;
}

interface ElevatorProps {
  id: number;
  isOccupied: boolean;
  isDoorOpen: boolean;
  inFloor: number;
  position: number;
}

export const Building = () => {
  const [numOfFloors, setNumOfFloors] = useState<number>(10);
  const [numOfElevators, setNumOfElevators] = useState<number>(5);
  const [floorsInBuilding, setFloorsInBuilding] = useState<FloorInBuildingProps[]>([]);
  const [elevators, setElevators] = useState<ElevatorProps[]>([]);
  const [queue, setQueue] = useState([]);
  const [rafIds, setRafIds] = useState<number[]>([]);

  // const [building, setBuilding] = useState<any>({
  //   numOfFloors: 10,
  //   numOfElevators: 5,
  //   floorsInBuilding: [],
  //   elevators: [],
  //   queue: [],
  //   rafIds: [],
  // });

  const updateData = (numOfFloorsInBuilding: number, numOfElevators: number) => {
    const { floorsInBuilding, elevators } = getBuildingData(numOfFloorsInBuilding, numOfElevators);

    rafIds.forEach((id: number) => {
      cancelAnimationFrame(id)
    });

    setFloorsInBuilding(floorsInBuilding);
    setElevators(elevators);
    setQueue([]);
    setRafIds(Array.from(Array(numOfElevators).keys()));
  }

  const handleSubmit = () => {
    // updateData(this.state.numOfFloors, this.state.numOfElevators);
  }

  const handleChange = (name: string, value: number) => {
    
    // this.setState(() => {
    //   return { [name]: +value }
    // });
  }

  const handleClick = (floor: FloorInBuildingProps) => {
    const { number: floorNumber, condition } = floor;
    if (condition !== 'call') return;

    // this.setState(prevState => {
    //   return {
    //   floorsInBuilding: prevState.floorsInBuilding.map((floor: any) => floor.number === floorNumber ?
    //     { ...floor, condition: 'waiting' }
    //     : floor),
    //   queue: [...prevState.queue, floorNumber]
    // }}, () => {
    //   handleRequest();
    // })
  }
  
  const handleRequest = () => {  
    if (queue.length === 0) return;
    const floorNumber = queue[0];

    const elevatorId = findAvailableElevator(floorNumber);
    if (elevatorId === -1) return;

    const copyQueue = [...queue];
    copyQueue.shift();

    setQueue(copyQueue)
    moveElevator(elevatorId, floorNumber);
  }

  const findAvailableElevator = (floorNumber: number) => {
    const closestElevator = 
      elevators.filter(elevator => !elevator.isOccupied).reduce((acc, elevator) => {
        let newDiff = Math.abs(floorNumber - elevator.inFloor);
        if (newDiff < acc.diff) {
          acc.diff = newDiff;
          acc.elevatorId = elevator.id;
        }

        return acc;
      }, { diff: 1000000000, elevatorId: -1 });

    return closestElevator.elevatorId;
  }

  const moveElevator = (elevatorId: number, floorNumber: number) => {
    const elevatorToMove = elevators.find(elevator => elevator.id === elevatorId);

    if (elevatorToMove?.position) {
      setElevators(elevators.map(elevator => elevator.id === elevatorId ?
        { ...elevator, isOccupied: true }
        : elevator))
      
  
      const target = -(floorNumber * 56);
      const startPosition = elevatorToMove?.position;
      const isMoveUp = startPosition && target < startPosition;
      const startTime = Date.now();
      let rafId, currPosition: number;
  
      const step = () => {
        let interval = Date.now() - startTime;
        currPosition = isMoveUp ? startPosition - (interval / 25) : startPosition + (interval / 25);
  
        setElevators(elevators.map(elevator => elevator.id === elevatorId ?
          { ...elevator, position: currPosition }
          : elevator))
  
        const stopCondition = isMoveUp ? currPosition <= target : currPosition >= target;
        if (stopCondition) {
  
          setElevators(elevators.map(el => el.id === elevatorId ?
            { ...el, position: target, inFloor: floorNumber, isDoorOpen: true }
            : el));
  
          setFloorsInBuilding(floorsInBuilding.map(floor => floor.number === floorNumber ?
            { ...floor, condition: 'arrived' }
            : floor));
  
          setTimeout(() => {
            setFloorsInBuilding(floorsInBuilding.map(floor => floor.number === floorNumber ?
              { ...floor, condition: 'call' }
              : floor));
            
            setElevators(elevators.map(el => el.id === elevatorId ?
              { ...el, isDoorOpen: false, isOccupied: false }
              : el));
  
            handleRequest();
          }, 2000);
  
          return;
        }
        rafId = requestAnimationFrame(step);
  
        updateRafIdsState(elevatorId, rafId);
      }
      step();
    }
  }

  const updateRafIdsState = (elevatorId: number, rafId: number) => {

    let rafIdsCurrState = [...rafIds];
    rafIdsCurrState[elevatorId] = rafId;
    setRafIds(rafIdsCurrState);
  }

  const renderBuilding = () => {
    return floorsInBuilding.map(floor => 
      <Floor
        key={floor.number}
        floor={floor}
        elevators={elevators}
        handleClick={handleClick}
      />
    )
  }

  useEffect(() => {
    updateData(numOfFloors, numOfElevators);
  }, [])    
    
  return (
    <>
      <Form 
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
        numOfElevators={numOfElevators}
        numOfFloors={numOfFloors}
      />
      <div className="building bold">
        { renderBuilding() }
      </div>
    </>
  )
}
