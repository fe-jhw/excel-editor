import { EditorContext } from '@/context'
import { fileState } from '@/data/store'
import { getEmptySheet } from '@/utils/SheetUtils'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Tabs, Button, Input } from 'antd'
import produce from 'immer'
import { useCallback, useContext, useState, MouseEvent, ChangeEvent, useMemo, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as O from '@/utils/option'

export function Footer() {
  const { changeSheet } = useContext(EditorContext)
  const [file, setFile] = useRecoilState(fileState)

  const addSheet = useCallback(() => {
    setFile(prev =>
      produce(prev, draft => {
        const newSheetNumber = draft.sheets.length + 1
        draft.sheets.push(getEmptySheet(newSheetNumber))
      })
    )
  }, [setFile])

  return (
    <>
      <Tabs
        tabPosition="bottom"
        // type="card"
        items={file.sheets.map((sheet, i) => {
          const id = String(i)
          return {
            label: <Tab id={i} title={sheet.title} />,
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
        activeKey={`${file.currentSheetIdx}`}
      />
    </>
  )
}

interface TabProps {
  id: number
  title: string
}

function Tab({ id, title }: TabProps) {
  const [file, setFile] = useRecoilState(fileState)

  const onTabTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFile(prev =>
        produce(prev, draft => {
          const curSheet = draft.sheets[id]
          curSheet.title = e.target.value
        })
      )
    },
    [setFile, id]
  )
  return (
    <input
      data-id={`${id}`}
      value={title}
      onChange={onTabTitleChange}
      // onDoubleClick={onDoubleClick}
      maxLength={7}
      style={{
        width: '90px',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: file.currentSheetIdx === id ? '#1677ff' : '',
        fontWeight: file.currentSheetIdx === id ? 'bold' : '',
        textAlign: 'center',
        cursor: 'pointer',
      }}
      // disabled={!isEditing}
    />
  )
}
