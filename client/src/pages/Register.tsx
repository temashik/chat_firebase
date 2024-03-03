import { useState } from 'react';
import {Alert, Stack, Form, Row, Col, Button} from 'react-bootstrap'
import axios from '../axios';

function Register() {
	const [login, setLogin] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [registerError, setRegisterError] = useState(null);
	const [isRegisterLoading, setIsRegisterLoading] = useState(false);
	const registerRequest = async (e: any) => {
		e.preventDefault();
		setIsRegisterLoading(true);
		setRegisterError(null);
		const { data } = await axios.post("/users/register", {
			login,
			firstName,
			lastName,
			password,
		});
		if (data.eMsg) {
			setRegisterError(data.eMsg);
			setIsRegisterLoading(false);
		} else {
			setIsRegisterLoading(false);
		}
	}
  return (
    <>
		<Form onSubmit={registerRequest}>
			<Row style={{
				height: "100vh", 
				justifyContent: "center", 
				paddingTop: "7%"
			}}>
				<Col xs={6}>
					<Stack gap={3}>
						<h2>Register</h2>
						<Form.Control type='text' placeholder="Login" onChange={(e) => setLogin(e.target.value)} />
						<Form.Control type='text' placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
						<Form.Control type='text' placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
						<Form.Control type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
						<Button variant='primary' type="submit">
							{isRegisterLoading ? "Loading..." : "Register"}
						</Button>
						{registerError && <Alert variant='danger'><p>{registerError}</p></Alert>}
					</Stack>
				</Col>
			</Row>
		</Form>
	</>
  );
}

export default Register;
