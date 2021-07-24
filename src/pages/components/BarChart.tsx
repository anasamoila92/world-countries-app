import { useTranslation } from "react-i18next";
import {Typography, TextField, Card, CardContent, Grid, Button} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from "react";
import {uniqBy} from "lodash";

interface row {
    id: number;
    region?: string;
    country?: string;
    population?:  number;
}

function BarChart({...props}) {
    const {t} = useTranslation();
    const [rows, setRows] = useState<row[]>([{id: 0}]);

    const onSelectRegion = (value: any, index: number) => {
        const newRows = rows.map((el, i) => { return i === index ? {...el, region: value.region} : el});
        console.log(newRows);
        setRows(newRows);
    }

    return (
        <div className='margin-top-50'>
            <Grid container>
                <Grid item sm={4} xs={12}>
                    <Typography variant="h6" className='margin-bottom-10'>
                        {t('homepage.barChart')}
                    </Typography>
                    <hr />
                    <div className='margin-top-20'>
                        {rows.map((row: any, index) => {
                            return (<div>
                                <Autocomplete
                                    id={"region" + index}
                                    options={uniqBy(props.countries, 'region')}
                                    getOptionLabel={(option: any) => option.region}
                                    style={{ width: 300 }}
                                    renderInput={(params: any) =>
                                        <TextField {...params} label="Region" variant="outlined" />
                                    }
                                    disableClearable
                                    freeSolo
                                    size="small"
                                    value={row.region}
                                    onChange={(event, value) =>
                                        onSelectRegion(value, index)
                                    }
                                />
                            </div>)
                        })}
                    </div>
                    {/*<Button variant="outlined" color="primary" startIcon={<ArrowBack />} onClick={goBackToHomepage}>*/}
                    {/*    {t('countryDetails.back')}*/}
                    {/*</Button>*/}
                </Grid>
                <Grid item sm={8} xs={12}>
                    ceva
                </Grid>
            </Grid>
        </div>
    );
}

export default BarChart;
