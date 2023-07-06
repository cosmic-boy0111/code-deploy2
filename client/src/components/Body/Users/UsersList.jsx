import React,{useContext,useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import { visuallyHidden } from '@mui/utils';

import { Button } from '@mui/material';

import { AppContext } from '../../../App';
import { Theme } from '../../Theme';
import { UsersContext } from './UsersPage';


import UserRow from './UserRow';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'profession',
    numeric: true,
    disablePadding: false,
    label: 'Profession',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
  
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort , themeToggler } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox"> */}
          {/* <Checkbox
            // style={{color : themeToggler ? Theme.Dark.Color : Theme.Light.Color}} 
            style={{
              color : '#1976d2'
            }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        {/* </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <span style={{color : themeToggler ? Theme.Dark.Color : Theme.Light.Color}} > {headCell.label} </span>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  themeToggler : PropTypes.number
};

const EnhancedTableToolbar = (props) => {
  const { 
    numSelected  ,   
    themeToggler ,
    name ,
    setName ,
    profession ,
    setProfession ,
    filterUsers ,
    clearList 
  } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
      className='user_list_header'
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 50%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 50%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          USERS
        </Typography>
      )}

      {numSelected > 0 ? (
          <Button variant='contained' color='primary'>
             Follow  
          </Button>
      ) : (
        <div 
        className='input_holder'
        >
          {/* <div className='mx-1'> */}
          <div className='input_buttons'>
        <input
            type="text"
            class="form-control"
            id="title"
            name="name"
            placeholder='Name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            style={{
                  backgroundColor : themeToggler ? Theme.Dark.FadeBackground : Theme.Light.FadeBackground,
                  color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                  boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                  border : themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                  marginLeft:'.3rem'
                }}
          />
          {/* </div> */}
          {/* <div> */}
          <input
            type="text"
            class="form-control second_input"
            id="title"
            name="profession"
            placeholder='Profession'
            value={profession}
            onChange={(e)=>setProfession(e.target.value)}
            style={{
                  backgroundColor : themeToggler ? Theme.Dark.FadeBackground : Theme.Light.FadeBackground,
                  color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                  boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                  border : themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                  marginLeft:'.3rem',
                  
                }}
          />
          </div>
          {/* </div> */}
        <div className='filter_buttons'>
          <Tooltip title="Filter list">
            <Button color='primary' variant='contained' className='mx-1' onClick={filterUsers}>
              <FilterAltIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Clear Filter">
            <Button color='secondary' variant='contained'  onClick={clearList} >
              <CloseIcon />
            </Button>
          </Tooltip>
        </div>
        </div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  themeToggler : PropTypes.number,
  name : PropTypes.string,
  setName : PropTypes.func,
  profession : PropTypes.string,
  setProfession : PropTypes.func,
  filterUsers : PropTypes.func,
  clearList : PropTypes.func
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const {rows , allUsers, setRows } = useContext(UsersContext);

  const [name, setName] = useState('')
  const [profession, setProfession] = useState('')


  const filterUsers = () =>{

    var newArray = allUsers.filter((e)=>{
      return e.name.toLowerCase().includes(name.toLowerCase()) && e.profession.toLowerCase().includes(profession.toLowerCase());
    })

    setRows(newArray);

  }

  const clearList = () =>{
    setRows(allUsers);
    setName('')
    setProfession('')
  }


  const {themeToggler,rootUser} = useContext(AppContext)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} className='table_body' style={{
        backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
        color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
        boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
        border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
      }}>
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          themeToggler={themeToggler} 
          name = {name}
          setName = {setName}
          profession={profession}
          setProfession={setProfession}
          filterUsers = {filterUsers}
          clearList={clearList}
        />
        <TableContainer>
          <Table
            sx={{
              minWidth: 750,
    [`& .${tableCellClasses.root}`]: {
      borderBottom: "none",
      padding:'.7rem .5rem'
    }
  }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              themeToggler = {themeToggler}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <UserRow isItemSelected={isItemSelected} labelId={labelId} row={row} handleClick={handleClick}/>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25 , 40]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{
            color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
          }}
        />
      </Paper>

    </Box>
  );
}
