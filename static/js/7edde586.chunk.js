(window.webpackJsonp=window.webpackJsonp||[]).push([[353],{625:function(e,n){e.exports="DatePicker 日期选择器\n===\n\n显示一个月的日历，并允许用户选择单个日期，常见的应用场景在表单中应用，请查看基于 `DatePicker` 的 [`DateInput`](#/components/date-input) 组件。\n\n```jsx\nimport { DatePicker } from 'uiw';\n```\n\n### 基础用法\n\n\x3c!--DemoStart,bgWhite,codePen--\x3e \n```js\nimport { DatePicker } from 'uiw';\n\nclass Demo extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      date: new Date('2019-02-26 02:00:00'),\n    };\n  }\n  onChange(selectedDate) {\n    console.log('selectedDate:', selectedDate)\n    this.setState({ date: selectedDate });\n  }\n  render() {\n    return (\n      <div>\n        <DatePicker\n          date={this.state.date}\n          todayButton=\"今天\"\n          onChange={this.onChange.bind(this)}\n        />\n        <DatePicker\n          showTime\n          date={this.state.date}\n          todayButton=\"今天\"\n          onChange={this.onChange.bind(this)}\n        />\n        <div>{this.state.date ? String(this.state.date) : 'no date'}</div>\n      </div>\n    )\n  }\n}\nReactDOM.render(<Demo />, _mount_);\n```\n\x3c!--End--\x3e\n\n### 显示时间\n\n\x3c!--DemoStart,bgWhite,codePen--\x3e \n```js\nimport { DatePicker } from 'uiw';\n\nclass Demo extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      date: null,\n    };\n  }\n  onChange(selectedDate) {\n    console.log('selectedDate:', selectedDate)\n    this.setState({ date: selectedDate });\n  }\n  render() {\n    return (\n      <div>\n        <DatePicker\n          showTime\n          date={this.state.date}\n          todayButton=\"今天\"\n          onChange={this.onChange.bind(this)}\n        />\n        <div>{this.state.date ? String(this.state.date) : 'no date'}</div>\n      </div>\n    )\n  }\n}\nReactDOM.render(<Demo />, _mount_);\n```\n\x3c!--End--\x3e\n\n### 设置本地语言\n\n\x3c!--DemoStart,bgWhite,codePen--\x3e \n```js\nimport { DatePicker } from 'uiw';\n\nclass Demo extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      date: null,\n    };\n  }\n  onChange(selectedDate) {\n    console.log('selectedDate:', selectedDate)\n    this.setState({ date: selectedDate });\n  }\n  render() {\n    return (\n      <div>\n        <DatePicker\n          todayButton=\"Today\"\n          weekTitle={['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']}\n          weekday={['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']}\n          monthLabel={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}\n          date={this.state.date}\n          onChange={this.onChange.bind(this)}\n        />\n        <div>{this.state.date ? String(this.state.date) : 'no date'}</div>\n      </div>\n    )\n  }\n}\nReactDOM.render(<Demo />, _mount_);\n```\n\x3c!--End--\x3e\n\n### 初始展示日期\n\n\x3c!--DemoStart,bgWhite,codePen--\x3e \n```js\nimport { DatePicker } from 'uiw';\n\nclass Demo extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      date: null,\n    };\n  }\n  onChange(selectedDate) {\n    this.setState({ date: selectedDate });\n  }\n  render() {\n    return (\n      <div>\n        <DatePicker\n          date={this.state.date}\n          onChange={this.onChange.bind(this)}\n        />\n        <div>{this.state.date ? String(this.state.date) : 'no date'}</div>\n      </div>\n    );\n  }\n}\nReactDOM.render(<Demo />, _mount_);\n```\n\x3c!--End--\x3e\n\n### 禁用时间\n\n通过 `disabledDate` 方法设置，今天和今天之前不能选择。\n\n\x3c!--DemoStart,bgWhite,codePen--\x3e \n```js\nimport { DatePicker } from 'uiw';\n\nfunction disabledDate(currentDate) {\n  // 今天和今天之前不能选择\n  return currentDate && currentDate.valueOf() < Date.now();\n}\nclass Demo extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      date: null,\n      // date: new Date(),\n    };\n  }\n  onChange(selectedDate) {\n    this.setState({ date: selectedDate });\n  }\n  render() {\n    return (\n      <div>\n        <DatePicker\n          disabledDate={disabledDate}\n          date={this.state.date && new Date(this.state.date)}\n          onChange={this.onChange.bind(this)}\n        />\n        <div>{this.state.date ? String(this.state.date) : 'no date'}</div>\n      </div>\n    );\n  }\n}\nReactDOM.render(<Demo />, _mount_);\n```\n\x3c!--End--\x3e\n\n## 定制日历单元格\n\n使用 `renderDay` 可以自定义日期单元格的内容和样式。\n\n\x3c!--DemoStart,bgWhite,codePen--\x3e \n```js\nimport { DatePicker } from 'uiw';\n\nclass Demo extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      date: null,\n    };\n  }\n  onChange(selectedDate) {\n    this.setState({ date: selectedDate });\n  }\n  render() {\n    return (\n      <div>\n        <DatePicker\n          date={this.state.date}\n          renderDay={(day, props, cellDate) => {\n            const style = {}\n            const week = cellDate.getDay();\n            if (week === 0 && !props.prev && !props.next) {\n              style.border = '1px solid red';\n            }\n            return (\n              <div style={style}> {day} </div>\n            );\n          }}\n          onChange={this.onChange.bind(this)}\n        />\n        <div>{this.state.date ? String(this.state.date) : 'no date'}</div>\n      </div>\n    );\n  }\n}\nReactDOM.render(<Demo />, _mount_);\n```\n\x3c!--End--\x3e\n\n## DatePicker\n\n| 参数 | 说明 | 类型 | 默认值 |\n|--------- |-------- |--------- |-------- |\n| date | 选中的日期 | Date | - |\n| panelDate | 日历面板默认展示哪一页 | Date | `new Date` |\n| today | 默认高亮当天日期 | Date | `new Date` |\n| todayButton | 展示回到今天按钮，和提示文本。 | String | - |\n| showTime | 增加时间选择功能，当 showTime 为一个对象时，其属性会传递给内建的 [`<TimePicker />`](#/components/time-picker)。 | Boolean/Object | - |\n| renderDay | 增加时间选择功能。 `end`: 周末，`prev`: 上个月，`next`：下个月 | Function(day, { end: bool, prev: bool, next: bool }, cellDate) | - |\n| disabledDate | 不可选择的日期，函数返回 `true` 当前日期被禁用无法选择。`end`: 周末，`prev`: 上个月，`next`：下个月 | Function(currentDate, { end: bool, prev: bool, next: bool }) | - |\n| onChange | 选择一天时调用。 | Function(selectedDate:Date) | - |\n| weekTitle | 星期显示文本提示 | Array | \\[`星期天`, `星期一`, `星期二`, `星期三`, `星期四`, `星期五`, `星期六`\\] |\n| weekday | 星期显示文本 | Array | \\[`日`, `一`, `二`, `三`, `四`, `五`, `六`\\] |\n| monthLabel | 月份显示文本 | Array | \\[`一月`, `二月`, `三月`, `四月`, `五月`, `六月`, `七月`, `八月`, `九月`, `十月`, `十一月`, `十二月`\\] |\n\n## DatePicker.showTime\n\n| 参数 | 说明 | 类型 | 默认值 |\n|--------- |-------- |--------- |-------- |\n| defaultValue | 默认时间 | Date | - |\n| disabled | 禁用全部操作 | Boolean | `false` |\n| disabledHours | 禁止选择部分小时选项 | Function | - |\n| disabledMinutes | 禁止选择部分分钟选项 | Function | - |\n| disabledSeconds | 禁止选择部分秒选项 | Function | - |\n| format | 禁止选择部分秒选项 | Function | `HH:mm:ss` |\n| hourStep | 禁止选择部分秒选项 | Function | - |\n"}}]);