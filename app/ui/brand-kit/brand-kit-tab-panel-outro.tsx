'use client'

import {Box, FormControl, InputLabel, MenuItem, Select, TextField, Tooltip, Typography} from "@mui/material";
import InfoOutlined from '@mui/icons-material/InfoOutlined';

import * as React from "react";
import {useState} from "react";

interface Props {
    onOutroDataChange
}

export default function BrandKitTabPanelOutro({onOutroDataChange}: Props) {
    const [callToAction, setCallToAction] = useState('');
    const [customCallToAction, setCustomCallToAction] = useState('')

    const handleCallToActionChange = (event) => {
        setCallToAction(event.target.value);
        onOutroDataChange({callToAction: event.target.value, customCallToAction: customCallToAction});
    };

    const handleCustomCallToActionChange = (event) => {
        setCustomCallToAction(event.target.value);
        if(event.target.value !== '') {
            setCallToAction('')
        }
        onOutroDataChange({callToAction: callToAction, customCallToAction: event.target.value});
    };

    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    }}>
        <Typography variant="h6" component="h2" sx={{
            marginBottom: '42px',
            fontFamily: 'Manrope',
            fontWeight: '600',
            fontSize: '20px',
            lineHeight: '22px'
        }}>
            Outro
            <Tooltip title="Additional information here" placement="top">
                <InfoOutlined sx={{marginLeft: 1, paddingBottom: '1px', fontSize: '20px'}}/>
            </Tooltip>
        </Typography>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '28px',
            width: '100%'
        }}>
            <Typography sx={{fontFamily: 'Manrope', fontWeight: '400', fontSize: '14px', lineHeight: '22px'}}>
                Call to action
            </Typography>
            <FormControl sx={{
                width: '155px',
                "& .MuiInputBase-root": {height: 32},
                borderRadius: '8px', borderColor: '#2237FF'
            }}>
                <InputLabel id="select-label" sx={{
                    marginTop: callToAction ? '0px' : '-5px',
                    fontSize: '13px',
                    lineHeight: '13px'
                }}>Select</InputLabel>
                <Select
                    value={callToAction}
                    id="select-label"
                    label="Select"
                    variant='outlined'
                    onChange={handleCallToActionChange}
                    sx={{"& .MuiSelect-select": {fontSize: '13px'}}}
                >
                    <MenuItem value={'Listen on Spotify'}>Listen on Spotify</MenuItem>
                    <MenuItem value={'Listen on Apple'}>Listen on Apple</MenuItem>
                    <MenuItem value={'Listen on Google'}>Listen on Google</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
        }}>
            <Typography sx={{fontFamily: 'Manrope', fontWeight: '400', fontSize: '14px', lineHeight: '22px'}}>
                Custom call to action
            </Typography>
            <TextField
                sx={{
                    width: '352px', marginTop: '7px', "& .MuiInputBase-root": {
                        height: '118px'
                    }, "& .MuiFormHelperText-root": {fontSize: '13px', marginLeft: 'auto'}
                }}
                variant="outlined"
                margin="normal"
                value={customCallToAction}
                onChange={handleCustomCallToActionChange}
                rows={4}
                helperText={`${customCallToAction.length}/${20}`}
                multiline
                inputProps={{maxLength: 20}}
            />
        </Box>
    </Box>
}