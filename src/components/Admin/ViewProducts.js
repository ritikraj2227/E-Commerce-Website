import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../Firebase";

const ViewProducts = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		let list = [];
		const fetchData = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, "products"));
				querySnapshot.forEach((doc) => {
					list.push({ id: doc.id, ...doc.data() });
				});
				setProducts(list);
			} catch (err) {
				toast.error(err.message);
			}
		};

		fetchData();
	}, []);

	const handleDelete = async (id, imageURL) => {
		try {
			await deleteDoc(doc(db, "products", id));
			const storageRef = ref(storage, imageURL);
			await deleteObject(storageRef);
			toast.success("Product deleted successfully.");
			setProducts(products.filter((item) => item.id !== id));
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<div className="table">
			<h1>All Products</h1>
			<div className="cate">
				
				<h4>
					<b>{products.length}</b> Products found.
				</h4>
			</div>

			<table>
				<thead>
					<tr>
						<th>s/n</th>
						<th>Image</th>
						<th>Name</th>
						<th>Category</th>
						<th>Price</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{products.map((product, index) => {
						const { id, name, price, imageURL, category } = product;
						return (
							<tr key={id}>
								<td>{index + 1}</td>
								<td>
									<img
										src={imageURL}
										alt={name}
										style={{ width: "100px" }}
									/>
								</td>
								<td>{name}</td>
								<td>{category}</td>
								<td>{`$${price}`}</td>
								<td className="icons">
									<Link to={`/admin/editproduct/${id}`}>
										<FaEdit
											size={20}
											color="green"
										/>
									</Link>
									&nbsp;
									<FaTrashAlt
										size={18}
										color="red"
										onClick={() => handleDelete(id, imageURL)}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ViewProducts;
