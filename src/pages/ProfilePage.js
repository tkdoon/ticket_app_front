import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import fetchUserProfile from "../module/fetchUserProfile";
import updateUserName from "../module/updateUserName";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchUserProfile()
      .then((data) => {
        setProfile(data);
        setUserName(data.userName ?? "");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateUserName(userName);
      setProfile((prev) => ({ ...prev, userName }));
      alert("ユーザー名を更新しました");
    } catch (err) {
      alert(err.message || "更新に失敗しました");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        プロフィール
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          ユーザーID
        </Typography>
        <Typography variant="body1">{profile?.id}</Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          現在のユーザー名
        </Typography>
        <Typography variant="body1">{profile?.userName || "（未設定）"}</Typography>
      </Box>

      <Divider />

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          ユーザー名を変更
        </Typography>
        <TextField
          label="新しいユーザー名"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          slotProps={{ htmlInput: { maxLength: 50 } }}
          helperText="50文字以内"
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? "更新中..." : "更新"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
