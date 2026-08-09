import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import createTicket from "../module/createTicket";
import fetchUserById from "../module/fetchUserById";
import fetchFriendList from "../module/fetchFriendList";

const today = new Date().toISOString().slice(0, 10);

function ConfirmRow({ label, value }) {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ width: 100, flexShrink: 0 }}>
        {label}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
}

export default function CreateTicketPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState("form");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiringDate, setExpiringDate] = useState("");
  const [recipientMode, setRecipientMode] = useState("friend");
  const [selectedFriendId, setSelectedFriendId] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [ownerProfile, setOwnerProfile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [friends, setFriends] = useState(null);
  const [friendsLoading, setFriendsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchFriendList();
        setFriends(data.friends ?? []);
      } catch {
        setFriends([]);
      } finally {
        setFriendsLoading(false);
      }
    })();
  }, []);

  const resolvedOwnerId =
    recipientMode === "friend" ? selectedFriendId : ownerId;

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (expiringDate < today) {
      alert("有効期限は今日以降を指定してください");
      return;
    }
    const id = parseInt(resolvedOwnerId, 10);
    if (!id || id < 1) {
      alert("受け取り手を選択またはIDを入力してください");
      return;
    }
    setSubmitting(true);
    try {
      const data = await fetchUserById(id);
      setOwnerProfile(data);
      setStep("confirm");
    } catch (err) {
      alert(err.message || "ユーザーが見つかりませんでした");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await createTicket({
        title,
        description,
        expiringDate,
        ownerId: parseInt(resolvedOwnerId, 10),
      });
      alert("チケットを作成しました");
      navigate("/");
    } catch (err) {
      alert(err.message || "作成に失敗しました");
    } finally {
      setSubmitting(false);
    }
  };

  if (step === "confirm") {
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
          作成内容の確認
        </Typography>
        <Typography variant="body2" color="text.secondary">
          以下の内容でチケットを作成します。
        </Typography>
        <Divider />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <ConfirmRow label="タイトル" value={title} />
          <ConfirmRow label="説明" value={description || "（なし）"} />
          <ConfirmRow label="有効期限" value={expiringDate} />
          <ConfirmRow
            label="贈り先"
            value={`${ownerProfile.userName || "（名前未設定）"} (ID: ${ownerProfile.id})`}
          />
        </Box>
        <Divider />
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <Button onClick={() => setStep("form")} disabled={submitting}>
            戻る
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
            {submitting ? "作成中..." : "作成"}
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleConfirm}
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
        チケット作成
      </Typography>
      <TextField
        label="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        slotProps={{ htmlInput: { maxLength: 300 } }}
      />
      <TextField
        label="説明（任意）"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
        slotProps={{ htmlInput: { maxLength: 300 } }}
      />
      <TextField
        label="有効期限"
        type="date"
        value={expiringDate}
        onChange={(e) => setExpiringDate(e.target.value)}
        required
        slotProps={{ htmlInput: { min: today }, inputLabel: { shrink: true } }}
      />
      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          受け取り手
        </Typography>
        <RadioGroup
          row
          value={recipientMode}
          onChange={(e) => setRecipientMode(e.target.value)}
        >
          <FormControlLabel value="friend" control={<Radio />} label="友達から選ぶ" />
          <FormControlLabel value="id" control={<Radio />} label="IDを直接入力" />
        </RadioGroup>
        {recipientMode === "friend" ? (
          friendsLoading ? (
            <CircularProgress size={24} />
          ) : friends.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              友達がいません。まず友達を追加してください。
            </Typography>
          ) : (
            <TextField
              select
              label="友達を選択"
              value={selectedFriendId}
              onChange={(e) => setSelectedFriendId(e.target.value)}
              required
              fullWidth
              sx={{ mt: 1 }}
            >
              {friends.map((f) => (
                <MenuItem key={f.id} value={f.id}>
                  {f.userName} (ID: {f.id})
                </MenuItem>
              ))}
            </TextField>
          )
        ) : (
          <TextField
            label="受け取り手のユーザーID"
            type="number"
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            required
            slotProps={{ htmlInput: { min: 1 } }}
            fullWidth
            sx={{ mt: 1 }}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
        <Button onClick={() => navigate("/")} disabled={submitting}>
          キャンセル
        </Button>
        <Button type="submit" variant="contained" disabled={submitting}>
          {submitting ? "確認中..." : "確認"}
        </Button>
      </Box>
    </Box>
  );
}
