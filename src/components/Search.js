import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'


const FEED_SEARCH_QUERY = gql`
	Feed_Search_Query($filter: String!) {
		feed(filter: $filter) {
			links {
				id
				url
				description
				createdAt
				postedBy {
					id
					name
				}
				votes {
					id
					user {
						id 
					}
				}
			}
		}
	}
`

class Search extends Component {

	state = {
		links: [],
		filter: ''
	}

	render() {
		return (
			<div>
				<div>
					Search
					<input 
						type="text"
						onChange={e => this.setState({ filter: e.target.value })}
					/>
					<button onClick={() => this._executeSearch()}>OK</button>
				</div>
				{this.state.links.map((link, index) => (
					<Link 
						key={link.id} 
						link={link} 
						index={index} 
					/>
				))}
			</div>
		)
	}

	_executeSearch = async() => {
		// to do
	}
}

export default withApollo(Search)