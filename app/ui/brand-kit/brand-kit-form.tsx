'use client'

import style from './brand-kit-form.module.scss'
import {Box, Button, Divider, LinearProgress, TextField} from "@mui/material";
import Alert from '@mui/material/Alert';
import BrandKitTabsPanel from "@/app/ui/brand-kit/brand-kit-tab-panel";
import * as React from "react";
import {useState} from "react";

export default function BrandKitForm() {
    const [outroData, setOutroData] = useState({callToAction: null, customCallToAction: ''});
    const [brandKitName, setBrandKitName] = useState('')
    const [loading, setLoading] = useState(false)
    const [isOpenAlert, setIsOpenAlert] = useState({isOpen: false, isError: false, message: ''})

    const handleOutroDataChange = (data: any) => {
        setOutroData(data);
    };

    const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const data = {...outroData, brandKitName}
        setLoading(true)
        fetch('http://localhost:3001/api/generate-outro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                setLoading(false)
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(result => {
                setIsOpenAlert({isOpen: true, isError: false, message: result.message})
                setInterval(() => setIsOpenAlert({isOpen: false, isError: false, message: ''}), 3000)
            })
            .catch(err => {
                setLoading(false)
                setIsOpenAlert({isOpen: true, isError: true, message: err.message})
                console.log('Error posting data:', err)
            });

    }

    return <React.Fragment>
        <Box className={style.whiteBlock}>
            <Box className={style.container}>
                <Box sx={{display: 'flex', marginBottom: '68px'}}>
                    <p className={style.name}>Brand kit name</p>
                    <TextField
                        label="My brand kit"
                        onChange={e => setBrandKitName(e.target.value)}
                        sx={{
                            width: '256px', "& .MuiInputBase-root": {height: 32, fontSize: '13px', lineHeight: '16px'},
                            borderRadius: '8px', borderColor: '#2237FF',
                            "& .MuiInputLabel-root": {fontSize: '13px', marginTop: brandKitName ? '0px' : '-7px'},
                        }}
                    />
                </Box>
                <BrandKitTabsPanel onOutroDataChange={handleOutroDataChange}/>
                {loading ? <LinearProgress sx={{marginTop: '25px', marginBottom: '24px'}}/> :
                    <Divider sx={{marginTop: '25px', marginBottom: '24px'}}/>}
                <Box sx={{display: 'flex'}}>
                    <Button variant="contained" disabled={loading} className={style.saveButton}
                            onClick={handleSaveClick}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Box>
        {isOpenAlert.isOpen && <Alert className={style.alert}
                                      severity={isOpenAlert.isError ? 'error' : 'success'}
                                      onClose={() => setIsOpenAlert({
                                          isOpen: false,
                                          isError: false,
                                          message: ''
                                      })}>{isOpenAlert.message}</Alert>}
    </React.Fragment>
}