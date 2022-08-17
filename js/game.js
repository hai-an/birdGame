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
        // 修改小鸟的垂直位置,实现了小鸟在垂直方向上的移动
        bird.entity.style.top = bird.y + 'px'
    }

} )
