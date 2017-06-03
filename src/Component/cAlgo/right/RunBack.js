import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import $ from 'jquery'
class RunBack extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}

	}
	componentWillMount() {

	}
	componentWillReceiveProps(nextProp) {

	}

	render() {
		let div_height = (document.documentElement.clientHeight-45 +35) - ((document.documentElement.clientHeight-64-25)/2+74.5 + 35) -60 + 'px';
		return (
			<div className="run_back" style={{height:div_height}}>
			

			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {

	};
}

export default connect(mapStateToProps)(RunBack); //,{ alertHide }