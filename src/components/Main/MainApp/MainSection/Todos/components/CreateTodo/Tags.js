import React from 'react';
import {  Tag, Input  } from  'antd';
import { PlusOutlined } from '@ant-design/icons';
import { translate } from '../../../../../../../localization/service';

class EditableTagGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      inputValue: '',
    };
  }

  handleClose = removedTag => {
    const tags = this.props.tags.filter(tag => tag !== removedTag);
    this.props.updateTags(tags);
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    debugger;
    const { inputValue } = this.state;
    const { tags} = this.props;
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
    if (inputValue && tags.indexOf(inputValue) === -1) {
      this.props.updateTags([...tags, inputValue])
    }
  };

  saveInputRef = input => (this.input = input);

  forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  render() {
    const { inputVisible, inputValue } = this.state;
    debugger;
    const tagChild = this.props.tags.map(this.forMap);
    return (
      <div className="tag-box">
        <div>
          {tagChild}
        </div>
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ height: "30px", fontSize: "1em", width: 100 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} className="site-tag-plus">
            <PlusOutlined />{translate("add_tag")}
          </Tag>
        )}
      </div>
    );
  }
}

export default EditableTagGroup;