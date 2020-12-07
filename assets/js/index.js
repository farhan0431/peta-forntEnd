$(function() {


    var map;
    let isAdd = false;
    var newMarker = [];
    var newLine = [];
    var geojson;
    let firstLine = false;
    let counter = 0;
    let lineColor = 'red';
    let menuOpen = true;
    let isDrag = false;

    

    loadMap()


    map.on('click', function(e) {
        // document.getElementById('info').innerHTML =
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        // JSON.stringify(e.point) +
        // '<br />' +
        // e.lngLat is the longitude, latitude geographical position of the event
        // JSON.stringify(e.lngLat.wrap());
        if (isAdd) {
            setMarker(e.lngLat.lng, e.lngLat.lat)
        }

    });

    $('#button-add').on('click', function(e) {
        isAdd = !isAdd;
        $('#addLayout').addClass('goRight');
        $('#undoLayout').removeClass('goRight');
        $('.layers-select').css('display', 'none')
        $('.side-menu .card .card-body').append(`
    <div class="loading-display spinner-grow text-success" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    <div class="loading-display spinner-grow text-success" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    <div class="loading-display spinner-grow text-success" role="status">
        <span class="sr-only">Loading...</span>
    </div>


    `)
        setTimeout(() => {
            $('.loading-display').remove();
            $('.marker-add').css('display', 'block');
        }, 500)
    })

    $('#button-undo').on('click',function(e) {
        undoLine()
    })
    $('#button-delete').on('click',function(e) {
        deleteMarker()
        console.log('asd')
    })
    $('#colorpicker').farbtastic(function(color) {
        lineColor = color;
        console.log(lineColor)
        map.removeLayer('line').removeSource('line')
        generateLine()
    })
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
    



    // all function
    function loadMap() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZmhhbjA0MzEiLCJhIjoiY2tpOW83b2kwMDRhMTJybXMwMjB6ZmVzNiJ9.7UQSqyJrky5ltWA5mMuzQw'
        map = new mapboxgl.Map({
            container: 'map',
            center: [120.0203, -3.7739],
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 9
        })
    }


    function setMarker(lng, lat) {



        // var el = document.createElement('div');
        // el.className = 'marker';
        // el.style.backgroundImage = 'url(' + img_url + ')';

        newMarker[counter++] = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map)
        
        
        newLine.push([lng, lat])
        if(firstLine)
        {
            map.removeLayer('line').removeSource('line');
        }
        setLineCoord()
        
    }

    function setLineCoord() {
        geojson = {
            'type': 'FeatureCollection',
            'features': [{
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'coordinates':newLine,
                    'type': 'LineString'
                }
            }]
        };

        generateLine()
    }

    function generateLine()
    {
        map.addSource('line', {
            type: 'geojson',
            lineMetrics: true,
            data: geojson
        });

        // the layer must be of type 'line'
        map.addLayer({
            type: 'line',
            source: 'line',
            id: 'line',
            paint: {
                'line-color': lineColor,
                'line-width': 1,
            },
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            }
        });

        firstLine = true;
    }

    function undoLine() {
        if(newLine.length > 0 )
        {
            newLine.pop()
        }
        if(newMarker.length > 0)
        {
            newMarker[newMarker.length - 1].remove()
            newMarker.pop()
        }
        
        if(firstLine)
        {
            map.removeLayer('line').removeSource('line');
        }
        setLineCoord()
    }

    function deleteMarker() {
        if(newLine.length > 0)
        {
            map.removeLayer('line').removeSource('line');
            newMarker.forEach(function(i) {
                i.remove()
                newMarker = []
            })
            firstLine = false;
            newLine = [];
        }
    }

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