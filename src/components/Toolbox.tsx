import { memo, ReactNode, useCallback, useContext, useEffect } from 'react'
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
import { fontFamiles, formats } from '@/constants/ToolBoxConstants'
import { EditorContext } from '@/context'
import * as O from '@/utils/option'
import { defaultCell, MAX_FONT_SIZE, MIN_FONT_SIZE } from '@/constants/SheetConstants'
import { ToggleButton, CellStylePicker, TableStylePicker } from '@/components'

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
  // TODO: 각 Box별로 중복되는 애 처리하기
  // TODO: textAlign typing 한거 자세히 정리하기
  const { selectedCell, changeSelectedCells } = useContext(EditorContext)
  return (
    <Toolbox
      firstLayer={
        <>
          <ToggleButton
            value={selectedCell?.verticalAlign}
            valueIfActive="top"
            propertyName="verticalAlign"
            icon={<VerticalAlignTopOutlined />}
          />
          <ToggleButton
            value={selectedCell?.verticalAlign}
            valueIfActive="middle"
            propertyName="verticalAlign"
            icon={<VerticalAlignMiddleOutlined />}
          />
          <ToggleButton
            value={selectedCell?.verticalAlign}
            valueIfActive="bottom"
            propertyName="verticalAlign"
            icon={<VerticalAlignBottomOutlined />}
          />
        </>
      }
      secondLayer={
        <>
          <ToggleButton
            value={selectedCell?.textAlign}
            valueIfActive="left"
            propertyName="textAlign"
            icon={<AlignLeftOutlined />}
          />
          <ToggleButton
            value={selectedCell?.textAlign}
            valueIfActive="center"
            propertyName="textAlign"
            icon={<AlignCenterOutlined />}
          />
          <ToggleButton
            value={selectedCell?.textAlign}
            valueIfActive="right"
            propertyName="textAlign"
            icon={<AlignRightOutlined />}
          />
        </>
      }
      title="정렬"
    />
  )
}

export function FormatBox() {
  const { selectedCell, changeSelectedCells } = useContext(EditorContext)

  return (
    <Toolbox
      firstLayer={
        <>
          <Select
            style={{ width: `${3 * SMALL_BTN_WIDTH + 2 * SPACE_GAP}px` }}
            value={O.getOrElseFromUndefined(selectedCell?.format, defaultCell.format)}
            onSelect={value => changeSelectedCells({ format: value })}
          >
            {formats.map(format => (
              <Option key={format.label} value={format.value}>
                {format.icon}
                <span style={{ marginLeft: '8px' }}>{format.label}</span>
              </Option>
            ))}
          </Select>
        </>
      }
      secondLayer={
        <>
          <ToggleButton
            value={selectedCell?.format}
            valueIfActive="account"
            propertyName="format"
            icon={<AccountBookOutlined />}
          />
          <ToggleButton
            value={selectedCell?.format}
            valueIfActive="percentage"
            propertyName="format"
            icon={<PercentageOutlined />}
          />
          <ToggleButton
            value={selectedCell?.format}
            valueIfActive="time"
            propertyName="format"
            icon={<FieldTimeOutlined />}
          />
        </>
      }
      title="표시 형식"
    />
  )
}

export function StyleBox() {
  const { selectedArea, changeSelectedCells, changeCells } = useContext(EditorContext)

  return (
    <Toolbox
      firstLayer={
        <>
          <Dropdown trigger={['click']} dropdownRender={() => <CellStylePicker />}>
            <Button icon={<FormOutlined />}>셀 스타일</Button>
          </Dropdown>
        </>
      }
      secondLayer={
        <>
          <Dropdown trigger={['click']} dropdownRender={() => <TableStylePicker />}>
            <Button icon={<TableOutlined />}>표 스타일</Button>
          </Dropdown>
        </>
      }
      title="스타일"
    />
  )
}

export function CellBox() {
  const { selectedArea, insertRowAbove, insertRowBelow, insertColLeft, insertColRight } = useContext(EditorContext)
  const insertRowAboveSelected = useCallback(() => {
    insertRowAbove(selectedArea.si)
  }, [selectedArea, insertRowAbove])

  const insertRowBelowSelected = useCallback(() => {
    insertRowBelow(selectedArea.ei)
  }, [selectedArea, insertRowBelow])

  const insertColLeftSelected = useCallback(() => {
    insertColLeft(selectedArea.sj)
  }, [selectedArea, insertColLeft])

  const insertColRightSelected = useCallback(() => {
    insertColRight(selectedArea.ej)
  }, [selectedArea, insertColRight])
  return (
    <Toolbox
      firstLayer={
        <>
          <Button icon={<InsertRowAboveOutlined />} onClick={insertRowAboveSelected} />
          <Button icon={<InsertRowBelowOutlined />} onClick={insertRowBelowSelected} />
        </>
      }
      secondLayer={
        <>
          <Button icon={<InsertRowLeftOutlined />} onClick={insertColLeftSelected} />
          <Button icon={<InsertRowRightOutlined />} onClick={insertColRightSelected} />
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
