import {InputAdornment, OutlinedInput} from "@mui/material";
import {t} from "i18next";

export interface WeightInputProps {
    weight: string | null;
    setWeight: any;
    weightUnit: string | null;
    setWeightUnit: any;
}

export default function WeightInput({weight, setWeight, weightUnit, setWeightUnit}: WeightInputProps) {
    const formatNumber = (value: string) => {
        return value.replace(/[^0-9.]+/g, '').replace(',', '.').replace(/\.(?=.*\.)/g, '').slice(0, 10)
    }

    return <OutlinedInput
        sx={{width: "auto"}} inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
        placeholder={t('weight.placeholder')}
        value={weight}
        onChange={(event) => {
            setWeight(formatNumber(event?.target?.value))
        }}
        endAdornment={
            <InputAdornment position="end">
                <div className={`weight-unit ${weightUnit === 'kg' ? 'selected' : ''}`}
                     onClick={() => setWeightUnit('kg')}>{t('weight.kg')}
                </div>
                <div className={`weight-unit ${weightUnit === 'lb' ? 'selected' : ''}`}
                     onClick={() => setWeightUnit('lb')}>{t('weight.lb')}
                </div>
            </InputAdornment>
        }/>

}