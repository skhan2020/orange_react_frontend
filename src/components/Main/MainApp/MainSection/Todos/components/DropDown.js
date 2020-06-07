import React from 'react';
import {  Menu, Dropdown, Button  } from 'antd';
import { NOT_STARTED, IN_PROGRESS, ON_HOLD, DONE } from '../../../../../../constants/index';
import styled, { css } from 'styled-components'
import { translate } from '../../../../../../localization/service'
import { updateTodoChanges } from '../../../../../../services/todo';

const redButton = css`
  border: 2px solid red;
  background-color: rgb(253, 218, 218);
`;

const greenButton = css`
  border: 2px solid rgb(44, 114, 3);
  background-color: rgb(182, 250, 142);
`;

const blueButton = css`
  border: 2px solid rgb(2, 150, 219);
  background-color: rgb(179, 228, 247);
`;

const yellowButton = css`
  border: 2px solid orange;
  background-color: white;
`;


const StyledButton = styled(Button)`
width: 200px;
height: 50px;
border-radius: 20px;
align-items: center;
display: flex;
${props =>
  props.status}
`;

const STATUSES = new Map(
  [[ 1000, { label: translate(NOT_STARTED), css: redButton } ],
  [ 2000, { label: translate(IN_PROGRESS), css: yellowButton} ],
  [ 3000, { label: translate(ON_HOLD), css: blueButton } ],
  [ 4000, { label: translate(DONE), css: greenButton } ]]
);

const DropDown = props => {

  const status = parseInt(props.status);

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
      <StyledButton className="statusDropdownButton" status={STATUSES.get(status).css}>
        {STATUSES.get(status).label}</StyledButton>
    </Dropdown>
  );
}

export default DropDown;