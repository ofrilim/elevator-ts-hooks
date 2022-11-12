import { Colors } from 'interfaces/enums/Colors';
import { ReactComponent as ElevatorImg } from 'media/elevator.svg';
import './Elevator.css';


interface SingleElevatorProps {
  id: number;
  isOccupied: boolean;
  isDoorOpen: boolean;
  inFloor: number;
  position: number;
}

interface ElevatorProps {
  elevator: SingleElevatorProps;
}


export const Elevator = (props: ElevatorProps) => {
  const getConditionColor = () => {
    if (props.elevator.isDoorOpen) return Colors.Green;
    else {
      return props.elevator.isOccupied ? Colors.Red : Colors.Black;
    }
  }

  return (
    <div className="elevator" style={{ top: props.elevator.position }}>
      <ElevatorImg fill={ getConditionColor() } />
    </div>
  )
}

