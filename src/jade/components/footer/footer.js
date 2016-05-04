function initialize() {
    var isDraggable = $(document).width() > 700 ? true : false;
    var mapProp = {
        center:new google.maps.LatLng(50.0517861,14.4581749),
        zoom:16,
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false,
        draggable:isDraggable,
        disableDoubleClickZoom: true,
        styles:[
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#979797"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ],
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };


    var map = new google.maps.Map(document.getElementById("map"),mapProp);

    var marker = new google.maps.Marker({
        position: {lat: 50.0517861, lng:14.4581749 },
        map: map,
        title: 'HlavoDesign'
    });
    marker.setIcon('../images/marker.png')

}
google.maps.event.addDomListener(window, 'load', initialize);