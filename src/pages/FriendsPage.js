import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
} from "@mui/material";
import fetchUserById from "../module/fetchUserById";
import sendFriendRequest from "../module/sendFriendRequest";
import fetchFriendRequests from "../module/fetchFriendRequests";
import acceptFriendRequest from "../module/acceptFriendRequest";
import fetchFriendList from "../module/fetchFriendList";

export default function FriendsPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h5" gutterBottom>
        友達
      </Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="ユーザー検索" />
        <Tab label="申請管理" />
        <Tab label="友達一覧" />
      </Tabs>
      {tab === 0 && <SearchTab />}
      {tab === 1 && <RequestsTab />}
      {tab === 2 && <FriendListTab />}
    </Box>
  );
}

function SearchTab() {
  const [userId, setUserId] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleSearch = async () => {
    const id = parseInt(userId, 10);
    if (!id || id < 1) return;
    setLoading(true);
    setFoundUser(null);
    setRequestSent(false);
    try {
      const data = await fetchUserById(id);
      setFoundUser(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async () => {
    try {
      await sendFriendRequest(foundUser.id);
      setRequestSent(true);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <TextField
          label="ユーザーID"
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          size="small"
          slotProps={{ htmlInput: { min: 1 } }}
        />
        <Button variant="contained" onClick={handleSearch} disabled={loading}>
          検索
        </Button>
      </Box>
      {loading && <CircularProgress size={24} />}
      {foundUser && (
        <Box sx={{ border: 1, borderColor: "divider", borderRadius: 1, p: 2 }}>
          <Typography>
            {foundUser.userName} (ID: {foundUser.id})
          </Typography>
          {requestSent ? (
            <Typography color="success.main" sx={{ mt: 1 }}>
              友達申請を送りました
            </Typography>
          ) : (
            <Button variant="outlined" sx={{ mt: 1 }} onClick={handleRequest}>
              友達申請を送る
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}

function RequestsTab() {
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchFriendRequests();
      setRequests(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleAccept = async (requesterId) => {
    try {
      await acceptFriendRequest(requesterId);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <CircularProgress size={24} />;

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        受信した申請
      </Typography>
      {(requests?.incoming ?? []).length === 0 ? (
        <Typography color="text.secondary">申請はありません</Typography>
      ) : (
        <List disablePadding>
          {(requests?.incoming ?? []).map((user) => (
            <ListItem
              key={user.id}
              secondaryAction={
                <Button size="small" variant="contained" onClick={() => handleAccept(user.id)}>
                  承認
                </Button>
              }
            >
              <ListItemText primary={user.userName} secondary={`ID: ${user.id}`} />
            </ListItem>
          ))}
        </List>
      )}
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        送信した申請
      </Typography>
      {(requests?.outgoing ?? []).length === 0 ? (
        <Typography color="text.secondary">送信した申請はありません</Typography>
      ) : (
        <List disablePadding>
          {(requests?.outgoing ?? []).map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.userName} secondary={`ID: ${user.id}`} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

function FriendListTab() {
  const [friends, setFriends] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchFriendList();
        setFriends(data.friends);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <CircularProgress size={24} />;

  return (
    <Box>
      {friends?.length === 0 ? (
        <Typography color="text.secondary">友達がいません</Typography>
      ) : (
        <List disablePadding>
          {friends?.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.userName} secondary={`ID: ${user.id}`} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
