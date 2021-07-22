import { useTranslation } from "react-i18next";
import { Typography, Box, Grid } from '@material-ui/core';

function CountryDetail() {
    const {t} = useTranslation();
    return (
        <div>
            <Box display="flex" alignItems='center' height={1}>
                <Grid container>
                    <Grid item xs={12} className='margin-bottom-50'>
                        <Typography variant='h4'>
                            {t('notFound.linkBroken')}zzz
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default CountryDetail;
