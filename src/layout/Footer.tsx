import { EditorContext } from '@/context'
import { fileState } from '@/data/store'
import { getEmptySheet } from '@/utils/SheetUtils'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Tabs, Button, Input } from 'antd'
import produce from 'immer'
import { useCallback, useContext, useState, MouseEvent, ChangeEvent, useMemo, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as O from '@/utils/option'

interface EditInfo {
  editing: boolean
  targetId: number
  targetRect: {
    left: number
    top: number
    width: number
    height: number
  }
}

export function Footer() {
  const { changeSheet } = useContext(EditorContext)
  const [file, setFile] = useRecoilState(fileState)
  const [editInfo, setEditInfo] = useState<EditInfo>({
    editing: false,
    targetId: -1,
    targetRect: {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    },
  })

  const disableTabEdit = useCallback(
    (e: CustomEvent<MouseEvent>) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('tab-edit-box')) {
        return
      }
      setEditInfo(prev => ({ ...prev, editing: false }))
    },
    [setEditInfo]
  )

  const onTabTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFile(prev =>
        produce(prev, draft => {
          const curSheet = draft.sheets[draft.currentSheetIdx]
          curSheet.title = e.target.value
        })
      )
    },
    [setFile]
  )

  const getEditingTabTitle = useCallback(() => {
    const { targetId } = editInfo
    const targetSheet = file.sheets[targetId]
    if (targetSheet) {
      return targetSheet.title
    }
    return ''
  }, [editInfo, file.sheets])

  const onTabDoubleClick = useCallback(
    (sheetIdx: number, e: MouseEvent<HTMLSpanElement>) => {
      if (!(e.target instanceof HTMLSpanElement)) {
        return
      }
      console.log(sheetIdx, '더블클릭!')
      const { left, top, width, height } = e.target.getClientRects()[0]
      setEditInfo({
        editing: true,
        targetId: parseInt(O.getOrElseFromUndefined(e?.target?.dataset['id'], '-1')),
        targetRect: {
          left,
          top,
          width,
          height,
        },
      })
    },
    [setEditInfo]
  )

  const addSheet = useCallback(() => {
    setFile(prev =>
      produce(prev, draft => {
        const newSheetNumber = draft.sheets.length + 1
        draft.sheets.push(getEmptySheet(newSheetNumber))
      })
    )
  }, [setFile])

  useEffect(() => {
    if (editInfo.editing) {
      document.addEventListener('click', disableTabEdit as EventListener)
    }
    return () => {
      document.removeEventListener('click', disableTabEdit as EventListener)
    }
  }, [disableTabEdit, editInfo.editing])

  return (
    <>
      <TitleEditBox editInfo={editInfo} value={getEditingTabTitle()} onTabTitleChange={onTabTitleChange} />
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
    </>
  )
}

function TitleEditBox({
  editInfo,
  value,
  onTabTitleChange,
}: {
  editInfo: EditInfo
  value: string
  onTabTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  // TODO: 밖에 따로 두지말고 tab안에다 놓아야지 size 맞춰짐
  const { editing, targetRect } = editInfo
  const { width, height, left, top } = targetRect
  return (
    <>
      {editing && (
        <Input
          className="tab-edit-box"
          style={{
            width,
            height,
            left,
            top,
            position: 'absolute',
            border: 'none',
            outline: 'none',
            zIndex: 223213123,
            background: 'rgb(245, 245, 245)',
            padding: 0,
            margin: 0,
          }}
          value={value}
          onChange={onTabTitleChange}
        />
      )}
    </>
  )
}
