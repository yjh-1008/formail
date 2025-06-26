// src/Tiptap.tsx
import React, { useState } from "react";
import { EditorProvider, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Chip,
  Typography,
  Divider,
  Paper,
  Stack,
  Toolbar,
  Tooltip,
} from "@mui/material";
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  FormatUnderlined as UnderlineIcon,
  FormatAlignLeft as AlignLeftIcon,
  FormatAlignCenter as AlignCenterIcon,
  FormatAlignRight as AlignRightIcon,
  FormatListBulleted as BulletListIcon,
  FormatListNumbered as NumberListIcon,
} from "@mui/icons-material";

const extensions = [
  StarterKit,
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Color.configure({ types: [TextStyle.name] }),
  TextStyle,
  FontFamily,
  Image,
  Link.configure({
    openOnClick: false,
  }),
];

interface EmailEditorProps {
  initialTo?: string;
  initialSubject?: string;
  initialContent?: string;
  onSend?: (emailData: EmailData) => void;
}

interface EmailData {
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  content: string;
  attachments: File[];
}

const EmailEditor: React.FC<EmailEditorProps> = ({
  initialTo = "",
  initialSubject = "",
  initialContent = "<p>이메일 내용을 입력하세요...</p>",
  onSend,
}) => {
  const [to, setTo] = useState<string[]>(initialTo ? [initialTo] : []);
  const [cc, setCc] = useState<string[]>([]);
  const [bcc, setBcc] = useState<string[]>([]);
  const [subject, setSubject] = useState(initialSubject);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [toInput, setToInput] = useState("");
  const [ccInput, setCcInput] = useState("");
  const [bccInput, setBccInput] = useState("");

  const editor = useEditor({
    extensions,
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4",
      },
    },
  });

  const addEmail = (
    email: string,
    list: string[],
    setList: (emails: string[]) => void
  ) => {
    if (email && !list.includes(email)) {
      setList([...list, email]);
    }
  };

  const removeEmail = (
    email: string,
    list: string[],
    setList: (emails: string[]) => void
  ) => {
    setList(list.filter((e) => e !== email));
  };

  const handleKeyPress = (
    e: React.KeyboardEvent,
    email: string,
    list: string[],
    setList: (emails: string[]) => void,
    setInput: (value: string) => void
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addEmail(email.trim(), list, setList);
      setInput("");
    }
  };

  const handleFileAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (!editor) return;

    const emailData: EmailData = {
      to,
      cc,
      bcc,
      subject,
      content: editor.getHTML(),
      attachments,
    };

    onSend?.(emailData);
    console.log("이메일 전송:", emailData);
  };

  const EditorToolbar = () => (
    <Toolbar
      variant="dense"
      sx={{ borderBottom: 1, borderColor: "divider", gap: 1 }}
    >
      <Tooltip title="굵게">
        <IconButton
          size="small"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          color={editor?.isActive("bold") ? "primary" : "default"}
        >
          <BoldIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="기울임">
        <IconButton
          size="small"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          color={editor?.isActive("italic") ? "primary" : "default"}
        >
          <ItalicIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="밑줄">
        <IconButton
          size="small"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          color={editor?.isActive("underline") ? "primary" : "default"}
        >
          <UnderlineIcon />
        </IconButton>
      </Tooltip>
      <Divider orientation="vertical" flexItem />
      <Tooltip title="왼쪽 정렬">
        <IconButton
          size="small"
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          color={
            editor?.isActive({ textAlign: "left" }) ? "primary" : "default"
          }
        >
          <AlignLeftIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="가운데 정렬">
        <IconButton
          size="small"
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          color={
            editor?.isActive({ textAlign: "center" }) ? "primary" : "default"
          }
        >
          <AlignCenterIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="오른쪽 정렬">
        <IconButton
          size="small"
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          color={
            editor?.isActive({ textAlign: "right" }) ? "primary" : "default"
          }
        >
          <AlignRightIcon />
        </IconButton>
      </Tooltip>
      <Divider orientation="vertical" flexItem />
      <Tooltip title="글머리 기호">
        <IconButton
          size="small"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          color={editor?.isActive("bulletList") ? "primary" : "default"}
        >
          <BulletListIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="번호 매기기">
        <IconButton
          size="small"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          color={editor?.isActive("orderedList") ? "primary" : "default"}
        >
          <NumberListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );

  return (
    <Paper elevation={2} sx={{ maxWidth: 800, mx: "auto", mt: 2 }}>
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          새 메일 작성
        </Typography>

        {/* 받는 사람 */}
        <Box mb={2}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Typography variant="body2" sx={{ minWidth: 60 }}>
              받는 사람:
            </Typography>
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
                {to.map((email, index) => (
                  <Chip
                    key={index}
                    label={email}
                    size="small"
                    onDelete={() => removeEmail(email, to, setTo)}
                  />
                ))}
              </Stack>
              <TextField
                size="small"
                fullWidth
                placeholder="이메일 주소를 입력하고 Enter를 누르세요"
                value={toInput}
                onChange={(e) => setToInput(e.target.value)}
                onKeyPress={(e) =>
                  handleKeyPress(e, toInput, to, setTo, setToInput)
                }
                onBlur={() => {
                  if (toInput.trim()) {
                    addEmail(toInput.trim(), to, setTo);
                    setToInput("");
                  }
                }}
              />
            </Box>
            <Button size="small" onClick={() => setShowCc(!showCc)}>
              {showCc ? "참조 숨기기" : "참조"}
            </Button>
            <Button size="small" onClick={() => setShowBcc(!showBcc)}>
              {showBcc ? "숨은참조 숨기기" : "숨은참조"}
            </Button>
          </Stack>
        </Box>

        {/* 참조 */}
        {showCc && (
          <Box mb={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" sx={{ minWidth: 60 }}>
                참조:
              </Typography>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
                  {cc.map((email, index) => (
                    <Chip
                      key={index}
                      label={email}
                      size="small"
                      onDelete={() => removeEmail(email, cc, setCc)}
                    />
                  ))}
                </Stack>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="참조할 이메일 주소를 입력하세요"
                  value={ccInput}
                  onChange={(e) => setCcInput(e.target.value)}
                  onKeyPress={(e) =>
                    handleKeyPress(e, ccInput, cc, setCc, setCcInput)
                  }
                  onBlur={() => {
                    if (ccInput.trim()) {
                      addEmail(ccInput.trim(), cc, setCc);
                      setCcInput("");
                    }
                  }}
                />
              </Box>
            </Stack>
          </Box>
        )}

        {/* 숨은 참조 */}
        {showBcc && (
          <Box mb={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" sx={{ minWidth: 60 }}>
                숨은참조:
              </Typography>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
                  {bcc.map((email, index) => (
                    <Chip
                      key={index}
                      label={email}
                      size="small"
                      onDelete={() => removeEmail(email, bcc, setBcc)}
                    />
                  ))}
                </Stack>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="숨은참조할 이메일 주소를 입력하세요"
                  value={bccInput}
                  onChange={(e) => setBccInput(e.target.value)}
                  onKeyPress={(e) =>
                    handleKeyPress(e, bccInput, bcc, setBcc, setBccInput)
                  }
                  onBlur={() => {
                    if (bccInput.trim()) {
                      addEmail(bccInput.trim(), bcc, setBcc);
                      setBccInput("");
                    }
                  }}
                />
              </Box>
            </Stack>
          </Box>
        )}

        {/* 제목 */}
        <TextField
          fullWidth
          label="제목"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          margin="normal"
          variant="outlined"
        />

        {/* 첨부파일 */}
        <Box mt={2} mb={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <input
              accept="*/*"
              style={{ display: "none" }}
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileAttachment}
            />
            <label htmlFor="file-upload">
              <IconButton component="span" size="small">
                <AttachFileIcon />
              </IconButton>
            </label>
            <Typography variant="body2">첨부파일</Typography>
          </Stack>
          {attachments.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
              {attachments.map((file, index) => (
                <Chip
                  key={index}
                  label={file.name}
                  size="small"
                  onDelete={() => removeAttachment(index)}
                />
              ))}
            </Stack>
          )}
        </Box>

        <Divider />

        {/* 에디터 툴바 */}
        <EditorToolbar />

        {/* 본문 에디터 */}
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            minHeight: 300,
            "& .ProseMirror": {
              outline: "none",
              padding: 2,
              minHeight: 300,
            },
          }}
        >
          <EditorProvider
            slotBefore={<EditorToolbar />}
            extensions={extensions}
            content={initialContent}
            editorProps={{
              attributes: {
                class:
                  "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
              },
            }}
          >
            {editor && (
              <div
                onClick={() => editor?.commands.focus()}
                style={{ minHeight: 250, cursor: "text" }}
              />
            )}
          </EditorProvider>
        </Box>

        {/* 보내기 버튼 */}
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="outlined">임시저장</Button>
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={handleSend}
            disabled={to.length === 0 || !subject.trim()}
          >
            보내기
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EmailEditor;
