export const SPACE_GAP = 4
export const SMALL_BTN_WIDTH = 32
export const MIDDLE_BTN_WIDTH = 52
export const SMALL_BTN_HEIGHT = 32

import FieldTimeOutlined from '@ant-design/icons/FieldTimeOutlined'
import FontSizeOutlined from '@ant-design/icons/FontSizeOutlined'
import FieldBinaryOutlined from '@ant-design/icons/FieldBinaryOutlined'
import DollarOutlined from '@ant-design/icons/DollarOutlined'
import AccountBookOutlined from '@ant-design/icons/AccountBookOutlined'
import PercentageOutlined from '@ant-design/icons/PercentageOutlined'

export const fontFamiles = [
  {
    value: "'Noto Sans KR', sans-serif",
    label: 'Noto Sans',
  },
  {
    value: "'Noto Serif KR', serif",
    label: 'Noto Serif',
  },
  {
    value: "'Gothic A1', sans-serif",
    label: '고딕',
  },
  {
    value: "'Nanum Gothic', sans-serif",
    label: '나눔고딕',
  },
  {
    value: "'Nanum Myeongjo', serif",
    label: '나눔명조',
  },
  {
    value: "'Jua', sans-serif",
    label: '주아',
  },
]

export const formats = [
  {
    value: 'general',
    label: '일반',
    icon: <FontSizeOutlined />,
  },
  {
    value: 'number',
    label: '숫자',
    icon: <FieldBinaryOutlined />,
  },
  {
    value: 'money',
    label: '통화',
    icon: <DollarOutlined />,
  },
  {
    value: 'percentage',
    label: '백분율',
    icon: <PercentageOutlined />,
  },
]

export const styles = {
  cell: [
    { name: '표준', border: '1px solid lightgray', backgroundColor: '#fff', color: '#000' },
    { name: '나쁨', border: 'none', backgroundColor: '#FFC7CE', color: '#BE5882' },
    { name: '보통', border: 'none', backgroundColor: '#FFEB9C', color: '#000' },
    { name: '좋음', border: 'none', backgroundColor: '#C6EFCE', color: '#000' },
  ],
  table: [
    {
      header: { border: 'none', backgroundColor: '#C6EFCE', color: '#000' },
      body: { border: 'none', backgroundColor: '#FFC7CE', color: '#BE5882' },
    },
    {
      header: { border: 'none', backgroundColor: 'blue', color: '#fff' },
      body: { border: 'none', backgroundColor: 'skyblue', color: 'black' },
    },
  ],
}
