import React, { useState, useRef, useEffect } from "react";
import AuthService from "../../services/auth.service";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";

import GridService from "../../services/grid.service";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import GridTextFilterComponent from "../../shared/components/grid-filters/grid-text-filter.component/grid-text-filter.component";

import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import GridHeaderCheckbox from "../../shared/components/grid-header-checkbox.component";

const API_URL = process.env.REACT_APP_API_ENDPOINT;

const ContactList = () => {
  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    var datasource = GridService.ServerSideDatasource("contact/list");
    params.api.setServerSideDatasource(datasource);
  };

  useEffect(() => {
    if (!user) navigate("/auth/login");
  }, []);

  if (!user) return <></>;

  return (
    <div className="container-fluid">
      <header className="jumbotron">
        <h3>
          Contact List
          <Button
            className="fl-right"
            component={Link}
            to="/app/contact/create"
            variant="outlined"
          >
            Create
          </Button>
        </h3>
      </header>

      <div className="ag-theme-alpine" style={{ height: "80vh" }}>
        <AgGridReact
          ref={gridRef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          modules={[ServerSideRowModelModule]}
          defaultColDef={{
            minWidth: 80,
            resizable: true,
            floatingFilter: true,
          }}
          frameworkComponents={{
            customTextFloatingFilter: GridTextFilterComponent,
          }}
          rowModelType={"serverSide"}
          serverSideStoreType={"partial"}
          cacheBlockSize={10}
          onGridReady={onGridReady}
        >
          <AgGridColumn
            field="fullName"
            sortable={true}
            filter="agTextColumnFilter"
            headerCheckboxSelection={true}
            headerCheckboxSelectionFilteredOnly={true}
            headerComponentFramework={GridHeaderCheckbox}
            checkboxSelection={true}
            pinned="left"
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>

          <AgGridColumn
            field="companyName"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="status"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="email"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="phone"
            headerName="Phone Number"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="extension"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="department"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="jobTitle"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="address1"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="address2"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="birthDate"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="city"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="state"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="zipcode"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="createdBy"
            headerName="Created By"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="createdAt"
            headerName="Created Date"
            sortable={true}
            filter={true}
            lockPinned={true}
            valueFormatter={GridService.dateFormatter}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="updatedBy"
            headerName="Updated By"
            sortable={true}
            filter={true}
            lockPinned={true}
            suppressMenu={true}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="updatedAt"
            headerName="Updated Date"
            sortable={true}
            filter={true}
            lockPinned={true}
            valueFormatter={GridService.dateFormatter}
            floatingFilterComponent="customTextFloatingFilter"
            floatingFilterComponentParams={{
              suppressFilterButton: true,
            }}
          ></AgGridColumn>

          <AgGridColumn
            headerName="Action"
            width="80"
            sortable={false}
            filter={false}
            pinned="right"
            lockPinned={true}
          ></AgGridColumn>
        </AgGridReact>
      </div>
    </div>
  );
};

export default ContactList;
