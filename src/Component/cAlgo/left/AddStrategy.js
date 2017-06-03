import React, {
	Component
} from 'react'
import {
	alertMessage,
	saveToChooseDate,
	saveToChooseId,
	saveStrategyList,
	saveBtstrategyList,
	updateClass,
	showProgress
} from '../../../Redux/Action/Action'
import {
	connect
} from 'react-redux'
import $ from 'jquery'
import Switch, {
	Case,
	Default
} from 'react-switch-case';
import {
	getDataDate,
	getAllStrategy,
	addTrade,
	getNextDay,
	getStatic,
	getStrategys,
	getAccounts
} from '../../../Redux/Action/shareAction'
let _This;
const astyle = {
	cursor: "pointer",
	display: 'block',
	color: '#fff'
}
const astyle1 = {
	cursor: "pointer",
	display: 'block',
	color: '#f0ad4e'
}
const astyle2 = {
	cursor: "pointer",
	display: 'block',
	color: '#46b8da'
}
const astyle3 = {
	cursor: "pointer",
	display: 'block',
	color: '#5cb85c'
}

const dropdownContent = {
	backgroundColor: '#f9f9f9',
	padding: '5px 6px',
	backgroundColor: '#525252',
	height: 'auto',
	width: '100%',
	overflow: "auto",
	position: 'absolute',
	marginTop: '-1px',

}
const dropdownContent2 = {
	backgroundColor: '#f9f9f9',
	padding: '5px 6px',
	backgroundColor: '#525252',
	height: 'auto',
	minWidth: '24px',
	overflow: "auto",
	position: 'absolute',
	marginTop: '-1px',
	marginLeft: '82px'
}
const dropdownContent3 = {
	backgroundColor: '#f9f9f9',
	padding: '5px 6px',
	backgroundColor: '#525252',
	height: 'auto',
	minWidth: '24px',
	overflow: "auto",
	position: 'absolute',
	marginTop: '-1px',
	marginLeft: '68px'
}
const choosedate = {
	// border: '1px solid #fff',
	borderRadius: '2px',
	cursor: "pointer",
	width: '100%'
}
let dateList = [];
class AddStrategy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: '实盘模拟',
			showTip: true,
			showLaserBeam: false,
			btnText: '确定',
			accouts: [],
			exchange: 'CTP'
		};
	}
	componentWillMount() {
		getAccounts().then((accouts) => {
			this.setState({
				accouts: accouts
			})
		})
	}
	componentWillReceiveProps() {}
	componentDidMount() {
		// let accouts = [{
		// 	"id": "CSRPME75512345",
		// 	"name": "75512345",
		// 	"username": "admin",
		// 	"exchange": "CSRPME",
		// 	"money": null,
		// 	"position": null
		// }];
	}
	add(e) {

		e.preventDefault();
		this.props.dispatch(showProgress(true));
		// setTimeout(() => {
		this.addStra();
		// },200)
	}
	addStra() {
		// console.log($(" #exchange ").val(),$(" #symbol ").val())
		let formdata = new FormData();
		let file_info = {
			model_type: '',
			int_data: {},
			string_data: {}
		};
		// console.log($(" #class_id ").val())
		formdata.append('script_id', $(" #class_id ").val());
		formdata.append('name', $(" #name ").val());
		formdata.append('exchange', $(" #exchange ").val());
		formdata.append('symbol', $(" #symbol ").val());


		if ($(" #mode_file ")[0].files[0] == undefined) {
			// this.props.dispatch(alertMessage('未添加模型文件', 2000));
			file_info.model_type = 'none';
		} else {
			formdata.append('file', $(" #mode_file ")[0].files[0]);

			$("#addModelFile").find("input[type='text']").each(function() {
				let getId = $(this)[0].id;
				if ($(this).val() != '' && $(this).val() != undefined) {
					file_info.string_data[getId] = $(this).val();
				}
			})
			$("#addModelFile").find("input[type='number']").each(function() {
				let getId = $(this)[0].id;
				if ($(this).val() != '' && $(this).val() != undefined) {
					file_info.int_data[getId] = $(this).val();
				}
			})
			switch ($(" #model_type ").val()) {
				case '经典时间序列自回归模型':
					file_info.model_type = 'regress';
					break;
				case '机器学习分类模型':
					file_info.model_type = 'machine_classify';
					break;
				case '机器学习回归模型':
					file_info.model_type = 'machine_regress';
					break;
				case '金融技术指标回归模型':
					file_info.model_type = 'finance_regress';
					break;
				default:
					break;
			}
		}
		let api;
		switch (this.state.type) {
			case '实盘模拟':
				api = 'strategys';
				formdata.append('mode', 'realtime');
				formdata.append('multiple', $(" #multiple ").val());
				break;
			case '真实交易':
				api = 'strategys';
				formdata.append('mode', 'realtime');
				formdata.append('multiple', $(" #multiple ").val());
				formdata.append('account_id', $(" #account_id ").val());
				break;
			case '历史回测':
				api = 'btstrategys';
				formdata.append('mode', 'backtest');
				formdata.append('start', $(" #start ").val());
				formdata.append('end', $(" #end ").val()); //时间需要+1
				break;
		}


		formdata.append('file_info', JSON.stringify(file_info));

		addTrade(formdata, this.onprogress).then((flag) => {
			if (flag) {
				this.props.dispatch(alertMessage('添加成功', 2000));
				this.props.dispatch(showProgress(false));
				$('#myModal2').css('display', 'none');
				$('.modal-backdrop').eq(0).remove();
				this.setState({
						btnText: '确定'
					})
					// getStrategys();
				getStrategys().then((data) => {
					// if (api == 'strategys') {
					this.props.dispatch(saveStrategyList(getAllStrategy(true), false));
					// } else {
					this.props.dispatch(saveBtstrategyList(getAllStrategy(false), false));
					// }
					this.props.dispatch(updateClass());
				})


			} else {
				this.props.dispatch(alertMessage('添加失败', 2000));
				this.props.dispatch(showProgress(false));
				this.setState({
					btnText: '确定'
				})
			}

		})

	}
	onprogress(evt) {  
		let loaded = evt.loaded;     //已经上传大小情况 
		let tot = evt.total;      //附件总大小 
		let per = Math.floor(100 * loaded / tot);  //已经上传的百分比 
		_This.setState({
			btnText: per + '%'
		}) 
	}
	clean() {
		$("#myModal2")[0].reset()
		$("#start").empty();
		$("#end").empty();
	}
	changetype(type) {
		this.setState({
			type: type
		})
	}
	changeStart() {
		let index = dateList.indexOf($(" #start ").val());
		let dateList2 = dateList.slice(index + 1, dateList.length);
		let timeList2;
		$("#end").html("");
		for (let i in dateList2) {
			timeList2 += '<option>' + dateList2[i] + '</option>';
		}
		$("#end").append(timeList2);
	}
	changeExchange(e) {
		this.setState({
			exchange: e.target.value
		})
		this.getDate();
	}
	getDate() {
		if (this.state.type != '历史回测') {
			return;
		}
		$("#start").empty();
		$("#end").empty();
		if ($(" #symbol ").val() == '') {
			$('#symbol').css('border', '1px solid #ff0000');
			this.setState({
				showTip: true
			})

			return;
		}
		// console.log($(" #symbol ").val());
		dateList = getDataDate($(" #exchange ").val(), $(" #symbol ").val());
		if (dateList.length == 0) {
			$('#symbol').css('border', '1px solid #ff0000');
			this.setState({
				showTip: true
			});
			return;
		}
		dateList.push(getNextDay(dateList[dateList.length - 1]));
		$('#symbol').css('border', '1px solid #ccc');
		this.setState({
			showTip: false
		});
		let timeList = '';
		let timeList2 = '';
		for (let i in dateList) {
			timeList += '<option>' + dateList[i] + '</option>';
			if (i > 0) {
				timeList2 += '<option>' + dateList[i] + '</option>';
			}
		}
		$("#start").append(timeList);
		$("#end").append(timeList2);
	}
	render() {
		_This = this;
		const input = {
			// width:"66%",
			backgroundColor: '#333',
			border: '2px solid #333',
			padding: '0'
		}
		const backColor = {
			backgroundColor: '#525252',
			color: "#fff",
			width: '100%'
		}
		const symbol_backColor = {
			backgroundColor: '#525252',
			color: "#fff",
			width: '100%',
			display:'inline'
		}
		const modalStyle = {
			top: '5%',
			left: document.body.clientWidth > 900 ? document.body.clientWidth / 2 - 200 : '0',
			right: 'auto',
			bottom: 'auto',
			width: document.body.clientWidth > 900 ? 400 : '100%',
			color: '#fff'
		}
		const btnBg = {
			// border:'0px',
			backgroundColor: '#525252',
			color: '#fff',
			marginTop: '0px',
			height: '24px',
			lineHeight: '12px',
			fontSize: '9px',
			float: 'left',
			marginLeft: '15px'
		}
		return (
			<div style={{color:'#fff'}}>
  <input type="text" id="class_id" hidden></input>
  {/*<input type="text" id="class_type" hidden></input>
*/}	<form id="myModal2"  onSubmit={(e)=>this.add(e)} 
	style={modalStyle} 
	className="modal fade"  tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">

		<div className="modal-dialog" role="document" style={{width:'100%'}}>
			<div className="modal-content" style={{width:'94%',backgroundColor: "#333",fontSize:'13px'}}>
				<div className="modal-body main_body">
                   <div className="form-horizontal">
                   <div className="form-group">
                   	    <span style={{color:'#ffc266',marginLeft:'9%'}} id='add_script_name'>test</span>
                   </div>
		                <div className="form-group">
		                    <label className="col-sm-4 modal_lable control-label" style={{display:'block'}}>
		                    	实例类型
		                    </label>
		                    <div className="col-sm-8 modal_div">
		                    <select className="selectpicker" value={this.state.type} onChange={(e)=>{this.setState({type:e.target.value})}}>
                             <option data-content="<span class='label label-info'>实盘模拟</span>">实盘模拟</option>
                             <option data-content="<span class='label label-success'>历史回测</span>">历史回测</option>
                             <option data-content="<span class='label label-warning'>真实交易</span>">真实交易</option>
                             </select>
                             </div>
		                  
				        </div>
				        <div className="form-group">
				        	<label className="col-sm-4 modal_lable control-label" id="class_type">交易名</label>
				        	<div className="col-sm-8 modal_div">
				        		<input type="text" className="form-control" id="name" required="required" style={backColor}></input>
				        	</div>		                
				        </div>
				        <div className="form-group">
				        	<label className="col-sm-4 modal_lable control-label">交易所代码</label>
				        	<div className="col-sm-8 modal_div ">
				        		<select style={backColor} required="required"  id='exchange' value={this.state.exchange} className="form-control" onChange={(e)=>this.changeExchange(e)}>
					              <option>CTP</option>
					              <option>CSRPME</option>
					              <option>OKCoin</option>
				                </select>
				        	</div>		                
				        </div>
				        <div className="form-group">
				        	<label className="col-sm-4 modal_lable control-label" style={{color:this.state.type =='历史回测'&&this.state.showTip?'#ff0000':'#fff'}}>交易合约</label>
				        	<div className="col-sm-8 modal_div ">

				        	{this.state.type =='历史回测'?
				        	    <input placeholder="例如(IF、IF1705)" type="text" 
				        	    style={symbol_backColor} className="form-control" 
				        	    id="symbol" required="required" 
				        	    onBlur={(e)=>this.getDate(e)}
				        	    ></input>
				        	:
				        	     //  this.state.exchange=='CTP'?
				        	     //   <select className="form-control" style={backColor} required="required" id="symbol">
				        	     //  <option>IF</option>
					             //  <option>IC</option>
					             //  <option>IH</option>  
					             //  </select> 
					             //  : 
					             //  this.state.exchange=='CSRPME'?
					             // <select className="form-control" style={backColor} required="required" id="symbol">
					             //   <option>D1_AG</option>
					             //  <option>D6_SB</option> 
					             //  </select> 
					             //  : 

					             //  this.state.exchange=='OKCoin'?
					             // <select className="form-control" style={backColor} required="required" id="symbol">
					             // <option>btc</option>
					             //  <option>ltc</option> 
					             //  </select> 
					             //  :null 
					          
		 
              <Switch condition={this.state.exchange}>

              <Case value='CTP'>
              <select className="form-control" style={backColor} required="required" id="symbol">
				        	      <option>IF</option>
					              <option>IC</option>
					              <option>IH</option>  
		     </select>       
	          </Case>

              <Case value='CSRPME'>
                        <select className="form-control" style={backColor} required="required" id="symbol">

                                       <option>D1_AG</option>
					              <option>D6_SB</option>
					               </select> 
              </Case>

             <Case value='OKCoin'>
                       <select className="form-control" style={backColor} required="required" id="symbol">

					              <option>btc</option>
					              <option>ltc</option>
					               </select> 
		     </Case>

            </Switch>

				        	}
				      {this.state.type =='历史回测'&&this.state.showTip? 
				      <i style={{marginLeft:"10px"}} 
				      title='输入正确的交易合约获取时间'
				      onClick={()=>{this.props.dispatch(alertMessage('输入正确的交易合约获取时间', 2000));}}
				      className="fa fa-question-circle"></i>
				      :null}
				        	

				        	</div>
				        	{/*<label className="smallfont" style={{lineHeight:'30px',color:'#ff0000',display:this.state.showTip}}>error</label>*/}		                
				        </div> 
				       {this.state.type =='历史回测'?          
		                <div>      

		                    <div className="form-group">
		                    	<label className="col-sm-4 modal_lable control-label">开始时间</label>
		                    	<div className="col-sm-8 modal_div">
		                    	    <select style={backColor} required="required" id='start' className="form-control" onChange={this.changeStart.bind(this)}></select>
		                    	</div>
		                    </div>
		                  
		                    <div className="form-group">
		                        <label className="col-sm-4 modal_lable control-label">结束时间</label>
		                        <div className="col-sm-8 modal_div">
		                        	<select style={backColor} required="required" id='end' className="form-control"></select>
		                        </div>			                
		                    </div>
		                </div>:null}    
                 {this.state.type !='历史回测'?       
		               <div>
			               <div className="form-group">
			                   <label className="col-sm-4 modal_lable control-label">交易手数</label>
			                   <div className="col-sm-8 modal_div">
			                      <input type="number" style={backColor} className="form-control" id="multiple" required="required"></input>  
			                   </div>			               
			               </div>            
		               </div>:null}

                   {this.state.type =='真实交易'?
		               <div>
		                   <div className="form-group">
		                      <label className="col-sm-4 modal_lable control-label">选择账号&nbsp;</label>
		                      <div className="col-sm-8 modal_div">
		                         <select style={backColor} required="required" id='account_id' className="form-control">
		                         {this.state.accouts.map(function(x,index){
		                         	return(
                                         <option key={index}>{x.id}</option>
		                         		)
		                         })}
				                 </select>
		                      </div>		             

		                   </div>
				       </div>:null}
                            
		               	<span className='btn btn-default' style={btnBg} 
	                    onMouseOut={(e)=>{e.target.style.backgroundColor = '#525252'}} 
	                    onMouseOver={(e)=>{e.target.style.backgroundColor = '#292929'}}
	                    data-toggle="modal" data-target="#addModelFile"
		               onClick={()=>{
				         $('#myModal2').removeClass('in');
				         $('#myModal2').css('display', 'none');
				         setTimeout(()=>{
		                    $('#addModelFile').addClass('in');
				            $('#addModelFile').css('display', 'block');
				         },500)
		               }}
	                   >添加模型</span>

		               <i id="add_model_name" style={{marginLeft:'10px',color:"#da6484"}}></i>


                   </div>

				</div>
				<div className="modal-footer" style={{borderTop:'0px solid #525252',paddingTop:'0px'}}>
					<button type="button" className="btn btn-warning" onClick={this.clean.bind(this)}>
					    重置
					</button>
					<button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
					<button  type="button" type="submit" className="btn btn-primary">
						{this.state.btnText}
					</button>
				</div>
			</div>
		</div>
	</form>
</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {

	};
}

export default connect()(AddStrategy); //,{ alertHide }