import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link as RouterLink } from "react-router-dom";
import fetchTicketList from "./module/fetchTicketList";
import logout from "./module/logout";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import HomePage from "./pages/HomePage";
import CreateTicketPage from "./pages/CreateTicketPage";
import ProfilePage from "./pages/ProfilePage";
import FriendsPage from "./pages/FriendsPage";

const navItems = [
  { label: "ホーム", path: "/", icon: <HomeIcon /> },
  { label: "チケット作成", path: "/tickets/new", icon: <AddCircleOutlineIcon /> },
  { label: "友達", path: "/friends", icon: <GroupIcon /> },
  { label: "プロフィール", path: "/profile", icon: <AccountCircleIcon /> },
];

function App() {
  const [ticketList, setTicketList] = useState([]);
  const [sentTicketList, setSentTicketList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsLoggedIn(false);
    window.addEventListener("auth:unauthorized", handler);
    return () => window.removeEventListener("auth:unauthorized", handler);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loginResult = params.get("login");
    if (loginResult) {
      window.history.replaceState({}, "", window.location.pathname);
      if (loginResult === "error") {
        alert("ログインに失敗しました");
      }
    }
  }, []);

  const handleTicketList = useCallback(() => {
    fetchTicketList(setTicketList, setSentTicketList).then((ok) => {
      if (ok) setIsLoggedIn(true);
    });
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setTicketList([]);
      setSentTicketList([]);
      setIsLoggedIn(false);
      alert("ログアウトしました");
    } catch {
      alert("ログアウト失敗");
    }
  };

  return (
    <BrowserRouter>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar variant="dense">
          {isLoggedIn && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 1 }}
              aria-label="メニューを開く"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Ticket App
          </Typography>
          {isLoggedIn && (
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                borderColor: "rgba(255,255,255,0.5)",
                "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              ログアウト
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton component={RouterLink} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              ticketList={ticketList}
              sentTicketList={sentTicketList}
              isLoggedIn={isLoggedIn}
              handleTicketList={handleTicketList}
            />
          }
        />
        <Route path="/tickets/new" element={<CreateTicketPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
