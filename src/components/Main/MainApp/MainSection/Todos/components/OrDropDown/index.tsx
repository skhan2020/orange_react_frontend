// @ts-nocheck
import React, { useState, useEffect } from 'react';
import {  Dropdown, Button  } from 'antd';
import type { MenuProps } from 'antd';
import { STATUSES, NOT_STARTED_CODE, IN_PROGRESS_CODE, ON_HOLD_CODE, DONE_CODE } from '../../../../../../../constants/index';
import styled, { css } from 'styled-components'
import { Todo } from '../../../../../../../redux/reducers/todoReducer';

const cssList = {
  redButton : css`
  background-color: #dc7c7c;
  border: 1px solid #dc7c7c;
`, 
  greenButton: css`
  border: 1px solid rgb(79, 199, 68);
  background-color: rgb(79, 199, 68);
`,
  blueButton : css`
  border: 1px solid rgb(2, 150, 219);
  background-color: rgb(2, 150, 219);
`,
  yellowButton : css`
  border: 1px solid orange;
  background-color: orange;
`}

const StyledButton = styled(Button)`
  max-width: 100px;
  overflow: hidden;
  height: 30px;
  display: flex;
  font-size: 1.2em;
  align-items: center;
  justify-content: center;
  color: white;
  background: rgba(128, 128, 128, 0.4);
  @media (min-width: 800px) {
    width: 130px;
  }
  ${(props: DropdownProps) =>
   props.status}
`;

StyledButton.displayName = 'StyledButton';

interface DropdownProps {
  status: number,
  todo? : Todo,
  handleStatusChanges : ({}) => void
}

// @ts-ignore
const OrDropDown = (props: DropdownProps) => {
  const [localStatus, setLocalStatus] = useState(1000);

  useEffect(() => {
// @ts-ignore
    setLocalStatus(parseInt(props.status));
  }, [props.status])
// @ts-ignore
  const handleMenuClick = event => {
    // handle status change
    if (props.handleStatusChanges) {
      props.handleStatusChanges({status: parseInt(event.key), todo: props.todo});
    }
  }

  const menuList : MenuProps = {
  items: [
    { label: STATUSES.get(NOT_STARTED_CODE)?.label,
      key: 1000
    },
    { label: STATUSES.get(IN_PROGRESS_CODE)?.label,
      key: 2000
    },
    { label: STATUSES.get(ON_HOLD_CODE)?.label,
      key: 3000
    },
    { label: STATUSES.get(DONE_CODE)?.label,
      key: 4000
    }
  ]};

   return (
    <Dropdown 
      menu={ menuList } placement="bottomCenter"
      trigger={['click']} >
      <StyledButton className="statusDropdownButton"
        onClick={(e) => handleMenuClick(e)}
        status={localStatus > 0 ? cssList[STATUSES.get(localStatus).css] : null}>
        {localStatus > 0 ? STATUSES.get(localStatus)?.label : 'Select ..'}
      </StyledButton>
    </Dropdown>
  );
}

export default OrDropDown;