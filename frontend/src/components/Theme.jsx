// --------------------------------------------------------------------------------------------------------------------}
//        SET THEME FOR HOMEPAGE
//  -------------------------------------------------------------------------------------------------------------------}
import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
    components: {
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: "black",
                    bgcolor: "gray",
                    "& .MuiSvgIcon-root": {
                    outline: "none",
                    },

                "&.Mui-checked": {
                    color: "#ffff00",
                },

                "&.Mui-focusVisible": {
                    outline: "2px solid #ffff00",
                    outlineOffset: "2px",
                },

                "&:hover": {
                    backgroundColor: "rgba(255, 255, 0, 0.1)",
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": { // Overwrite default focused color
                    color: "black",
                    },
                },
            },
        },
    },
});


export default Theme;