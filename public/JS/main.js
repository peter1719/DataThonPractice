

Vue.component('data_card', {
    props: [
        'title',
        'info'
    ],
    template: `
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">{{ title }}</h4>
                        <p class="card-text">{{ info }}</p> 
                    </div>
                </div>
            </div>
    `
})

var infos = [
    {
        title: '1',
        info: '資訊1'
    },
    {
        title: '2',
        info: '資訊2'
    },
    {
        title: '3',
        info: '資訊3'
    },
    {
        title: '4',
        info: '資訊4'
    }
]

let app = new Vue({
    el: "#app",
    data: {
        infos: infos
    }

})

let appMap = new Vue({
    el: "#appMap",
    data: {
        map: null,
        input_place: "Taiwan",
        lat: 25.0325917,
        lng: 121.5624999
    },
    mounted() {
        this.initMap()
        this.setMarker()
        this.placeSearch()
    },
    methods: {
        // 建立地圖
        initMap() {
            this.map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: this.lat, lng: this.lng },
                zoom: 15,
                maxZoom: 20,
                minZoom: 3,
                streetViewControl: false,
                mapTypeControl: false
            })
        },
        // 建立地標
        setMarker() {
            const marker = new google.maps.Marker({
                position: { lat: this.lat, lng: this.lng },
                map: this.map
            })
            // 透過 InfoWindow 物件建構子建立新訊息視窗
            const infowindow = new google.maps.InfoWindow({
                // 設定想要顯示的內容
                content: `
              <div id="content">
                <p id="firstHeading" class="firstHeading">好食餐廳</p>
              </div>
            `,
                // 設定訊息視窗最大寬度
                maxWidth: 200
            })
            marker.addListener("click", () => {
                // 指定在哪個地圖和地標上開啟訊息視窗
                infowindow.open(this.map, marker)
            })
        },
        placeSearch() {
            // Create the search box and link it to the UI element.
            const input = document.getElementById("pac-input")
            const searchBox = new google.maps.places.SearchBox(input)
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)
            // Bias the SearchBox results towards current map's viewport.
            map.addListener("bounds_changed", () => {
                searchBox.setBounds(map.getBounds())
            })
            let markers = []
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener("places_changed", () => {
                const places = searchBox.getPlaces()

                if (places.length == 0) {
                    return
                }
                // Clear out the old markers.
                markers.forEach(marker => {
                    marker.setMap(null)
                })
                markers = []
                // For each place, get the icon, name and location.
                const bounds = new google.maps.LatLngBounds()
                places.forEach(place => {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry")
                        return
                    }
                    const icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    }
                    // Create a marker for each place.
                    markers.push(
                        new google.maps.Marker({
                            map,
                            icon,
                            title: place.name,
                            position: place.geometry.location
                        })
                    )

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport)
                    } else {
                        bounds.extend(place.geometry.location)
                    }
                })
                map.fitBounds(bounds)
            })
        }
    }

})



let appChart = new Vue({
    el: "#appChart",
    data: {
        chartData: {
            columns: ['日期', '銷售額'],
            rows: [
                { '日期': '1月1日', '銷售額': 123 },
                { '日期': '1月2日', '銷售額': 1223 },
                { '日期': '1月3日', '銷售額': 2123 },
                { '日期': '1月4日', '銷售額': 4123 },
                { '日期': '1月5日', '銷售額': 3123 },
                { '日期': '1月6日', '銷售額': 7123 }
            ]
        }
    }
})