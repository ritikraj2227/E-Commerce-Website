import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
		<div className="not-found">
			<div>
				<h2>404</h2>
				<p>Opppppsss, page not found.</p>
				<button className="--btn --btn-primary">
					<Link to="/">&larr; Back To Home</Link>
				</button>
			</div>
		</div>
  );
};

export default NotFound;