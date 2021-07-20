import { useTranslation } from "react-i18next";
import {useEffect, useState} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Typography, Box, Grid, Button } from '@material-ui/core';
import { Link } from "react-router-dom";

function HomePage() {
    const {t} = useTranslation();
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        fetch('https://restcountries.eu/rest/v2/all')
            .then(response => response.json())
            .then(data => { setCountries(data); console.log(data)})
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])
    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="world countries" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('homepage.flag')}</TableCell>
                            <TableCell>{t('homepage.name')}</TableCell>
                            <TableCell align="right">{t('homepage.population')}</TableCell>
                            <TableCell align="right">{t('homepage.mainLanguage')}</TableCell>
                            <TableCell align="right">{t('homepage.mainCurrency')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {countries.map((country: any, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <img src={country.flag} style={{width: '30px'}}/>
                                </TableCell>
                                <TableCell component="th" scope="row" >{country.name}</TableCell>
                                <TableCell align="right">{country.population.toLocaleString()}</TableCell>
                                <TableCell align="right">{country.languages[0].name}</TableCell>
                                <TableCell align="right">
                                    {country.currencies[0].symbol + " (" + country.currencies[0].code + ")"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*<Box display="flex" alignItems='center' height={1}>*/}
            {/*    <Grid container>*/}
            {/*        <Grid item xs={12} className='margin-bottom-50'>*/}
            {/*            <Typography variant='h3'>*/}
            {/*                Test:*/}
            {/*                <br/>*/}
            {/*                Are you an introvert or an extrovert?*/}
            {/*            </Typography>*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={12}>*/}
            {/*            <Typography variant='h5'>*/}
            {/*                Take this test, put together with <br/> input from psychoanalyst Sandrine Dury, and find out*/}
            {/*            </Typography>*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={12} className='margin-top-100'>*/}
            {/*            <Link to="/personality-test">*/}
            {/*                <Button variant="contained" color="primary" size="large">*/}
            {/*                    LET'S START!*/}
            {/*                </Button>*/}
            {/*            </Link>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</Box>*/}
        </div>
    );
}

export default HomePage;
