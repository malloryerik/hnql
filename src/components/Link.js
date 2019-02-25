import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants';
import { timeDifferenceForDate} from '../utils'
// expects a link in its props 
//renders the link’s description and url
class Link extends Component {
	render() {
		const authToken = localStorage.getItem(AUTH_TOKEN)
		return (
			<div className="flex mt2 items-start">
				<div flex items-center>
					<span className="gray">{this.props.index + 1}.</span>
					{authToken && (
						<div className="ml1 gray f11" onClick={() => this._voteForLink()}>
							▲
						</div>
					)}
				</div>
				<div className="ml1">
					<div>
						{this.props.link.description} ({this.props.link.url})
        </div>
					<div className="f6 lh-copy gray">
						{this.props.link.votes.length} votes | by{' '}
						{this.props.link.postedBy
							? this.props.link.postedBy.name
							: 'Unknown'}{' '}
						{timeDifferenceForDate(this.props.link.createdAt)}
					</div>
				</div>
			</div>
		)
	}
}

export default Link