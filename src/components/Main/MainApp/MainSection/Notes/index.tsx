import React, { useEffect } from 'react';
import Details from './components/Details/index'
import { noteListSelector, selectedNoteSelector, notesFetchedSelector } from '../../../../../redux/selectors/index'
import { translate } from '../../../../../localization/service' 
import { retrieveNotesList } from '../../../../../services/notes'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedItem } from '../../../../../redux/actions/noteAction'
import './index.scss';
import '../../../Auth/index.scss';
import EmptyUI from '../../EmptyUI';

const Notes = () => {
  const dispatch = useDispatch();
  const noteList = useSelector(noteListSelector);
  const notesFetched = useSelector(notesFetchedSelector);
  const selectedItem = useSelector(selectedNoteSelector);

  useEffect(() => {
    if (!notesFetched) {
      retrieveNotesList();
    }
    }, [notesFetched]
  )
  const updateSelectedNote = item => {
    dispatch(setSelectedItem(item));
  }

  return (
    <>
      <div className="header_box">
        <div className="page_heading">NOTES</div>
      </div>
      <div className="list_page">
        {!noteList || noteList.length === 0 ? <EmptyUI message={translate("empty_notes_message")} /> :
          <>
            <div className="note_list">
              { noteList.map(item => {
                return <div className="note_list_item" key={item._id}>
                  {item.showCategory && 
                    <div className="note_category">{item.category}</div> }
                    <div className="note_title" onClick={() => updateSelectedNote(item)}>{item.title}</div>
                  </div>
                }
              )}
            </div>
              {selectedItem && selectedItem._id && <Details selectedNote={selectedItem} detailsMode={true} ></Details> }
          </>
        }
      </div>
    </>
  )
}

export default Notes;