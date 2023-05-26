import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectUserName } from '../../redux/slice/authSlice';

const Sidebar = () => {
	const userName = useSelector(selectUserName);
  return (
		<>
			<ul>
				<h1>{userName}</h1>
				
				<li>
					<NavLink to="/admin/all-products">All Products</NavLink>
				</li>
				<li>
					<NavLink to="/admin/addproduct">Add Product</NavLink>
				</li>
				<li>
					<NavLink to="/admin/vieworder">View Order</NavLink>
				</li>
			</ul>
		</>
  );
}

export default Sidebar
