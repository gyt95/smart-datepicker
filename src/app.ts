import { createApp } from 'vue'
import './app.less'
import { Button, Cell, CellGroup, Form, FormItem } from '@nutui/nutui-taro';

const App = createApp({
  onShow () {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(Form).use(FormItem).use(Button).use(Cell).use(CellGroup)

export default App
