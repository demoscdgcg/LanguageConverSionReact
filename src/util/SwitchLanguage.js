import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from "material-ui-popup-state/hooks";
import { Avatar, Box, Card, CardContent, MenuItem } from "@mui/material";
// import DefaultUserPic from "../../assets/images/default_user_pic.svg";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import SidebarMenuItem from "./SidebarMenuItem";
// import { ReactComponent as InActiveLanguageMenu } from "../../assets/images/menu_language.svg";
// import { ReactComponent as ActiveLanguageMenu } from "../../assets/images/menu_language_active.svg";
// import AppLanguage from "../../util/AppLanguages";
import { useTranslation } from "react-i18next";
import AppLanguage from "./AppLanguages";

export default function SwitchLanguage() {
  const { t } = useTranslation();

  const switchLanguage = (code) => {
    AppLanguage.setLanguage(code);
    window.location.reload();
  };

  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoPopover",
  });
  return (
    <div>
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"flex-start"}
        style={{ cursor: "pointer", height: "33px" }}
        {...bindTrigger(popupState)}
        sx={{ px: { xs: 0, md: 0 }, my: { xs: 0, md: 1 } }}
      >
        <Box flexGrow={1}>
          <Card sx={{ maxWidth: 300, margin: 'auto', mt: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Change Language
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box py={0.5} px={2} sx={{ display: { xs: "none", md: "flex" } }}>
          {/* <Typography variant="menuItem">
            {" "}
            {popupState.isOpen ? (
              <KeyboardArrowLeftIcon fontSize="small" />
            ) : (
              <KeyboardArrowRightIcon fontSize="small" />
            )}
          </Typography>*/}
        </Box>
      </Box>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        {/* <MenuItem onClick={popupState.close}>View Profile</MenuItem>
        <MenuItem onClick={popupState.close}>Edit Profile</MenuItem> */}
        <MenuItem
          id="SwitchLanguage-menuitem-1"
          onClick={() => {
            switchLanguage("en");
            popupState.close();
          }}
        >
          english
        </MenuItem>

        <MenuItem
          id="SwitchLanguage-menuitem-3"
          onClick={() => {
            switchLanguage("th");
            popupState.close();
          }}
        >
          thai
        </MenuItem>
        <MenuItem
          id="SwitchLanguage-menuitem-4"
          onClick={() => {
            switchLanguage("zh");
            popupState.close();
          }}
        >
          chinese
        </MenuItem>
        {/* 
        <MenuItem
          id="SwitchLanguage-menuitem-2"
          onClick={() => {
            switchLanguage("idn");
            popupState.close();
          }}
        >
            {t("menu.indonesian")}
        </MenuItem>
        <MenuItem
          id="SwitchLanguage-menuitem-3"
          onClick={() => {
            switchLanguage("th");
            popupState.close();
          }}
        >
            {t("menu.thai")}
        </MenuItem>
          <MenuItem
              id="SwitchLanguage-menuitem-3"
              onClick={() => {
                  switchLanguage("ar");
                  popupState.close();
              }}
          >
              {t("menu.arabic")}
          </MenuItem> */}
      </Popover>
    </div>
  );
}
