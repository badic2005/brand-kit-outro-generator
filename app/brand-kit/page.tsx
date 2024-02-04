import style from './brand-kit.module.scss'
import BrandKitForm from "@/app/ui/brand-kit/brand-kit-form";
import {Box, Typography} from "@mui/material";

export default function Page() {
    return <Box sx={{backgroundColor: '#F9F8F8'}}>
        <Box className={style.container}>
            <Typography variant="h4" gutterBottom className={style.title}>
                Brand Kit
            </Typography>
            <Typography variant="subtitle1" gutterBottom className={style.description}>
                Here you can set the brand kit for your Short-Form clips. Note, long-form videos are not affected by
                this brand kit.
            </Typography>
            <BrandKitForm />
        </Box>
    </Box>
}