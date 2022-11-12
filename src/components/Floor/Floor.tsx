import audioFile from 'media/elevator_sound.mp3';
import { Elevator } from 'components/Elevator/Elevator';
import './Floor.css';

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

interface FloorProps {
  floor: FloorInBuildingProps;
  handleClick: (floor: FloorInBuildingProps) => void;
  elevators: ElevatorProps[];
}

export const Floor = (props: FloorProps) => {

  const handleClick = () => {
    props.handleClick(props.floor);
  }

  const playSound = () => {
    const audioEl: any = document.getElementsByClassName("audio-element")[0];
    audioEl?.play();
  }

  const setFloorNumber = () => {
    const floorNumber = props.floor.number;
    
    switch (floorNumber) {
      case 0:
        return `ground floor`;
      case 1:
        return `${floorNumber}st`;
      case 2:
        return `${floorNumber}nd`;
      case 3:
        return `${floorNumber}rd`;
      default:
        return `${floorNumber}th`;
    }
  }

  const setCellsAndElevators = () => {
    return (
      props.elevators.map((elevator, i) => {
        if (props.floor.number === 0) return <div className="cell" key={ i }>{ <Elevator elevator={elevator} /> }</div>
        return <div className="cell" key={ i }></div>
      }
      )
    )
  }

  return (
    <div className="Floor flex align-center justify-center">
      <>
        <h5 className="capitalize">{ setFloorNumber() }</h5>
        <div className="cells-container flex">{ setCellsAndElevators() }</div>
        <button 
          className={`capitalize border-radius bold ${props.floor.condition}`} 
          onClick={handleClick}>
            {props.floor.condition}
        </button>
        <audio className="audio-element">
          <source src={ audioFile }></source>
        </audio>
        { props.floor.condition === 'arrived' && playSound() }
      </>
    </div>
  )
}

