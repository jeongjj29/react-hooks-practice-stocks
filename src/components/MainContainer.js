import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then((data) => {
        setStocks(data);
        setFilteredStocks(data);
      });
  }, []);

  const onStockClick = (stock) => {
    const index = portfolio.findIndex(
      (portfolioStock) => portfolioStock.id === stock.id
    );

    if (index !== -1) {
      setPortfolio(
        portfolio.filter((portfolioStock) => portfolioStock.id !== stock.id)
      );
    } else {
      setPortfolio([...portfolio, stock]);
    }
  };

  const onStockSort = (type) => {
    if (type === "Alphabetically") {
      const sortedStocks = [
        ...filteredStocks.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          } else {
            return 0;
          }
        }),
      ];
      setFilteredStocks(sortedStocks);
    }
    if (type === "Price") {
      const sortedStocks = [
        ...filteredStocks.sort((a, b) => {
          if (a.price > b.price) {
            return 1;
          } else if (a.price < b.price) {
            return -1;
          } else {
            return 0;
          }
        }),
      ];
      setFilteredStocks(sortedStocks);
    }
  };

  const onFilterChange = (filter) => {
    if (filter !== "All") {
      const filtered = stocks.filter((stock) => stock.type === filter);
      setFilteredStocks(filtered);
    } else {
      setFilteredStocks(stocks);
    }
  };

  return (
    <div>
      <SearchBar onStockSort={onStockSort} onFilterChange={onFilterChange} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onStockClick={onStockClick} />
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolio} onStockClick={onStockClick} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
