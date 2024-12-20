import { Autocomplete, Button, Grid, InputLabel, TextField } from '@mui/material';
import { useState } from 'react';
import CustomInput from './CustomInput';
import CommonUtil from './CommonUtil';
import { createUser } from '../SERVICE/UserService';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SwitchLanguage from '../util/SwitchLanguage';
const CreateUser = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [payload, setPayload] = useState({
        name: "",
        city: "",
        sal: "",
        email: "",
        type: "",
    });

    let typeMobile = [
        { id: "0", value: t("tips_mobile.Android") },
        { id: "1", value: t("tips_mobile.Ios") },
    ];

    const [error, setError] = useState({
        name: "",
        city: "",
        sal: "",
        email: ""
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setPayload({
            ...payload,
            [name]: event.target.value,
        });

        setError({
            ...error,
            [name]: ""
        });
    };

    const resetError = (fieldName) => {
        setError((prevError) => ({
            ...prevError,
            [fieldName]: ""
        }));
    };

    const validateForm = () => {
        if (CommonUtil.isEmptyString(payload.name)) {
            setError({
                ...error,
                name: "This field is required",
            });
            return;
        }
        if (CommonUtil.isEmptyString(payload.city)) {
            setError({
                ...error,
                city: "This field is required",
            });
            return;
        }
        if (CommonUtil.isEmptyString(payload.sal)) {
            setError({
                ...error,
                sal: "This field is required",
            });
            return;
        }
        if (CommonUtil.isEmptyString(payload.email)) {
            setError({
                ...error,
                email: "This field is required",
            });
            return;
        }

        return true;
    };


    const handleSubmit = () => {
        if (validateForm()) {
            createUser(payload)
                .then((res) => {
                    enqueueSnackbar('User created successfully', { variant: 'success' });
                })
                .catch((error) => {
                    enqueueSnackbar('Error creating user', { variant: 'error' });
                })
        }
    };

    const handleRefress = () => {

    }
    return (
        <Grid container justifyContent="center" style={{ width: "100%" }}>
            <Grid item container style={{ width: "800px" }}>
                <Grid item sx={6} md={6} pt={2} rowGap={2}>
                    <CustomInput
                        id="AddProduct1"
                        required
                        label={t("tips_mobile.Enter_user_name")}
                        size="small"
                        name="name"
                        error={error.name}
                        resetError={() => resetError("name")}
                        value={payload.name}
                        handleChange={handleChange}
                        inputProps={{
                            maxLength: 10,
                        }}
                        helperText={error.name}
                        validation={"alpha-numeric-ch-th"}
                        placeholder={"Enter Product Name"}
                    />
                </Grid>
                <Grid item sx={6} md={6} pt={2} rowGap={2}>
                    <CustomInput
                        id="AddProduct2"
                        required
                        label={t("tips_mobile.Enter_city_name")}
                        size="small"
                        name="city"
                        error={error.city}
                        resetError={() => resetError("city")}
                        value={payload.city}
                        handleChange={handleChange}
                        placeholder={"Enter your city"}
                        helperText={error.city}
                    />
                </Grid>
                <Grid item sx={6} md={6} pt={2}>
                    <CustomInput
                        id="AddProduct3"
                        required
                        label={t("tips_mobile.Enter_sal")}
                        size="small"
                        name="sal"
                        error={error.sal}
                        resetError={() => resetError("sal")}
                        value={payload.sal}
                        handleChange={handleChange}
                        placeholder={"Enter your sal"}
                        helperText={error.sal}
                        validation={"numeric"}
                    />
                </Grid>
                <Grid item sx={6} md={6} pt={2}>
                    <CustomInput
                        id="AddProduct4"
                        required
                        label={t("tips_mobile.Enater_email")}
                        size="small"
                        name="email"
                        error={error.email}
                        resetError={() => resetError("email")}
                        value={payload.email}
                        handleChange={handleChange}
                        placeholder={"Enter your email"}
                        helperText={error.email}
                        validation={"email"}
                    />
                </Grid>
                <grid item sx={{ width: "100%" }} md={6} pt={2}>
                    <InputLabel
                        shrink
                        htmlFor="bootstrap-input"
                        style={{ paddingLeft: "0px" }}
                    >
                        {t("tips_mobile.type_label")} <span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <Autocomplete
                        id="type"
                        options={typeMobile}
                        getOptionLabel={(option) => option.value || ""}
                        onChange={(e, v) => {
                            setPayload({
                                ...payload,
                                type: v ? v.id : null,
                            });
                            setError({
                                ...error,
                                type: `${t("")}`,
                            });
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="type"
                                size="small"
                                placeholder={t("tips_mobile.type_placeholder")}
                                error={error.type}
                                helperText={error.type}
                                sx={{
                                    "& .MuiOutlinedInput-input.MuiInputBase-inputSizeSmall":
                                    {
                                        fontSize: "13px",
                                        padding: "12px",
                                    },
                                }}
                            />
                        )}
                    />
                </grid>

            </Grid>
            <Grid item sx={6} md={6} pt={2}>
                <Button onClick={handleSubmit}>{t("tips_mobile.submit")}</Button>
                <Button onClick={() => handleRefress}>{t("tips_mobile.refress")}</Button>
                <Button onClick={() => navigate("/viewUser")}>{t("tips_mobile.View_User")}</Button>
            </Grid>
            <SwitchLanguage />
        </Grid>

    );
};

export default CreateUser;
