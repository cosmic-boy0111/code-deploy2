import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
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
import { visuallyHidden } from '@mui/utils';
import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';

import { makeStyles } from '@material-ui/core/styles';
import { ChannelContext } from '../Channel';
import VideoTableRow from './VideoTableRow';
import PlaylistTableRow from './PlaylistTableRow';

const useStyles = makeStyles((theme) => ({
    root: {
        '&$checked': {
            color: theme.palette.primary.main,
        },
        '&$unchecked': {
            border: `1px solid ${theme.palette.grey[400]}`,
        },
    },
    checked: {},
    unchecked: {
        border: '1px solid red'
    },
}));


function createData(id, file, title, date, videos) {
    return {
        id,
        file,
        title,
        date,
        videos
    };
}

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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
        id: 'file',
        numeric: false,
        disablePadding: true,
        label: 'Playlist',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'videos',
        numeric: true,
        disablePadding: false,
        label: 'Videos',
    }

];

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'calories';
const DEFAULT_ROWS_PER_PAGE = 3;

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, themeToggler } =
        props;
    const createSortHandler = (newOrderBy) => (event) => {
        onRequestSort(event, newOrderBy);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
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
                            sx={{
                                color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                            }}
                        >
                            <span style={{
                                color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                            }}>

                                {headCell.label}
                            </span>
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={{
                                    ...visuallyHidden
                                }}>
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
};

function EnhancedTableToolbar(props) {
    const { numSelected, deleteAllSelected } = props;

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
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (

                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Courses
                    {/* <IconButton color='primary' >
                            <FilterListIcon />
                        </IconButton> */}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton color='secondary' onClick={deleteAllSelected}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (<></>

            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function PlaylistList({ rows, setRows }) {
    const [order, setOrder] = React.useState(DEFAULT_ORDER);
    const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [visibleRows, setVisibleRows] = React.useState(null);
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
    const [paddingHeight, setPaddingHeight] = React.useState(0);


    const { themeToggler } = React.useContext(AppContext);

    const { channelVideos, setChannelVideos, playLists } = React.useContext(ChannelContext);





    React.useEffect(() => {

        var TableRows = [];
        playLists.forEach(async (element) => {
            TableRows.push({
                id: element._id,
                file: element.playListImg,
                title: element.name,
                date: element.createdAt.toString().split('T')[0],
                videos: element.videoCount
            })

        });


        let rowsOnMount = stableSort(
            TableRows,
            getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
        );

        rowsOnMount = rowsOnMount.slice(
            0 * DEFAULT_ROWS_PER_PAGE,
            0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
        );

        setVisibleRows(rowsOnMount);
    }, []);

    const handleRequestSort = React.useCallback(
        (event, newOrderBy) => {
            const isAsc = orderBy === newOrderBy && order === 'asc';
            const toggledOrder = isAsc ? 'desc' : 'asc';
            setOrder(toggledOrder);
            setOrderBy(newOrderBy);

            const sortedRows = stableSort(rows, getComparator(toggledOrder, newOrderBy));
            const updatedRows = sortedRows.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            );

            setVisibleRows(updatedRows);
        },
        [order, orderBy, page, rowsPerPage],
    );

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            console.log(newSelected);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };


    const deleteAllSelected = async () => {
        console.log(selected);
        setRows((pre) => {
            return pre.filter((obj) => !selected.includes(obj.id));
        })
        setChannelVideos((pre) => {
            return pre.filter((obj) => !selected.includes(obj._id));
        })
        try {
            const res = await fetch('/deleteVideoBulk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    videoIdArray: selected
                })
            })

            const data = await res.json();
            console.log(data);

        } catch (error) {

        }

        setSelected([])
    }

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

    const isSelected = (name) => selected.indexOf(name) !== -1;

    return (
        <Box sx={{ width: '100%', padding: '0' }}>
            <Paper sx={{
                width: '100%',
                mb: 2,
                boxShadow: 'none',
                backgroundColor: 'transparent',
                color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
            }}>
                <EnhancedTableToolbar numSelected={selected.length} deleteAllSelected={deleteAllSelected} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
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
                            themeToggler={themeToggler}
                        />
                        <TableBody>
                            {rows
                                ? stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <>
                                                <PlaylistTableRow row={row} setRows={setRows} handleClick={handleClick} isItemSelected={isItemSelected} labelId={labelId} />
                                            </>
                                        );
                                    })
                                : null}
                            {paddingHeight > 0 && (
                                <TableRow
                                    style={{
                                        height: paddingHeight,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[3, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                    }}
                />
            </Paper>

        </Box>
    );
}