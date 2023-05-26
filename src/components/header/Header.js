import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { auth } from "../../Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from "../../redux/slice/cartSlice";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER, selectEmail, selectIsLoggedIn } from "../../redux/slice/authSlice";


const Header = () => {
		const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const [displayName, setdisplayName] = useState("");
	const cartTotalQuantity = useSelector(selectCartTotalQuantity);

	useEffect(() => {
		dispatch(CALCULATE_TOTAL_QUANTITY());
	}, [dispatch]);

	const AdminOnlyLink = ({ children }) => {
		const userEmail = useSelector(selectEmail);

		if (userEmail === "admin@gmail.com") {
			return children;
		}
		return null;
	};

	const ShowOnLogin = ({ children }) => {
		const isLoggedIn = useSelector(selectIsLoggedIn);

		if (isLoggedIn) {
			return children;
		}
		return null;
	};

	const ShowOnLogout = ({ children }) => {
		const isLoggedIn = useSelector(selectIsLoggedIn);

		if (!isLoggedIn) {
			return children;
		}
		return null;
	};

	const navigate = useNavigate();



	// Monitor currently sign in user
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				if (user.displayName == null) {
					const uName = user.email.slice(0, -10);
					setdisplayName(uName);
				} else {
					setdisplayName(user.displayName);
				}

				dispatch(
					SET_ACTIVE_USER({
						email: user.email,
						userName: user.displayName ? user.displayName : displayName,
						userID: user.uid,
					})
				);
			} else {
				setdisplayName("");
				dispatch(REMOVE_ACTIVE_USER());
			}
		});
	}, [dispatch, displayName]);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	const hideMenu = () => {
		setShowMenu(false);
	};

	const logoutUser = () => {
		signOut(auth)
			.then(() => {
				toast.success("Logout successfully.");
				navigate("/");
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	return (
		<>
			<header className="fixed">
				<div className="header">
					<div className="logo">
						<Link to="/">
							<h2>
								e<span>Commerce</span>.
							</h2>
						</Link>
					</div>

					<nav className={showMenu ? `show-nav` : `hide-nav`}>
						<div
							className={showMenu ? `nav-wrapper show-nav-wrapper` : `nav-wrapper`}
							onClick={hideMenu}></div>

						<ul onClick={hideMenu}>
							<li className="logo-mobile">
								<div className="logo">
									<Link to="/">
										<h2>
											e<span>Commerce</span>.
										</h2>
									</Link>
								</div>
								<FaTimes
									size={22}
									color="#fff"
									onClick={hideMenu}
								/>
							</li>
							<li>
								<AdminOnlyLink>
									<Link to="/admin/all-products">
										<button className="--btn --btn-primary">Admin</button>
									</Link>
								</AdminOnlyLink>
							</li>
							<li>
								<NavLink to="/">Home</NavLink>
							</li>
							<li>
								<NavLink to="/contact">Contact Us</NavLink>
							</li>
						</ul>
						<div
							className="header-right"
							onClick={hideMenu}>
							<span className="links">
								<ShowOnLogout>
									<NavLink to="/login">Login</NavLink>
								</ShowOnLogout>
								<ShowOnLogin>
									<a
										href="#home"
										style={{ color: "#ff7722" }}>
										<FaUserCircle size={16} />

										{displayName}
									</a>
								</ShowOnLogin>
								<ShowOnLogin>
									<NavLink to="/order-history">My Orders</NavLink>
								</ShowOnLogin>
								<ShowOnLogin>
									<NavLink
										to="/"
										onClick={logoutUser}>
										Logout
									</NavLink>
								</ShowOnLogin>
							</span>
							<span className="cart">
								<Link to="/cart">
									Cart
									<FaShoppingCart size={20} />
									<p>{cartTotalQuantity}</p>
								</Link>
							</span>
						</div>
					</nav>

					<div className="menu-icon">
						<span className="cart">
							<Link to="/cart">
								Cart
								<FaShoppingCart size={20} />
								<p>{cartTotalQuantity}</p>
							</Link>
						</span>
						<HiOutlineMenuAlt3
							size={28}
							onClick={toggleMenu}
						/>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
