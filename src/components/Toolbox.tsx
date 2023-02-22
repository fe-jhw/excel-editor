import { ReactNode, useContext } from 'react'
import { Button, Dropdown, InputNumber, Select, Space, Typography } from 'antd'
import {
  AccountBookOutlined,
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BgColorsOutlined,
  BoldOutlined,
  FieldTimeOutlined,
  FilterOutlined,
  FontColorsOutlined,
  FormOutlined,
  FunctionOutlined,
  InsertRowAboveOutlined,
  InsertRowBelowOutlined,
  InsertRowLeftOutlined,
  InsertRowRightOutlined,
  ItalicOutlined,
  PercentageOutlined,
  UnderlineOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
  TableOutlined,
} from '@ant-design/icons'
import { fontFamiles } from '@/constants/ToolBoxConstants'
import { EditorContext } from '@/context'
import * as O from '@/utils/option'
import { defaultCell, MAX_FONT_SIZE, MIN_FONT_SIZE } from '@/constants/SheetConstants'

interface ToolboxProps {
  firstLayer: ReactNode
  secondLayer: ReactNode
  title: string
}

// 스타일변경 -> Toggle or Set

const SPACE_GAP = 4
const SMALL_BTN_WIDTH = 32

function Toolbox({ firstLayer, secondLayer, title }: ToolboxProps) {
  return (
    <Space direction="vertical" size={SPACE_GAP} align="center" className="toolbox">
      <Space size={SPACE_GAP}>{firstLayer}</Space>
      <Space size={SPACE_GAP}>{secondLayer}</Space>
      <Typography.Text>{title}</Typography.Text>
    </Space>
  )
}

export function Fontbox() {
  const { selectedCell, changeSelectedCells } = useContext(EditorContext)
  return (
    <Toolbox
      firstLayer={
        <>
          <Select
            style={{ width: `${3 * SMALL_BTN_WIDTH + 2 * SPACE_GAP}px` }}
            options={fontFamiles}
            onSelect={value => changeSelectedCells({ fontFamily: value })}
            value={O.getOrElseFromUndefined(selectedCell?.fontFamily, defaultCell.fontFamily)}
          />
          <InputNumber
            style={{ width: `${2 * SMALL_BTN_WIDTH + Number(SPACE_GAP)}px` }}
            max={MAX_FONT_SIZE}
            min={MIN_FONT_SIZE}
            value={O.getOrElseFromUndefined(selectedCell?.fontSize, defaultCell.fontSize)}
            onChange={value => changeSelectedCells({ fontSize: O.getOrElseFromNull(value, defaultCell.fontSize) })}
          />
        </>
      }
      secondLayer={
        <>
          <Button
            className={selectedCell?.fontWeight === 'bold' ? 'button-active' : ''}
            icon={<BoldOutlined />}
            onClick={() => console.log(selectedCell?.fontWeight)}
          />
          <Button icon={<ItalicOutlined />} />
          <Button icon={<UnderlineOutlined />} />
          <Dropdown trigger={['click']}>
            <Button icon={<BgColorsOutlined />} />
          </Dropdown>
          <Dropdown trigger={['click']}>
            <Button icon={<FontColorsOutlined />} />
          </Dropdown>
        </>
      }
      title="글꼴"
    />
  )
}

export function AlignBox() {
  return (
    <Toolbox
      firstLayer={
        <>
          <Button icon={<VerticalAlignTopOutlined />} />
          <Button icon={<VerticalAlignMiddleOutlined />} />
          <Button icon={<VerticalAlignBottomOutlined />} />
        </>
      }
      secondLayer={
        <>
          <Button icon={<AlignLeftOutlined />} />
          <Button icon={<AlignCenterOutlined />} />
          <Button icon={<AlignRightOutlined />} />
        </>
      }
      title="맞춤"
    />
  )
}

export function FormatBox() {
  return (
    <Toolbox
      firstLayer={
        <>
          <Select style={{ width: `${3 * SMALL_BTN_WIDTH + 2 * SPACE_GAP}px` }} />
        </>
      }
      secondLayer={
        <>
          <Button icon={<AccountBookOutlined />} />
          <Button icon={<PercentageOutlined />} />
          <Button icon={<FieldTimeOutlined />} />
        </>
      }
      title="표시 형식"
    />
  )
}

export function StyleBox() {
  return (
    <Toolbox
      firstLayer={
        <>
          <Dropdown trigger={['click']}>
            <Button icon={<FormOutlined />}>셀 스타일</Button>
          </Dropdown>
        </>
      }
      secondLayer={
        <>
          <Dropdown trigger={['click']}>
            <Button icon={<TableOutlined />}>표 스타일</Button>
          </Dropdown>
        </>
      }
      title="스타일"
    />
  )
}

export function CellBox() {
  return (
    <Toolbox
      firstLayer={
        <>
          <Button icon={<InsertRowAboveOutlined />} />
          <Button icon={<InsertRowBelowOutlined />} />
        </>
      }
      secondLayer={
        <>
          <Button icon={<InsertRowLeftOutlined />} />
          <Button icon={<InsertRowRightOutlined />} />
        </>
      }
      title="셀"
    />
  )
}

export function EditBox() {
  return (
    <Toolbox
      firstLayer={
        <>
          <Dropdown trigger={['click']}>
            <Button icon={<FunctionOutlined />}>함수</Button>
          </Dropdown>
        </>
      }
      secondLayer={
        <>
          <Dropdown trigger={['click']}>
            <Button icon={<FilterOutlined />}>필터</Button>
          </Dropdown>
        </>
      }
      title="편집"
    />
  )
}
