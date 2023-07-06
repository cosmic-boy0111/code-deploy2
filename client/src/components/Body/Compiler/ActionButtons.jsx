import { Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import { CompilerContext } from './Compiler';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

const ActionButtons = () => {
    const {open,openConsole,closeConsole, sizes2, setSizes2, isUpload, setIsUpload, setRun, run, setInput, action, setAction, upload, setUpload, setChecker } = React.useContext(CompilerContext)

    //  openConsole();setSizes2(open ? [520, 'auto'] : [sizes2[0] - 160, 250])
    // setAction(null)
    // setOpen(false);

  

    const makeAction = (action) => {
        if (action === "Console") {
            openConsole();
            setAction(action)
        }
        if (action === "Run") {
            setRun(!run);
            openConsole();
            setAction(action);
        }
        if (action === 'Submit') {

            openConsole();
            setAction(action);
            setUpload(!upload);
            setIsUpload(false);
            setChecker([]);
            localStorage.removeItem('cases')
        }
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
        }}>
            <Button size='small' variant="contained" onClick={() => {
                open && action === "Console" ? closeConsole() : makeAction('Console')}
            } 
            >
                Console  {open ? <ArrowDropDownRoundedIcon /> :<ArrowDropUpRoundedIcon />} 
            </Button>
            <div>
                <Button size='small' variant="contained" color="secondary" onClick={() => makeAction('Run')}>
                    Run
                </Button>
                <Button size='small' style={{ marginLeft: '.5rem' }} variant="contained" color="success" onClick={() => makeAction('Submit')}>
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default ActionButtons