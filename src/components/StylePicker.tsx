import { styles } from '@/constants/ToolBoxConstants'

interface StylePickerProps {
  onChange: (style: CellStyle) => void
  type: 'cell' | 'table'
}

//TODO: 'tempalte literal type' 활용해보기
interface StyleOptionProps {
  style: CellStyle | TableStyle
}

interface CellStyle {
  border?: string
  backgroundColor?: string
  color?: string
}

interface TableStyle {
  header: CellStyle
  body: CellStyle
}

export function StylePicker({ onChange, type }: StylePickerProps) {
  return (
    <div className="style-picker">
      {styles[type].map(style => {
        const { name, ...menuStyle } = style
        return (
          <div className="style-option" key={name} style={menuStyle} onClick={() => onChange(menuStyle)}>
            {style.name}
          </div>
        )
      })}
    </div>
  )
}

// function StyleOption({ type })
