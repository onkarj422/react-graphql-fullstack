import React from 'react';
import { Helmet } from 'react-helmet';
// import logo from '../static/logo.svg';
import config from '../config';
import {
    AppBar,
    Box,
    Card,
    CssBaseline,
    ThemeProvider,
    Toolbar,
    Typography,
} from '@material-ui/core';
import theme from 'theme';

const App = (): JSX.Element => (
    <>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Helmet {...config.APP} />
            <Box display="flex" flexDirection="column" height="100vh">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5">{config.APP.title}</Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    flexGrow="1"
                    flexShrink="1"
                    flexBasis="auto"
                    p={2}
                    overflow="auto"
                >
                    <Card>hey</Card>
                </Box>
            </Box>
        </ThemeProvider>
    </>
);

export default App;
