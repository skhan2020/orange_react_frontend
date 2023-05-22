import React, { useState, useEffect } from 'react';
import { Editor, 
  EditorState, RichUtils, convertFromRaw,
  convertToRaw, } from 'draft-js';

import {
  UnderlineOutlined,
  BoldOutlined,
  ItalicOutlined,
  HighlightOutlined
} 
from '@ant-design/icons';
import './index.scss';

const styleMap = {
  'HIGHLIGHT': {
    'backgroundColor': '#faed27',
  }
};
// @ts-ignore
const Notes = props => {
  const { readOnly } = props;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (props.note && props.note.text) {
    const contentSt = convertFromRaw(JSON.parse(props.note.text));
      setEditorState(EditorState.createWithContent(contentSt));
    }
  },[props.note])
// @ts-ignore
  const onChange = editorState => {
    const contentState = editorState.getCurrentContent();
    const stringText = JSON.stringify(convertToRaw(contentState));
    setEditorState(editorState);
    props.setParentEditorState(stringText);
  }
// @ts-ignore
  const handleKeyDown = command => {
    let newState = RichUtils.handleKeyCommand(editorState, command);
    if (!newState && command === 'highlight') {
      newState = RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT');
    }
    if (newState) {
      onChange(newState);
      return 'handled';
    }
  
    return 'not-handled';
  }

  const onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  }
  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }
  const onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  }
  const onHighlightClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));
  }

  return (
    <div className={props.styleName}>
      {!readOnly &&
      <div className="edit_btn_box">
        <UnderlineOutlined className="editor_btns" onClick={onUnderlineClick} />
        <BoldOutlined className="editor_btns" onClick={onBoldClick} />
        <ItalicOutlined className="editor_btns" onClick={onItalicClick} />
        <HighlightOutlined className="editor_btns" onClick={onHighlightClick} />
      </div>}
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyDown}
        onChange={onChange} 
        customStyleMap={styleMap} 
        readOnly={readOnly}
      />
    </div>
  )
}

export default Notes;