// import React,{Component} from 'react'
// import {connect} from 'react-redux'
// import PredictStrategys from './PredictStrategys.js'
// import {showStrategyList2,ShowList} from '../../../Redux/Action/Action'
// import $ from 'jquery'
// import Loading from '../../Loading.js'
// import PredictUser from './PredictUser'
// const ulStyle = {
// 	height: document.documentElement.clientHeight - 74,
// }
// let Prop;
// let _this;
// class ExchangePredict extends Component {
// 	constructor(props){
// 		super(props);
// 		this.state = {
// 			exchanges : [],
// 			clickExchange:'',
// 		}
// 	}
// 	componentWillMount() {
// 		this.willRender(this.props.StrategyList,this.props.BtstrategyList)
// 	}
// 	willRender(StrategyList,BtstrategyList){
// 		let data = [
// 			'CSRPME',
// 			'CTP',
// 			'OKCoin'
// 		];
// 		let exchanges =[];
// 		for(let i=0;i<data.length;i++){
// 			exchanges.push({
// 				exchange:data[i],
// 				strategys:[],
// 				btstrategys:[],
// 			})
// 		}

// 		for (let k = 0; k < exchanges.length; k++) {
// 			let num = 0;
// 			for (let i = 0; i < StrategyList.length; i++) {
// 				if (StrategyList[i].exchange == exchanges[k].exchange && StrategyList[i].script_mode == 'predict' && StrategyList[i].status != 4) {
// 					exchanges[k].strategys[num] = StrategyList[i];
// 					num++;
// 				}
// 			}
// 			num = 0;
// 			for (let i = 0; i < BtstrategyList.length; i++) {
// 				if (BtstrategyList[i].exchange == exchanges[k].exchange && BtstrategyList[i].script_mode == 'predict') {
// 					exchanges[k].btstrategys[num] = BtstrategyList[i];
// 					num++;
// 				}
// 			}
// 		}
// 		this.setState({
// 			exchanges : exchanges,
// 		})
// 	}
// 	componentWillReceiveProps(nextProps) {
// 		this.willRender(nextProps.StrategyList,nextProps.BtstrategyList);
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
// 		for (let i = 0; i < this.state.exchanges.length; i++) {
// 			if ($('#predict_circle' + i).hasClass('fa-minus-circle')) {
// 				$('#predict_exchange' + i).addClass('in');
// 			};
// 		}

// 	}
// 	onMouseOut2(id){
// 		// e.target.style.backgroundColor='#3b3b3b';
// 		$('#predict_'+id).css('backgroundColor', '#3b3b3b');
// 	}
// 	onMouseOver2(id){
// 		// e.target.style.backgroundColor='#525252';
// 		$('#predict_'+id).css('backgroundColor', '#525252');

// 	}
// 	show(exchange,_id,e) {
// 		if (e.target.className == 'fa fa-plus-circle collapsed predict_circle') {
// 			e.target.className = 'fa fa-minus-circle predict_circle';
// 				$('.predict_circle').each(function(index, el) {
// 					if (el.id != 'predict_circle_' + _id) {
// 						$(this).attr('class', 'fa fa-plus-circle collapsed predict_circle');
// 					}
// 				});
// 				$('.predict_collapse').each(function(index, el) {
// 					if (el.id != _id) {
// 						$(this).removeClass('in');
// 					}
// 				});
// 		} else {
// 			e.target.className = 'fa fa-plus-circle collapsed predict_circle';
// 		}
// 	}
// 	render(){

// 		 _this = this;
// 		Prop = this.props;
// 		const astyle = {
// 			color: "#F1825F",
// 			cursor:'default',
// 			marginLeft: '10%',
// 			textDecoration: 'none',
// 			fontSize:'11px'
// 		}
// 		const circle = {
// 			float: 'right',
// 			marginRight: '10px',
// 			marginTop: '10px',
// 			borderRadius: '100px',
// 			height: '30px',
// 			width: '30px',
// 			cursor:'default',
// 			padding:'2px',
// 		}
// 		let classs = this.state.exchanges.map(function(x,index) {

// 			let _id = "predict_exchange" + index;
// 			return (
// 			<li  key={index}>
// 			<div className='listback'
// 			onMouseOut={_this.onMouseOut2.bind(null,index)}
// 		    onMouseOver={_this.onMouseOver2.bind(null,index)}
// 		    id={'predict_'+index}
// 		    >
// 		       <i id={'predict_circle_' + _id} className="fa fa-plus-circle collapsed predict_circle" 
// 		       onClick={_this.show.bind(null,x.exchange,_id)} data-toggle="collapse" 
// 		       data-target={"#" + _id} style={{marginLeft:'5px',cursor: "pointer",color:'#ccc'}}></i>
// 				<span style={astyle}>
// 					{x.exchange}	
// 				<i style={circle} className="his   fa fa-circle" title="历史回测">&nbsp;{x.btstrategys.length}</i>
// 			    <i style={circle} className="predict  fa fa-circle" title="实盘预测">&nbsp;{x.strategys.length}</i>
// 				</span>
// 			</div>	
//              <div id={_id} className="collapse predict_collapse">
			
//              <PredictUser 				
//                 clickExchange={_this.state.clickExchange}
// 				exchange={x.exchange} 
// 				strategys={x.strategys}
// 				btstrategys={x.btstrategys}/>
	
//              </div>
// 		   </li>
// 			);
// 		});
// 		return(
// 		<div>
// 		    <div className='konge'></div>
// 			<div className='ulStyle' style={ulStyle}>{classs}</div>	    
// 	    </div>
// 			)
// 	}

// }
// const mapStateToProps = (state) => {
// 	return {
// 		StrategyList: state.reduToStrategyList.StrategyList,
// 		BtstrategyList: state.reduToBtstrategyList.BtstrategyList,
// 	};
// }
// const mapDispatchToProps = (dispatch) => {
//  return{
	
// 	};
// }
// export default connect(mapStateToProps)(ExchangePredict);
