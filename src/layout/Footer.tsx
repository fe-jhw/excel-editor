import { fileState } from '@/data/store'
import { getEmptySheet } from '@/utils/SheetUtils'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Tabs, Button, Input } from 'antd'
import produce from 'immer'
import { useCallback, useContext, useState, MouseEvent, ChangeEvent, useMemo, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as O from '@/utils/option'
import { css } from '@emotion/react'
import { useFile } from '@/hooks/useFile'

export function Footer() {
  const { changeSheet } = useFile()
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
      css={tabTitleInputCss}
      style={{
        color: file.currentSheetIdx === id ? '#1677ff' : '',
        fontWeight: file.currentSheetIdx === id ? 'bold' : '',
      }}
      // disabled={!isEditing}
    />
  )
}

const tabTitleInputCss = css({
  width: '90px',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  textAlign: 'center',
  cursor: 'pointer',
})
