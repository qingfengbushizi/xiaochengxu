import { ComponentClass } from 'react'
import Taro, { Component, Config, navigateTo } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { homeType } from '../../constants/homeType'

import {

    getPerson

} from '../../actions/home'


import api from '../../services/api'
import inter from '../../config/inter'

import menu from '../../config/menu'

import  '../../config/theme.css';
import './index.less'

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
    getPerson:Array<{}>
}

type PageDispatchProps = {
    getPerson: () => void
}

type PageOwnProps = {}

type PageState = {
    personList:Array<{
        id:number,
        name:string,
        age:number
    }>,
    cate1:Array<{
        catalog2s: string,
        id: string,
        name: string,
    }>,
    cate2:Array<{
        catalog1Id:number,
        catalog3List:Array<null>,
        id:number,
        name:string
    }>,
    cate3:Array<{
        catalog2Id:number,
        id:number,
        name:string
    }>
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ home }) => ({
    home:home
}), (dispatch) => ({

    getPerson () {
      dispatch(getPerson())
    }

}))

var Anim = function(){
        
}
Anim.prototype.start = function(){
    console.log('satrt');
}

Anim.prototype.stop = function(){
    console.log('stop');
}

var myAnim = new Anim();
myAnim.start();
myAnim.stop();





class Index extends Component<{}, PageState>{

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
        navigationBarTitleText: '首页'
    }

    constructor(){
        super(...arguments)

        this.state = {
            personList:[],
            cate1:[],
            cate2:[],
            cate3:[],
        }
    }

    componentWillReceiveProps (nextProps) {
        const {home} = nextProps
    }


    componentWillUnmount () { }

    componentDidMount(){
        var that = this;
        // that.props.getPerson();
    }

    componentDidShow () { 
        var that = this
        // that.getPerson();
        that.getCate1();
    }

    componentDidHide () { }

    // getPerson(){
    //     var that = this
        
    //     api.get(inter.person)
    //     .then((res)=>{
    //         if(res.statusCode === 200){
    //             that.setState({
    //                 personList:res.data
    //             })
    //         }
    //     })

    // }

    getCate1(){
        var that = this;
        api.get(inter.cate1)
        .then((res)=>{
            if(res.statusCode === 200){
                that.setState({
                    cate1:res.data
                },()=>{
                    that._cate1(res.data[0]);
                })
            }
        })
    }


    //一级分类             
    _cate1(cate_1){
        var that = this;

        
        api.get(inter.cate2,{
            catalog1Id:cate_1.id
        }).then((res)=>{
            if(res.statusCode === 200){
                that.setState({
                    cate2:res.data
                },()=>{
                    that._cate2(res.data[0]);
                })
            }
        })
    }


    // 二级分类
    _cate2(cate_2){
        var that = this;
        
        api.get(inter.cate3,{
            catalog2Id:cate_2.id
        }).then((res)=>{
            if(res.statusCode === 200){
                that.setState({
                    cate3:res.data
                })
            }
        })
    }


    // 三级分类
    _cate3(cate_3){
        var that = this;

        api.get(inter.saveAttrInfo,{
            catalog3Id:cate_3.id
        })
    }

    

    _onAdd(){
        Taro.navigateTo({
            url:menu.person + '?type=0'
        })
    }

    _onDelete(){
        console.log('nihao')
    }

    _onEdit(person,id){
        Taro.navigateTo({
            url:menu.person + '?id=' + id + '&name=' + person.name + '&age=' + person.age + '&type=1'
        })
    }

    render () {

        const {personList,cate1,cate2,cate3} = this.state

        return (
            <View className='index'>
                <View className='d_flex fd_c pl_20 pr_20'>
                    <View className='d_flex fd_r '>
                        <Text className='c33_label default_label pt_10 pb_10 col_1 textCenter'>{'姓名'}</Text>
                        <Text className='c33_label default_label pt_10 pb_10 col_1 textCenter'>{'年龄'}</Text>
                        <Text className='c33_label default_label pt_10 pb_10 col_1 textCenter'>{'修改'}</Text>
                        <Text className='c33_label default_label pt_10 pb_10 col_1 textCenter'>{'操作'}</Text>
                    </View> 
                    {
                      personList.map((person,index)=>{
                          return(
                              <View key = {'person' + index} className='d_flex fd_r ai_ct  '>
                                  <Text className='c33_label default_label pt_10 pb_10 col_1 textCenter'>{person.name}</Text>
                                  <Text className='c33_label default_label pt_10 pb_10 col_1 textCenter'>{person.age}</Text>
                                  <Text className='c33_label default_label pt_10 pb_10 col_1 textCenter' onClick={this._onEdit.bind(this,person,person.id)}>{'编辑'}</Text>
                                  <Text className='c33_label default_label pt_10 pb_10 col_1 textCenter' onClick={this._onDelete}>{'删除'}</Text>
                              </View>
                          )
                      })
                    }
                </View>

                <View className='btn bg_fa d_flex fd_r ai_ct jc_ct mt_20' onClick={this._onAdd}>
                    <Text className='white_label default_label'>增加</Text>
                </View>

                <View className='d_flex fd_c '>
                    <View className='d_flex fd_r'>
                        <Text className='c33_label default_label pt_10 pb_10 col_1 textCenter'>{'一级'}</Text>
                        <Text className='c33_label default_label pt_10 pb_10 col_1 textCenter'>{'二级'}</Text>
                        <Text className='c33_label default_label pt_10 pb_10 col_1 textCenter'>{'三级'}</Text>
                    </View> 
                    <View className='d_flex fd_r'>
                        <View className='col_1 d_flex fd_c'>
                            {
                                cate1.map((cate_1,index)=>{
                                    return(
                                        <Text key={'cate_1' + index} onClick={this._cate1.bind(this,cate_1)} className='sm_label '>
                                            {cate_1.name}
                                        </Text>
                                    )
                                })
                            }
                        </View>
                        <View className='col_1 d_flex fd_c'>
                            {
                                cate2.map((cate_2,index)=>{
                                    return(
                                        <Text key={'cate_1' + index} onClick={this._cate2.bind(this,cate_2)} className='sm_label '>
                                            {cate_2.name}
                                        </Text>
                                    )
                                })
                            }
                        </View>
                        <View className="col_1  d_flex fd_c">
                            {
                                cate3.map((cate_3,index)=>{
                                    return(
                                        <Text key={'cate_1' + index}  className='sm_label ' onClick={this._cate3.bind(this,cate_3)}>
                                            {cate_3.name}
                                        </Text>
                                    )
                                })
                            }
                        </View>
                    </View>
                   
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
