import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, id }) => {
  return (
    <div
      class="card m-3"
      style={{ width: "18rem", height: "8rem", cursor: "pointer" }}
    >
      <Link to={`/behaviour/${title}`} state={{id}}>
        <div class="card-body d-flex align-items-center">
          <h2 class="card-title text-center w-100">{title}</h2>
        </div>
      </Link>
    </div>
  );
};

export default Card;
