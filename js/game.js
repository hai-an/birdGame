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
    let gameOver = false  // 表示游戏结束，游戏结束取值为true,否则为false
    // 创建小鸟对象
    const bird = {
        entity: birdDom,
        x: birdDom.offsetLeft,// 获取小鸟在背景图像中的水平位置
        y: birdDom.offsetTop, // 表示小鸟在背景图片中的垂直位置
        speedX: 5, // 表示小鸟在水平方向的速度
        speedY: 0// 表示小鸟在垂直方向的速度
    }
    // 开启定时器:  天空背景左移动 ,小鸟向下移动
    let timer = setInterval( function ()
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
            gameOver = true
            clearInterval( timer )
            stopRun( gameOver )
        }
        // 判断小鸟是否超出了上边界
        //如果bird.y的值小于0,表示超出了上边界
        //如果bird.y的值等于0,表示正好到达顶部
        if ( bird.y < 0 )
        {
            bird.y = 0
            gameOver = true
            clearInterval( timer )
            stopRun( gameOver )
        }
        // 修改小鸟的垂直位置,实现了小鸟在垂直方向上的移动
        bird.entity.style.top = bird.y + 'px'
    }, 40 )

    // 给文档添加(连续)点击事件,使小鸟的top值不断变小,然后向上升
    document.addEventListener( 'click', () => bird.speedY = -10 )
    // 通过构造函数创建管道
    function Pipe ( positionX )
    {
        this.x = positionX //表示上下管道的水平位置
        this.width = 52 //上下管道的宽度
        this.topPipeY = 0 //表示的是上管道的垂直方向的位置
        // 随即创建的上管道高度(100~275)
        // Math.random()
        this.topPipeH = parseInt( Math.random() * 175 + 100 )
        // 计算出下管道垂直方向的位置(上管道的高度+上下管道之间的间距)
        this.bottomPipeY = this.topPipeH + 200
        // 计算出下管道的高度
        this.bottomPipeH = 600 - this.bottomPipeY
        // this.bottomPipeH = bigImage.offsetHeight - this.bottomPipeY

        // 根据我们求出来的管道属性,来创建管道
        // 创建上管道
        let divTop = document.createElement( 'div' )
        divTop.className = 'pipeTop'
        // 设置上管道的高度和宽度
        divTop.style.width = this.width + 'px'
        divTop.style.height = this.topPipeH + 'px'
        // 设置上管道的水平位置和垂直位置
        divTop.style.left = this.x + 'px'
        divTop.style.top = this.topPipeY + 'px'

        // 创建下管道
        let divBottom = document.createElement( 'div' )
        divBottom.className = 'pipeBottom'
        // 设置下管道的高度和宽度
        divBottom.style.width = this.width + 'px'
        divBottom.style.height = this.bottomPipeH + 'px'
        // 设置下管道的水平位置和垂直位置
        divBottom.style.left = this.x + 'px'
        divBottom.style.top = this.bottomPipeY + 'px'
        bigImage.appendChild( divTop )
        bigImage.appendChild( divBottom )
        // 移动管道
        let that = this
        let time2 = setInterval( function ()
        {
            // 不断修改管道的x属性值，r让其减1,表示不断的向左移动
            that.x = that.x - 1
            // 判断某个管道是否移除了整个游戏的背景
            // 判断的条件是x小于-52(即是管道的宽度)
            if ( that.x < -52 )
            {
                that.x = 800 //表示把移出的管道,放到了最右边
                // that.x = bigImage.offsetWidth //表示把移出的管道,放到了最右边

            }
            // 游戏没有结束,管道才会继续移动
            if ( !gameOver )
            {
                divTop.style.left = that.x + 'px'
                divBottom.style.left = that.x + 'px'
            } else
            {
                clearInterval( time2 )
            }

            // 撞水管 游戏结束 阶段
            let downPipe =
                bird.x + 33 >= that.x &&
                bird.x <= that.x + 52 &&
                bird.y + 25 >= that.bottomPipeY
            let upPipe =
                bird.x + 33 >= that.x &&
                bird.x <= that.x + 52 &&
                bird.y <= that.topPipeH
            if ( downPipe || upPipe )
            {
                gameOver = true
                clearInterval( timer )
                stopRun( gameOver )
            }
        }, 20 )
    }
    for ( let i = 0; i < 4; i++ )
    {
        new Pipe( 400 + 200 * i )
    }

    // 停止煽动翅膀动画
    function stopRun ( gameOver )
    {
        // 游戏结束
        if ( gameOver )
        {
            birdDom.addEventListener( 'click', function ()
            {
                this.classList.add( 'hover' )
            } )
            birdDom.click()
        } else
        {
            birdDom.removeEventListener( 'click', function ()
            {
                this.classList.remove( 'hover' )
            } )

        }
    }
    // 开启 BGN

    document.onclick = function ( e )
    {
        audio.play()
        console.log( 'e.tager:', e.tager );
        setInterval( () => { this.click() }, 1000 )
    }

} )
