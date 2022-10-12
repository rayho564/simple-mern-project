import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import useForm from "../../shared/hooks/form-hook";
import "./PlaceForm.css";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
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
//     title: "Empire State Building 2",
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

const UpdatePlace = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      }
    },
    false
  );

  // const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setLoadedPlace(responseData.places);
        setFormData(
          {
            title: {
              value: responseData.places.title,
              isValid: true
            },
            description: {
              value: responseData.places.description,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [placeId, sendRequest, setFormData]);

  // useEffect(() => {
  //   if (identifiedPlace) {
  //     setFormData(
  //       {
  //         title: {
  //           value: identifiedPlace.title,
  //           isValid: true
  //         },
  //         description: {
  //           value: identifiedPlace.description,
  //           isValid: true
  //         }
  //       },
  //       true
  //     );
  //   }

  //   setIsLoading(false);
  // }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          "Content-Type": "application/json"
        }
      );
      history.push('/' + auth.userId + '/places');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default UpdatePlace;
