import { Typography, Box, Grid } from '@material-ui/core';

function NotFound() {
    return (
        <div className='main'>
            <Box display="flex" alignItems='center' height={1}>
                <Grid container>
                    <Grid item xs={12} className='margin-bottom-50'>
                        <Typography variant='h3'>
                            Error 404
                        </Typography>
                        <Typography variant='h4'>
                            Oops! The link appears to be broken.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default NotFound;
