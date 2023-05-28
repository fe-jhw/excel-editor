import { MenuProps } from 'antd'
import { openNewTab } from '../utils/openNewTab'

export const docsBarTitles = ['제작자: 정현우'] as const

export type DocsBarTitles = (typeof docsBarTitles)[number]

export const docsBarItems: { [key in DocsBarTitles]: MenuProps['items'] } = {
  '제작자: 정현우': [
    {
      key: '1',
      label: '블로그',
      onClick: () => {
        openNewTab('https://hyunwoo12.tistory.com/')
      },
    },
    {
      key: '2',
      label: '깃허브',
      onClick: () => {
        openNewTab('https://github.com/fe-jhw')
      },
    },
    {
      key: '3',
      label: '포트폴리오',
      onClick: () => {
        openNewTab('https://www.notion.so/a26d72ab9f4041e38897117d3612ad0c')
      },
    },
  ],
}
