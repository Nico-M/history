---
layout: post
title: Css StyleSheet
date: 2016-11-19
---

1. css新建格式

   1. 内部样式表

      ```html
      <sytle type="text/css">
        css语句
      </sytle>
      ```

   2. 内联样式

      `<div sytle="属性:值1;属性2:值2"></div>` 

   3. 引用外部样式表文件

      直接引用(link)

      ```html
      <link href="路径" rel="stylesheet" type="text/css" />
      <!--同样写在head头部,rel定义文档关联样式表,type定义文档类型-->
      ```

      导入(@import)

      ```html
      <style type="text/css">
      	@import url("adress");
      </style>
      <!--括号内部加引号,必须结尾加上分号-->
      ```

      ​

   4. 优先级说明

      > 内联样式表的优先级别最高,内部样式表与外部样式的优先级和书写的顺序有关,后书写的优先级高

2. css选择器

   1. 类型选择符

      `标签名称{属性:属性值;}`  **所有的页面元素都可以作为选择符** 

      *用法* :  *1. 想改变某个元素的默认样式时*

      ​	     *2.统一文档某个元素的显示效果时*

   2. ==类选择符== (class)

      `.class名{属性:属性值;}` 

      > 选择类选择符时,应该先为每个元素定义一个类名称
      >
      > 格式`<div class="top"></div>` 

   3. ID选择符

      `#id名{属性:属性值;}` 

      > 可以给每个元素使用id选择符,但是id是元素的唯一标识符,不可出现重复的id名;
      >
      > `<div id="top"></div>` 
      >
      > 名字需英文,不能用关键字,唯一性
      >
      > 创建网站的外围结构

   4. 通配符(*)

      `*{属性:属性值;}`

      > 用来重置样式
      >
      > *{margin:0;padding:0;}   

   5. 群组选择符(集合选择器)

      `选择符1,选择符2,选择符3{属性:属性值;}` 

      > 当有多个css选择符应用相同的样式时,可以选用','分隔
      >
      > 页面居中设置 `选择符1,选择符2,选择符3{margin:0 auto;}`

   6. 包含选择符(后代选择器)

      `选择符1(选择符父级) 选择符2(选择符子级){属性:属性值;}` 

      > 选择符之间用空格隔开,含义就是选择符1中包含所有选择符2

   7. 伪类选择器

      ```html
      a:link{color:#FF0000}		#未访问的连接
      a:visited{color:#00FF00}		#已访问的连接
      a:hover{color:#FF00FF}		#鼠标移动到连接上
      a:active{color:#0000FF}		#选定的连接
      ```

      > 注意使用顺序,
      >
      > a,a:link,a:visit,a:hover,a:active
      >
      > a{color:red; } a:hover{color:greemn;}

   8. 切图

      *常用快捷键*

      1. shift+

         c 裁剪	m选框 i吸取 h抓手 z缩放   x前景和背景切换     f屏幕模式的切换

      2. Ctrl+

         s保存     shift+s另存       z返回上一步   t自由变换    c复制     v粘贴      n 新建

   9. 注释

      HTML注释`<!--注释-->`

      css注释`/*--------------注释------------*/` 

   10. 选择符的权重

   ​