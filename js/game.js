window.addEventListener( 'load', function ()
{
    let bigImage = document.querySelector( '#game' )
    let birdDom = document.querySelector( '.brid' )
    // 定义一个对象来表示背景的位置
    const sky = {
        position: 0
    }
    // 创建小鸟对象
    const bird = {
        entity: birdDom,
        x: birdDom.offsetLeft,
        y: birdDom.offsetTop,
        speedX: 5,
        speedY: 0
    }
    //
    var timer = setInterval( move, 20 )
    function move ()
    {
        sky.position = sky.position - bird.speedX
        bigImage.style.backgroundPositionX = sky.position + 'px'
    }

} )
