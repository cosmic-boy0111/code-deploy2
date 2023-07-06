import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../App'
import { Theme } from '../../../Theme'
import { PrepareQuizContext } from './PrepareQuiz'


import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, CardMedia, Divider, Fab, IconButton, Switch, TextField, Tooltip } from '@mui/material';

import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import CustomizedMenus from './QestionTypes'

import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Card = ({
    index,
    question,
    question_type,
    isRequired,
    options,
    question_img
}) => {



    const { Add, Copy, Update, Delete, uploadQuestionImage, deleteQuestionImage, setData, data } = useContext(PrepareQuizContext)

    const { themeToggler } = useContext(AppContext)

    const [question_options, setQuestion_options] = useState([]);

    useEffect(() => {
        setQuestion_options(options)
    }, [data, options])


    const addOption = () => {
        setQuestion_options((pre) => {
            return [...question_options, `Option ${question_options.length + 1}`]
        })
        setData((pre) => {
            var result = Array.from(pre);
            result[index] = {
                ...result[index],
                'options': [...result[index].options, `Option ${result[index].options.length + 1}`],
            }
            return result;
        })

        Update(index, {
            ...data[index],
            'options': [...data[index].options, `Option ${data[index].options.length + 1}`],
        })
    }

    const removeChoice = async (pos) => {

        // console.log('under remove ' + index);

        // setQuestion_options(arr)



        setData(prevData => {
            const newOptions = question_options.filter((option, i) => i !== pos);

            const newData = [...prevData];
            newData[index] = {
                ...prevData[index],
                'options': newOptions
            };
            console.log(newData);
            setQuestion_options(newOptions);
            return newData;
        });

        Update(index, {
            ...data[index],
            'options': question_options.filter((option, i) => i !== pos)
        })

    }

    const [text, setText] = useState('');

    const changeQuestion = (val) => {
        setText(val)
        setData((pre) => {
            var result = Array.from(pre);
            result[index] = {
                ...result[index],
                'question': val,
            }
            return result;
        })
    }

    useEffect(() => {
        if (text !== '') {
            const updateQuestionDelay = setTimeout(() => {
                Update(index, {
                    ...data[index],
                    'question': text,
                })
            }, 3000)

            return () => clearTimeout(updateQuestionDelay)
        }
    }, [text])

    const setType = (type) => {
        setData((pre) => {
            var result = Array.from(pre);
            result[index] = {
                ...result[index],
                'question_type': parseInt(type),
            }
            return result;
        })

        Update(index, {
            ...data[index],
            'question_type': parseInt(type)
        })
    }

    const toggleRequired = () => {
        setData((pre) => {
            var result = Array.from(pre);
            result[index] = {
                ...result[index],
                'isRequired': !result[index].isRequired,
            }
            return result;
        })

        Update(index, {
            ...data[index],
            'isRequired': !data[index].isRequired,
        })
    }

    const setChangeOptions = (pos, val) => {
        question_options[pos] = val;
        setQuestion_options([...question_options]);
        setData((pre) => {
            var result = Array.from(pre);
            result[index] = {
                ...result[index],
                'options': question_options,
            }
            return result;
        })
    }

    const updateOptionsValues = () => {
        Update(index, {
            ...data[index],
            'options': question_options
        })
    }

    const onFileChange = (e) => {
        const file = e.target.files[0]
        uploadQuestionImage(file, index);
    }


    return (
        <>
            <div style={{
                marginTop: '1rem',
                marginBottom: '1rem',
                borderRadius: '5px',
                backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                padding: '1rem',
                color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
            }} >
                <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    <Grid item xs={6} md={7}>
                        <Item style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            boxShadow: 'none',
                            textAlign: 'left',
                            padding: '0',
                        }} >
                            <TextField
                                inputProps={{
                                    style: {
                                        color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                                    }
                                }}
                                sx={{
                                    "& label": {
                                        color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                                        "& .MuiInputBase-input.MuiInput-input.Mui-disabled": {
                                            color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                                        }
                                    }
                                }}
                                style={{
                                    width: '100%'
                                }}
                                multiline={true}
                                minRows={1}
                                id="filled-basic"
                                label={'Question'}
                                variant="standard"
                                value={question}
                                onChange={(e) => changeQuestion(e.target.value)}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={5}>
                        <Item style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            boxShadow: 'none',
                            padding: '0',
                            textAlign: 'left'
                        }} >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }} >

                                <IconButton color="primary" aria-label="upload picture" component="label">
                                    <input hidden accept="image/*" type="file" onChange={onFileChange} />
                                    <InsertPhotoRoundedIcon />
                                </IconButton>

                                <CustomizedMenus setType={setType} />
                            </div>

                        </Item>
                    </Grid>
                </Grid>
                {
                    question_img === '' ? null :
                        <CardMedia style={{
                            display: 'flex',
                            padding: '1rem 0',
                        }} >
                            <div style={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                            }}>

                                <IconButton size="small" color="primary" aria-label="upload picture" component="label">
                                    <input hidden accept="image/*" type="file" onChange={onFileChange} />
                                    <ChangeCircleRoundedIcon />
                                </IconButton>
                                <IconButton size="small" color="secondary" aria-label="add" onClick={()=>deleteQuestionImage(index)} >
                                    <DeleteRoundedIcon />
                                </IconButton>
                            </div>
                            <img src={question_img} alt="" srcset="" style={{
                                width: '92%',
                                // paddingRight: '1rem',
                                // objectFit: 'contain',
                                borderRadius:'5px'
                            }} />
                        </CardMedia>
                }
                <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    <Grid item xs={6} md={7}>
                        <Item style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            boxShadow: 'none',
                            textAlign: 'left',
                            padding: '0',
                        }} >
                            {
                                question_type === 0 ? <>
                                    <div style={{
                                        width: '100%',
                                        paddingBottom: '.5rem',
                                        marginTop: '1rem',
                                        borderBottom: '1px dashed rgba(0, 0, 0, 0.42)',
                                        color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                                    }} >
                                        Short Answer Text
                                    </div>
                                </> :
                                    question_type === 1 ? <>
                                        <div style={{
                                            width: '100%',
                                            paddingBottom: '.5rem',
                                            marginTop: '1rem',
                                            borderBottom: '1px dashed rgba(0, 0, 0, 0.42)',
                                            color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                                        }} >
                                            Long Answer Text
                                        </div>

                                    </> : <>
                                        <div style={{
                                            width: '100%',
                                            marginTop: '1.5rem',
                                        }}>
                                            {
                                                question_options.map((choice, index) => {
                                                    return <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        width: '100%',
                                                        marginBottom: '1rem'
                                                    }}>
                                                        {
                                                            question_type === 2 ? <RadioButtonUncheckedRoundedIcon color='primary' /> : <CheckBoxOutlineBlankRoundedIcon color='primary' />

                                                        }
                                                        <TextField
                                                            // onChange={(e) => setOption(e.target.value, index)}
                                                            // onBlur={() => checkOutOfFocus(index)}
                                                            style={{
                                                                width: '100%',
                                                                marginLeft: '.7rem',
                                                            }}
                                                            inputProps={{
                                                                style: {
                                                                    color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                                                                }
                                                            }}
                                                            sx={{
                                                                "& label": {
                                                                    color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                                                                }
                                                            }}
                                                            value={choice}
                                                            onBlur={updateOptionsValues}
                                                            onChange={(e) => setChangeOptions(index, e.target.value)}
                                                            id="filled-basic"
                                                            variant="standard"
                                                        />
                                                        {
                                                            options.length > 1 ?
                                                                <IconButton onClick={() => removeChoice(index)}>
                                                                    <CloseRoundedIcon color='secondary' />
                                                                </IconButton> : null
                                                        }

                                                    </div>
                                                })
                                            }
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>

                                                {
                                                    question_type === 2 ? <RadioButtonUncheckedRoundedIcon color='primary' /> : <CheckBoxOutlineBlankRoundedIcon color='primary' />
                                                }
                                                <Button style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}
                                                    onClick={addOption}
                                                >
                                                    <div style={{
                                                        width: '100%',
                                                        // marginLeft: '.7rem',
                                                        color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                                                    }}
                                                    >
                                                        Add Option
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                            }

                        </Item>
                    </Grid>
                </Grid>
                <Divider style={{
                    margin: '1.5rem 0'
                }} />
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                    }} >
                        <Tooltip title="Add After">
                            <IconButton color="primary" aria-label="save" onClick={() => Add(index + 1)}>
                                <AddRoundedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Duplicate">
                            <IconButton color="primary" aria-label="save" onClick={() => Copy(index + 1)} >
                                <ContentCopyRoundedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton color="primary" aria-label="save" onClick={() => Delete(index)} >
                                <DeleteRoundedIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider orientation="vertical" style={{
                            margin: '0 .5rem'
                        }} />
                        <div>
                            <span> Required </span>

                            <Switch checked={isRequired} onChange={toggleRequired} />

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Card
