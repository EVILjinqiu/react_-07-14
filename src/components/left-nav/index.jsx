import React, { Component } from "react"
import {Link, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd'


import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'

import './index.less'




const {SubMenu} = Menu

 class LeftNav extends Component {
    getMenuNodes2 = (menuList) => {
        const path = this.props.location.pathname
        return menuList.reduce((pre, item)=>{
            if (!item.children) {
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            }else {
                const cItem = item.children.find(cItem => path.indexOf(cItem.key)=== 0)
                if (cItem) {
                    this.openKey = item.key
                }
                pre.push((
                    <SubMenu 
                    key={item.key}
                    title={
                        <span>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </span>            
                    }>
                        {this.getMenuNodes2(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        },[])
    }
    // getMenuNodes = (menuList) => {
    //     const path = this.props.location.pathname

    //     return menuList.map(item => {
    //         if (!item.children) {
    //             return (
    //                 <Menu.Item key={item.key}>
    //                     <Link to={item.key}>
    //                         <span>
    //                         <Icon type={item.icon}/>
    //                         <span>{item.title}</span>
    //                         </span>
    //                     </Link>
    //                 </Menu.Item>
    //             )
    //         }else {
    //             if (item.children.find(cItem => path.indexOf(cItem.key)=== 0)){
    //             this.openKey = item.key
    //         }
    //         return (
    //             <SubMenu
    //             key={item.key}
    //             title={
    //                 <span>
    //                     <Icon type={item.icon}/>
    //                     <span>{item.title}</span>
    //                 </span>
    //             }>
    //                 {this.getMenuNodes(item.children)}
    //             </SubMenu>
    //         )
    //         }
    //     })
    // }
    componentDidMount () {
    
    }
    componentWillMount () {
        this.menuNodes = this.getMenuNodes2(menuList)
    }
    render() {
        console.log('left-nav render()')
        const selectKey = this.props.location.pathname
    
        return (
            <div className="left-nav">
                <Link className="left-nav-link" to="/home">
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </Link>
                
                <Menu 
               selectedKeys={[selectKey]}
               defaultOpenKeys={[this.openKey]}
                mode= "inline"
                theme= "dark"
                >
                { this.menuNodes }
                </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)