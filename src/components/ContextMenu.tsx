import { ClearOutlined, CopyOutlined, DeleteOutlined, ScissorOutlined, FileOutlined } from '@ant-design/icons'
import { MenuProps, Modal, Menu } from 'antd'
import { useCallback, useContext } from 'react'
import { EditorContext } from '@/context'
import { defaultCell } from '@/constants/SheetConstants'

interface ContextMenuProps {
  open: boolean
  x: number
  y: number
}

type MenuKey = 'cut' | 'copy' | 'paste' | 'delete' | 'clear'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  { key: 'cut', label: '잘라내기', icon: <ScissorOutlined /> },
  { key: 'copy', label: '복사', icon: <CopyOutlined /> },
  { key: 'paste', label: '붙여넣기', icon: <FileOutlined /> },
  { key: 'delete', label: '삭제', icon: <DeleteOutlined /> },
  { key: 'clear', label: '내용 지우기', icon: <ClearOutlined /> },
]

export function ContextMenu({ open, x, y }: ContextMenuProps) {
  const { changeSelectedCells } = useContext(EditorContext)

  const copySelectedCells = useCallback(() => {
    // changeSelectedCells(defaultCell)
  }, [changeSelectedCells])

  const clearSelectedCells = useCallback(() => {
    changeSelectedCells(defaultCell)
  }, [changeSelectedCells])

  const onMenuClick = useCallback(
    (key: string): void => {
      switch (key) {
        case 'cut':
          break
        case 'copy':
          copySelectedCells()
          break
        case 'paste':
          break
        case 'delete':
          break
        case 'clear':
          clearSelectedCells()
          break

        default:
          break
      }
    },
    [clearSelectedCells]
  )
  return (
    <>
      {open && (
        <div className="context-menu" style={{ left: x, top: y }}>
          <Menu items={items} onClick={({ key }) => onMenuClick(key)} />
        </div>
      )}
    </>
  )
}
