import { useTranslation } from "react-i18next";
import {Typography, TextField, ThemeProvider, createTheme, Grid, Button} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState } from "react";
import {uniqBy} from "lodash";

interface row {
    id: number;
    region?: string;
    country?: string;
    population?: number;
}

function BarChart({...props}) {
    const {t} = useTranslation();
    const [rows, setRows] = useState<row[]>([{id: 0, region: undefined, country: undefined, population: undefined}]);

    const onSelect = (value: any, index: number, fieldName: string) => {
        const newRows = rows.map((el, i) => { return i === index ? {...el, [fieldName]: value[fieldName]} : el});
        if (fieldName === 'region') {
            newRows[index].country = undefined;
        }
        setRows(newRows);
    }

    const removeRow = (index: number) => {
        let i = 0;
        const newRows = rows.filter((el: row) => {
            if (el.id !== index) {
                const newRow = {...el, id: i};
                i++;
                return newRow;
            }
        });
        setRows(newRows);
    }

    const theme = createTheme({
        palette: {
            primary: green,
        },
    });

    return (
        <div className='margin-top-50 margin-bottom-100'>
            <Grid container>
                <Grid item md={4} sm={12} xs={12}>
                    <Typography variant="h6" className='margin-bottom-10'>
                        {t('homepage.barChart')}
                    </Typography>
                    <hr />
                    <div className='margin-top-20'>
                        {rows.map((row: any, index) => {
                            return (<Grid container key={index}>
                                <Grid item xs={4}>
                                    <Autocomplete
                                        id={"region" + index}
                                        options={uniqBy(props.countries, 'region')}
                                        getOptionLabel={(option: any) => option.region}
                                        renderInput={(params: any) =>
                                            <TextField {...params} label={t('homepage.region')} variant="outlined" />
                                        }
                                        disableClearable
                                        size="small"
                                        clearOnBlur
                                        onChange={(event, value) =>
                                            onSelect(value, index, "region")
                                        }
                                        className='margin-right-10'
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Autocomplete
                                        id={"country" + index}
                                        options={uniqBy(props.countries.filter((el: row) => el.region === row.region), 'country')}
                                        getOptionLabel={(option: any) => option.country}
                                        renderInput={(params: any) =>
                                            <TextField
                                                {...params}
                                                label={t('homepage.country')}
                                                variant="outlined"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                                }}
                                            />
                                        }
                                        disableClearable
                                        size="small"
                                        clearOnBlur
                                        onChange={(event, value) =>
                                            onSelect(value, index, "country")
                                        }
                                        className='margin-right-10'
                                        key={row.region}
                                    />
                                </Grid>
                                <Grid item xs={4} className='text-align-right'>
                                    <Button variant="contained" color="secondary" onClick={() => removeRow(index)}>
                                        {t('barChart.remove')}
                                    </Button>
                                </Grid>
                            </Grid>)
                        })}
                        {rows && rows.length > 0 &&
                            <hr />
                        }
                        <ThemeProvider theme={theme}>
                            <Button variant="contained" color="secondary" onClick={() => {}}>
                                {t('barChart.addMore')}
                            </Button>
                        </ThemeProvider>
                    </div>
                </Grid>
                <Grid item md={8} sm={12} xs={12}>
                    ceva
                </Grid>
            </Grid>
        </div>
    );
}

export default BarChart;
