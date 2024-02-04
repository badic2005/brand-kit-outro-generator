'use client'

import * as React from 'react';
import {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BrandKitTabPanelOutro from "@/app/ui/brand-kit/brand-kit-tab-panel-outro";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface Props {
    onOutroDataChange
}

export default function BrandKitTabsPanel({onOutroDataChange}: Props) {
    const [value, setValue] = useState(2);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{display: 'flex', flexGrow: 1}}
        >
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="brand kit tabs"
                sx={{
                    maxHeight: '200px', borderLeft: 1, borderColor: 'divider', flex: 'none', '& .MuiTab-root': {
                        width: '192px',
                        textTransform: 'none',
                        fontFamily: 'Manrope',
                        fontSize: '14px',
                        lineHeight: '22px',
                        fontWeight: '400',
                        paddingLeft: '16px',
                        paddingRight: 0,
                        alignItems: 'flex-start',
                        flexShrink: 0,
                    }, '& .Mui-selected':
                        {
                            fontWeight: '600',
                        }
                }}
                TabIndicatorProps={{
                    style: {
                        left: 0,

                    },
                }}
            >
                <Tab label="Texts" {...a11yProps(0)} />
                <Tab label="Logo" {...a11yProps(1)} />
                <Tab label="Outro" {...a11yProps(2)} />
                <Tab label="Custom brand kit" {...a11yProps(3)} />
            </Tabs>
            <Box
                sx={{flexGrow: 1, width: 0}} // width: 0 важно, чтобы flex-grow знал откуда начинать растягивание
            >
                <TabPanel value={value} index={0}>Texts</TabPanel>
                <TabPanel value={value} index={1}>Logo</TabPanel>
                <TabPanel value={value} index={2}>
                    <BrandKitTabPanelOutro onOutroDataChange={onOutroDataChange}/>
                </TabPanel>
                <TabPanel value={value} index={3}>Custom brand kit</TabPanel>
            </Box>
        </Box>
    );
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{paddingTop: '12px'}}>
                    {children}
                </Box>
            )}
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}