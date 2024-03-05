import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import { logout } from "../redux/slices/userSlice";
import { RootState } from "../redux/store";

function NavigationBar() {
	const user = useSelector((state: RootState) => state.user.user);
	const dispatch = useDispatch();
  return (
    <Navbar bg="dark" className="mb-4" style={{ height:"3.75 rem"}}>
		<Container>
			<h2>
				<Link to="/" className="link-light text-decoration-none">Chat app</Link>
			</h2>
			<span className="text-warning">{user ? "Logged in as " + user?.firstName + " " + user?.lastName : ""}</span>
			<Nav>
				<Stack direction="horizontal" gap={3}>
					{
						user ? <Link onClick={() => dispatch(logout())} to="/login" className="link-light text-decoration-none">Logout</Link> : <>
						<Link to="/login" className="link-light text-decoration-none">Login</Link>
						<Link to="/register" className="link-light text-decoration-none">Register</Link>
						</>
					}
				</Stack>
			</Nav>
		</Container>
	</Navbar>
  );
}

export default NavigationBar;
