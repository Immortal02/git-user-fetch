import React from 'react'
import { Table } from 'reactstrap'

export default function List({items, pageNum, pageSize, order, handleOrder}) {
  return (
    <div style={{margin: "20px"}}>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Avartar_url</th>
            <th
              onClick={() => order === "asc" ? handleOrder("desc") : handleOrder("asc")}
            >
              Login {order === "asc" ? "▼" : "▲"}
            </th>
            <th>Type</th>            
          </tr>
        </thead>
        <tbody>
          {
            items.map((item, index) => (
              <tr key={item.id}>
                <td>{pageNum * pageSize + index + 1}</td>
                <td>{item.avatar_url}</td>
                <td>{item.login}</td>
                <td>{item.type}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}
