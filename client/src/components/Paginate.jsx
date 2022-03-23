import React from "react";
import { Link } from "react-router-dom";
import "../css/paginate.css";

const Paginate = ({ pages, currentPage }) => {
  return (
    <div className="pagination">
      <ul className="pagination__container">
        {pages.map((page, idx) => (
          <li className="pagination-item" key={idx + 1}>
            <Link
              className={
                idx + 1 === currentPage
                  ? "pagination-link active"
                  : "pagination-link"
              }
              to={`/?page=${idx + 1}`}
            >
              {idx + 1}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paginate;
