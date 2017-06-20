import React, {
    Component
} from 'react';
import {
    formatDate,
    queryString,
    randomNum
} from '../../Redux/Action/shareAction'
import { Tabs } from 'antd';
import WorkEvent from './WorkEvent'
import HistoryProfit from './HistoryProfit'
const TabPane = Tabs.TabPane;
class UserEvent extends Component {
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
    componentWillReceiveProps(next, ops) {
        this.setState({
            user: queryString()
        })
    }
    render() {
        return (
            <div className="event-div">
                <h3>{this.state.user}</h3>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="工作事件" key="1"><WorkEvent/></TabPane>
                    <TabPane tab="历史收益" key="2"><HistoryProfit/></TabPane>
                    <TabPane tab="代码统计" key="3"></TabPane>
                  </Tabs>
            </div>
        );
    }
}


export default UserEvent;