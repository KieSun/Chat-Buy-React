import React from 'react'
import { NoticeBar } from 'antd-mobile';

const TopBar = () => (
  <NoticeBar mode="link" onClick={() => alert('1')}>
    Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
  </NoticeBar>
)

export default TopBar