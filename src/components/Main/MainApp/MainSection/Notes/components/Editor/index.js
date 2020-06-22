import React, { useState } from 'react';
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

const Notes = props => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = editorState => {
    const contentState = editorState.getCurrentContent();
    const stringText = JSON.stringify(convertToRaw(contentState));
    setEditorState(editorState);
    props.setParentEditorState(stringText);
  }

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
    <div className="editor">
      <UnderlineOutlined className="editor_btns" onClick={onUnderlineClick} />
      <BoldOutlined className="editor_btns" onClick={onBoldClick} />
      <ItalicOutlined className="editor_btns" onClick={onItalicClick} />
      <HighlightOutlined className="editor_btns" onClick={onHighlightClick} />
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyDown}
        onChange={onChange} 
        customStyleMap={styleMap}
      />
    </div>
  )
}

export default Notes;