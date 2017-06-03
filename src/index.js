import React from 'react';
import ReactDOM from 'react-dom';
import IsLogin from './Component/IsLogin';
import store from './Redux/Store/Store'
import {
	Router,
	Route,
	hashHistory
} from 'react-router';
import ContainerCAlgo from './Component/cAlgo/Container'
import Help from './Component/Help'
import {
	Provider
} from 'react-redux'
import Register from './Component/Register'
import './Style/Index.css';
import './Style/List.css';
import './Style/isLogin/font-awesome.min.css'
import './Style/Log.css';
import './Style/Loading.css'
import './Style/Help.css'
// store.subscribe(
// //监听state的变化
// ()=>{
// console.log(store.getState());
// }
// )
ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path='/' component={IsLogin}/>
			<Route path='/Login' component={IsLogin}/>
			<Route path='/TurcAlgo' component={ContainerCAlgo}/>
			<Route path='/Register' component={Register}/>
			<Router path='/Help' component={Help}/>
		</Router>
	</Provider>,
	document.getElementById('root')
);

//<Route path='/stockWire' component={StockWireApp}/>