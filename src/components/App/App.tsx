import './App.css';
import { Building } from 'components/Building/Building';

export const App = () => {
  return (
    <div className="App">
      <header className="App-header center bold capitalize">
       <h1>elevator exercise</h1>
      </header>
      <Building />
    </div>
  );
}
