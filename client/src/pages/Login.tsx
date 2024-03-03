import { useState } from 'react';
import {Alert, Stack, Form, Row, Col, Button} from 'react-bootstrap'
import { useSelector } from 'react-redux';
import {loginUser} from '../redux/slices/userSlice'
import { RootState, useAppDispatch } from '../redux/store';

function Login() {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const loading = useSelector((state: RootState) => state.user.loading)
	const error = useSelector((state: RootState) => state.user.error)
	const user = useSelector((state: RootState) => state.user.user)
	const dispatch = useAppDispatch()
	const loginRequest = async (e: any) => {
		e.preventDefault();
		const userCredentials = {
			login,
			password
		};
		dispatch(loginUser(userCredentials));
		// if (error != null) {
		// 	console.log('error', error);
		// } else {
		// 	console.log('user', user);
		// }
	}
 return (
    <>
		<Form onSubmit={loginRequest}>
			<Row style={{
				height: "100vh", 
				justifyContent: "center", 
				paddingTop: "7%"
			}}>
				<Col xs={6}>
					<Stack gap={3}>
						<h2>Login</h2>
						<Form.Control type='text' placeholder="Login" onChange={(e) => setLogin(e.target.value)} />
						<Form.Control type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
						<Button variant='primary' type="submit">
							{loading ? "Loading..." : "Login"}
						</Button>
						{error && <Alert variant='danger'><p>{error}</p></Alert>}
					</Stack>
				</Col>
			</Row>
		</Form>
	</>
  );
}

export default Login;
