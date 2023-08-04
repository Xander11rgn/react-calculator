import React, {useEffect} from "react";
import {Autocomplete, Box, CircularProgress, TextField} from "@mui/material";
import {useCookies} from "react-cookie";

export interface City {
    countryCode: string;
    name: string;
}

export default function CityInput() {

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<City[]>([]);
    const loading = open && options.length === 0;
    const [cookies, setCookie] = useCookies(["token"]);

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }


        if (active) {
            /*getCountries(cookies?.token).then((response: any) => {
                setOptions(response?.data as Country[] ?? [])
            }).catch((error) => console.log(error))*/
        }

        return () => {
            active = false;
        };
    }, [cookies, loading]);


    return (
        <Autocomplete
            id="async-city"
            sx={{width: "auto"}}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.countryCode === value.countryCode}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            popupIcon={<Box
                sx={{width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center"}}><img
                src={"https://trtshopping.com/wp-content/uploads/2023/06/dropdown-icon.svg"} alt={''}
                width="12"/></Box>}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={'Выберите город доставки'}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: <img
                            width="16" src={'https://trtshopping.com/wp-content/uploads/2023/06/Icon.svg'}
                            alt={""}/>,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );


}