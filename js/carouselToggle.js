/*
 * @Description: 
 * @version: 
 * @Author: lxw
 * @Date: 2020-03-29 15:24:03
 * @LastEditors: lxw
 * @LastEditTime: 2020-03-29 15:46:20
 */

const carouselSlider = (function () {

    /**
     * @name: 轮播切换
     * @description: 传入对应轮播模板挂载父节点id。实现全屏轮播左右切换，可以用于App宣传、个人简历展示
     * @msg: 
     * @param {type} 
     * @return: 
     */
    function carousel(eleString) {

        const wrap = document.getElementById(eleString)
        const left = document.getElementById('left')
        const right = document.getElementById('right')
        const modelEles = wrap.children
        const length = modelEles.length
        let itemWidthSize = modelEles[0].offsetWidth //需要根据窗口大小此村是否改变动态修改
        let current = 0



        // 动态设置父元素的宽度
        wrap.style.width = itemWidthSize * length + 'px'

        right.onclick = rightToggle
        left.onclick = leftoggle

        function rightToggle() {
            if (current >= length - 1) {
                current = 0;
            } else {
                current++
            }
            let prevInd = current === 0 ? length - 1 : current - 1
            wrap.style.transform = `translateX(${-itemWidthSize * current}px)`
        }
        function leftoggle() {
            if (current <= 0) {
                // TODO:暂时这样弄，最好不要
                alert('当前已经是第一张喽')
                return
            }
            console.log(current)
            wrap.style.transform = `translateX(${(-itemWidthSize * current) + (itemWidthSize * 1)}px)`
            current--
        }
        console.log(modelEles)

        // 监听页面尺寸变化.重新获取每一额给item的宽度，设置父元素的宽度、以及父元素的Trasnform偏移
        window.onresize = function () {
            itemWidthSize = document.getElementById(eleString).children[0].offsetWidth
            wrap.style.width = itemWidthSize * length + 'px'
            wrap.style.transform = `translateX(${-itemWidthSize * current}px)`
        }
    }

    return carousel


})()

