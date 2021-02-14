import React  from 'react'
import { useParams } from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline'
import EnhancedTable from './EnhancedTable'
import makeData from './makeData'
import axios from "axios";

const PropertyList = (props) => {
  const { listId } = useParams();


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
        Header: "Details",
        accessor: "details",
      },
      {
        Header: "Rent",
        accessor: "rent",
      },
      {
        Header: "Price-to-Rent%",
        accessor: "rentRatio",
      },
      {
        Header: "Note",
        accessor: "note",
      },
    ],
    []
  )

  const [data, setData] = React.useState(props.data)
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  return (
    <div>
      <CssBaseline />
      <EnhancedTable
        columns={columns}
        data={data}
        setData={setData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </div>
  )
}

export default PropertyList
