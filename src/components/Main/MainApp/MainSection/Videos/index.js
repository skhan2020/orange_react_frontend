import React from 'react'
import EmptyUI from '../../EmptyUI';
import { translate } from '../../../../../localization/service'

const Videos = () => {
  return (
    <EmptyUI message={translate('empty_video')} />
  )
}

export default Videos;