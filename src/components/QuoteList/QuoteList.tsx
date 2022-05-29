import React, { useState, useEffect, Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Drawer } from "@material-ui/core";
import { AgGridReact } from "@ag-grid-community/react";

import PageHeading from "../../shared/components/PageHeading";
import AuthService from "../../services/auth.service";
import QuoteService from "../../services/quote.service";

import toast from "../../utils/toast.util";
import QuoteConfig from "./quote.config";
import GridListView from "../../shared/components/GridListView";
import { MenuItem } from "../../shared/models/MenuList.model";

import AddQuote from "./AddQuote";

const QuoteList = () => {
  let navigate = useNavigate();
  const gridRed = useRef<AgGridReact>(null);
  const [mainMenus, setMainMenus] = useState<MenuItem[]>(QuoteConfig.mainMenus);
  const [selectedIds, setSelectedIds] = useState<any[]>([]);

  const [addDrawer, setAddDrawer] = useState(false);

  const deleteAction = (ids) => (
    <Fragment>
      <Button onClick={() => confirmDelete(ids)}>Confirm</Button>
      <Button onClick={() => toast.close()}>Close</Button>
    </Fragment>
  );

  const confirmDelete = (ids) => {
    toast.close();
    QuoteService.deleteRange(ids)
      .then((response) => {
        toast.success(response.message);
        gridRed.current?.api?.refreshServerSideStore();
      })
      .catch((error) => toast.success(error?.message));
  };

  const deleteQuote = (ids) => {
    toast.warning("Are you sure, you want to delete?", {
      action: () => deleteAction(ids),
    });
  };

  const closeDrawer = () => {
    setAddDrawer(false);
  };

  const onAddSuccess = () => {
    gridRed.current?.api?.refreshServerSideStore();
  };

  const menuCallbackFun = ({ event, data, menu }) => {
    switch (menu?.key) {
      case "create":
        setAddDrawer(true);
        // navigate(`/app/quote/create`);
        break;
      case "delete":
        deleteQuote([data.id]);
        break;
      case "deletes":
        selectedIds.length && deleteQuote(selectedIds);
        break;
      case "edit":
        break;
      case "selectRow":
        setSelectedIds(data);
        const menus = mainMenus.map((menu) => {
          if (!menu.alwaysEnable) menu.disabled = data.length === 0;
          return menu;
        });
        setMainMenus(menus);
        break;
    }
  };

  const user = AuthService.getCurrentUser();
  useEffect(() => {
    if (!user) navigate("/auth/login");
  }, []);
  if (!user) return <></>;

  return (
    <Fragment>
      <PageHeading
        title="Quote List"
        menus={mainMenus}
        menuCallback={menuCallbackFun}
      />

      <GridListView
        innerRef={gridRed}
        options={QuoteConfig}
        callbackFun={menuCallbackFun}
      />

      <Drawer
        anchor="right"
        open={addDrawer}
        onClose={closeDrawer}
        ModalProps={{ disableEnforceFocus: true }}
      >
        <AddQuote onCloseDrawer={closeDrawer} onAddSuccess={onAddSuccess} />
      </Drawer>
    </Fragment>
  );
};

export default QuoteList;
