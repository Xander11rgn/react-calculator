import React, {useEffect, useState} from 'react';
import '../styles/calculator.scss';
import CountryInput, {Country} from './country-input';
import {useCookies} from "react-cookie";
import {getDeliveryMethods, getToken} from "./api";
import WeightInput from "./weight-input";
import DeliveryMethodsList from "./delivery-methods-list";
import {Box, CircularProgress} from "@mui/material";
import {t} from "i18next";

function Calculator() {

    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    const [country, setCountry] = useState<Country | null>(null);
    const [weight, setWeight] = useState<string | null>("");
    const [weightUnit, setWeightUnit] = useState<string | null>('kg');

    const [deliveryMethods, setDeliveryMethods] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [sort, setSort] = useState(false)
    const [isNothingFound, setIsNothingFound] = useState(false)


    const handleSubmit = () => {
        setIsNothingFound(false)
        setIsLoading(true)
        getDeliveryMethods(cookie?.token, country?.countryCode ?? "").then((response) => {
            if (response?.data?.length === 0) {
                setIsNothingFound(true)
            }
            setDeliveryMethods(response?.data)
        }).catch((error) => {
            if (error?.response?.status === 401) {
                removeCookie('token')
            }
        })
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        removeCookie('token')
    }, [])

    useEffect(() => {

        if (!cookie?.token)
            getToken().then((response) => {
                setCookie('token', [response?.data?.['token_type'], response?.data?.['access_token']].join(' '))
            }).catch((error) => console.log(error))

    }, [cookie?.token, setCookie])

    useEffect(() => {
        setDeliveryMethods([])
    }, [country])

    return (
        <div className={'calculator'}>
            <div className={'calculator-search'}>
                <div style={{
                    maxWidth: '780px', width: "55%",
                    minWidth: '300px'
                }}>
                    <CountryInput country={country} setCountry={setCountry}/>
                </div>
                {/*<div style={{maxWidth: '420px', width: "100%"}}>
                    <CityInput/>
                </div>*/}
                <div style={{
                    maxWidth: '320px', width: "25%",
                    minWidth: '300px'
                }}>
                    <WeightInput weight={weight} setWeight={setWeight} weightUnit={weightUnit}
                                 setWeightUnit={setWeightUnit}/>
                </div>
                <div>
                    <button className="w-btn us-btn-style_1" style={{minWidth: "198px", height: '48px'}}
                            onClick={handleSubmit} disabled={isLoading}>
                        <span className="w-btn-label"
                              style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{isLoading ?
                            <CircularProgress sx={{height: '20px', width: '20px'}}
                                              size={'sm'}/> : t('calculate')}</span>
                    </button>
                </div>
            </div>
            {deliveryMethods?.length > 0 ? <div className={'calculator-results'}>
                <div style={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "60px",
                    paddingBottom: "48px",
                }}>
                    <h3>{t('deliveryMethods.title')}</h3>
                    {deliveryMethods?.length > 1 ? <h4 className={'calculator-results-sort'} onClick={() => {
                        setSort(!sort)
                    }}>{t('deliveryMethods.sort')}
                        <Box
                            sx={{
                                width: 24,
                                height: 24,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transform: sort ? 'rotate(180deg)' : '',
                                marginLeft: "8px"
                            }}>
                            <img
                                src={"https://trtshopping.com/wp-content/uploads/2023/06/dropdown-icon.svg"} alt={''}
                                width="12"/>
                        </Box>
                    </h4> : null}
                </div>
                <DeliveryMethodsList deliveryMethods={deliveryMethods} weight={weight} weightUnit={weightUnit}
                                     sort={sort}/>

            </div> : isNothingFound ?
                <div className={'calculator-results-nothing-found'}>
                    <div className={'icon-box'}>
                        <img
                            width="16" src={'https://trtshopping.com/wp-content/uploads/2023/06/Icon.svg'}
                            alt={""}/>
                    </div>
                    <h3>{t('deliveryMethods.nothingFound.title')}</h3>
                    <h4>{t('deliveryMethods.nothingFound.description1')}<br/>{t('deliveryMethods.nothingFound.description2')}
                    </h4>
                </div> : null
            }
        </div>
    );
}

export default Calculator;
