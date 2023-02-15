export default function Sheet() {
  return (
    <div style={{ minHeight: '500px', height: '500px', width: '100%', overflow: 'scroll' }}>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <Row />
        </thead>
        <tbody>
          {new Array(30).fill(0).map((el, idx) => (
            <Row />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Row() {
  return (
    <tr>
      {new Array(30).fill(0).map((el, idx) => (
        <td key={idx + 1} style={{ border: '1px solid rgb(218, 220, 224)', height: '28px', minWidth: '50px' }}></td>
      ))}
    </tr>
  )
}
