import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import {
	getStatic,
	getUserList,
	getClasss
} from '../../../Redux/Action/shareAction'
import TradeList from './TradeList'
import $ from 'jquery'
class TradeUserTree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
		}
	}
	componentWillMount() {
		getUserList().then((users) => {
			getClasss().then((scripts) => {
				for (let i in users) {
					users[i].trade = [];
					users[i].predict = [];
					for (let j in scripts) {
						if (users[i].username == scripts[j].username) {
							if (scripts[j].mode == 'trade') {
								users[i].trade.push(scripts[j]);
							} else {
								users[i].predict.push(scripts[j]);
							}
						}
					}
				}
				let has_scripts_user = []
				for (let i in users) {
					if (users[i].trade.length != 0) {
						has_scripts_user.push(users[i])
					}
				}
				this.setState({
					users: has_scripts_user,
				})
			})
		})
	}
	mouseOut(username) {
		$('#name_' + username).css('color', '#808080');
		$('#list_' + username).css('backgroundColor', '#3b3b3b');
	}
	mouseOver(username) {
		$('#name_' + username).css('color', '#fff');
		$('#list_' + username).css('backgroundColor', '#525252');
	}
	showList(e,username){
		let oldClass = e.target.className;
        $('.userMenu').each(function(index, el) {
            if('scripts_' + username != el.id){
                $(this).removeClass('in');
            }
        });
        $('.userCircle').each(function(i) {
            $(this).attr("class", "userCircle fa fa-plus-circle collapsed");
            $(this).parent().removeClass('open');
        })
		if(oldClass == "userCircle fa fa-plus-circle collapsed"){
		    e.target.className = 'userCircle fa fa-minus-circle';
		}else{
			e.target.className = "userCircle fa fa-plus-circle collapsed";
		}
	}
	render() {
		const ulStyle = {
			height: document.documentElement.clientHeight - 80,
		}
		let user_list = this.state.users.map((x, index) => {
			return (
				<div key={index}>
				<div className='listback' id={'list_' + x.username}
             onMouseOut={(e)=>this.mouseOut(x.username)}
             onMouseOver={(e)=>this.mouseOver(x.username)}
              >
		       <i className="userCircle fa fa-plus-circle collapsed"
		       data-toggle="collapse" data-target={'#scripts_' + x.username}
		       onClick={(e)=>this.showList(e,x.username)}></i>
		       <span className="user_name" id={'name_' + x.username}>{x.username}</span>
		       <span className="user_circle fa fa-circle">
		            &nbsp;
		         	{x.trade.length}
		       </span>
		       </div>
		         <div  style={{width:'100%'}} id={'scripts_' + x.username} className="userMenu collapse">
		             <TradeList trade={x.trade} username={x.username} />
                 </div>
             </div>
			);
		});
		return (
			<div>
			    <div className='ulStyle' style={ulStyle}>{user_list}</div>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {

	};
}

export default connect(mapStateToProps)(TradeUserTree); //,{ alertHide }