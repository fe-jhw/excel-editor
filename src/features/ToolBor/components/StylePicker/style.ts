import { css } from '@emotion/react'

export const stylePickerCss = css`
  background-color: white;
  border-radius: 8px;
  padding: 4px 8px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px,
    rgba(0, 0, 0, 0.05) 0px 9px 28px 8px;
  display: flex;
  .example-cell {
    padding: 8px;
    margin: 4px;
    height: 28px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 5px #444;
    }
  }
  .example-table {
    margin: 4px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 5px #444;
    }
  }
  .example-table-row {
    display: flex;
    flex-direction: row;
  }
  .example-table-cell {
    width: 30px;
    height: 18px;
    text-align: center;
    line-height: 18px;
  }
`
