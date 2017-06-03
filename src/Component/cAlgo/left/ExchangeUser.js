// import React, {
// 	Component
// } from 'react'
// import {
// 	connect
// } from 'react-redux'
// import $ from 'jquery'
// import TradeStrategys from './TradeStrategys.js'
// import {
// 	showStrategyList2,
// 	ShowList
// } from '../../../Redux/Action/Action'
// import Loading from '../../Loading.js'
// import {
// 	getStatic
// } from '../../../Redux/Action/shareAction'
// const circle = {
// 	float: 'right',
// 	marginRight: '10px',
// 	marginTop: '10px',
// 	borderRadius: '100px',
// 	height: '30px',
// 	width: '30px',
// 	padding: '2px',
// 	cursor: 'default'
// }
// let clicked = [];
// class ExchangeUser extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			userlist: [],
// 			click_user: ''
// 		}
// 	}
// 	make_data(nextProps) {
// 		let stra = nextProps.strategys;
// 		let tru = nextProps.trueStra;
// 		let back = nextProps.btstrategys;

// 		let users = getStatic().userList;
// 		let userlist = users;

// 		for (let k in userlist) {
// 			userlist[k].trueStra = [];
// 			userlist[k].strategys = [];
// 			userlist[k].btstrategys = [];
// 			let num = 0;
// 			for (let i = 0; i < tru.length; i++) {
// 				if (tru[i].username == userlist[k].username) {
// 					userlist[k].trueStra[num] = tru[i];
// 					num++;
// 				}
// 			}
// 			num = 0;
// 			for (let i = 0; i < stra.length; i++) {
// 				if (stra[i].username == userlist[k].username) {
// 					userlist[k].strategys[num] = stra[i];
// 					num++;
// 				}
// 			}
// 			num = 0;
// 			for (let i = 0; i < back.length; i++) {
// 				if (back[i].username == userlist[k].username) {
// 					userlist[k].btstrategys[num] = back[i];
// 					num++;
// 				}
// 			}
// 		}
// 		let last_data = [];
// 		for (let i in userlist) {
// 			if (userlist[i].trueStra.length + userlist[i].strategys.length + userlist[i].btstrategys.length > 0) {
// 				last_data.push(userlist[i])
// 			} else {
// 				// console.log(userlist[i])
// 			}
// 		}
// 		return last_data;
// 	}
// 	componentWillReceiveProps(nextProps) {
// 		// old_prorps[nextProps.exchange] = nextProps;
// 		this.setState({
// 			userlist: this.make_data(nextProps)
// 		})
// 	}
// 	show(e, click_user, _id) {
// 		let loadId = 'load_' + _id;
// 		let userlist = this.props.userlist;
// 		if (e.target.className == 'fa fa-plus-circle collapsed user_circle') {
// 			e.target.className = 'fa fa-minus-circle user_circle';
// 			if (($.inArray(click_user, clicked)) == -1)$('#' + loadId).css("display", 'inline');
// 			setTimeout(() => {
// 				if (($.inArray(click_user, clicked)) == -1) {
// 					clicked.push(click_user);
// 					this.setState({
// 						click_user: click_user,
// 						userlist: this.make_data(this.props)
// 					})
// 					$('#' + loadId).css("display", 'none');
// 				}
// 				$('.user_circle').each(function(index, el) {
// 					if (el.id != 'circle_' + _id) {
// 						$(this).attr('class', 'fa fa-plus-circle collapsed user_circle');
// 					}
// 				});
// 				$('.user_collapse').each(function(index, el) {
// 					if (el.id != _id) {
// 						$(this).removeClass('in');
// 					}
// 				});
// 			}, 100)
// 		} else {
// 			e.target.className = 'fa fa-plus-circle collapsed user_circle';
// 		}
// 	}
// 	onMouseOut2(id) {
// 		$('#' + id).css('color', '#808080');
// 	}
// 	onMouseOver2(id) {
// 		$('#' + id).css('color', '#fff');
// 	}
// 	componentDidUpdate(prevProps, prevState) {
// 		$('.model_info_tbody tr td').each(function(index, el) {
// 			let text = $(this).text();
// 			$('.input--chisato input').each(function(index, el) {
// 				if (text == el.id) {
// 					text = $('.input--chisato label span').eq(index).text();
// 				}
// 			});
// 			$(this).text(text);
// 		})
// 	}
// 	render() {
// 		// console.log(this.state)
// 		let _this = this;
// 		return (
// 			<div>
//     			             {
//              	this.state.userlist.map(function(x,index){
// 				let _id = x.username + '_' + _this.props.exchange;
// 				let loadId = 'load_' + _id
//              		return (
//              			<div key={index}>
//              <div className='listback' style={{width:"93%",marginLeft:'5%',backgroundColor:'#525252'}}
// 			onMouseOut={_this.onMouseOut2.bind(null,_id+index)}
// 		    onMouseOver={_this.onMouseOver2.bind(null,_id+index)}
// 		     key={index} 
// 		    >
// 		       <i id={'circle_' + _id} className="fa fa-plus-circle collapsed user_circle" 
// 		       onClick={(e)=>_this.show(e,x.username,_id)} 
// 		       data-toggle="collapse" data-target={"#" + _id} style={{marginLeft:'5px',cursor: "pointer",color:'#ccc'}}>
//                  <i hidden>{_this.props.exchange}</i>
// 		       </i>
// 		       <span style={{marginLeft: '8%',color:'#808080'}}><span id ={_id+index}>{x.username}</span>
// 		       	<i style={circle} className="his   fa fa-circle" title="历史回测">&nbsp;{x.btstrategys.length}</i>
// 			    <i style={circle} className="real  fa fa-circle" title="实盘模拟">&nbsp;{x.strategys.length}</i>
// 			    <i style={circle} className="true  fa fa-circle" title="真实交易">&nbsp;{x.trueStra.length}</i>  
// 			    </span>
// 			    <div id={loadId}  style={{display:'none',float:'right',marginRight:'10px'}}>
// 				    <Loading size="9px"/>
//                   </div>

//                   </div>

//                    <div id={_id} className="collapse user_collapse">
//                    	         <TradeStrategys 
// 				               click_user={_this.state.click_user}
// 				               username={x.username} 
// 				               strategys={x.strategys}
// 				               trueStra={x.trueStra}
// 				               btstrategys={x.btstrategys}/>
//                    </div>

//                    </div>
              

//              			)
//              	})
//                }

//     		</div>
// 		)
// 	}
// }
// const mapStateToProps = (state) => {
// 	return {};
// }

// export default connect(mapStateToProps)(ExchangeUser); //,{ alertHide }