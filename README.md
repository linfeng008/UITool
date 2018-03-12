
# 移动端 ui组件

## version
0.0.5

## API说明

### toast
```
uITool.renderToast({
  text:'弹弹弹弹弹弹弹弹弹弹弹弹弹弹弹',  // text 提示文案 
  type: 'success', // type有 error, success, warn default ''
  delay: 2 //延迟时间2s  default 2s
}).then(res=>{
  console.log(res); // res = '';
})
```

### alert
``` 
uITool.alert({
  text:'弹弹弹弹弹弹弹弹弹弹弹弹弹弹弹',  // text 提示文案
  type: 'success', // type有 error, success, warn
  delay: 2 //延迟时间2s
}).then(res=>{
  console.log(res); //res = '';
});
```

### confirm
```
uITool.confirm({
  text: '新华社北京11月6日电  11月6日，习近平主席就美国得克萨斯州教堂枪击事件向美国总统特朗普致慰问电，向无辜遇难者表示沉痛的哀悼，向伤者和受害者家属表示诚挚的慰问，祝愿受伤者早日康复。', // 不可以为空
  btnLeftText: '取消', //可以为空 默认为取消
  btnRightText: '确定' //可以为空 默认为确定
}).then(res=>{
  console.log(res); //res= 'left' or 'right'
});
```

### select
```
uITool.renderSelect({
  title:'你喜欢那个公司',
  footerText:'算了不选了',
  list:[
    {
      id:1,
      text:'阿里'
    },
    {
      id:2,
      text:'腾讯'
    }
  ]
}).then(res=>{
  console.log(res); // res= {id:5}
});
```

### showLoading
```
uITool.showLoading({
  text:'正在加载请稍后',
});
```

### hideLoading
```
uITool.hideLoading();
```