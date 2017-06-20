import React, {
    Component
} from 'react';
import {
    Table
} from 'antd';
import {
    formatDate,
    queryString,
    randomNum
} from '../../Redux/Action/shareAction'
class WorkEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }
    componentWillMount() {
        this.setState({
            user: queryString()
        })
    }
    componentWillReceiveProps(next,ops) {
        this.setState({
            user: queryString()
        })
    }
    onChange(pagination, filters, sorter) {
        // 点击分页、筛选、排序时触发
        // console.log('各类参数是', pagination, filters, sorter);
    }
    render() {
        const columns = [{
            title: '操作',
            dataIndex: 'type',
            filters: [{
                text: '添加策略',
                value: '添加策略',
            }, {
                text: '删除策略',
                value: '删除策略',
            }, {
                text: '实例',
                value: '实例',
                children: [{
                    text: '添加实例',
                    value: '添加实例',
                }, {
                    text: '删除实例',
                    value: '删除实例',
                }],
            }],
            onFilter: (value, record) => record.type.indexOf(value) === 0,
            sorter: (a, b) => a.type.length - b.type.length,
        }, {
            title: '时间',
            dataIndex: 'datetime',
            sorter: (a, b) => (new Date(b.datetime.replace(/-/g, '/')).getTime() - new Date(a.datetime.replace(/-/g, '/')).getTime()),
        }, {
            title: '具体',
            dataIndex: 'information',
        }];

        const data = [];
        for (let i = 0; i < 32; i++) {
            data.push({
                key: i,
                type: `添加策略`,
                datetime: formatDate(Date.parse(new Date())+randomNum(-2000000,2000000)),
                information: `添加交易策略 test`,
            });
        }
        const pagination = {
            total: data.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                // console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                // console.log('Current: ', current);
            },
        };
        return (
            <div className="event-div">
                {/*<h3>{this.state.user}</h3>*/}
                <Table 
                onChange={()=>this.onChange}
                className="event-table" 
                columns={columns} 
                dataSource={data}
                pagination={pagination} />
            </div>
        );
    }
}


export default WorkEvent;