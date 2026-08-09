import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import bgImage from "../assets/panda.png";
import { useState } from "react";
import BasicModal from "./confirmModal";
import Box from "@mui/material/Box";

const backgroundStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  opacity: 0.1,
  zIndex: 0,
  borderRadius: 1,
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

const formatDate = (val) => {
  if (!val) return "";
  const d = new Date(val);
  if (isNaN(d)) return String(val);
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
};

export default function BasicCard(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Box sx={{ position: "relative", minWidth: 275, maxWidth: 300 }}>
        <Card
          sx={{
            minWidth: 275,
            maxWidth: 300,
          }}
        >
          <Box style={backgroundStyle} />
          <CardContent sx={{ zIndex: 1, position: "relative" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}>
              <Typography variant="h5" component="div">
                {props.title}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", whiteSpace: "nowrap", ml: 1, mt: 0.5 }}>
                有効期限：{formatDate(props.expiringDate)}
              </Typography>
            </Box>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              {props.description}
            </Typography>
            <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {props.fromUser && (
                <Chip
                  label={`${props.fromUser}から受取`}
                  size="small"
                  sx={{ backgroundColor: "#e8f5e9", color: "#2e7d32", fontWeight: 600 }}
                />
              )}
              {props.toUser && (
                <Chip
                  label={`${props.toUser}へ送付`}
                  size="small"
                  sx={{ backgroundColor: "#e3f2fd", color: "#1565c0", fontWeight: 600 }}
                />
              )}
              {props.isUsed && (
                <Chip label="使用済み" size="small" color="default" />
              )}
            </Box>
          </CardContent>
          <CardActions sx={{ zIndex: 1, position: "relative" }}>
            {!props.readOnly && (
              <Button size="small" onClick={handleOpen}>
                使う
              </Button>
            )}
          </CardActions>
        </Card>

        {!props.readOnly && (
          <BasicModal
            handleOpen={handleOpen}
            handleClose={handleClose}
            open={open}
            handleTicketList={props.handleTicketList}
            ticketId={props.ticketId}
          />
        )}
      </Box>
    </div>
  );
}
