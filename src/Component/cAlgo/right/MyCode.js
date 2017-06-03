import React, {
	PropTypes,
	Component
} from 'react'
import {
	ShowList,
	updateClass,
	alertMessage
} from '../../../Redux/Action/Action'
import {
	connect
} from 'react-redux'
import $ from 'jquery'
import {
	getClass,
	downFile,
	addClass,
	getStatic,
	getKeywords
} from '../../../Redux/Action/shareAction'
import brace from 'brace';
import AceEditor from 'react-ace';
import AddPredict_Code from './AddPredict_Code'
import 'brace/mode/python';

import 'brace/theme/monokai';
import 'brace/theme/terminal';
import 'brace/theme/github';
import 'brace/theme/xcode';
import 'brace/theme/textmate';
import 'brace/theme/tomorrow_night_eighties';

import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import RunBack from './RunBack'
let ace = require('brace');

// require('brace/ext/themelist');
// let themes = ace.acequire("ace/ext/themelist");
// let themelist = [];
// for (let i in themes.themesByName) {
// 	themelist.push(i)
// }

require('brace/ext/language_tools');
let langTools = ace.acequire("ace/ext/language_tools");

let keywords = getKeywords();
let data = [];
for (let i in keywords) {
	data.push({
		meta: "Turing",
		caption: keywords[i],
		value: keywords[i],
		score: 1
	})
}
langTools.addCompleter({
	getCompletions: function(editor, session, pos, prefix, callback) {
		if (prefix.length === 0) {
			return callback(null, []);
		} else {
			return callback(null, data);
		}
	}
});



class MyCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			codeType: '',
			code: '',
			name: '',
			theme: 'tomorrow_night_eighties',
		};
	}
	componentWillReceiveProps(nextProps) {
		let code;
		if (nextProps.codeType == 'predict') {
			code = getStatic().predict_demo;
		} else {
			code = getStatic().trade_demo;
		}
		this.setState({
			name: '',
			code: code,
			codeType: nextProps.codeType
		})
	}
	componentDidUpdate() {

	}
	downCode() {
		let text = this.state.code;
		let name = this.state.name;
		downFile(text, name + '.py');
	}
	exit() {
		this.props.dispatch(ShowList('id'));
	}
	handleChange(newValue) {
		this.setState({
			code: newValue
		});
	}
	changeTheme(e) {
		let theme = e.target.value;
		if (theme == 'night') {
			theme = 'tomorrow_night_eighties';
		}
		this.setState({
			theme: theme
		});
	}
	getObjectURL(file) {
		var url = null;
		if (window.createObjectURL != undefined) { // basic
			url = window.createObjectURL(file);
		} else if (window.URL != undefined) { // mozilla(firefox)
			url = window.URL.createObjectURL(file);
		} else if (window.webkitURL != undefined) { // webkit or chrome
			url = window.webkitURL.createObjectURL(file);
		}
		return url;
	}
	componentWillMount() {

	}
	creatTrade(mode) {
		let file = new Blob([this.state.code])
		let formdata = new FormData();
		formdata.append('mode', mode);
		formdata.append('name', this.state.name);
		formdata.append('code', file);
		let result = addClass(formdata);
		if (result == true) {
			this.props.dispatch(updateClass());
			this.props.dispatch(alertMessage('添加成功', 1000));
		} else {
			this.props.dispatch(alertMessage(result, 60000));
		}
	}
	creatPredict(e) {
		let formatJson = [];
		$('.predict_format_code').each(function(i) {
			let name = $(this).find('.format_name').val();
			let type = $(this).find('.format_type').val();
			let information = $(this).find('.format_information').val();
			formatJson.push({
				name: name,
				type: type,
				information: information
			})
		})
		formatJson = JSON.stringify(formatJson);
		let formdata = new FormData();
		formdata.append('mode', 'predict');
		formdata.append('name', this.state.name);
		formdata.append('code', new Blob([this.state.code]));
		formdata.append('predict_format', formatJson);
		let result = addClass(formdata);
		if (result == true) {
			this.props.dispatch(updateClass());
			this.props.dispatch(alertMessage('添加成功', 1000));
		} else {
			this.props.dispatch(alertMessage(result, 60000));
		}
	}
	render() {
		const topStyle = {
			backgroundColor: '#525252',
			border: '0px solid #525252',
			marginTop: '-30px',
			borderRadius: '4px',
			color: '#fff',
			width: '100%'
		}
		const btnBg = {
			backgroundColor: '#292929',
			color: '#fff',
			border: '0px solid #525252',
			float: 'right',
			height: '25px',
			marginBottom: '5px',
			borderRadius: '2px',
		}
		const code_name = {
			width: 'auto',
			marginLeft: '10%',
			display: 'inline',
			marginBottom: '5px',
			height: '25px',
			backgroundColor: '#292929'
		}
		let CodeHeight = (document.documentElement.clientHeight - 45 + 35) + 'px';
		let aceHeight;
		if (this.state.codeType == 'trade') {
			aceHeight = (document.documentElement.clientHeight - 64 - 25) / 2 + 74.5 + 35 + 'px';

		} else {
			aceHeight = (document.documentElement.clientHeight - 95 + 35) + 'px';

		}
		const style = {
			fontSize: '14px !important',
			border: '1px solid lightgray'
		};
		return (
			<div style={topStyle}>
		
	  		<div style={{height:CodeHeight,overflow: 'hidden',padding:'10px',color:'#fff'}}>

                    <div style={{width:'100%'}}>


                   <div style={{float:'left',marginLeft:'0%'}}>
                     <b style={{lineHeight:'25px'}}></b>
                    Theme<select style={btnBg}  onChange={this.changeTheme.bind(this)}>
            {/*         {themelist.map(function(x,index){
                    	return (
                    	      <option key={index}>{x}</option>
                    		)
                    })
                }*/}
                    <option>night</option>
	                 <option>monokai</option>
	                 <option>github</option>
	                 <option>xcode</option>
	                 <option>textmate</option>
	                 <option>terminal</option>
                    </select>
                    </div>


                    {/*<b style={{marginLeft:'30%',lineHeight:'30px'}}>{this.state.name}</b>*/}
                    <input type='text' value={this.state.name} id="code_name" 
                    placeholder={this.state.codeType == 'trade'?'交易策略名 *':'预测代码名 *'}
                     style={code_name} onChange={(e)=>this.setState({name:e.target.value})}></input>
                    <button 
                    onMouseOut={(e)=>{e.target.style.backgroundColor = '#292929'}} 
                    onMouseOver={(e)=>{e.target.style.backgroundColor = '#6b6b6b'}}
                    className='btn btn-default smallfont' 
                    onClick={this.exit.bind(this)} style={btnBg} >退出
                    </button>
                    <button 
                    onMouseOut={(e)=>{e.target.style.backgroundColor = '#292929'}}
                    onMouseOver={(e)=>{e.target.style.backgroundColor = '#6b6b6b'}} 
                    className='btn btn-default smallfont' 
                    onClick={this.downCode.bind(this)} style={btnBg} 
                    disabled={this.state.name == '' || this.state.code == ''}
                    title={this.state.name == '' || this.state.code == ''?'输入策略名或代码内容':''}>导出代码
                    </button>
                    <div className="dropdown" style={{float:'right'}}>
                         {this.state.codeType == 'trade'?
                      
		                       <button 
                              onMouseOut={(e)=>{e.target.style.backgroundColor = '#292929'}}
                              onMouseOver={(e)=>{e.target.style.backgroundColor = '#6b6b6b'}} 
                              className='btn btn-default smallfont' 
                              style={btnBg} onClick={(e)=>this.creatTrade('trade')}
                              disabled={this.state.name == '' || this.state.code == ''}
                              title={this.state.name == '' || this.state.code == ''?'输入策略名或代码内容':''}
                              >保存为交易策略
                              </button>
		              
		                  : 
		                      <button 
                              onMouseOut={(e)=>{e.target.style.backgroundColor = '#292929'}}
                              onMouseOver={(e)=>{e.target.style.backgroundColor = '#6b6b6b'}} 
                              className='btn btn-default smallfont' style={btnBg} 
                              onClick={(e)=>this.creatPredict(e)}
                              // onClick={(e)=>this.setState({file:new Blob([this.state.code])})}
                              disabled={this.state.name == '' || this.state.code == ''}
                              title={this.state.name == '' || this.state.code == ''?'输入策略名或代码内容':''}
                              >保存为预测代码
                              </button>
                          }
                   </div>




                    </div>
            
                		<AceEditor
                		width='100%'
                     mode="python"	
                     theme={this.state.theme}
                     height={aceHeight}
                     value = {this.state.code}
                     onChange={this.handleChange.bind(this)}
                     name={this.state.name}
                    enableLiveAutocompletion={true}
                    enableBasicAutocompletion={true}
                    editorProps={{$blockScrolling: Infinity}}
                  />

			      {this.state.codeType == 'trade'?  <RunBack />:null}
			  
                   
			    </div>

			   {/* <AddPredict_Code name={this.state.name} code={this.state.file}/>*/}
		</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		codeType: state.reduShowMyCode.codeType,
		show_time: state.reduShowMyCode.time
	};
}
const mapDispatchToProps = (dispatch) => {
	return {

	};
}
export default connect(mapStateToProps)(MyCode);