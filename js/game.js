window.addEventListener( 'load', function ()
{
    let bigImage = document.querySelector( '#game' )
    let birdDom = document.querySelector( '.brid' )
    // 定义一个对象来表示背景的位置
    const sky = {
        position: 0
    }
    // 表示重力加速度
    const gravity = 1
    // 创建小鸟对象
    const bird = {
        entity: birdDom,
        x: birdDom.offsetLeft,
        y: birdDom.offsetTop,
        speedX: 5,
        speedY: 0
    }
    // 开启定时器
    var timer = setInterval( move, 20 )
    function move ()
    {
        // 得到的值是负数 -5=0-5 背景向左移动
        sky.position = sky.position - bird.speedX
        // 赋值操作
        bigImage.style.backgroundPositionX = sky.position + 'px'

        //实现的小鸟在垂直方向上的移动
        // 修改小鸟垂直方向上的速度,包含了重力加速度
        bird.speedY = bird.speedY + gravity
        // 修改了小鸟距离背景图片中的处理位置
        bird.y = bird.y + bird.speedY
        // 判断小鸟是否超出了下边界
        // 判断方式:背景图的高度-小鸟的高度(下边界的范围),如果超出了这个范围表示小鸟超出了下边界
        if ( bird.y > bigImage.offsetHeight - birdDom.offsetHeight )
        {
            bird.y = bigImage.offsetHeight - birdDom.offsetHeight
            clearInterval( timer )
        }
        // 判断小鸟是否超出了上边界
        //如果bird.y的值小于0,表示超出了上边界
        //如果bird.y的值等于0,表示正好到达顶部
        if ( bird.y < 0 )
        {
            bird.y = 0
            clearInterval( timer )

        }
        // 修改小鸟的垂直位置,实现了小鸟在垂直方向上的移动
        bird.entity.style.top = bird.y + 'px'
    }
    // 给文档添加(连续)点击事件,使小鸟的不断变小
    document.addEventListener( 'click', () => bird.speedY = -10 )

} )
