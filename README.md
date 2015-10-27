# jquery.labelholder

比较流行的兼容HTML5新属性placeholder的插件(ie9及其以下版本不支持)，如jquery.placeholder.js，是通过设置表单元素的value来模拟placeholder的，但是会和如avalon等mvvm框架的绑定冲突，因此重写了一个通过添加或删除label标签来模拟placeholder的jquery插件----jquery.labelholder.js。

## 安装
```
bower install jquery.labelholder
```

## 使用
```
$(':input[placeholder]').labelholder();
```

## 参数
```
$(':input[placeholder]').labelholder({
	style: {
		color: red
	}
});
```