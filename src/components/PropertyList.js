import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import EnhancedTable from "./EnhancedTable";
import EnhancedTableList from "./EnhancedTable";

import axios from "axios";

const PropertyList = () => {
  const { listId } = useParams();
  const [isLoaded, setIsLoaded] = React.useState(false);
  useEffect(() => {
    axios.get(`/investor_list/${listId}`).then((response) => {
      const results = response.data["message"];
      // console.log(listId);
      // console.log(results);

      const p_list = eval(results);

      console.log(p_list);
      const pr_list = p_list.map((p) =>
        eval({
          thumbnail: p.property_type,
          address: p.address,
          listing_status: p.listing_status,
          type: p.property_type,
          details: p.details,
          price: p.price,
          property_id: p.property_id,
          rent: p.rent,
          capRatio: p.capRatio,
          note: p.note,
          monthly_payment: p.monthly_payment,
          capRatio2530: p.capRatio2530,
        })
      );
      // console.log(pr_list);
      setData(pr_list);
      setIsLoaded(true);
    });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Thumbnail",
        accessor: "Thumbnail",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Listing Status",
        accessor: "listing_status",
      },
      {
        Header: "Details",
        accessor: "details",
      },
      {
        Header: "Rent",
        accessor: "rent",
      },
      {
        Header: "Cap Ratio (%)",
        accessor: "capRatio",
      },
      {
        Header: "Monthly Payment",
        accessor: "monthly_payment",
      },
      {
        Header: "25%-30y-Cap(%)",
        accessor: "capRatio2530",
      },
      {
        Header: "Note",
        accessor: "note",
      },
    ],
    []
  );
  const [data, setData] = React.useState([]);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
    if (columnId === "rent") {
      const CAP = ((value * 12) / data[rowIndex]["price"]) * 100;
      const CAP2530 =
        ((value - data[rowIndex]["monthly_payment"]) * 48 * 100) /
        data[rowIndex]["price"];
      setData((old) =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex],
              capRatio: CAP,
              capRatio2530: CAP2530,
            };
          }
          return row;
        })
      );
      const property_id = data[rowIndex]["property_id"];
      const respontse = axios.post(
        `/${JSON.parse(
          localStorage.getItem("currentUserIDLocalStorage")
        )}/${property_id}/${columnId}/${value}`
      );
      console.log(respontse);
      axios.post(
        `/${JSON.parse(
          localStorage.getItem("currentUserIDLocalStorage")
        )}/${property_id}/capRatio/${CAP}`
      );
    }
    if (columnId === "capRatio2530") {
      // add notes to database
      // @app.route("/<investor_id>/<property_id>/<column>/<data>", methods=['POST'])
      const property_id = data[rowIndex]["property_id"];
      const respontse = axios.post(
        `/${JSON.parse(
          localStorage.getItem("currentUserIDLocalStorage")
        )}/${property_id}/${columnId}/${value}`
      );
      console.log(respontse);
    }

    if (columnId === "note") {
      // add notes to database
      // @app.route("/<investor_id>/<property_id>/<column>/<data>", methods=['POST'])
      const property_id = data[rowIndex]["property_id"];
      const respontse = axios.post(
        `/${JSON.parse(
          localStorage.getItem("currentUserIDLocalStorage")
        )}/${property_id}/${columnId}/${value}`
      );
      console.log(respontse);
    }
  };

  return (
    <div>
      <CssBaseline />
      {isLoaded ? (
        <EnhancedTable
          columns={columns}
          data={data}
          setData={setData}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
          listId={listId}
        />
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default PropertyList;
