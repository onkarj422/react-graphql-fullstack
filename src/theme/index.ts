import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import deepOrange from '@material-ui/core/colors/deepOrange';

export default createMuiTheme({
    palette: {
        primary: {
            main: grey[900],
        },
        secondary: {
            main: deepOrange.A700,
        },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    WebkitFontSmoothing: 'auto',
                },
                body: {
                    backgroundColor: '#E1E2E1',
                },
            },
        },
    },
});
