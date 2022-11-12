import { BaseSyntheticEvent } from "react";

interface FormProps {
  handleSubmit: () => void;
  handleChange: (name: string, value: number) => void;
  numOfFloors: number;
  numOfElevators: number;
}

export const Form = (props: FormProps) => {

  const handleSubmit = (ev: BaseSyntheticEvent) => {
    ev.preventDefault();
    props.handleSubmit();
  }

  const handleChange = (ev: BaseSyntheticEvent) => {
    const { name, value } = ev?.target;
    if (value < 1) return;

    props.handleChange(name, value);
  }
  return (
    <form className="form" onSubmit={ handleSubmit }>
      <label className="capitalize" htmlFor="numOfFloors">
        floors:
        <input type="number" name="numOfFloors" id="numOfFloors"
          value={ props.numOfFloors } 
          onChange={ handleChange } 
        />
      </label>
      <label className="capitalize" htmlFor="numOfElevators">
        elevators:
        <input type="number" name="numOfElevators" id="numOfElevators"
          value={ props.numOfElevators } 
          onChange={ handleChange } 
        />
      </label>
      <button type="submit">Update</button>
    </form>
  )
}
