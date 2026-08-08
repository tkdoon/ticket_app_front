import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import createTicket from "../module/createTicket";

const today = new Date().toISOString().slice(0, 10);

export default function CreateTicketPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiringDate, setExpiringDate] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (expiringDate < today) {
      alert("有効期限は今日以降を指定してください");
      return;
    }

    setSubmitting(true);
    try {
      await createTicket({
        title,
        description,
        expiringDate,
        ownerId: parseInt(ownerId, 10),
      });
      alert("チケットを作成しました");
      navigate("/");
    } catch (err) {
      alert(err.message || "作成に失敗しました");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        inputProps={{ maxLength: 300 }}
      />
      <TextField
        label="説明（任意）"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
        inputProps={{ maxLength: 300 }}
      />
      <TextField
        label="有効期限"
        type="date"
        value={expiringDate}
        onChange={(e) => setExpiringDate(e.target.value)}
        required
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: today }}
      />
      <TextField
        label="受け取り手のユーザーID"
        type="number"
        value={ownerId}
        onChange={(e) => setOwnerId(e.target.value)}
        required
        inputProps={{ min: 1 }}
      />
      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
        <Button onClick={() => navigate("/")} disabled={submitting}>
          キャンセル
        </Button>
        <Button type="submit" variant="contained" disabled={submitting}>
          {submitting ? "作成中..." : "作成"}
        </Button>
      </Box>
    </Box>
  );
}
