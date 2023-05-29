export const styles = {
  cell: [
    { name: '표준', border: '1px solid lightgray', backgroundColor: '#fff', color: '#000' },
    { name: '나쁨', border: 'none', backgroundColor: '#FFC7CE', color: '#BE5882' },
    { name: '보통', border: 'none', backgroundColor: '#FFEB9C', color: '#000' },
    { name: '좋음', border: 'none', backgroundColor: '#C6EFCE', color: '#000' },
  ],
  table: [
    {
      header: { border: 'none', backgroundColor: '#C6EFCE', color: '#000' },
      body: { border: 'none', backgroundColor: '#FFC7CE', color: '#BE5882' },
    },
    {
      header: { border: 'none', backgroundColor: 'blue', color: '#fff' },
      body: { border: 'none', backgroundColor: 'skyblue', color: 'black' },
    },
  ],
}

export const EXAMPLE_TABLE_CELL_TEXT = '~'
export const TABLE_EXAMPLE_COL = 5
export const TABLE_EXAMPLE_ROW = 3
