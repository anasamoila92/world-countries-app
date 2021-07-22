import { useTranslation } from "react-i18next";
import {Box, Grid, TextField, FormControl, Button, Tooltip} from '@material-ui/core';
import {FilterList} from "@material-ui/icons";

function NotFound({...props}) {
    const {t} = useTranslation();
    return (
        <div className='margin-bottom-30'>
            <Box display="flex" alignItems='center' height={1}>
                <Grid container>
                    <Grid item xs={2}>
                        <Tooltip title="Filter list">
                            <Button color="primary" startIcon={<FilterList />}>
                                {t('homepage.filters')}
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={10}>
                        <FormControl className='margin-right-20'>
                            <TextField
                                id="countryName"
                                name="countryName"
                                label={t('homepage.countryName')}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={props.handleFilterChange}
                            />
                        </FormControl>
                        <FormControl className='margin-right-20'>
                            <TextField
                                id="currency"
                                name="currency"
                                label={t('homepage.currency')}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={props.handleFilterChange}
                            />
                        </FormControl>
                        <FormControl className='margin-right-20'>
                            <TextField
                                id="language"
                                name="language"
                                label={t('homepage.language')}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={props.handleFilterChange}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="population"
                                name="population"
                                label={t('homepage.population')}
                                type="number"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={props.handleFilterChange}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default NotFound;
