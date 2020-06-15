import React from 'react';
import {  Menu, Dropdown, Button  } from 'antd';
import { STATUSES } from '../../../../../../constants/index';
import styled, { css } from 'styled-components'
import { updateTodoChanges } from '../../../../../../services/todo';

const cssList = {
  redButton : css`
  border: 1px solid red;
  background-color: rgb(253, 218, 218);
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
`}

const StyledButton = styled(Button)`
  width: 140px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 600px) {
    width: 160px;
  }
  ${props =>
   props.status || 1000}
`;

StyledButton.displayName = 'StyledButton';

const DropDown = props => {

  const status = props.status ? parseInt(props.status) : 1000;

  const handleMenuClick = event => {
    // handle status change
    const newStatus = event.key;
    props.todo.status = newStatus;
    updateTodoChanges(props.todo);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="2000">
        {STATUSES.get(2000).label}
      </Menu.Item>
      <Menu.Item key="3000">
        {STATUSES.get(3000).label}
      </Menu.Item>
      <Menu.Item key="4000">
        {STATUSES.get(4000).label}
      </Menu.Item>
    </Menu>
  );

   return (
    <Dropdown
      overlay={menu} placement="bottomCenter" >
      <StyledButton className="statusDropdownButton" status={cssList[STATUSES.get(status).css]}>
        {STATUSES.get(status).label}</StyledButton>
    </Dropdown>
  );
}

export default DropDown;