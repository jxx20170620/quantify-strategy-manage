import React,{Component} from 'react'
import {connect} from 'react-redux'
import HisStrategys from './HisStrategys.js'
import $ from 'jquery'	
import Loading from '../../Loading.js'
const ulStyle = {
	height: document.documentElement.clientHeight - 74,
}
let Prop;
let _this;
class ExchangeHistory extends Component {

	constructor(props){
		super(props);
		this.state = {
			exchanges : [],
			clickExchange:'',
		}
	}
	componentWillMount() {
		this.willRender(this.props.StrategyList)
	}
	willRender(StrategyList){
		let data = [
			'CSRPME',
			'CTP',
			'OKCoin'
		];
		let exchanges =[];
		for(let i=0;i<data.length;i++){
			exchanges.push({
				exchange:data[i],
				trueStra:[],
				strategys:[],
				predictStra:[],
			})
		}
		for (let k = 0; k < exchanges.length; k++) {
			let num = 0;
			for (let i = 0; i < StrategyList.length; i++) {
				if (StrategyList[i].exchange == exchanges[k].exchange && StrategyList[i].account_id != null && StrategyList[i].status == 4 && StrategyList[i].script_mode == 'trade') {
					exchanges[k].trueStra[num] = StrategyList[i];
					num++;
				}
			}
			num = 0;
			for (let i = 0; i < StrategyList.length; i++) {
				if (StrategyList[i].exchange == exchanges[k].exchange && StrategyList[i].account_id == null && StrategyList[i].status == 4 && StrategyList[i].script_mode == 'trade') {
					exchanges[k].strategys[num] = StrategyList[i];
					num++;
				}
			}
			num = 0;
			for (let i = 0; i < StrategyList.length; i++) {
				if (StrategyList[i].exchange == exchanges[k].exchange && StrategyList[i].account_id == null && StrategyList[i].status == 4 && StrategyList[i].script_mode == 'predict') {
					exchanges[k].predictStra[num] = StrategyList[i];
					num++;
				}
			}
		}

		this.setState({
			exchanges : exchanges,
		})
	}
	componentWillReceiveProps(nextProps) {
		this.willRender(nextProps.StrategyList)
	}


	onMouseOut2(id){
		// e.target.style.backgroundColor='#3b3b3b';
		$('#his_'+id).css('backgroundColor', '#3b3b3b');
	}
	onMouseOver2(id){
		// e.target.style.backgroundColor='#525252';
		$('#his_'+id).css('backgroundColor', '#525252');

	}
	show(exchange, index, e) {
		for (let i = 0; i < _this.state.exchanges.length; i++) {
			if (i != index) {
				$('#history' + i).removeClass('in');
				$('#circle2' + i).attr("class", "fa fa-plus-circle collapsed");
			}
		}
		if (e.target.className == 'fa fa-plus-circle collapsed') {
			e.target.className = 'fa fa-minus-circle';
			$('#load2' + exchange).css("display", 'inline');
		} else {
			e.target.className = 'fa fa-plus-circle collapsed';
		}
		setTimeout(() => {
			_this.setState({
				clickExchange: exchange
			})
			$('#load2' + exchange).css("display", 'none');
		}, 100)
	}
	componentDidUpdate(prevProps, prevState) {
		$('.model_info_tbody tr td').each(function(index, el) {
			let text = $(this).text();
			$('.input--chisato input').each(function(index, el) {
				if (text == el.id) {
					text = $('.input--chisato label span').eq(index).text();
				}
			});
			$(this).text(text);
		})
		for (let i = 0; i < this.state.exchanges.length; i++) {
			if ($('#circle2' + i).hasClass('fa-minus-circle')) {
				$('#history' + i).addClass('in');
			};
		}

	}
	render(){

		 _this = this;
		Prop = this.props;
		const astyle = {
			color: "#2CDD00",
			cursor:'default',
			marginLeft: '10%',
			textDecoration: 'none',
			fontSize:'11px'
		}
		const circle = {
			float: 'right',
			marginRight: '10px',
			marginTop: '10px',
			borderRadius: '100px',
			height: '30px',
			width: '30px',
			padding:'2px',
			cursor:'default'
		}
		let classs = this.state.exchanges.map(function(x,index) {

			let _id = "history" + index;
			let loadId = 'load2' +x.exchange
			return (
			<li  key={index}>
			<div className='listback'
			onMouseOut={_this.onMouseOut2.bind(null,index)}
		    onMouseOver={_this.onMouseOver2.bind(null,index)}
		    id={"his_"+index}
		    >
		       <i id={'circle2' + index} className="fa fa-plus-circle collapsed" onClick={_this.show.bind(null,x.exchange,index)} data-toggle="collapse" data-target={"#" + _id} style={{marginLeft:'5px',cursor: "pointer",color:'#ccc'}}></i>
				<span style={astyle}>
					{x.exchange}	
				<i style={circle} className="predict  fa fa-circle" title="实盘预测">&nbsp;{x.predictStra.length}</i> 
			    <i style={circle} className="real  fa fa-circle" title="实盘模拟">&nbsp;{x.strategys.length}</i>
			    <i style={circle} className="true  fa fa-circle" title="真实交易">&nbsp;{x.trueStra.length}</i>   
				</span>
				  <div id={loadId}  style={{display:'none',float:'right',marginRight:'10px',lineHeight:'35px'}}>
				    <Loading/>
                  </div>
			</div>	
             <div id={_id} className="collapse">
			
				<HisStrategys 
				clickExchange={_this.state.clickExchange}
				exchange={x.exchange} 
				strategys={x.strategys} 
				trueStra={x.trueStra}
				predictStra = {x.predictStra}/>
             </div>
		   </li>
			);
		});
		return(
		<div>
		    <div className='konge'></div>
			<div className='ulStyle' style={ulStyle}>{classs}</div>	    
	    </div>
			)
	}

}
const mapStateToProps = (state) => {
	return {
		StrategyList: state.reduToStrategyList.StrategyList,
	};
}
const mapDispatchToProps = (dispatch) => {
 return{
	
	};
}
export default connect(mapStateToProps)(ExchangeHistory);
