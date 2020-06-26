import React, { useState, useEffect } from 'react';
import {  Menu, Dropdown, Button  } from 'antd';
import { STATUSES, NOT_STARTED_CODE, IN_PROGRESS_CODE, ON_HOLD_CODE, DONE_CODE } from '../../../../../../constants/index';
import styled, { css } from 'styled-components'

const cssList = {
  redButton : css`
  background-color: #dc7c7c;
  border: 1px solid #dc7c7c;
`, 
  greenButton: css`
  border: 1px solid rgb(79, 199, 68);
  background-color: rgb(182, 250, 142);
`,
  blueButton : css`
  border: 1px solid rgb(2, 150, 219);
  background-color: rgb(179, 228, 247);
`,
  yellowButton : css`
  border: 1px solid orange;
  background-color: white;
  color: orange;
`}

const StyledButton = styled(Button)`
  width: 100px;
  height: 30px;
  display: flex;
  font-size: 1.2em;
  align-items: center;
  justify-content: center;
  color: white;
  background: rgba(128, 128, 128, 0.4);
  @media (min-width: 600px) {
    width: 130px;
  }
  ${props =>
   props.status}
`;

StyledButton.displayName = 'StyledButton';

const DropDown = props => {
  const [localStatus, setLocalStatus] = useState();

  useEffect(() => {
    setLocalStatus(parseInt(props.status));
  }, [props.status])

  const handleMenuClick = event => {
    // handle status change
    if (props.handleStatusChanges) {
      props.handleStatusChanges({status: parseInt(event.key), todo: props.todo});
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1000">
        {STATUSES.get(NOT_STARTED_CODE).label}
      </Menu.Item>
      <Menu.Item key="2000">
        {STATUSES.get(IN_PROGRESS_CODE).label}
      </Menu.Item>
      <Menu.Item key="3000">
        {STATUSES.get(ON_HOLD_CODE).label}
      </Menu.Item>
      <Menu.Item key="4000">
        {STATUSES.get(DONE_CODE).label}
      </Menu.Item>
    </Menu>
  );

   return (
    <Dropdown
      overlay={menu} placement="bottomCenter" >
      <StyledButton className="statusDropdownButton"
        status={localStatus > 0 ? cssList[STATUSES.get(localStatus).css] : null}>
        {localStatus > 0 ? STATUSES.get(localStatus).label : 'Select ..'}
      </StyledButton>
    </Dropdown>
  );
}

export default DropDown;