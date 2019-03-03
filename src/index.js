import React from 'react'
import ReactDOM from 'react-dom'
import './styles/App.css'
import App from './components/App.js'
import * as serviceWorker from './serviceWorker';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from './constants'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'


// create httpLink to connect ApolloClient instance with GraphQL API
const httpLink = createHttpLink({
	uri: 'http://localhost:4000'
})

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(AUTH_TOKEN)
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	}
}) 

const wsLink = new WebSocketLink({
	uri: `ws://localhost:4000`,
	options: {
		reconnect: true,
		connectionParams: {
			authToken: localStorage.getItem(AUTH_TOKEN),
		}
	}
})

const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query)
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	authLink.concat(httpLink)
)

// instantiate ApolloClient by passing httpLink and a new instance of InMemoryCache
const client = new ApolloClient({
	link,
	cache: new InMemoryCache()
})


// App is wrapped in ApolloClient HOC that gets passed as a prop  
ReactDOM.render(
	<BrowserRouter>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</BrowserRouter>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
