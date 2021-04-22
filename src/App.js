import React, {useState, useEffect} from 'react';
import PaginationComponent from 'react-reactstrap-pagination';
import Search from './components/Search';
import List from './components/List';
import './App.css';

const pageSize = 9;

function App() {
  const [query, setQuery] = useState("");
  const [pageNum, setPageNum] = useState(0);
  const [order, setOrder] = useState('asc');
  const [status, setStatus] = useState("idle");
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setTotalCount(0);
    setItems([]);
    setStatus("loading");
    fetch(`https://api.github.com/search/users?q=${query} in:login&page=${pageNum}&per_page=${pageSize}&order=${order}&sort=login`)
    .then(res => {
      if (!res.ok) throw Error("Error");
      return res.json();
    })
    .then(res => {
      setStatus("success");
      setTotalCount(res.total_count);
      setItems(res.items);
    })
    .catch(e => {
      console.log("error", e);
      setStatus("error");
    })
  }, [query, pageNum, pageSize, order]);

  return (
    <div className="App">
      <Search
        handleSearch={value => setQuery(value)}
        query={query}
      />
      {
        status === "loading" && <div className="loading">Loading...</div>
      }
      {
        status === "success" &&
          <List
            items={items}
            pageNum={pageNum}
            pageSize={pageSize}
            order={order}
            handleOrder={value => setOrder(value)}
          />
      }
      {
        status === "error" && <div className="error">Server Error</div>
      }
      <div className="pagination">
        <PaginationComponent
          totalItems={totalCount}
          pageSize={pageSize}
          onSelect={(value) => setPageNum(value-1)}
        />
      </div>
    </div>
  );
}

export default App;
