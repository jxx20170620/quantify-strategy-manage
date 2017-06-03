// import React, {
// 	Component
// } from 'react'
// import {
// 	connect
// } from 'react-redux'
// import ExchangeUser from './ExchangeUser.js'
// import {
// 	showStrategyList2,
// 	ShowList
// } from '../../../Redux/Action/Action'
// import $ from 'jquery'
// import Loading from '../../Loading.js'
// import {
// 	getStatic
// } from '../../../Redux/Action/shareAction'
// let Prop;
// let _this;
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
// class ExchangeTrade extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			exchanges: [],
// 			clickExchange: '',
// 		}
// 	}
// 	componentWillMount() {
// 		this.willRender(this.props.StrategyList, this.props.BtstrategyList)
// 	}
// 	willRender(StrategyList, BtstrategyList) {
// 		let data = [
// 			'CSRPME',
// 			'CTP',
// 			'OKCoin'
// 		];

// 		let exchanges = [];
// 		for (let i = 0; i < data.length; i++) {
// 			exchanges.push({
// 				exchange: data[i],
// 				trueStra: [],
// 				strategys: [],
// 				btstrategys: [],
// 			})
// 		}
// 		for (let k = 0; k < exchanges.length; k++) {
// 			let num = 0;
// 			for (let i = 0; i < StrategyList.length; i++) {
// 				if (StrategyList[i].exchange == exchanges[k].exchange && StrategyList[i].account_id != null && StrategyList[i].status != 4 && StrategyList[i].script_mode == 'trade') {
// 					exchanges[k].trueStra[num] = StrategyList[i];
// 					num++;
// 				}
// 			}
// 			num = 0;
// 			for (let i = 0; i < StrategyList.length; i++) {
// 				if (StrategyList[i].exchange == exchanges[k].exchange && StrategyList[i].account_id == null && StrategyList[i].status != 4 && StrategyList[i].script_mode == 'trade') {
// 					exchanges[k].strategys[num] = StrategyList[i];
// 					num++;
// 				}
// 			}
// 			num = 0;
// 			for (let i = 0; i < BtstrategyList.length; i++) {
// 				if (BtstrategyList[i].exchange == exchanges[k].exchange && BtstrategyList[i].script_mode == 'trade') {
// 					exchanges[k].btstrategys[num] = BtstrategyList[i];
// 					num++;
// 				}
// 			}
// 		}



// 		this.setState({
// 			exchanges: exchanges,
// 		})


// 	}
// 	componentWillReceiveProps(nextProps) {
// 		this.willRender(nextProps.StrategyList, nextProps.BtstrategyList);
// 	}
// 	componentDidMount() {

// 	}
// 	onMouseOut2(id) {
// 		// e.target.style.backgroundColor='#3b3b3b';
// 		$('#' + id).css('backgroundColor', '#3b3b3b');
// 	}
// 	onMouseOver2(id) {
// 		// e.target.style.backgroundColor='#525252';
// 		$('#' + id).css('backgroundColor', '#525252');

// 	}
// 	showList(exchange) {

// 	}
// 	show(exchange, _id, e) {


// 		if (e.target.className == 'fa fa-plus-circle collapsed exchange_circle') {
// 			e.target.className = 'fa fa-minus-circle exchange_circle';
// 				$('.exchange_circle').each(function(index, el) {
// 					if (el.id != 'circle_' + _id) {
// 						$(this).attr('class', 'fa fa-plus-circle collapsed exchange_circle');
// 					}
// 				});
// 				$('.exchange_collapse').each(function(index, el) {
// 					if (el.id != _id) {
// 						$(this).removeClass('in');
// 					}
// 				});
// 		} else {
// 			e.target.className = 'fa fa-plus-circle collapsed exchange_circle';
// 		}

// 	}
// 	componentDidUpdate(prevProps, prevState) {
// 		for (let i = 0; i < this.state.exchanges.length; i++) {
// 			if ($('#circle' + i).hasClass('fa-minus-circle')) {
// 				$('#exchange' + i).addClass('in');
// 			};
// 		}
// 	}
// 	render() {

// 		_this = this;
// 		Prop = this.props;
// 		const astyle = {
// 			color: "#FFC266",
// 			cursor: 'default',
// 			marginLeft: '10%',
// 			textDecoration: 'none',
// 			fontSize: '11px'
// 		}

// 		let classs = this.state.exchanges.map(function(x, index) {

// 			let _id = "exchange" + index;
// 			return (
// 				<li  key={index}>
// 			<div className='listback'
// 			onMouseOut={_this.onMouseOut2.bind(null,index)}
// 		    onMouseOver={_this.onMouseOver2.bind(null,index)}
// 		    id={index}
// 		    >
// 		       <i id={'circle_' + _id} className="fa fa-plus-circle collapsed exchange_circle" 
// 		       onClick={_this.show.bind(null,x.exchange,_id)} 
// 		       data-toggle="collapse" data-target={"#" + _id} style={{marginLeft:'5px',cursor: "pointer",color:'#ccc'}}></i>
// 				<span style={astyle}>
// 					{x.exchange}	
// 				<i style={circle} className="his   fa fa-circle" title="历史回测">&nbsp;{x.btstrategys.length}</i>
// 			    <i style={circle} className="real  fa fa-circle" title="实盘模拟">&nbsp;{x.strategys.length}</i>
// 			    <i style={circle} className="true  fa fa-circle" title="真实交易">&nbsp;{x.trueStra.length}</i>  
// 				</span>

// 			</div>	

//              <div id={_id} className="collapse exchange_collapse">
//              <ExchangeUser 				
//                 clickExchange={_this.state.clickExchange}
// 				exchange={x.exchange} 
// 				strategys={x.strategys}
// 				trueStra={x.trueStra}
// 				btstrategys={x.btstrategys}/>

//              </div>
// 		   </li>
// 			);
// 		});
// 		return (
// 			<div>
// 		    <div className='konge'></div>
// 			<div className='ulStyle'>{classs}</div>	    
// 	    </div>
// 		)
// 	}

// }
// const mapStateToProps = (state) => {
// 	return {
// 		StrategyList: state.reduToStrategyList.StrategyList,
// 		BtstrategyList: state.reduToBtstrategyList.BtstrategyList,
// 	};
// }
// const mapDispatchToProps = (dispatch) => {
// 	return {

// 	};
// }
// export default connect(mapStateToProps)(ExchangeTrade);