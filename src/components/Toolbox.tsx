import { ReactNode, useContext } from 'react'
import { ChromePicker } from 'react-color'
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
import { ToggleButton } from '@/components/ToggleButton'

const { Option } = Select

interface ToolboxProps {
  firstLayer: ReactNode
  secondLayer: ReactNode
  title: string
}

const SPACE_GAP = 4
const SMALL_BTN_WIDTH = 32
const MIDDLE_BTN_WIDTH = 52
const SMALL_BTN_HEIGHT = 32

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
            style={{ width: `${3 * SMALL_BTN_WIDTH + 3 * SPACE_GAP + MIDDLE_BTN_WIDTH}px` }}
            onSelect={value => changeSelectedCells({ fontFamily: value })}
            value={O.getOrElseFromUndefined(selectedCell?.fontFamily, defaultCell.fontFamily)}
          >
            {fontFamiles.map(fontFamily => (
              <Option key={fontFamily.label} value={fontFamily.value}>
                <span style={{ fontFamily: fontFamily.value }}>{fontFamily.label}</span>
              </Option>
            ))}
          </Select>
          <InputNumber
            style={{ width: `${Number(MIDDLE_BTN_WIDTH)}px`, padding: '0 4px !important' }}
            controls={true}
            max={MAX_FONT_SIZE}
            min={MIN_FONT_SIZE}
            value={O.getOrElseFromUndefined(selectedCell?.fontSize, defaultCell.fontSize)}
            onChange={value => changeSelectedCells({ fontSize: O.getOrElseFromNull(value, defaultCell.fontSize) })}
          />
        </>
      }
      secondLayer={
        <>
          <ToggleButton
            value={selectedCell?.fontWeight}
            valueIfActive={'bold'}
            propertyName="fontWeight"
            icon={<BoldOutlined />}
          />
          <ToggleButton
            value={selectedCell?.fontStyle}
            valueIfActive={'italic'}
            propertyName="fontStyle"
            icon={<ItalicOutlined />}
          />
          <ToggleButton
            value={selectedCell?.textDecoration}
            valueIfActive={'underline'}
            propertyName="textDecoration"
            icon={<UnderlineOutlined />}
          />
          <Dropdown
            trigger={['click']}
            dropdownRender={() => (
              <ChromePicker
                disableAlpha
                onChange={color => changeSelectedCells({ backgroundColor: color.hex })}
                color={O.getOrElseFromUndefined(selectedCell?.backgroundColor, '#fff')}
              />
            )}
          >
            <Button icon={<BgColorsOutlined />} style={{ padding: '0 4px', width: MIDDLE_BTN_WIDTH }}>
              <span
                className="color-box"
                style={{
                  color: O.getOrElseFromUndefined(selectedCell?.backgroundColor, '#fff'),
                }}
              >
                ■
              </span>
            </Button>
          </Dropdown>
          <Dropdown
            trigger={['click']}
            dropdownRender={() => (
              <ChromePicker
                disableAlpha
                onChange={color => changeSelectedCells({ color: color.hex })}
                color={O.getOrElseFromUndefined(selectedCell?.color, '#000')}
              />
            )}
          >
            <Button icon={<FontColorsOutlined />} style={{ padding: '0 4px', width: MIDDLE_BTN_WIDTH }}>
              <span className="color-box" style={{ color: O.getOrElseFromUndefined(selectedCell?.color, '#000') }}>
                ■
              </span>
            </Button>
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
      title="정렬"
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
