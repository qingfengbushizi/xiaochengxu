"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _api = require("../../services/api.js");

var _api2 = _interopRequireDefault(_api);

var _inter = require("../../config/inter.js");

var _inter2 = _interopRequireDefault(_inter);

var _menu = require("../../config/menu.js");

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Anim = function Anim() {};
Anim.prototype.start = function () {
  console.log('satrt');
};
Anim.prototype.stop = function () {
  console.log('stop');
};
var myAnim = new Anim();
myAnim.start();
myAnim.stop();
var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["loopArray138", "loopArray139", "loopArray140", "loopArray141", "personList", "cate1", "cate2", "cate3", "home"], _this.config = {
      navigationBarTitleText: '首页'
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).apply(this, arguments);
      /**
      * 指定config的类型声明为: Taro.Config
      *
      * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
      * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
      * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
      */

      this.state = {
        personList: [],
        cate1: [],
        cate2: [],
        cate3: []
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var home = nextProps.home;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var that = this;
      // that.props.getPerson();
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      var that = this;
      // that.getPerson();
      that.getCate1();
    }
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
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

  }, {
    key: "getCate1",
    value: function getCate1() {
      var that = this;
      _api2.default.get(_inter2.default.cate1).then(function (res) {
        if (res.statusCode === 200) {
          that.setState({
            cate1: res.data
          }, function () {
            that._cate1(res.data[0]);
          });
        }
      });
    }
    //一级分类             

  }, {
    key: "_cate1",
    value: function _cate1(cate_1) {
      var that = this;
      _api2.default.get(_inter2.default.cate2, {
        catalog1Id: cate_1.id
      }).then(function (res) {
        if (res.statusCode === 200) {
          that.setState({
            cate2: res.data
          }, function () {
            that._cate2(res.data[0]);
          });
        }
      });
    }
    // 二级分类

  }, {
    key: "_cate2",
    value: function _cate2(cate_2) {
      var that = this;
      _api2.default.get(_inter2.default.cate3, {
        catalog2Id: cate_2.id
      }).then(function (res) {
        if (res.statusCode === 200) {
          that.setState({
            cate3: res.data
          });
        }
      });
    }
    // 三级分类

  }, {
    key: "_cate3",
    value: function _cate3(cate_3) {
      var that = this;
      _api2.default.get(_inter2.default.saveAttrInfo, {
        catalog3Id: cate_3.id
      });
    }
  }, {
    key: "_onAdd",
    value: function _onAdd() {
      _index2.default.navigateTo({
        url: _menu2.default.person + '?type=0'
      });
    }
  }, {
    key: "_onDelete",
    value: function _onDelete() {}
  }, {
    key: "_onEdit",
    value: function _onEdit(person, id) {
      _index2.default.navigateTo({
        url: _menu2.default.person + '?id=' + id + '&name=' + person.name + '&age=' + person.age + '&type=1'
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _state = this.__state,
          personList = _state.personList,
          cate1 = _state.cate1,
          cate2 = _state.cate2,
          cate3 = _state.cate3;

      var loopArray138 = personList.map(function (person, index) {
        person = {
          $original: (0, _index.internal_get_original)(person)
        };
        var $loopState__temp2 = 'person' + index;
        return {
          $loopState__temp2: $loopState__temp2,
          $original: person.$original
        };
      });
      var loopArray139 = cate1.map(function (cate_1, index) {
        cate_1 = {
          $original: (0, _index.internal_get_original)(cate_1)
        };
        var $loopState__temp4 = 'cate_1' + index;
        return {
          $loopState__temp4: $loopState__temp4,
          $original: cate_1.$original
        };
      });
      var loopArray140 = cate2.map(function (cate_2, index) {
        cate_2 = {
          $original: (0, _index.internal_get_original)(cate_2)
        };
        var $loopState__temp6 = 'cate_1' + index;
        return {
          $loopState__temp6: $loopState__temp6,
          $original: cate_2.$original
        };
      });
      var loopArray141 = cate3.map(function (cate_3, index) {
        cate_3 = {
          $original: (0, _index.internal_get_original)(cate_3)
        };
        var $loopState__temp8 = 'cate_1' + index;
        return {
          $loopState__temp8: $loopState__temp8,
          $original: cate_3.$original
        };
      });
      Object.assign(this.__state, {
        loopArray138: loopArray138,
        loopArray139: loopArray139,
        loopArray140: loopArray140,
        loopArray141: loopArray141
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.$$events = ["_onEdit", "_onDelete", "_onAdd", "_cate1", "_cate2", "_cate3"], _class.$$componentPath = "pages/index/index", _temp2);
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));