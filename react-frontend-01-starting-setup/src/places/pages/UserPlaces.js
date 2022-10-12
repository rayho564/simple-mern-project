import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

// const DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "Empire State Building",
//     description: "One of the most famous sky scrapers in the world",
//     imageUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg",
//     address: "20 W 34th St., New York, NY 10001",
//     location: {
//       lat: 40.7484405,
//       lng: -73.9878531,
//     },
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     title: "Empire State Building",
//     description: "One of the most famous sky scrapers in the world",
//     imageUrl:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg",
//     address: "20 W 34th St., New York, NY 10001",
//     location: {
//       lat: 40.7484405,
//       lng: -73.9878531,
//     },
//     creator: "u2",
//   },
// ];

const UserPlaces = (props) => {
  const [ loadedPlaces, setLoadedPlaces ] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // useParams takes advantage of the dynamic segments set by /: in Route
  const userId = useParams().userId;
  // filter (grab and store in a new array that matches the userId)
  //const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );

        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };

    fetchPlaces();
  }, [sendRequest, userId, setLoadedPlaces]);

  const placeDeletedHandler = deletePlaceId => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletePlaceId));
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />}
    </React.Fragment>
  );
};

export default UserPlaces;
