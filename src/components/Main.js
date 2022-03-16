import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  const [people, setPeople] = useState(null);
  const URL = 'http://localhost:3001/people/';

  const getPeople = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setPeople(data);
  };

  const createPeople = async (person) => {
    // make post request to create people
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };

  const updatePeople = async (person, id) => {
    // make put request to create people
    await fetch(URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    });
    getPeople();
  };

  const deletePeople = async (id) => {
    // make delete request to create people
    await fetch(URL + id, {
      method: "DELETE",
    });
    getPeople();
  };

  useEffect(() => getPeople(), []);

    return (
        <main>
          <Switch>
            <Route exact path="/">
              <Index people={people} createPeople={createPeople}/>
            </Route>
            <Route 
            path="/people/:id" 
            render={(ep) => (
              <Show 
                {...ep} 
                people={people}
                updatePeople={updatePeople}
                deletePeople={deletePeople}
              />
              )} 
              />
          </Switch>
        </main>
      );
}

export default Main;