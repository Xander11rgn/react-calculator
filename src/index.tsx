import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Calculator from './modules/calculator';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "@mui/material";
import {theme} from "./styles/theme";
import {initReactI18next} from "react-i18next";
import i18n from "i18next";
import {Provider} from "react-redux";
import store from "./modules/store/store";

const rootElement = document.getElementById('react-calculator') as HTMLElement
const root = ReactDOM.createRoot(rootElement)


const init = (lang: string) => {
    i18n
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            // the translations
            // (tip move them in a JSON file and import them,
            // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
            resources: {
                en: {
                    translation: {
                        calculate: "Calculate",
                        country: {
                            "placeholder": "Select a country for delivery"
                        },
                        weight: {
                            placeholder: "Item weight",
                            kg: 'kg',
                            lb: 'lb'
                        },
                        deliveryMethods: {
                            sort: "Sort",
                            title: "Your delivery options",
                            nothingFound: {
                                title: "No delivery options found",
                                description1: "Unfortunately, delivery to the selected destination country is currently unavailable.",
                                description2: "Please select another destination country from the list above."
                            },
                            days: 'days',
                            upto: 'up to',
                            for: 'for'
                        }
                    }
                },
                ru: {
                    translation: {
                        calculate: "Рассчитать",
                        country: {
                            "placeholder": "Выберите страну доставки"
                        },
                        weight: {
                            placeholder: "Вес товара",
                            kg: 'кг',
                            lb: 'фт'
                        },
                        deliveryMethods: {
                            sort: "Сортировать",
                            title: "Ваши варианты доставки",
                            nothingFound: {
                                title: "Вариантов доставки не найдено",
                                description1: "К сожалению, доставка в выбранную страну назначения сейчас не осуществляется.",
                                description2: "Пожалуйста, выберите в списке выше другую страну назначения."
                            },
                            days: 'дней',
                            upto: 'до',
                            for: 'за'
                        }
                    }
                },
                ua: {
                    translation: {
                        calculate: "Розрахувати",
                        country: {
                            placeholder: "Виберіть країну доставки"
                        },
                        weight: {
                            placeholder: "Вага товару",
                            kg: 'кг',
                            lb: 'фт'
                        },
                        deliveryMethods: {
                            sort: "Сортувати",
                            title: "Ваші варіанти доставки",
                            nothingFound: {
                                title: "Варіантів доставки не знайдено",
                                description1: "На жаль, доставка до обраної країни призначення наразі не здійснюється.",
                                description2: "Будь ласка, виберіть у списку вище іншу країну призначення."
                            },
                            days: 'днів',
                            upto: 'до',
                            for: 'за'
                        }
                    }
                }
            },
            debug: true,
            lng: lang,
            fallbackLng: "en",

            interpolation: {
                escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
            }
        })
        .then(() => {
        })
        .catch((error) => {
            console.log(error)
        });
};

init(rootElement?.dataset?.lang ?? 'en')


root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Calculator/>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
