import React, { useState, useEffect } from "react";
import "./index.scss";
import { useDispatch } from "react-redux";
import { getId, getCards, getPhotos } from "services/api";
import ApplicationView from "pages/ApplicationView";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { TCard } from "services/reducers/card-reducer";
import { TPhoto } from "services/reducers/photo-reducer";

const mock = {
  graph: [
    {
      date: "2023-03-01",
      amount: 20,
    },
    {
      date: "2023-03-02",
      amount: 3,
    },
    {
      date: "2023-03-03",
      amount: 6,
    },
    {
      date: "2023-03-04",
      amount: 25,
    },
    {
      date: "2023-03-05",
      amount: 16,
    },
    {
      date: "2023-03-06",
      amount: 28,
    },
    {
      date: "2023-03-07",
      amount: 0,
    },
    {
      date: "2023-03-08",
      amount: 0,
    },

    {
      date: "2023-03-09",
      amount: 1,
    },
    {
      date: "2023-03-10",
      amount: 0,
    },
    {
      date: "2023-03-11",
      amount: 0,
    },
    {
      date: "2023-03-12",
      amount: 3,
    },
    {
      date: "2023-03-13",
      amount: 23,
    },
    {
      date: "2023-03-14",
      amount: 8,
    },
    {
      date: "2023-03-15",
      amount: 3,
    },
  ],
};

function App() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getId()
      .then((data) => {
        Promise.all([getCards(data), getPhotos(data)])
          .then(([cards, photos]: [cards: TCard[], photos: TPhoto[]]) => {
            dispatch({ type: "ADD_PHOTOS", payload: photos });

            return cards.map((card) => {
              return { ...card, graph: mock.graph };
            });
          })
          .then((cards) => {
            dispatch({ type: "ADD_CARDS", payload: cards });
            setLoading(false);
          });
      })

      .catch((err) => {
        console.log(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {!isLoading && <ApplicationView />}
      {isLoading && (
        <div>
          <h3>...загрузка данных</h3>
        </div>
      )}
    </div>
  );
}


export default App;
