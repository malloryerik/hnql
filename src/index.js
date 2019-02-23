import React from 'react'
import ReactDOM from 'react-dom'
import './styles/App.css'
import App from './components/App.js'
import * as serviceWorker from './serviceWorker'
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


// create httpLink to connect ApolloClient instance with GraphQL API
const httpLink = createHttpLink({
	uri: 'http://localhost:4000'
})

// instantiate ApolloClient by passing httpLink and a new instance of InMemoryCache
const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
})


// App is wrapped in ApolloClient HOC that gets passed as a prop  
ReactDOM.render(
	<ApolloProvider client={client}>
		<App />,
	</ApolloProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
