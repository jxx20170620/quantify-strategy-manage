import React from 'react';
import {
	Table,
	Modal
} from 'antd';
import {
	queryString,
	getStatic,
	getStrategys,
	getNianHua,
	statusToChinese
} from '../../Redux/Action/shareAction'
import Highcharts from 'highcharts/highstock'
import unica from 'highcharts/themes/dark-unica'



class HistoryProfit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			strategys: [],
			chart_data: []
		}
	}
	beforeRender() {
		getStrategys().then(() => {
			let data = getStatic();
			let strategys = data.strategys.concat(data.trueStras);
			let user = queryString();
			statusToChinese(strategys);
			for (let i = 0; i < strategys.length; i++) {
				if (strategys[i].username !== user) {
					strategys.splice(i, 1);
					i = -1;
				}
			}
			this.setState({
				user: user,
				strategys: strategys
			})
		})
	}
	componentWillMount() {
		this.beforeRender();

	}
	componentWillReceiveProps(nextProps) {
		this.beforeRender();
	}
	showChart(id, strategy) {
		getNianHua(id).then((data) => {
			this.makeChart(id,data);
		}, (reject) => {
			console.log('error')
		})
	}
	makeChart(id,data) {
		let nianHuaList = [];
		let dateList = [];
		let winrateList = [];
		for (var i in data) {
			dateList[i] = (data[i].date).slice(5, 10);
			nianHuaList[i] = Number((data[i].aror * 100).toFixed(4));
			winrateList[i] = Number((data[i].row * 100).toFixed(2));
		}

		let config = {
			chart: {
				backgroundColor: '#3b3b3b',
				borderRadius: '5px',
			},
			credits: {
				enabled: false
			},
			exporting: {
				enabled: false
			},
			tooltip: {
				// positioner: function() {
				// 	return {
				// 		x: 195,
				// 		y: 0
				// 	};
				// },
				backgroundColor: '#000', // 背景颜色
				borderColor: 'black', // 边框颜色
				borderRadius: 10, // 边框圆角
				borderWidth: 3, // 边框宽度
				shadow: true, // 是否显示阴影
				animation: true, // 是否启用动画效果
				style: { // 文字内容相关样式
					color: "#fff",
					fontSize: "12px",
					fontWeight: "blod",
					fontFamily: "Courir new"
				},
				shared: true,
				crosshairs: true,
				plotOptions: {
					spline: {
						marker: {
							radius: 1,
							lineColor: '#666666',
							lineWidth: 1
						}
					}
				}
			},
			legend: {
				enabled: true,
				align: 'left',
				verticalAlign: 'top',
				x: 0,
				y: 0,
				itemStyle: {
					color: '#fff'
				}
			},
			yAxis: [{
				title: {
					text: '年化收益'
				},
				plotLines: [{
					color: '#fff', //线的颜色
					dashStyle: 'solid', //默认值，这里定义为实线
					value: 0, //
					width: 2 //标示线的宽度，2px
				}],
				// opposite: true,
				tickPixelInterval: 10,
				gridLineWidth: '0px',
				height: '70%',
				// min: -2
			}, {
				labels: {
					align: 'right',
					x: -3
				},
				title: {
					text: '胜率'
				},
				top: '70%',
				height: '30%',
				offset: 0,
				lineWidth: 2
			}],
			title: {
				text: null,
				style: {
					color: "#fff"
				}
			},
			xAxis: {
				title: {
					text: '日期'
				},
				// type:'datetime',
				categories: dateList
			},
			//收益曲线
			series: [{
				data: nianHuaList,
				name: '年化收益',
				marker: {
					enabled: true,
					symbol: 'circle',
					fillColor: 'red',
					radius: 1
				},
				color: '#f15a24',
				turboThreshold: 0,
				tooltip: {
					valueSuffix: '%'
				}
			}, {
				yAxis: 1,
				data: winrateList,
				name: '胜率',
				type: 'column',
				tooltip: {
					valueSuffix: '%'
				}
			}]
		};
		unica(Highcharts);
		Highcharts.chart('history_profit_' + id, config);
	}
	expandedRowRender(record){
		this.showChart(record.id,record)
		return <div id={"history_profit_"+record.id}>
                	    {record.id}
                    </div>
	}
	                	
	render() {
		const columns = [{
			width: 300,
			title: '实例名',
			dataIndex: 'strategy_name',
			sorter: (a, b) => a.strategy_name - b.strategy_name
		}, {
			title: '创建时间',
			dataIndex: 'datetime',
			sorter: (a, b) => (new Date(b.datetime.replace(/-/g, '/')).getTime() - new Date(a.datetime.replace(/-/g, '/')).getTime()),
		},
		{
			title: '状态',
			dataIndex: 'status',
			sorter: (a, b) => a.status - b.status
		}
		];
		const data = [];
		for (let i = 0; i < this.state.strategys.length; i++) {
			let strategy = this.state.strategys[i];

			data.push({
				id: strategy.id,
				key: i,
				strategy_name: strategy.name,
				datetime: strategy.datetime,
				status:strategy.flag
			})
		}
		return (
			<div className="event-div">
				{/*<h3>{this.state.user}</h3>*/}
                <Table 
                className="event-table" 
                columns={columns} 
                expandedRowRender={record => 
                	this.expandedRowRender(record)
                }
                dataSource={data}/>
			</div>
		)
	}
}
export default HistoryProfit;