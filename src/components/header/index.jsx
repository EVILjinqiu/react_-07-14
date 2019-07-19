import React, { Component } from "react"
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd'

import LinkButton from '../../components/link-button'
import {reqWeather} from '../../api'
import menuList from '../../config/menuConfig'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import './index.less'



 class Header extends Component {
     state = {
         currentTime: formateDate(Date.now()),
         dayPictureUrl: '',
         weather: '',
     }
     logout =() => {
         Modal.confirm({
             title: '狠心退出!',
             onOk: () => {
                 console.log('ok');
                 storageUtils.removeUser()
                 memoryUtils.user = {}
                 this.props.history.replace('/login')
             },
             onCancel() {
                 console.log('cancel');
             },
         })
     }
     getTitle = () => {
         let title = ''
         const path = this.props.location.pathname
         menuList.forEach(item => {
             if (item.key===path) {
                 title = item.title
             } else if (item.children) {
                 const cItem = item.children.find(cItem => cItem.key===path)
                if (cItem) {
                    title = cItem.title
                }
             }
         })
         return title
     }
     getWeather = async () => {
         const {dayPictureUrl, weather } = await reqWeather('新乡')
         this.setState({
             dayPictureUrl,
             weather
         })
     }
     componentDidMount () {
         this.intervalId = setInterval(() =>{
             this.setState({
                 currentTime: formateDate(Date.now())
             })
         },1000);
         this.getWeather()
     }
     componentWillUnmount () {
         clearInterval(this.intervalId)
     }
     render() {
         const { currentTime, dayPictureUrl, weather } = this.state
         const user = memoryUtils.user
         const title = this.getTitle()

         return (
            <div className="header">
            <div className="header-top">
              欢迎, {user.username} &nbsp;&nbsp;
    
              {/* 组件的标签体作为标签的children属性传入 */}
              <LinkButton onClick={this.logout}>退出</LinkButton>
            </div>
            <div className="header-bottom">
              <div className="header-bottom-left">{title}</div>
              <div className="header-bottom-right">
                <span>{ currentTime }</span>
                <img src={dayPictureUrl} alt="weather"/>
                <span>{weather}</span>
              </div>
            </div>
          </div>
    
         )
     }
}
export default withRouter(Header)