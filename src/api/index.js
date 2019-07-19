import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'
    // import { from } from 'rxjs';
// import Password from 'antd/lib/input/Password';
const BASE = ''
export const reqLogin = (username,password)=> ajax.post(BASE + '/login',{username,password})
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (error, data) => {
            if (!error && data.error===0) {
                const {dayPictureUrl, weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather})
            }else {
                message.error('获取天气信息')
            }
        })
    })
}
export const reqDeleteImg = (name) => ajax.post(BASE + '/manage/img/delete', {name})


export const reqCategorys = () => ajax(BASE + '/manage/category/list')

// 获取一个分类
export const reqCategory = (categoryId) => ajax.get(BASE + '/manage/category/info', {
    params: {
      categoryId
    }
  })
  

export const reqAddOrUpdateProduct = (product) => ajax.post(BASE + '/manage/product/' + ( product._id?'update':'add'), product)

// 添加分类
export const reqAddCategory = (categoryName) => ajax.post(BASE + '/manage/category/add', {
    categoryName
})
// 修改分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax.post(BASE + '/manage/category/update', {categoryId, categoryName})
// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', {
    params: { // 包含所有query参数的对象
      pageNum,
      pageSize
    }
  })

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax.post(BASE + '/manage/product/updateStatus', {productId, status})


/*
  搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, productName/productDesc
 */
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax.get(BASE + '/manage/product/search', {
  params: {
    pageNum,
    pageSize,
    [searchType]: searchName,
  }
})
