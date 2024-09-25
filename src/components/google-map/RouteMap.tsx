'use client'

import {useState, useEffect} from 'react';
import {
    APIProvider,
    Map,
    useMap,
    useMapsLibrary
} from '@vis.gl/react-google-maps';

export default function RouteMap() {

    const position = {lat: 24.270706, lng:89.82050}

  return (
    <div className='w-[100%] aspect-video'>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}>
            <Map
                center={position}
                defaultZoom={15}
                fullscreenControl={false}
            >
                <Directions />
            </Map>
        </APIProvider>
    </div>
  )
}


const Directions = () => {
    const map = useMap()
    const routeLibrary = useMapsLibrary("routes")
    const [dircetionService, setDirectionService] = useState<google.maps.DirectionsService>()
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>()
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([])


    useEffect(() => {
        if(!routeLibrary || !map) return;
        setDirectionService(new routeLibrary.DirectionsService())
        setDirectionsRenderer(new routeLibrary.DirectionsRenderer({map}))
    }, [routeLibrary, map])

    useEffect(() => {
        if(!dircetionService || !directionsRenderer) return;

        dircetionService.route({
            origin: {lat: 24.270706, lng: 89.8205023},
            destination: {lat: 24.2755313, lng: 89.8076886},
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true
        }).then(response => {
            directionsRenderer.setDirections(response)
            setRoutes(response.routes)
        })
    }, [dircetionService, directionsRenderer])
    return null
}
