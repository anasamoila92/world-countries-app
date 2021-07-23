import { useTranslation } from "react-i18next";
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Card, CardContent, Grid, Button} from '@material-ui/core';
import { useEffect, useState } from "react";
import {useHistory, useParams} from "react-router-dom";
import moment from 'moment';
import {ArrowBack} from "@material-ui/icons";

interface country {
    name: string;
    population: number;
    flag: string;
    languages: any[];
    currencies: any[];
    region: string;
    timezones: any[];
}

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function CountryDetail() {
    const {t} = useTranslation();
    const history = useHistory();
    const [country, setCountryDetails] = useState<country | null>(null);
    const {countryCode} = useParams<{countryCode: string}>();
    const classes = useStyles();

    useEffect(() => {
        fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCountryDetails(data ? data : {});
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    const getUtcOffsetFromTimezone = (timezone: string) => {
        return timezone.substr(3, 3)+ timezone.substr(7,2)
    }

    const goBackToHomepage = () => {
        history.push("/");
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Button variant="outlined" color="primary" startIcon={<ArrowBack />} onClick={goBackToHomepage}>
                        {t('countryDetails.back')}
                    </Button>
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={11}>
                    {country &&
                    <Card className={classes.root + ' margin-top-10'} variant="outlined" style={{maxWidth: '500px'}}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm container>
                                    <div>
                                        <Typography variant="h5" component="h2" className='margin-bottom-10'>
                                            {country.name}
                                        </Typography>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            {t('homepage.population') + ': '}
                                            {country.population.toLocaleString()}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <img
                                        alt={country.name + ' flag'}
                                        title={country.name + ' flag'}
                                        src={country.flag}
                                        style={{width: '100px'}}
                                    />
                                </Grid>
                            </Grid>
                            <hr />
                            <Typography variant="body2" component="p" className='margin-bottom-10'>
                                {t('homepage.language') + ': '} {country.languages[0].name}
                            </Typography>
                            <Typography variant="body2" component="p" className='margin-bottom-10'>
                                {t('homepage.currencies') + ': '}
                                {country.currencies.map((el, index, array)=> {
                                    return <span key={index}>
                                        {el.symbol + " (" + el.code + ")"}
                                        {(index < (array.length - 1) ) ? ', ' : ''}
                                    </span>
                                })}
                            </Typography>
                            <Typography variant="body2" component="p" className='margin-bottom-10'>
                                {t('homepage.region') + ': '} {country.region}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {t('homepage.currentTime') + ': '}
                                &nbsp;
                                {moment().utcOffset(getUtcOffsetFromTimezone(country.timezones[0])).format('DD/MM/YYYY HH:mm')}
                            </Typography>
                        </CardContent>
                    </Card>
                    }
                </Grid>
            </Grid>
        </div>
    );
}

export default CountryDetail;
