import React, {useEffect} from "react";
import {Autocomplete, Box, CircularProgress, TextField} from "@mui/material";
import {getCountries} from "./api";
import {useCookies} from "react-cookie";
import {t} from "i18next";

export interface Country {
    countryCode: string;
    name: string;
}

export interface CountryInputProps {
    country: Country | null;
    setCountry: any;
}

export default function CountryInput({country, setCountry}: CountryInputProps) {

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<Country[]>([]);
    const loading = open && options.length === 0;
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }


        if (active) {
            getCountries(cookies?.token).then((response: any) => {
                const countries = response?.data as Country[] ?? []

                setOptions([...countries].sort((a, b) => {
                    if (a.countryCode === 'UA') {
                        return -1;
                    }
                    if (b.countryCode === 'UA') {
                        return 1;
                    }
                    return 0;
                }))
            }).catch((error) => {
                if (error?.response?.status === 401)
                    removeCookie('token')
                console.log(error)
            })
        }

        return () => {
            active = false;
        };
    }, [cookies, loading]);

    return (
        <Autocomplete
            id="async-country"
            sx={{
                width: "auto",
            }}
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
            renderOption={(props, option) => (
                <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                    <img
                        loading="lazy"
                        width="30"
                        src={`https://flagcdn.com/w40/${option.countryCode.toLowerCase()}.png`}
                        alt=""
                    />
                    {option.name}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={t('country.placeholder')}
                    InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                        startAdornment: <img
                            width="16" src={'https://trtshopping.com/wp-content/uploads/2023/06/Icon.svg'}
                            alt={""} style={{marginRight: '5px'}}/>,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            value={country}
            onChange={(event, value) => setCountry(value)}
        />
    );


}