/**
 * 修改数据时能够触发 render 方法的执行
同步变更时需要合并，仅触发一次 render 方法
 */
class Component {
  _data = {
    name: "",
  }
  _timer = null;
  constructor() {
    this.data = new Proxy(this._data, {
      set: (obj, prop, value) => {
        Reflect.set(obj, prop, value);
        if (!this._timer) {
          this._timer = true;
          Promise.resolve().then(() => {
            this.render();
            this._timer = false;
          });
        }

      }
    })
  }
  render() {
    console.log(`render - name: ${this.data.name}`);
  }
}

const com = new Component();
// 要求以下代码需要触发 render 方法，并且同步变更需要合并
com.data.name = "张三";
com.data.name = "李四";
com.data.name = "王五";

setTimeout(() => {
  com.data.name = "渡一";
}, 0);
