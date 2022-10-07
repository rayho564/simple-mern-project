import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // run code only when data changes
  // don't turn useEffect to async because it goes against what it expects which is not a promise
  useEffect(() => {
    
    const fetchUsers = async () => {

      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );
        setLoadedUsers(responseData.users);
      } catch (err) {

      }
    };

    fetchUsers();
  }, [sendRequest]); 
  // Dependency required because it is used on outside of the useEffect
  // That's why we wrap sendRequest in useCallback so it doesn't keep creating it when calling use HttpClient and sendRequest

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
