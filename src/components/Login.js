import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const SIGNUP_MUTATION = gql`
	mutation SignupMutation($email: String!, $password: String!, $name: String!) {
		signup(email: $email, password: $password, name: $name) {
			token
		}
	}
`

const LOGIN_MUTATION = gql`
	mutation LoginMutataion($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`

class Login extends Component {
	state = {
		login: true, // flag to toggle 'Login' vs 'Signup' 
		email: '',
		password: '',
		name: '',
	}

	render() {
		const { login, email, password, name } = this.state
		return (
			<div>
				<h4 className="mv3">{login ? 'Login' : 'Signup'}</h4>
				<div className="flex flex-column">
					{!login && (
						<input
							value={name}
							onChange={e => this.setState({ name: e.target.value })}
							type="text"
							placeholder="Your name"
						/>
					)}
					<input
						value={email}
						onChange={e => this.setState({ email: e.target.value })}
						type="text"
						placeholder="Your email"
					/>
					<input
						value={password}
						onChange={e => this.setState({ password: e.target.value })}
						type="password"
						placeholder="keep it silent, keep it safe"
					/>
				</div>
				<div className="flex mt3">
					<Mutation
						mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
						variables={{ email, password, name }}
						onCompleted={data => this._confirm(data)}
					>
						{mutation => (
							<div className="pointer mr2 button" onClick={mutation}>
								{login ? 'Login' : 'Create account'}
							</div>
						)}
					</Mutation>
					<div
						className="pointer button"
						onClick={() => this.setState({ login: !login })}
					>
						{login ? 'Need an account?' : 'Aleady a member?'}
					</div>
				</div>

			</div>
		)
	}

	_confirm = async (data) => {
		const { token } = this.state.login ? data.login : data.signup
		this._saveUserData(token)
		this.props.history.push(`/`)
	}

	_saveUserData = token => {
		localStorage.setItem(AUTH_TOKEN, token)
	}
}

export default Login