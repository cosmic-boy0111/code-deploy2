import { Checkbox, IconButton, Skeleton, TableCell, TableRow } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../App'
import { Theme } from '../../../Theme'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { TabsContext } from './Tabs';
import { ChannelContext } from '../Channel';


const PlaylistTableRow = ({ row, setRows, handleClick, isItemSelected, labelId }) => {

    const { themeToggler } = useContext(AppContext);

    const [checkMouse, setCheckMouse] = useState(false);

    const { setChannelVideos } = React.useContext(ChannelContext)

    const {handleChangePnnel, setExpandVideoId,onEdit, setOnEdit} = useContext(TabsContext)

    const handleEdit = () => {
       
    }


    const handleDelete = async () => {
        
    }


    return (
        <>
            <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
                sx={{ cursor: 'pointer' }}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        onClick={(event) => handleClick(event, row.id)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                            'aria-labelledby': labelId,
                        }}

                    />
                </TableCell>
                <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                    sx={{
                        color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                    }}
                >
                    <div 
                    onMouseEnter={() => setCheckMouse(true)} 
                    onMouseLeave={() => setCheckMouse(false)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <div style={{
                            widows: '100px',
                            height: '50px',
                            margin: '.5rem'
                        }}>
                            {
                                row.file === '' ? <Skeleton animation={false} variant="rounded" width={90} height={50} /> :
                                    <img src={row.file} alt="" srcset="" style={{
                                        width: '100px',
                                        height: '100%',
                                        borderRadius: '5px'
                                    }} />
                            }
                        </div>
                        {
                            checkMouse ? <div style={{
                                display:'flex',
                                justifyContent: 'space-between'
                            }} >
                                <IconButton color='primary' onClick={handleEdit} >
                                    <EditRoundedIcon />
                                </IconButton>
                                <IconButton color='secondary' onClick={handleDelete}>
                                    <DeleteRoundedIcon />
                                </IconButton>
                            </div> :
                                <div style={{
                                    width: '150px',
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: 'nowrap',
                                    fontSize: '15px'
                                }}>

                                    {row.title}
                                </div>
                        }
                    </div>
                </TableCell>
                <TableCell align="right" sx={{
                    color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                }}>
                    {row.date}
                </TableCell>
                <TableCell align="right" sx={{
                    color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                }}>
                    {row.videos}
                </TableCell>
                
            </TableRow>
        </>
    )
}

export default PlaylistTableRow