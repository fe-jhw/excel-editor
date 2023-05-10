import { EditorContext } from '@/context'
import { defaultCells } from '@/data/SheetConstants'
import { fileState } from '@/data/store'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Tabs, Button } from 'antd'
import produce from 'immer'
import { useCallback, useContext, useState, MouseEvent } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

interface EditInfo {
  editing: boolean
  targetId: number | null
}

export function Footer() {
  const { changeSheet } = useContext(EditorContext)
  const [file, setFile] = useRecoilState(fileState)
  const [editInfo, setEditInfo] = useState<EditInfo>({
    editing: false,
    targetId: null,
  })

  const onTabDoubleClick = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      if (!(e.target instanceof HTMLSpanElement)) {
        return
      }
      setEditInfo({
        editing: true,
        targetId: e.target.dataset['id'],
      })
      console.dir(e.target)
    },
    [setEditInfo]
  )

  const addSheet = useCallback(() => {
    setFile(prev =>
      produce(prev, draft => {
        const newSheetNumber = draft.sheets.length + 1
        draft.sheets.push({
          title: `Sheet ${newSheetNumber}`,
          cells: defaultCells,
        })
      })
    )
  }, [setFile])

  return (
    <Tabs
      tabPosition="bottom"
      items={file.sheets.map((sheet, i) => {
        const id = String(i)
        return {
          label: (
            <span onDoubleClick={e => onTabDoubleClick(i, e)} data-id={`${id}`}>
              {sheet.title}
            </span>
          ),
          // label: (
          //   <input
          //     disabled
          //     style={{ width: '50px', height: '100%', background: 'transparent', outline: 'none', border: 'none' }}
          //     value={sheet.title}
          //   />
          // ),
          key: id,
        }
      })}
      tabBarExtraContent={{
        left: (
          <Button
            onClick={addSheet}
            type="text"
            icon={<PlusCircleOutlined />}
            size="large"
            style={{ marginRight: '4px' }}
          />
        ),
      }}
      onTabClick={(key, _) => {
        changeSheet(parseInt(key))
      }}
      style={{ backgroundColor: '#F5F5F5' }}
    />
  )
}

function TitleEditBox() {}
