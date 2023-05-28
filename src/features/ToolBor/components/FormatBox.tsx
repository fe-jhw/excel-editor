import { ToggleButton } from '@/components'
import { EditorContext } from '@/context'
import { defaultCell } from '@/data/SheetConstants'
import { DollarOutlined, FieldBinaryOutlined, PercentageOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import { useContext } from 'react'
import { formats, SMALL_BTN_WIDTH, SPACE_GAP } from '../data/constants'
import { ToolBox } from './ToolBox'
import * as O from '@/utils/option'

const { Option } = Select

export function FormatBox() {
  const { selectedCell, changeSelectedCells } = useContext(EditorContext)

  return (
    <ToolBox.Wrapper>
      <ToolBox.Layer>
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
      </ToolBox.Layer>
      <ToolBox.Layer>
        <ToggleButton
          value={selectedCell?.format}
          valueIfActive="money"
          propertyName="format"
          icon={<DollarOutlined />}
        />
        <ToggleButton
          value={selectedCell?.format}
          valueIfActive="percentage"
          propertyName="format"
          icon={<PercentageOutlined />}
        />
        <ToggleButton
          value={selectedCell?.format}
          valueIfActive="number"
          propertyName="format"
          icon={<FieldBinaryOutlined />}
        />
      </ToolBox.Layer>
      <ToolBox.Title>표시 형식</ToolBox.Title>
    </ToolBox.Wrapper>
  )
}
