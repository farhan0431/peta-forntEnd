$(function() {


    let menuOpen = true;
    let isDrag = false;
    let up = 0;
    let counterUp = 0;
    let counterDown = 1;
    

   
    $('.card-header button').on('click', function(e) {
        toggleMenu()
    })
    $('.menu-icon').on('click', function(e) {
        if(!isDrag)
        {
            toggleMenu()
        }
       
    })
    $( "#draggable" ).draggable({
        handle: '#headerHandler,#iconHandler',
        delay: 1,
        opacity: .5,
        start: function() {
            isDrag = true;
        },
        drag: function() {
            console.log(isDrag)
        },
        stop: function() {
            setTimeout(()=> {
                isDrag = false; 
            },500)
        }
    });

    $('.input-form').on('focus', function(e) {
        $('#search-layout .input-group').css('width','300px')
        $('#search-layout').css('width','400px')
    })

    $('.input-form').on('focusout', function(e) {
        $('#search-layout .input-group').css('width','150px')
        $('#search-layout').css('width','250px')
    })

    $('.item-up').on('click',function(e) {
        $('.item-menu').css('top',`-${up+=60}px`);
        console.log(up)
        let firstItem = $('.item-active')[counterUp];
        let newItem = $(firstItem).clone();
        $(newItem).addClass('new')
        $('.list-menu').append(newItem)
        counterUp++;
    })

    $('.item-down').on('click',function(e) {
            $('.item-menu').css('top',`-${up-=60}px`);
            console.log(-up)

            let lastItem = $('.item-menu').last();
            

            

            // let newItem = $(lastItem).clone();
            // $('.list-menu').prepend(newItem)
            $(lastItem).remove()
            counterUp--;
        
        
    })

    




   

    function toggleMenu() {

        if(menuOpen)
        {
            $('.menu-list').addClass('menu-close')
            

            setTimeout(()=> {
                $('.menu-icon').css('display','block')
                
            },400)
            menuOpen = !menuOpen;
        }else{
            $('.menu-list').removeClass('menu-close')
            setTimeout(()=> {
                $('.menu-icon').css('display','none')
                
            },300)
            menuOpen = !menuOpen;
        }
    
    }




});
