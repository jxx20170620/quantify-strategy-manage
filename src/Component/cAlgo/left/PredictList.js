import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import $ from 'jquery'
import {
	saveStrategyList,
	saveBtstrategyList,
	ShowList,
	showCode,
	alertMessage,
	updateClass,
	showLog
} from '../../../Redux/Action/Action'
import {
	delClass,
	getAllStrategy,
	getClasss,
	getSortFun,
	getStatic,
	getStrategys
} from '../../../Redux/Action/shareAction'
import PredictStrategys from './PredictStrategys'
const astyle = {
	color: "#fff",
	cursor: "pointer",
	marginLeft: '10px',
	textDecoration: 'none',
}
const istyle = {
	cursor: "pointer",
	color: '#fff',
	float: 'right',
	lineHeight: '40px',
	marginRight: '5px',
}
const istyle2 = {
	cursor: "pointer",
	color: '#fff',
	float: 'right',
	lineHeight: '40px',
	marginRight: '5px',
	marginTop: '0px',
	fontSize: '14px'
}
const circle = {
	float: 'right',
	lineHeight: '16px',
	marginRight: '5px',
	marginTop: '10px',
	borderRadius: '500px',
	border: '1px #fff solid',
	height: '20px',
	width: '20px',
	textAlign: 'center',
	cursor: 'default'
}
const istyle3 = {
	cursor: "pointer",
	color: '#fff',
	float: 'right',
	lineHeight: '40px',
	marginRight: '5px',
	marginTop: '0px',
}
const back2 = {
	borderRadius: '4px',
	backgroundColor: '#525252',
	marginLeft: '10px',
	width: '100%',
	marginBottom: '-4px',
}
const modalBody = {
	color: '#fff',
	paddingLeft: '20%',
	paddingTop: '15%',
	fontSize: '15px'
}
let Prop;
let StrategyList = [];
let BtstrategyList = [];
var ListTodo = React.createClass({
	getInitialState: function() {
		return {
			listStyle: 'listback',
			delname: '',
			delId: '',
		};
	},
	componentDidMount: function() {
		// $('.ulStyle').css('height', $('#TradeList').height() - 10);
		// $('.ulStyle').css('height',document.documentElement.clientHeight - 74);
	},
	getClassId: function(id, name) {
		$(' #class_id ').val(id);
		$(' #class_type ').text('交易名');
		$(' #add_script_name ').html(name);
	},
	show: function(id, event) {
		if ($('#' + id).css('display') == 'none') {
			$('#' + id).css('display', 'block');
		} else {
			$('#' + id).css('display', 'none');
		}
	},
	show2: function(id) {
		Prop.dispatch(showCode(id));
		Prop.dispatch(ShowList('code'));
	},
	delClass: function(id, name, username) {
		// console.log(id, name)
		$("#delClass_predict_" + username).find("i").html(name);
		this.setState({
			// delName: name,
			delId: id
		})
	},
	delOk: function() {
		if (delClass(this.state.delId)) {
			Prop.dispatch(updateClass());
			// this.Del(this.state.delId);
		} else {
			Prop.dispatch(alertMessage('删除失败', 1000));
		}
	},
	onMouseOut: function(id) {
		$('#' + id + '2').css('backgroundColor', '#3b3b3b');
	},
	onMouseOver: function(id) {
		$('#' + id + '2').css('backgroundColor', '#525252');
	},
	showLogs: function(id, name) {
		Prop.dispatch(showLog(id, name));
	},
	showBack: function(index) {
		for (let i in this.props.todo) {
			if (i != index) {
				$('#predict_detail' + i).removeClass('in');
			}
		}
	},
	showList: function(e, id) {
		let oldClass = e.target.className;
		$('.predictMenu').each(function(index, el) {
			if ('collapse_' + id != el.id) {
				$(this).removeClass('in');
			}
		});
		$('.predictCircle').each(function(i) {
			$(this).attr("class", "predictCircle fa fa-plus-circle collapsed");
			$(this).parent().removeClass('open');
		})
		if (oldClass == "predictCircle fa fa-plus-circle collapsed") {
			e.target.className = 'predictCircle fa fa-minus-circle';
		} else {
			e.target.className = "predictCircle fa fa-plus-circle collapsed";
		}
		this.setState({
			clickPredict_id: id
		})
	},
	render: function() {
		const back_son = {
			marginLeft: '5px'
		}
		let o = this;
		let classs = this.props.todo.map((x, index) => {
			let astyle = {
				color: "#f18255",
				marginLeft: '10px',
				textDecoration: 'none',
				cursor: 'default',
				fontSize: '11px'
			}
			if (x.strategys.length + x.btstrategys.length == 0) {
				astyle.color = "#fff"
			}
			return (
				<div  key={index}>
		    <div className='dropdown smallfont2' id={x.id+'2'} className='listback'
		    onMouseOut={o.onMouseOut.bind(null,x.id)}
		    onMouseOver={o.onMouseOver.bind(null,x.id)} title={x.error}>
		    <i className="predictCircle fa fa-plus-circle collapsed"
		       data-toggle="collapse" data-target={'#collapse_' + x.id}
		       onClick={(e)=>this.showList(e,x.id)}></i>
				<span className="scripts_name" style={astyle} key={index} title={x.name +' '+x.datetime}>{x.shortname}</span>
				&nbsp;
				<i onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}} style={istyle}  className="fa fa-plus" title="添加实例" 
				data-toggle="modal" data-target="#myModal2" onClick={o.getClassId.bind(null,x.id,x.name)}></i>
				<i onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}} style={istyle3} className="fa fa-remove" data-toggle="modal" 
				data-target={"#delClass_predict_" + Prop.username} title="删除" onClick={o.delClass.bind(null,x.id,x.name,Prop.username)}></i>
				<i onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}} style={istyle3} className="fa fa-pencil" title="代码" 
				onClick={o.show2.bind(null,x.id)}></i>
			    <span style={circle} className="predict_his smallfont " title="历史回测">{x.btstrategys.length}</span>
			    <span style={circle} className="predict_real smallfont " title="实盘预测">{x.strategys.length}</span>
			</div>

		<div className='collapse predictMenu' id={'collapse_' + x.id}>
		     <PredictStrategys 
		     click = {this.state.clickPredict_id == x.id}
		     strategys = {x.strategys}
		     btstrategys = {x.btstrategys}
		     />
		</div>
    </div>
			);
		});
		const modalStyle = {
			top: '10%',
			left: document.body.clientWidth > 900 ? document.body.clientWidth / 2 - 200 : '0',
			right: 'auto',
			bottom: 'auto',
			width: document.body.clientWidth > 900 ? 400 : '100%'
		}
		return (
			<div>
			<div className='trade_div'>{classs}</div>
		     <div style={modalStyle} className="modal fade" id={"delClass_predict_" + Prop.username}  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="col-md-8 col-sm-12 modal-content" ref="choose" style={{backgroundColor: "#333",height:''}}>
                    <div className="modal-body" style={modalBody}>
                    您确定要删除 <i style={{color:'#FF6666'}}> {this.state.delName} </i> 吗?
                    </div>
                    <div className="modal-footer" style={{borderTop:'0px solid #525252'}}>
                      <button type="button" className="btn btn-default" data-dismiss="modal">关闭
                      </button>
                       <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.delOk}>
                        确定
                       </button>
                    </div>
                 </div>
               </div>
           </div>
	    </div>
		);
	}
});
class PredictList extends Component {
	constructor(props) { //ES6初始化
		super(props);
		this.state = {
			todolist: [],
		};
	}
	putScreen() {
		let data = this.props.predict;
		data.sort(getSortFun('desc', 'name')); //按classname升序存放
		let staticData = getStatic();
		let strategys = staticData.strategys;
		let btstrategys = staticData.btstrategys;
		for (let x of data) {
			x.strategys = [];
			x.btstrategys = [];
			for (let y of strategys) {
				if (y.script_id == x.id && y.status != 4) {
					x.strategys.push(y);
				}
			}
			for (let y of btstrategys) {
				if (y.script_id == x.id && y.status != 4) {
					x.btstrategys.push(y);
				}
			}
		}
		this.setState({
			todolist: data,
		});
	}
	shouldComponentUpdate(nextProps, nextState) {

	}
	componentWillReceiveProps(nextProps) {

	}
	componentWillMount() {
		Prop = this.props;

		this.putScreen();
	}
	componentDidMount() {

	}
	render() {
		return (
			<ListTodo todo={this.state.todolist}/>

		)
	}
}
const mapStateToProps = (state) => {
	return {

	};
}
export default connect(mapStateToProps)(PredictList);