import { useTranslation } from "react-i18next";
import {useEffect, useState} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination,
    makeStyles, useTheme, IconButton} from '@material-ui/core';
import { LastPage, FirstPage, KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';

interface TablePaginationActionsProps {
    count: number;
    onPageChange: any;
    page: number;
    rowsPerPage: number;
}

function HomePage() {
    const {t} = useTranslation();
    const [countries, setCountries] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    useEffect(() => {
        fetch('https://restcountries.eu/rest/v2/all')
            .then(response => response.json())
            .then(data => {
                setCountries(data);
                console.log(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const useStyles1 = makeStyles((theme) => ({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }));

    const TablePaginationActions = (props:  TablePaginationActionsProps) => {
        const classes = useStyles1();
        const theme = useTheme();
        const { count, page, rowsPerPage, onPageChange } = props;

        const handleFirstPageButtonClick = (event: any) => {
            onPageChange(event, 0);
        };

        const handleBackButtonClick = (event: any) => {
            onPageChange(event, page - 1);
        };

        const handleNextButtonClick = (event: any) => {
            onPageChange(event, page + 1);
        };

        const handleLastPageButtonClick = (event: any) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
                </IconButton>
                <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
                </IconButton>
            </div>
        );
    }

    const getComparator = (order: string, orderBy: string) => {
        return order === 'desc'
            ? (a: any, b: any) => descendingComparator(a, b, orderBy)
            : (a: any, b: any) => -descendingComparator(a, b, orderBy);
    }

    const descendingComparator = (a: any, b: any, orderBy: any) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const stableSort = (array: any, comparator: any) => {
        const stabilizedThis = array.map((el: any, index: number) => [el, index]);
        stabilizedThis.sort((a: any, b: any) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el: any) => el[0]);
    }

    return (
        <div>
          {countries &&
            <TableContainer component={Paper}>
                <Table aria-label="world countries" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ width: '60px'}}>{t('homepage.flag')}</TableCell>
                            <TableCell>{t('homepage.name')}</TableCell>
                            <TableCell align="right">{t('homepage.population')}</TableCell>
                            <TableCell align="right">{t('homepage.mainLanguage')}</TableCell>
                            <TableCell align="right">{t('homepage.mainCurrency')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {stableSort(countries, getComparator(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((country: any, index: number) => {
                              return (
                                <TableRow key={index}>
                                    <TableCell align="center" style={{ width: '60px'}}>
                                        <img src={country.flag} style={{width: '30px'}}/>
                                    </TableCell>
                                    <TableCell component="th" scope="row" >{country.name}</TableCell>
                                    <TableCell align="right">{country.population.toLocaleString()}</TableCell>
                                    <TableCell align="right">{country.languages[0].name}</TableCell>
                                    <TableCell align="right">
                                        {country.currencies[0].symbol + " (" + country.currencies[0].code + ")"}
                                    </TableCell>
                                </TableRow>
                            )
                          })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[15, 50, 100, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={countries.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
          }
        </div>
    );
}

export default HomePage;
