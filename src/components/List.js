import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Editable from 'react-editable-title'
import "./List.scss";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  table: {
    minWidth: 650,
  },
}));

function createData(name, action) {
  return { name, action };
}

const lists = JSON.parse(localStorage.getItem('currentListsLocalStorage')||[])
const rows = lists.map(function (list) {
 
  return (createData(list, "actions"))
})


const List = (props) => {
  const classes = useStyles();
  const [text, setText] = useState(lists);
  const [focused, setFocused] = useState(false);


  const handleEditCancel = () => {
    console.log("First editable title`s edit has been canceled");
  };

  const handleTextUpdate = current => {
    setText(current);
  };

  return (
    <React.Fragment>
    <div>

      <h1> My Lists</h1>
      <TableContainer component={Paper} className="table">
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><strong>List Name</strong></TableCell>
            <TableCell align="center"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" align="center" >   
                  {/* TODO   edit and delete       */}
                <Editable
                  text={text}
                  saveOnBlur={false}
                  editButton
                  editControlButtons
                  placeholder="Type here"
                  cb={handleTextUpdate}
                  onEditCancel={handleEditCancel}
                  isFocused={focused}
                />
              </TableCell>
              <TableCell align="center">
          <button
            onClick={() => {
              setFocused(!focused);
            }}
          >        
          </button>
          <IconButton aria-label="delete"> <DeleteIcon onClick={() => props.deleteListCallback(props.list_id)} />
          </IconButton>
          </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      <div className="fab">
      <Fab  aria-label="add" >
        <AddIcon />
      </Fab>  
      </div>
    </div>
    </React.Fragment>
  )
}

export default List;