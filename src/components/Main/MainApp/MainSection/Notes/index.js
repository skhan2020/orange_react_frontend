import React, { useEffect } from 'react';
import Details from './components/Details/index'
import { noteListSelector } from '../../../../../redux/selectors/index'
import { translate } from '../../../../../localization/service' 
import { retrieveNotesList } from '../../../../../services/notes'
import { useSelector } from 'react-redux'
import './index.scss';
import '../../../Auth/index.scss';
import EmptyUI from '../../EmptyUI';

const Notes = () => {
  const noteList = useSelector(noteListSelector);

  useEffect(() => {
      retrieveNotesList();
    }, []
  )

  return (
    <>
      <div className="header_box">
        <div className="page_heading">Notes</div>
      </div>
      <div className="note_page">
        { noteList.length === 0 ? <EmptyUI message={translate("empty_notes_message")} /> :
          <>
          <div className="note_list">
            { noteList.map(item => {
              return <div className="note_list_item">
                      {item.showCategory && <div>{item.category}</div> }
                      <div>{item.title}</div>
                    </div>
              }
            )}
          </div>
            <Details className="notes_details" ></Details> 
          </>
        }
      </div>
    </>
  )
}

export default Notes;