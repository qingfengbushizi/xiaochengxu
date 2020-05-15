"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _tslib = require("../../npm/tslib/tslib.js");

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _home = require("../../actions/home.js");

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

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["loopArray54", "personList", "home"], _this.config = {
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
        personList: []
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
      that.props.getPerson();
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      var that = this;
      that.getPerson();
    }
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "getPerson",
    value: function getPerson() {
      var that = this;
      _api2.default.get(_inter2.default.person).then(function (res) {
        if (res.statusCode === 200) {
          that.setState({
            personList: res.data
          });
        }
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

      var personList = this.__state.personList;

      var loopArray54 = personList.map(function (person, index) {
        person = {
          $original: (0, _index.internal_get_original)(person)
        };
        var $loopState__temp2 = 'person' + index;
        return {
          $loopState__temp2: $loopState__temp2,
          $original: person.$original
        };
      });
      Object.assign(this.__state, {
        loopArray54: loopArray54
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.$$events = ["_onEdit", "_onDelete", "_onAdd"], _class.$$componentPath = "pages/index/index", _temp2);
Index = (0, _tslib.__decorate)([(0, _index3.connect)(function (_ref2) {
  var home = _ref2.home;
  return {
    home: home
  };
}, function (dispatch) {
  return {
    getPerson: function getPerson() {
      dispatch((0, _home.getPerson)());
    }
  };
})], Index);
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));