import { ClearOutlined, CopyOutlined, DeleteOutlined, ScissorOutlined, FileOutlined } from '@ant-design/icons'
import { MenuProps, Modal, Menu } from 'antd'
import { useCallback, useContext } from 'react'
import { EditorContext } from '@/context'
import { defaultCell } from '@/constants/SheetConstants'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import { IContextMenu, MENU_HEIGHT, MENU_WIDTH, Placement } from '@/hooks/useContextMenu'

interface ContextMenuProps extends IContextMenu {}

type MenuKey = 'cut' | 'copy' | 'paste' | 'delete' | 'clear'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  { key: 'cut', label: '잘라내기', icon: <ScissorOutlined /> },
  { key: 'copy', label: '복사', icon: <CopyOutlined /> },
  { key: 'paste', label: '붙여넣기', icon: <FileOutlined /> },
  {
    key: 'delete',
    label: '삭제',
    icon: <DeleteOutlined />,
    children: [
      {
        key: 'deleteShiftLeft',
        label: '셀을 왼쪽으로 밀기',
      },
      {
        key: 'deleteShiftUp',
        label: '셀을 위로 밀기',
      },
      {
        key: 'deleteRows',
        label: '행 전체',
      },
      {
        key: 'deleteCols',
        label: '열 전체',
      },
    ],
  },
  { key: 'clear', label: '내용 지우기', icon: <ClearOutlined /> },
]

export function ContextMenu({ open, x, y }: ContextMenuProps) {
  const {
    selectedArea,
    changeSelectedCells,
    copySelectedArea,
    paste,
    isSomethingCopied,
    deleteCols,
    deleteRows,
    deleteShiftUp,
    deleteShiftLeft,
  } = useContext(EditorContext)

  const clearSelectedCells = useCallback(() => {
    changeSelectedCells(defaultCell)
  }, [changeSelectedCells])

  const onMenuClick = useCallback(
    (key: string): void => {
      const { si, sj, ei, ej } = selectedArea
      switch (key) {
        case 'cut':
          copySelectedArea('cut')
          break
        case 'copy':
          copySelectedArea('copy')
          break
        case 'paste':
          paste()
          break
        case 'deleteCols':
          deleteCols(sj, ej)
          break
        case 'deleteRows':
          deleteRows(si, ei)
          break
        case 'deleteShiftUp':
          deleteShiftUp(si, sj, ei, ej)
          break
        case 'deleteShiftLeft':
          deleteShiftLeft(si, sj, ei, ej)
          break
        case 'clear':
          clearSelectedCells()
          break
        default:
          break
      }
    },
    [clearSelectedCells, copySelectedArea, paste, selectedArea, deleteCols, deleteRows, deleteShiftUp, deleteShiftLeft]
  )

  return (
    <>
      {open && (
        <div className="context-menu" style={{ left: x, top: y }}>
          <Menu
            items={items.map(item => {
              if (item?.key === 'paste' && !isSomethingCopied) {
                return { ...item, disabled: true } as MenuItemType
              }
              return item as MenuItemType
            })}
            onClick={({ key }) => onMenuClick(key)}
          />
        </div>
      )}
    </>
  )
}
