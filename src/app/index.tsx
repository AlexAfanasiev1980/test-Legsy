import React, { useState, useEffect } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { getId, getCards, getPhotos } from "services/api";
import { TCard } from "services/reducers/card-reducer";
import { RootState } from "services/reducers";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const mock = {
  graph: [
    {
    "date": "2023-03-01",
    "amount": 20
    },
    {
    "date": "2023-03-02",
    "amount": 3
    },
    {
    "date": "2023-03-03",
    "amount": 6
    },
    {
    "date": "2023-03-04",
    "amount": 25
    },
    {
    "date": "2023-03-05",
    "amount": 16
    },
    {
    "date": "2023-03-06",
    "amount": 28
    },
    {
    "date": "2023-03-07",
    "amount": 0
    },
    {
    "date": "2023-03-08",
    "amount": 0
    },
    
    {
    "date": "2023-03-09",
    "amount": 1
    },
    {
    "date": "2023-03-10",
    "amount": 0
    },
    {
    "date": "2023-03-11",
    "amount": 0
    },
    {
    "date": "2023-03-12",
    "amount": 3
    },
    {
    "date": "2023-03-13",
    "amount": 23
    },
    {
    "date": "2023-03-14",
    "amount": 8
    },
    {
    "date": "2023-03-15",
    "amount": 3
    }
    ]
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getId()
      .then((data) => {
        Promise.all([getCards(data), getPhotos(data)])
        .then(([cards, photos]) => {

            dispatch({ type: "ADD_PHOTOS", payload: photos });

            return cards.map((card) => {
              return {...card, "graph": mock.graph}
            });
          }
        )
        .then((cards) => {
          dispatch({ type: "ADD_CARDS", payload: cards });
        })
      })
      
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <ApplicationView />
    </div>
  );
}

function ApplicationView() {
  const { card, photo } = useSelector((state: RootState ) => {
    return state;
  });
  const [rowData] = useState([
    {Фото: "Toyota", Номенклатура: "Celica", Бренд: 35000},
    {Фото: "Ford", Номенклатура: "Mondeo", Бренд: 32000},
    {Фото: "Porsche", Номенклатура: "Boxster", Бренд: 72000}
]);
const [columnDefs] = useState([
  { field: 'Фото', filter: true },
  { field: 'Номенклатура' },
  { field: 'Бренд' }
])

  return (
    <>
      <main id='main'>
        <ul>
          {card.map((card: TCard, index) => {
            return (
            <li key={index}>
              <h2>{card.brand}</h2>
              <img src={photo[card.id]} alt="" />
            </li>
            );
          })}
        </ul>
        <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
           <AgGridReact
               rowData={rowData}
               columnDefs={columnDefs}>
           </AgGridReact>
       </div>
      </main>
    </>
  );
}

export default App;
