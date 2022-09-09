import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  // Current a dummy data until we use real data
  const USERS = [
    {
      id: "u1",
      name: "Raymond Ho",
      image:
        "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/WOPA160517_D056-resized.jpg?crop=864%2C0%2C1728%2C2304&wid=600&hei=800&scl=2.88",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
