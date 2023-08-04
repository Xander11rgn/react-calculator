import {createTheme} from "@mui/material";

export const theme = createTheme({
    components: {

        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        borderColor: "var(--color-content-bg)!important",
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontFamily: "Inter",
                    borderColor: "var(--color-content-bg)!important",
                    height: "48px",
                    borderRadius: "50px!important",
                    width: "100%",
                    paddingTop: '0px!important',
                    paddingLeft: '16px!important',
                    paddingBottom: '0px!important',
                    border: "none!important",
                    backgroundColor: "var(--color-content-bg)!important",
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },

                },
                input: {
                    height: "auto",
                    paddingTop: "0!important",
                    paddingBottom: "0!important",
                    borderRadius: "50px",
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'var(--color-alt-content-secondary)!important'
                }
            }
        }
    },
});