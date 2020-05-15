import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Input } from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { homeType } from '../../constants/homeType'

import {

} from '../../actions/home'


import api from '../../services/api'
import inter from '../../config/inter'

import  '../../config/theme.css';
import './person.less'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
    home:homeType,
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
   name:string,
   age:any,
   personId:number,
   type:number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ home }) => ({
    home:home
}), (dispatch) => ({
}))


class Index extends Component<{}, PageState>{

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
        navigationBarTitleText: '信息'
    }

    constructor(){
        super(...arguments)

        this.state = {
            name:'',
            age:'',
            personId:0,
            type:0
        }
    }

    componentWillReceiveProps () {
    }

    componentWillMount(){
        var that = this
        const {id,name,age,type} = that.$router.params

        that.setState({
            personId:parseInt(id),
            name:name !== undefined ? name :'',
            age:age !== undefined ? age :'',
            type: type !== undefined ? parseInt(type) : 0
        })
    }


    componentWillUnmount () { }

    componentDidMount(){}

    componentDidShow () {         
    }

    componentDidHide () { }

    


    _add(){
        var that = this ;
        const {age,name,type,personId} = that.state

        if(type === 0){
            api.post(inter.person,{
                name:name,
                age:age
            }).then((res)=>{
    
                Taro.showToast({
                    title:'提交成功',
                    icon:'none',
                    duration:1000
                })
                setTimeout(()=>{Taro.navigateBack()},1000)
            })
        } else {
            api.post(inter.person + personId,{
                name:name,
                age:age,
            }).then((res)=>{
    
                Taro.showToast({
                    title:'提交成功',
                    icon:'none',
                    duration:1000
                })
                setTimeout(()=>{Taro.navigateBack()},1000)
            })
        }
        
    }


    render () {

        const {name,age} = this.state

        return (
            <View className='wrap'>

                <View className='from'>
                    <View className='fromItem'>
                        <Input 
                            value={name}
                            type='text'
                            placeholder='请输入姓名'
                            onInput={(e):void=>this.setState({name:e.detail.value})} 
                        />
                    </View>
                    <View className='fromItem'>
                        <Input 
                            value={age}
                            type='text'
                            placeholder='请输入年龄'
                            onInput={(e):void=>this.setState({age:e.detail.value})} 
                        />
                    </View>
                </View>
                

                <View className='btn bg_fa d_flex fd_r ai_ct jc_ct mt_20' onClick={this._add}>
                    <Text className='white_label default_label'>增加</Text>
                </View>
            </View>
        )
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as unknown as ComponentClass<PageOwnProps, PageState>
