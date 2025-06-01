import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import ReactPaginate from "react-paginate";

const Home = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 10;

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAccounts`
      );
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const filteredData = accounts.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.accountCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredData.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or code..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input"
      />

      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>NAME</th>
                <th>ACCOUNT CODE</th>
                <th>ACCOUNT NO.</th>
                <th>ACCOUNT TYPE</th>
                <th>BALANCE</th>
                <th>DESCRIPTION</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((data) => (
                <tr key={data.id} className="border-b hover:bg-gray-100">
                  <td>{data.name}</td>
                  <td>{data.accountCode}</td>
                  <td>{data.accountNumber}</td>
                  <td>{data.accountType}</td>
                  <td>{data.balance}</td>
                  <td>{data.description}</td>
                  <td>{data.openingBalanceDate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< Prev"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            activeClassName="active"
          />
        </>
      )}
    </div>
  );
};

export default Home;
