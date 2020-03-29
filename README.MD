<!--
 * @Description: 
 * @version: 
 * @Author: lxw
 * @Date: 2020-03-28 20:12:18
 * @LastEditors: lxw
 * @LastEditTime: 2020-03-29 16:59:14
 -->
### YiEdu-App(易教育App)宣传、下载页面——后期扩展成为通用App下载引导页模板或个人在线简历模板
> 使用flutter开发的一个在线教育平台app，本来只是想单纯的部署到阿里云的tomcat服务器，贴一个下载链接到对应的github项目上，但是心痒痒的，又忍不住，不去做正经事，来给这个app做一个简单的下载-引导页

### 开发经验
> 老套路了，或者是说习惯了，不管是做说明项目，都会习惯性的建一个md文档，记录一些有的没的经验，感觉还是基础不够，还是要沉住气去正正经经的好好打牢基础

#### 浏览器初始化样式
> 关于这一点，以前我一般都是使用最简单的几个css设置，
```css
*{paddng:0;margin:0;}body{background:#fff;color:#333;font-size:14px;font-family:......}
```
> 但是实际很多公司不采用这种`*{paddng:0;margin:0;}`的方案，原因是*号是通配符，需要把所有的标签都遍历一遍，当网站较大时，样式比较多，这样写就大大的加强了网站运行的负载，会使网站加载的时候需要很长一段时间。

> 所以现在个人项目浏览器初始化一并采用`Normalize.css`

#### 图片毛玻璃效果
1. 实现，兼容性、不兼容浏览器的实现，比如是firfox，ie，一般可以采用svg模糊效果，ie的话可以可以借助ie filiter，归纳如下代码
```css
.blur {	
    filter: url(blur.svg#blur); /* FireFox, Chrome, Opera */
    
    -webkit-filter: blur(10px); /* Chrome, Opera */
    -moz-filter: blur(10px);
    -ms-filter: blur(10px);    
     filter: blur(10px);
    
     filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false); /* IE6~IE9 */
}
```
2. 保证模糊效果div的背景图片刚好它所在位置的body的背景图片重叠，无论怎么移动它
```css
// 相同的
background-position: center top;
background-size: cover;

//div元素——其实是充当了窗口，body与div设置了相同样式的背景图，且div充当了观看的窗口，此时无论你怎么在移动div，背景都是相同部分刚好重叠的，注意不要使用transform移动
background-attachment: fixed;
```
3. 参考
```
1.background-attachment：fixed； 背景图片的位置是相对于页面可视区左上角的（相当于浏览器窗口左上角），即使滚动，仍然相对于浏览器窗口左上角为基准；而外层的div 只是他能显示的区域，也就是能看到的区域；而div之外的部分就看不到了；此时外层的div相当于一个窗口.
2.background-attachment: 去掉fixed ,默认scroll, 背景图片位置是相对于外层div;随页面滚动而滚动；
3.所以，当你在浏览器中F12 然后去掉fixed,勾选fixed 过程中，图片的相对位置发生了变化，图片位置发生了变动， 如果多个div的背景图片设置了background-attachment:fixed ;而且这些外层div在一起，背景图片就会重复，其实是上下堆叠；去掉fixed，多个div的背景图片位置基准是各个div的左上角，此时不会重复；
```
4. 简单说设置`background-attachment:fixed`文档解释是背景图片不会随其外层的div滚动而滚动，实际设置了之后div的背景图片参考位置改变了，变成参照浏览器可视区域左上角了，此时的div只是观看它的一个窗口，好比只是只有一张body的背景图片，你移动div这个窗口观看到背景图片的不同部位

5. `background-position`定位是div不动，定位需要在div显示的背景部分。

### 摩天轮旋转效果
1.每一个小圆item旋转中心需要改变，原本是自己的中心，比如 60 x 60 那么原本就是 30 30 ，改成大圆中心的话，就要改变旋转中心的y坐标: 大圆一半 + 小圆一半
2. 保证每一个小圆item尺寸是一样的：box-sizing:border-box;
3. 字体翻转导致无法看清，字体可以独立加一个span标签，设置360deg - 当前转过的度数

### 全屏轮播切换
1. 封装通用轮播切换效果
2. 注意监听尺寸改变时，重新设置相关元素的尺寸
3.ps:注意：每一个轮播item都有一个独立的背景图片设置，这个需要放到js动态设置，但是时间原因暂时放在了css文件里面
> 这个后期会添加一个设置背景图片的方法，暴露出来接口

### 网页加载判断
> 项目主要是背景图片资源比较耗时间，所以以判断第一张显示的背景图片加载完毕，来切换load和正常网页
```js
const bgBody = document.body
        const loadWrap = document.getElementById('load-wrap')
        const bgImg = new Image();

        bgImg.src = './images/bg.jpg'
        // 背景图片加载完毕，但是未完全显示
        bgImg.onload = function () {
			const cItem = document.getElementsByClassName('carousel-item')[0]
            cItem.style.backgroundImage = `url(${bgImg.src})`
            setTimeout(() => {
                loadWrap.style.display = 'none'
            }, 500);

        }
```


### 突发奇想——把它做成App宣传页或个人在线简历模板
#### 分成两个
1. App宣传页
2. web在线简历

#### 页面样式骨架
> 背景 + 主体内容毛玻璃样式 + 左右切换模块

#### html模板结构复用
> 可以根据示例，在已有的内容模板做修改，每一个模板主体样式对应一个less文件
> 扩展模板，可以根据示例添加新的内容板块，为了方便维护，可以按照模板结构，为新的板块添加一个less文件

#### css模块化--采用less开发

#### 样式兼容性考虑
1. 浏览器样式初始化
2. 毛玻璃效果兼容ie和firfox

#### 脚手架
> 提供vue-cli3脚手架版和无脚手架版


