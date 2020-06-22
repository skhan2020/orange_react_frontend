import React from 'react';
import './index.scss';
import { useParams } from 'react-router-dom';
import TodosPage from './Todos/index';
import Videos from './Videos/index';
import Notes from './Notes/index';
import Reports from './Reports/index';

const MainSection = () => {
  let { sectionID } = useParams('todo');
  debugger;
  return (
    <div className="main_section">
      {sectionID === 'todo'&& <TodosPage /> }
      {sectionID === 'videos' && <Videos /> }
      {sectionID === 'notes' && <Notes /> }
      {sectionID === 'charts' && <Reports /> }
    </div>
  );
}

export default MainSection;