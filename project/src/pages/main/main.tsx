import './main.scss';
import List from '../../components/list/list';

function Main() {
  return(
    <div className="main">
      <div className="main__wrapper">
        <h1 className="main__title">Mindbox ToDo</h1>
        <List />
      </div>
    </div>
  );
}

export default Main;