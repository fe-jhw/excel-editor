import {
  BgColorsOutlined,
  BoldOutlined,
  FontColorsOutlined,
  ItalicOutlined,
  UnderlineOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, InputNumber, Select } from 'antd'
import { useContext } from 'react'
import { ChromePicker } from 'react-color'
import { ToggleButton } from '@/components/ToggleButton'
import { ToolBox } from './ToolBox'
import { SPACE_GAP, SMALL_BTN_WIDTH, MIDDLE_BTN_WIDTH, fontFamiles } from '../data/constants'
import * as O from '@/utils/option'
import { EditorContext } from '@/context/EditorContext'
import { defaultCell, MAX_FONT_SIZE, MIN_FONT_SIZE } from '@/data/SheetConstants'

export function FontBox() {
  const { selectedCell, changeSelectedCells } = useContext(EditorContext)

  return (
    <ToolBox.Wrapper>
      <ToolBox.Layer>
        <Select
          style={{ width: `${3 * SMALL_BTN_WIDTH + 3 * SPACE_GAP + MIDDLE_BTN_WIDTH}px` }}
          onSelect={value => changeSelectedCells({ fontFamily: value })}
          value={O.getOrElseFromUndefined(selectedCell?.fontFamily, defaultCell.fontFamily)}
        >
          {fontFamiles.map(fontFamily => (
            <Select.Option key={fontFamily.label} value={fontFamily.value}>
              <span style={{ fontFamily: fontFamily.value }}>{fontFamily.label}</span>
            </Select.Option>
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
      </ToolBox.Layer>
      <ToolBox.Layer>
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
      </ToolBox.Layer>
      <ToolBox.Title>글꼴</ToolBox.Title>
    </ToolBox.Wrapper>
  )
}
