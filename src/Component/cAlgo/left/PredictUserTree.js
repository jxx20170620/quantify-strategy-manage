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
import PredictList from './PredictList'
import $ from 'jquery'
class PredictUserTree extends Component {
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
					if (users[i].predict.length != 0) {
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
		$('#name_predict_' + username).css('color', '#808080');
		$('#list_predict_' + username).css('backgroundColor', '#3b3b3b');
	}
	mouseOver(username) {
		$('#name_predict_' + username).css('color', '#fff');
		$('#list_predict_' + username).css('backgroundColor', '#525252');
	}
	showList(e,username){
		let oldClass = e.target.className;
        $('.userPredictMenu').each(function(index, el) {
            if('scripts_predict_' + username != el.id){
                $(this).removeClass('in');
            }
        });
        $('.userPredictCircle').each(function(i) {
            $(this).attr("class", "userPredictCircle fa fa-plus-circle collapsed");
            $(this).parent().removeClass('open');
        })
		if(oldClass == "userPredictCircle fa fa-plus-circle collapsed"){
		    e.target.className = 'userPredictCircle fa fa-minus-circle';
		}else{
			e.target.className = "userPredictCircle fa fa-plus-circle collapsed";
		}
	}
	render() {
		const ulStyle = {
			height: document.documentElement.clientHeight - 80,
		}
		let user_list = this.state.users.map((x, index) => {
			return (
				<div key={index}>
				<div className='listback' id={'list_predict_' + x.username}
             onMouseOut={(e)=>this.mouseOut(x.username)}
             onMouseOver={(e)=>this.mouseOver(x.username)}
              >
		       <i className="userPredictCircle fa fa-plus-circle collapsed"
		       data-toggle="collapse" data-target={'#scripts_predict_' + x.username}
		       onClick={(e)=>this.showList(e,x.username)}></i>
		       <span className="user_name" id={'name_predict_' + x.username}>{x.username}</span>
		       <span className="user_circle fa fa-circle">
		            &nbsp;
		         	{x.predict.length}
		       </span>
		       </div>
		         <div  style={{width:'100%'}} id={'scripts_predict_' + x.username} className="userPredictMenu collapse">
		             <PredictList predict={x.predict} username={x.username} />
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

export default connect(mapStateToProps)(PredictUserTree); //,{ alertHide }