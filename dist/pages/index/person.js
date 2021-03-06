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

var _api = require("../../services/api.js");

var _api2 = _interopRequireDefault(_api);

var _inter = require("../../config/inter.js");

var _inter2 = _interopRequireDefault(_inter);

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["name", "age", "personId", "type"], _this.config = {
      navigationBarTitleText: '信息'
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
        name: '',
        age: '',
        personId: 0,
        type: 0
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {}
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var that = this;
      var _that$$router$params = that.$router.params,
          id = _that$$router$params.id,
          name = _that$$router$params.name,
          age = _that$$router$params.age,
          type = _that$$router$params.type;

      that.setState({
        personId: parseInt(id),
        name: name !== undefined ? name : '',
        age: age !== undefined ? age : '',
        type: type !== undefined ? parseInt(type) : 0
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "_add",
    value: function _add() {
      var that = this;
      var _that$state = that.state,
          age = _that$state.age,
          name = _that$state.name,
          type = _that$state.type,
          personId = _that$state.personId;

      if (type === 0) {
        _api2.default.post(_inter2.default.person, {
          name: name,
          age: age
        }).then(function (res) {
          _index2.default.showToast({
            title: '提交成功',
            icon: 'none',
            duration: 1000
          });
          setTimeout(function () {
            _index2.default.navigateBack();
          }, 1000);
        });
      } else {
        _api2.default.post(_inter2.default.person + personId, {
          name: name,
          age: age
        }).then(function (res) {
          _index2.default.showToast({
            title: '提交成功',
            icon: 'none',
            duration: 1000
          });
          setTimeout(function () {
            _index2.default.navigateBack();
          }, 1000);
        });
      }
    }
  }, {
    key: "_createData",
    value: function _createData() {
      var _this2 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _state = this.__state,
          name = _state.name,
          age = _state.age;


      this.anonymousFunc0 = function (e) {
        return _this2.setState({ name: e.detail.value });
      };

      this.anonymousFunc1 = function (e) {
        return _this2.setState({ age: e.detail.value });
      };

      Object.assign(this.__state, {});
      return this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function anonymousFunc0(e) {
      ;
    }
  }, {
    key: "anonymousFunc1",
    value: function anonymousFunc1(e) {
      ;
    }
  }]);

  return Index;
}(_index.Component), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "_add"], _class.$$componentPath = "pages/index/person", _temp2);
Index = (0, _tslib.__decorate)([(0, _index3.connect)(function (_ref2) {
  var home = _ref2.home;
  return {
    home: home
  };
}, function (dispatch) {
  return {};
})], Index);
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));