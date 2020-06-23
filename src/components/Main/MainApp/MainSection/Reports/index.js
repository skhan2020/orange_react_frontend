import React from 'react'
import EmptyUI from '../../EmptyUI';
import { translate } from '../../../../../localization/service'

const Reports = () => {
  return (
    <EmptyUI message={translate('empty_reports')} />
  )
}

export default Reports;