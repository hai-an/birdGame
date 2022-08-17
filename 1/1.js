( function ()
{
    window.addEventListener( 'load', function ()
    {
        console.log( 'load' );
        alert( 'hello word 外链式' )
        let s = document.querySelector( 'input' )
        s.addEventListener( 'click', () =>
        {
            alert( '\(^o^)/~  外链式==点击' )
        } )
    } )
}() )
