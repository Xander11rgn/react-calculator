import React, {useEffect, useState} from "react";
import {Divider} from "@mui/material";
import i18n, {t} from "i18next";

export interface DeliveryMethodsListProps {
    deliveryMethods: any[],
    weight: string | null,
    weightUnit: string | null;
    sort: boolean;
}

export default function DeliveryMethodsList({
                                                deliveryMethods: providedDeliveryMethods,
                                                weight: providedWeight,
                                                weightUnit,
                                                sort
                                            }: DeliveryMethodsListProps) {

    const [deliveryMethods, setDeliveryMethods] = useState(providedDeliveryMethods)

    const renderTransportationMethod = (transportationMethod: string) => {
        if (transportationMethod && transportationMethod.includes("Air"))
            return <div className={'icon-box'}><img
                src={'https://trtshopping.com/wp-content/uploads/2023/06/air-mode.svg'} alt={''}/></div>
        else if (transportationMethod && transportationMethod.includes("Ocean"))
            return <div className={'icon-box'}><img
                src={'https://trtshopping.com/wp-content/uploads/2023/06/ocean-mode.svg'} alt={''}/></div>
        return <div className={'icon-box'} style={{visibility: 'hidden'}}></div>
    }

    const renderCarrier = (carrierName: string) => {
        if (carrierName && carrierName.includes("Nova") && (carrierName.includes("Poshta") || carrierName.includes("Pochta")))
            return <div className={'icon-box'}><img
                src={'https://trtshopping.com/wp-content/uploads/2023/06/carrier-nova-poshta.svg'} alt={''}/></div>
        else if (carrierName && carrierName.includes("Ukr") && (carrierName.includes("Poshta") || carrierName.includes("Pochta")))
            return <div className={'icon-box'}><img
                src={'https://trtshopping.com/wp-content/uploads/2023/06/carrier-ukrposhta.svg'} alt={''}/></div>
        return <div className={'icon-box'}><img
            src={'https://trtshopping.com/wp-content/uploads/2023/07/carrier.svg'} width={30} alt={''}/></div>
    }

    const convertToUnit = (value: string | null, unit: string | null, targetUnit: string | null) => {
        const numberValue = Number(value);
        if (numberValue != null && unit != null && targetUnit != null) {
            if (unit !== targetUnit) {
                if (unit === 'kg') {
                    return numberValue * 0.453592
                }
                if (unit === 'lb') {
                    return numberValue * 2.20462
                }
            }
        }
        return numberValue
    }

    const getMethodRate = (deliveryMethod: any) => {
        const rates = deliveryMethod?.tariff?.rates;
        let weight = Number(providedWeight)

        if (deliveryMethod?.tariff?.ratePerType === 'Range' && weight != null && rates) {
            let selectedRate: any = null;
            rates?.forEach((rate: any) => {
                if (rate != null && rate[0] != null && weight != null && providedWeight && providedWeight?.length > 0 && weight >= rate[0]) {
                    selectedRate = rate;
                }
            })

            if (selectedRate && selectedRate[1]) {
                return convertToUnit(selectedRate[1], deliveryMethod?.tariff?.unitType?.toLowerCase(), weightUnit)?.toFixed(2)
            }

            if (rates?.length > 0) {
                if (rates?.length > 1) {
                    let selectedMinRate = Number.MAX_VALUE;
                    let selectedMaxRate = Number.MIN_VALUE;

                    rates?.forEach((rate: any) => {
                        if (rate != null && rate[1] != null) {
                            if (rate[1] < selectedMinRate)
                                selectedMinRate = rate[1]
                            if (rate[1] > selectedMaxRate) {
                                selectedMaxRate = rate[1]
                            }
                        }
                    })
                    const minRate = convertToUnit(selectedMinRate.toString(), deliveryMethod?.tariff?.unitType?.toLowerCase(), weightUnit)?.toFixed(2)
                    const maxRate = convertToUnit(selectedMaxRate.toString(), deliveryMethod?.tariff?.unitType?.toLowerCase(), weightUnit)?.toFixed(2)

                    return minRate + ' - ' + maxRate
                } else {
                    if (rates[0] != null && rates[0][1] != null)
                        return convertToUnit(rates[0][1], deliveryMethod?.tariff?.unitType?.toLowerCase(), weightUnit)?.toFixed(2)
                }
            }

        } else
            return convertToUnit(deliveryMethod?.tariff?.ratePer, deliveryMethod?.tariff?.unitType?.toLowerCase(), weightUnit)?.toFixed(2)
    }

    const getMethodTotalAmount = (deliveryMethod: any, weight: string | null) => {
        const rate = getMethodRate(deliveryMethod)
        const rateNumber = Number(rate)
        const weightNumber = Number(weight)
        if (!isNaN(rateNumber * weightNumber) && weightNumber > 0.001)
            return (rateNumber * weightNumber).toFixed(2)
        return null
    }

    useEffect(() => {
        const sorted = [...providedDeliveryMethods].sort((a, b) => {
            const aValue = Number(getMethodRate(a)?.split(' ')[0])
            const bValue = Number(getMethodRate(b)?.split(' ')[0])
            return sort ? bValue - aValue : aValue - bValue;
        })
        setDeliveryMethods(sorted)
    }, [sort, providedDeliveryMethods])


    return <div className={'delivery-methods'}>
        {deliveryMethods?.map((deliveryMethod, index) => {
            return <>
                <div className={'delivery-method'}>
                    <div
                        className={'delivery-method-transportation-carrier'}
                    >
                        <div className={'icons'}>
                            {renderTransportationMethod(deliveryMethod?.modeOfTransportation?.transportationMethod)}
                            {renderCarrier(deliveryMethod?.carrier?.name)}
                        </div>
                        <div className={'carrier-name'}>{deliveryMethod?.carrier?.name}</div>
                        <Divider orientation="vertical" variant="middle" flexItem/>
                    </div>
                    <div
                        className={'delivery-method-method-rate'}
                    >
                        <div>{deliveryMethod?.modeOfTransportation?.customValues?.["service_description_" + i18n.language ?? 'en']}
                            {' - '}
                            {t('deliveryMethods.upto')}
                            {' '}
                            {deliveryMethod?.transitDaysMax}
                            {' '}
                            {t('deliveryMethods.days')}
                        </div>
                        {
                            getMethodTotalAmount(deliveryMethod, providedWeight) ? <div
                                    className={'delivery-method-rate'}>
                                    ${getMethodTotalAmount(deliveryMethod, providedWeight)}
                                </div> :
                                <div
                                    className={'delivery-method-rate'}>
                                    ${getMethodRate(deliveryMethod)} {t('deliveryMethods.for')} {weightUnit ? t('weight.' + weightUnit) : t('weight.kg')}
                                </div>
                        }

                    </div>
                </div>

                {deliveryMethods?.length - 1 > index ?
                    <Divider flexItem/> : null}
            </>
        })}</div>
}