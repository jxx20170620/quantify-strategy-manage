import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import $ from 'jquery'
class AlertApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display: 'none',
			messageText: '',
		}

	}
	componentWillMount() {

	}
	componentWillReceiveProps(getProp) {
		this.setState({
			messageText: getProp.message.messageText,
			display: 'inline'
		})
		if (getProp.message.hideTime != undefined) {
			setTimeout(() => {
				this.setState({
					display: 'none'
				})
			}, getProp.message.hideTime)
		} else {
			// setTimeout(()=> {this.setState({display:'none'})},1000)		
		}

	}
	kill() {
		this.setState({
			display: 'none'
		})
	}
	render() {
		const divS = {
			margin: '0 auto',
			display: this.state.display,
			position: 'absolute',
			zIndex: '99999',
			top: '5%',
			left: document.body.clientWidth < 900 ? '0%' : document.body.clientWidth / 2 - 175,
			width: document.body.clientWidth < 900 ? '100%' : '350px',
			height: 'auto',
			borderRadius: '6px',
			color: '#fff',
			textAlign: 'center',
			backgroundColor: "#7B9966",
			border: '1px solid #fff',
			minWidth: '300px',
			maxHeight: document.body.clientHeight * 0.8,
			minHeight: '35px',
			padding: '5px 10px',
			overflow: 'auto',
			right: 'auto',
			bottom: 'auto'
		}
		return (
			<div>
			
				<div className="modal" style={divS}  tabIndex="-99999" >
				      {this.props.message.hideTime>3000||this.props.message.hideTime==undefined?<i className="fa fa-remove" 
				      onMouseOut={(e)=>{e.target.style.color = '#FF6666'}} 
				      onMouseOver={(e)=>{e.target.style.color = '#ff0000'}} 
				      style={{cursor:'pointer',float:'right',dispaly:'block',color:'#FF6666'}} 
				      onClick={(e)=>this.setState({display:'none'})}>
				      </i>:null}
				      <b style={{padding:'5px 10px',marginBottom:'10px'}}>
				     {this.state.messageText}
				     </b>
				</div>

			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		message: state.reduAlert
	};
}

export default connect(mapStateToProps)(AlertApp); //,{ alertHide }