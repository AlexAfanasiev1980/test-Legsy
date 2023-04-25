import React, { useState, useMemo, useCallback } from "react";
import { TCard } from "services/reducers/card-reducer";
import { useSelector } from "react-redux";
import { RootState } from "services/reducers";
import { AgGridReact } from "ag-grid-react";
import { TRow } from "types";

const SimpleComp = (props): JSX.Element => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img src={props.value.props.src} style={{ height: 30 }} />;
};

const currencyFormatter = (params) => {
  return params.value + " ₽";
};


function ApplicationView() {
  const { card, photo } = useSelector((state: RootState) => {
    return state;
  });
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "500px" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [rowData, setRowData] = useState<TRow[]>([]);
  const [columnDefs] = useState([
    {
      field: "Фото",
      maxWidth: 90,
      cellRenderer: SimpleComp,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    {
      field: "Номенклатура",
      maxWidth: 130,
      filter: true,
    },
    { field: "Бренд", filter: true },
    {
      field: "Цена",
      maxWidth: 100,
      valueFormatter: currencyFormatter,
      filter: "agNumberColumnFilter",
    },
    {
      field: "График заказов",
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          type: "column",
          fill: "#2894f0",
          stroke: "#2894f0",
          paddingInner: 0.3,
          paddingOuter: 0.1,
        },
      },
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      floatingFilter: true,
      resizable: false,
    };
  }, []);

  const icons = useMemo(() => {
    return {
      "custom-stats": '<span class="ag-icon ag-icon-custom-stats"></span>',
    };
  }, []);

  const sideBar = useMemo(() => {
    return {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Столбцы",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
        },
        {
          id: "filters",
          labelDefault: "Фильтры",
          labelKey: "filters",
          iconKey: "filter",
          toolPanel: "agFiltersToolPanel",
        },
        {
          id: "customStats",
          labelDefault: "Настройки",
          labelKey: "customStats",
          iconKey: "menu",
          toolPanel: "agFiltersToolPanel",
        },
      ],
      defaultToolPanel: "customStats",
    };
  }, []);

  const onGridReady = useCallback(async (params) => {
    let myFirstPromise = new Promise((resolve, reject) => {
      const data = card.map((el: TCard) => {
        const arrGraph: number[] = [];
        for (let i = 0; i < el.graph.length; i++) {
          arrGraph[i] = el.graph[i].amount;
        }
        const row = {
          Фото: <img src={photo[el.id]} alt='фото' />,
          Номенклатура: el.brandId,
          Бренд: el.brand,
          Цена: el.priceU,
          "График заказов": arrGraph,
        };
        return row;
      });
      if (data.length) {
        resolve(data);
      } else {
        reject('Массив пустой')
      }
      
    });
    myFirstPromise
      .then((rows: TRow[]) => {
          setRowData(rows);
      })
      .catch((err) => console.log(err));
  }, [card, photo]);

  return (
    <>
      <main id='main'>
        <div style={containerStyle}>
          <div style={gridStyle} className='ag-theme-alpine'>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              icons={icons}
              rowSelection={"multiple"}
              suppressRowClickSelection={true}
              sideBar={sideBar}
              onGridReady={onGridReady}
            ></AgGridReact>
          </div>
        </div>
      </main>
    </>
  );
}

export default ApplicationView;