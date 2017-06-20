import React, {
    Component
} from 'react';
import {
    Row,
    Col,
    Card,
    Timeline,
    Icon
} from 'antd';
import b1 from './imgs/logo.png';
import {
    getCpu,
    getUserList,
    getClasss,
    getStatic
} from '../../Redux/Action/shareAction'
class DashMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cpu: '',
            users: [],
            scripts: [],
            strategys: []
        }
    }
    componentDidMount() {
        getUserList().then((users) => {
            getClasss().then((scripts) => {
                this.setState({
                    users: users,
                    scripts: scripts,
                    strategys: getStatic().all_stra
                })
            })
        })
        this.getCpu();
    }
    getCpu() {
        getCpu(Date.parse(new Date())).then((data) => {
            let i = 0;
            this.refresh_timer = setInterval(() => {
                this.setState({
                    cpu: Number(data.result[i]).toFixed(2)
                })
                i++;
                if (i === 10) {
                    this.refresh_timer && clearTimeout(this.refresh_timer);
                    clearInterval(this.refresh_timer);
                    this.getCpu();
                }
            }, 1000);
        })
    }
    componentWillUnmount() {
        this.refresh_timer && clearTimeout(this.refresh_timer);
        clearInterval(this.refresh_timer);
    }
    render() {

        return (
            <div className="gutter-example button-demo">
                <Row gutter={10}>
                    <Col className="gutter-row" span={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="team" className="text-2x text-danger" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">用户</div>
                                        <h3>{this.state.users.length}</h3>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="filter" className="text-2x" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">策略</div>
                                        <h3>{this.state.scripts.length}</h3>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="loading" className="text-2x text-info" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">实例</div>
                                        <h3>{this.state.strategys.length}</h3>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="scan" className="text-2x text-success" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">CPU</div>
                                        <h3>{this.state.cpu}%</h3>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={16}>
                        <div className="gutter-box">
                            <Card bordered={false} className={'no-padding'}>
                                <div className="test-tab"></div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>事件</h3>
                                    <small>10个加载结束，2个运行中，1个运行结束</small>
                                </div>
                                <a className="card-tool"><Icon type="sync" /></a>
                                <Timeline>
                                    <Timeline.Item color="green">启动AAA</Timeline.Item>
                                    <Timeline.Item color="green">启动BBB</Timeline.Item>
                                    <Timeline.Item color="red">
                                        <p>暂停AAA</p>
                                        <p>暂停BBB</p>
                                    </Timeline.Item>

                                    <Timeline.Item color="#108ee9">
                                        <p>添加CCC</p>
                                        <p>添加ddd</p>
                                        <p>添加eee</p>
                                    </Timeline.Item>
                                </Timeline>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>消息栏</h3>
                                </div>
                                <a className="card-tool"><Icon type="sync" /></a>
                                <ul className="list-group no-border">
                                    <li className="list-group-item">
                                        <a href="" className="pull-left w-40 mr-m">
                                            <img src={b1} className="img-responsive img-circle" alt="test" />
                                        </a>
                                        <div className="clear">
                                            <a href="" className="block">admin</a>
                                            <span className="text-muted">test</span>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <a href="" className="pull-left w-40 mr-m">
                                            <img src={b1} className="img-responsive img-circle" alt="test" />
                                        </a>
                                        <div className="clear">
                                            <a href="" className="block">admin</a>
                                            <span className="text-muted">test</span>
                                        </div>
                                    </li>
                                </ul>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    {/*<h3>访问量统计</h3>
                                    <small>最近7天用户访问量</small>*/}
                                </div>
                                <a className="card-tool"><Icon type="sync" /></a>
                               
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default DashMain;