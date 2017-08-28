# 2017 前端学习计划

## 一、阅读Bootstrap源码(LESS,样式规范)
> 时间 8.15-8.31

### Bootstrap tag V1.0.0

[参照 bootstrap commit 1](https://github.com/twbs/bootstrap/tree/eb81782cdbdc68aaebe4fa561b5fbb73ef866611)
#### 项目结构

```
root
├─docs
│  └─assets
│      ├─css
│      ├─img
│      └─js
│          ├─google-code-prettify
│          └─jquery
└─lib 
```

> lib 下面就是各种`less`文件， 主要有 `reset.less` `preboot.less` `scaffolding.less` `tables.less` `type.less` `form.less` `pattern.less` `bootstrap.less` 下面具体来介绍每一个less文件， docs 下的HTML就是对本项目的一个介绍。

#### reset.less

> 为什么要重置样式？知乎上有关于这方面的讨论[到底该不该用 CSS reset？](https://www.zhihu.com/question/23554164),[Normalize.css 与传统的 CSS Reset 有哪些区别？](https://www.zhihu.com/question/20094066), 我之前也喜欢使用 reset.css, `* { margin: 0; padding: 0;}`, 这样就可以在一张白纸上干活，一劳永逸，后面又出现了`Normalize.css` 更加合理，针对不合理的地方进行重置，这里Bootstrap 在第一个版本也是仅仅定制化，使用一部分，和`Normalize.css` 思想还是很像的。

#### preboot.less
>  这里是所有 less `variable` 和  `mixins` 定义, 这一点是可以学习的， 对于不同的主题，你可以修改这些常量，主要是字体大小和颜色 `mixin` 可以拿来复用，比如下面的 `btn` 对 `button` 进行复用。

#### scaffolding.less
> `scaffolding`, 顾名思义脚手架的意思，主要就是设置一些全局变量，如 `btn 以及 btn 不同类型的样式`、`span`、`offset`、`clearfix`、`container`、`container-fluid`。

#### tables.less
> 自从div布局出现，`table` 布局就没有那么流行了，但是还是有一定的应用场景的，可以借鉴这里的 `table` 布局,  在`table` 标签 使用 `border-collapse: collapse  border-spacing: 0` 来替代直接在标签上使用 `cellpadding cellspacing` 属性。

#### pattern.less
> 这里面是各种组件的样式，我们平时在官网copy的就是基于这里的样式的，这是最基础的样式，后面的都是基于这个进行扩展的。时隔**6**年也不显得过时。这就是`Bootstrap`为什么成为`GitHub`上最受欢迎的项目之一。

#### type.less
> 设置显示文字的标签的文字样式，比如 `h1-h6, p, dl, dt, ul, ol, li` 等。 

#### form.less
> 设置表单的样式

#### bootstrap.less
> `import` 上面几种样式，通过 less 按序合并打包成 bootstrap.css 

#### 版本增加内容

> 1. v1.2.0 增加响应式设计 `adaptive.less` 
`@media only screen and (max-width: 480px) { // 当宽度窄与480px 这里的样式会生效， 也就是在移动端显示的时候 }`
> 2. v1.3.0 preboot.less 分解为 `variables.less  mixins.less` 以及支持`IE7` 一些hack写法 `*border-collapse: collapse`
> 3. v1.4.0 增加js 如 button.js alert.js modal.js 等，这个时候就有单元测试了！好厉害
> 4. v2.0.0 增加雪碧图用于`icon`, 这个时候的less在less文件夹下而不是在lib下，很庞大了，如 popover.less 从 pattern.less 抽出来成为单独的样式，less 文件细分， 轮播、导航、面包屑、进度条、media、 responsive 被添加进来
> 5. v2.0.2 `badge` 被添加进来
> 6. v2.2.2 `package.json` 被添加进来 `.travis.yml` 也被添加进来， 时间是在*2012年12月9日*，`node`版本使用的是 `v0.6` 
> 7. v2.3.2 这个版本没什么大的变化，上面是没有看`CHANGELOG`自己的认识， 更加详细的参见 `CHANGELOG.MD`, 以后最好先看一遍CHANGELOG，对着`CHANGELOG`在做分析。
> 8. v3.0.0 这一版本没有`CHANGELOG.MD`， 这一版可以说是革命性的，引入 `grunt` 工程化，`package.json`依赖增加， `.editorconfig`, 团队合作代码样式统一， 引入`@font-face`, 去除雪碧图方式， Blog 使用 jkelly 模板方式重写，这里开始就是我们比较熟悉的方式了，通过`Grunt` 构建工具将所有less，js 打包成相应的**dist** 目录下， 添加一些对`bootstrap.css bootstrap-theme.css` 和 `bootstrap.js`,
> 9. v4.0.0-beta 这一版本将less 方式改为 Sass，`@font-face` 去除了， 构建工具依旧还是`Grunt`, 最熟悉的还是`v3.X.X`, 可以说这一版是最经典了。

#### 需要学习的点（参照 V3.3.0 ）

1. css浏览器的兼容性
```
   vendor-prefixes.less
   在没有使用 Autoprefixer 的条件下，下面这些都需要有兼容写法
    // - Animations
    // - Box shadow
    // - Box sizing
    // - Content columns
    // - Placeholder text
    // - Transformations
    // - Transitions
    // - User Select 
    // - flex relative
```
2. CSS comb （CSS 属性书写顺序）
``` csscomb.json 编译less时使用 
{
  "always-semicolon": true, // 分号结尾
  "block-indent": 2, // 缩进2个空格
  "color-case": "lower", // 颜色值小写
  "leading-zero": false, // 前导0 不需要
  "remove-empty-rulesets": true, // 去除空规则
  "space-after-colon": 1, // 冒号后面一个空格
  "sort-order": [
    [
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "display",
      "float",
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "-webkit-box-sizing",
      "-moz-box-sizing",
      "box-sizing",
      "-webkit-appearance",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "overflow",
      "overflow-x",
      "overflow-y",
      "-webkit-overflow-scrolling",
      "-ms-overflow-x",
      "-ms-overflow-y",
      "-ms-overflow-style",
      "clip",
      "clear",
      "font",
      "font-family",
      "font-size",
      "font-style",
      "font-weight",
      "font-variant",
      "font-size-adjust",
      "font-stretch",
      "font-effect",
      "font-emphasize",
      "font-emphasize-position",
      "font-emphasize-style",
      "font-smooth",
      "-webkit-hyphens",
      "-moz-hyphens",
      "hyphens",
      "line-height",
      "color",
      "text-align",
      "-webkit-text-align-last",
      "-moz-text-align-last",
      "-ms-text-align-last",
      "text-align-last",
      "text-emphasis",
      "text-emphasis-color",
      "text-emphasis-style",
      "text-emphasis-position",
      "text-decoration",
      "text-indent",
      "text-justify",
      "text-outline",
      "-ms-text-overflow",
      "text-overflow",
      "text-overflow-ellipsis",
      "text-overflow-mode",
      "text-shadow",
      "text-transform",
      "text-wrap",
      "-webkit-text-size-adjust",
      "-ms-text-size-adjust",
      "letter-spacing",
      "-ms-word-break",
      "word-break",
      "word-spacing",
      "-ms-word-wrap",
      "word-wrap",
      "-moz-tab-size",
      "-o-tab-size",
      "tab-size",
      "white-space",
      "vertical-align",
      "list-style",
      "list-style-position",
      "list-style-type",
      "list-style-image",
      "pointer-events",
      "-ms-touch-action",
      "touch-action",
      "cursor",
      "visibility",
      "zoom",
      "flex-direction",
      "flex-order",
      "flex-pack",
      "flex-align",
      "table-layout",
      "empty-cells",
      "caption-side",
      "border-spacing",
      "border-collapse",
      "content",
      "quotes",
      "counter-reset",
      "counter-increment",
      "resize",
      "-webkit-user-select",
      "-moz-user-select",
      "-ms-user-select",
      "-o-user-select",
      "user-select",
      "nav-index",
      "nav-up",
      "nav-right",
      "nav-down",
      "nav-left",
      "background",
      "background-color",
      "background-image",
      "filter",
      "background-repeat",
      "background-attachment",
      "background-position",
      "background-position-x",
      "background-position-y",
      "-webkit-background-clip",
      "-moz-background-clip",
      "background-clip",
      "background-origin",
      "-webkit-background-size",
      "-moz-background-size",
      "-o-background-size",
      "background-size",
      "border",
      "border-color",
      "border-style",
      "border-width",
      "border-top",
      "border-top-color",
      "border-top-style",
      "border-top-width",
      "border-right",
      "border-right-color",
      "border-right-style",
      "border-right-width",
      "border-bottom",
      "border-bottom-color",
      "border-bottom-style",
      "border-bottom-width",
      "border-left",
      "border-left-color",
      "border-left-style",
      "border-left-width",
      "border-radius",
      "border-top-left-radius",
      "border-top-right-radius",
      "border-bottom-right-radius",
      "border-bottom-left-radius",
      "-webkit-border-image",
      "-moz-border-image",
      "-o-border-image",
      "border-image",
      "-webkit-border-image-source",
      "-moz-border-image-source",
      "-o-border-image-source",
      "border-image-source",
      "-webkit-border-image-slice",
      "-moz-border-image-slice",
      "-o-border-image-slice",
      "border-image-slice",
      "-webkit-border-image-width",
      "-moz-border-image-width",
      "-o-border-image-width",
      "border-image-width",
      "-webkit-border-image-outset",
      "-moz-border-image-outset",
      "-o-border-image-outset",
      "border-image-outset",
      "-webkit-border-image-repeat",
      "-moz-border-image-repeat",
      "-o-border-image-repeat",
      "border-image-repeat",
      "outline",
      "outline-width",
      "outline-style",
      "outline-color",
      "outline-offset",
      "-webkit-box-shadow",
      "-moz-box-shadow",
      "box-shadow",
      "opacity",
      "-ms-interpolation-mode",
      "-webkit-transition",
      "-moz-transition",
      "-ms-transition",
      "-o-transition",
      "transition",
      "-webkit-transition-delay",
      "-moz-transition-delay",
      "-ms-transition-delay",
      "-o-transition-delay",
      "transition-delay",
      "-webkit-transition-timing-function",
      "-moz-transition-timing-function",
      "-ms-transition-timing-function",
      "-o-transition-timing-function",
      "transition-timing-function",
      "-webkit-transition-duration",
      "-moz-transition-duration",
      "-ms-transition-duration",
      "-o-transition-duration",
      "transition-duration",
      "-webkit-transition-property",
      "-moz-transition-property",
      "-ms-transition-property",
      "-o-transition-property",
      "transition-property",
      "-webkit-transform",
      "-moz-transform",
      "-ms-transform",
      "-o-transform",
      "transform",
      "-webkit-transform-origin",
      "-moz-transform-origin",
      "-ms-transform-origin",
      "-o-transform-origin",
      "transform-origin",
      "-webkit-animation",
      "-moz-animation",
      "-ms-animation",
      "-o-animation",
      "animation",
      "-webkit-animation-name",
      "-moz-animation-name",
      "-ms-animation-name",
      "-o-animation-name",
      "animation-name",
      "-webkit-animation-duration",
      "-moz-animation-duration",
      "-ms-animation-duration",
      "-o-animation-duration",
      "animation-duration",
      "-webkit-animation-play-state",
      "-moz-animation-play-state",
      "-ms-animation-play-state",
      "-o-animation-play-state",
      "animation-play-state",
      "-webkit-animation-timing-function",
      "-moz-animation-timing-function",
      "-ms-animation-timing-function",
      "-o-animation-timing-function",
      "animation-timing-function",
      "-webkit-animation-delay",
      "-moz-animation-delay",
      "-ms-animation-delay",
      "-o-animation-delay",
      "animation-delay",
      "-webkit-animation-iteration-count",
      "-moz-animation-iteration-count",
      "-ms-animation-iteration-count",
      "-o-animation-iteration-count",
      "animation-iteration-count",
      "-webkit-animation-direction",
      "-moz-animation-direction",
      "-ms-animation-direction",
      "-o-animation-direction",
      "animation-direction"
    ]
  ]
}
```
3. js对IE低版本兼容性写法
```
<!--[if lt IE 9]> 
<script src=https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js></script> 
<script src=https://oss.maxcdn.com/respond/1.4.2/respond.min.js></script> 
<![endif]-->
```
## 二、阅读Lodash/Underscore.js(FP)
> 时间 9.1-9.30

## 三、阅读zepto/jquery.js（DOM操作）
> 时间 10.1-10.31
## 四、阅读backbone.js（MVC）
> 时间 11.1-11.30
## 五、阅读React.js（了解VDOM内部工作原理）
> 时间 12.1-12.31
## 六、获得FreeCodeCamp 三个证书
> 时间 08.15-12.31
## 七、jQuery/React方式实现一些基础组件
> 时间 08.15-12.31
