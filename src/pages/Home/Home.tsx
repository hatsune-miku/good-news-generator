import React, { useRef, useState } from "react";
import {
  Container,
  Button,
  Box,
  Stack,
  Typography,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  MenuItem,
  Slider,
  alpha,
  Divider,
  Paper,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import badNewsUrl from "../../assets/bad_news.jpg";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import html2canvas from "html2canvas";
import { useAppDispatch } from "../../store/hooks";
import { showTemporaryToastText } from "../../store/reducers/toast";
import GitHubIcon from "@mui/icons-material/GitHub";

const goodNewsUrl = "https://vanillacake.cn/xibaobg.png";

const fontFamilyDefault = `"Roboto","Helvetica","Arial",sans-serif`;
const fontFamilySongTi = `"NSimSun","SimSun","FangSong",serif`;
const fontFamilyHeiti = `"Source Han Sans CN","Microsoft YaHei","Arial",sans-serif`;
const fontFamilyKaiti = `"STKaiti","KaiTi",serif`;
const fontFamilyLiShu = `"LiSu","STLiti","隶书",serif`;

interface Fonts {
  default: string;
  songTi: string;
  heiTi: string;
  kaiTi: string;
  liShu: string;
}

type FontStyleType = "normal" | "italic";

const fonts: Fonts = {
  default: fontFamilyDefault,
  songTi: fontFamilySongTi,
  heiTi: fontFamilyHeiti,
  kaiTi: fontFamilyKaiti,
  liShu: fontFamilyLiShu,
};

const Home = () => {
  const [contentText, setContentText] = useState("");
  const [newsType, setNewsType] = useState("good-news-type");
  const imageElementRef = useRef<HTMLDivElement | null>(null);

  const getCurrentImageCanvas = async () => {
    const current = imageElementRef.current;
    if (current === null) return null;

    const canvas = await html2canvas(current, {
      backgroundColor: null,
      useCORS: true,
      scale: window.devicePixelRatio || 1,
    });
    return canvas;
  };

  const handleDownloadImage = async () => {
    const canvas = await getCurrentImageCanvas();
    if (canvas === null) return;
    const imageUrl = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.download = "good-news.png";
    link.href = imageUrl;
    link.click();
  };

  const dispatch = useAppDispatch();

  const handleCopyToClipBoard = async () => {
    const canvas = await getCurrentImageCanvas();
    if (canvas === null) return;
    canvas.toBlob((blob) => {
      if (blob === null) {
        dispatch(
          showTemporaryToastText({
            severity: "error",
            message: "图片渲染失败，请重试",
          })
        );
        return;
      }
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]);
      dispatch(
        showTemporaryToastText({
          severity: "info",
          message: "图片已复制到剪贴板",
        })
      );
    });
  };

  const [textSizePt, setTextSizePt] = useState(24);
  const textSizePx = (textSizePt * 4) / 3;
  const textSizeRem = `${textSizePx / 10}rem`;
  const textColor = newsType === "good-news-type" ? "#dc3023" : "#5a5a5a";

  const [textAlignType, setTextAlignType] = useState<
    "left" | "center" | "right" | "justify"
  >("center");
  const [fontFamily, setFontFamily] = useState<keyof Fonts>("default");
  const [fontStyle, setFontStyle] = useState<FontStyleType>("normal");

  const handleTextSizeChange = (value: number) => {
    setTextSizePt(Math.min(300, Math.max(8, value)));
  };

  const handleReset = () => {
    setNewsType("good-news-type");
    setTextAlignType("center");
    setFontFamily("default");
    setFontStyle("normal");
    setContentText("");
    setTextSizePt(24);
  };

  const theme = useTheme();
  const breakpointDownSm = useMediaQuery(theme.breakpoints.down("md"));

  const getLinePositionSx = () => {
    if (textAlignType === "center") {
      return {
        position: "relative" as const,
        left: "50%",
        transform: "translateX(-50%)",
        width: "max-content",
        maxWidth: "none",
      };
    }

    if (textAlignType === "right") {
      return {
        marginLeft: "auto",
        width: "max-content",
        maxWidth: "none",
      };
    }

    return {
      marginRight: "auto",
      width: "max-content",
      maxWidth: "none",
    };
  };

  const buttonGroup = (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      sx={{
        position: "sticky",
        bottom: 0,
        backgroundColor: (theme) => theme.palette.common.white,
        boxShadow: (theme) =>
          `0 1.2rem 2.4rem ${alpha(theme.palette.common.black, 1)}`,
      }}
      padding={"1.2rem"}
    >
      <Button variant="outlined" onClick={handleDownloadImage}>
        下载
      </Button>
      <Button variant="outlined" onClick={handleCopyToClipBoard}>
        复制到剪贴板
      </Button>
      <Button variant="outlined" onClick={handleReset}>
        重置
      </Button>
    </Stack>
  );

  return (
    <Container>
      <Stack sx={{ height: "100vh", padding: "6.4rem" }}>
        <Typography variant="h3" textAlign={"center"} marginBottom={"3.2rem"}>
          喜报生成器 Pro
        </Typography>
        <Paper
          sx={{
            width: "100%",
            flex: 1,
            height: 0,
          }}
          elevation={6}
        >
          <Stack
            direction={breakpointDownSm ? "column" : "row"}
            height="100%"
            sx={{
              overflowX: "hidden",
              overflow: breakpointDownSm ? "auto" : "hidden",
            }}
          >
            <Stack
              sx={{
                flex: breakpointDownSm ? "0 1 auto" : 5,
                width: breakpointDownSm ? "100%" : 0,
                "& img": {
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                },
              }}
              justifyContent={"start"}
              alignItems={"center"}
              padding={"1.6rem"}
            >
              <Stack
                ref={imageElementRef}
                height={"auto"}
                width="100%"
                maxHeight={"100%"}
                sx={{ position: "relative", overflow: "hidden" }}
              >
                <img
                  src={newsType === "good-news-type" ? goodNewsUrl : badNewsUrl}
                  alt={newsType === "good-news-type" ? "good news" : "bad news"}
                />
                <Stack
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    "& .MuiTypography-root": {
                      color: textColor,
                      fontSize: textSizeRem,
                      fontWeight: 400,
                      fontStyle,
                      lineHeight: 0.75,
                      textAlign: textAlignType === "justify" ? "left" : textAlignType,
                      fontFamily: fonts[fontFamily],
                      whiteSpace: "nowrap",
                      overflow: "visible",
                      "&.empty-line::after": {
                        content: `''`,
                        display: "inline-block",
                        width: "1px",
                      },
                    },
                  }}
                >
                  <Stack
                    paddingTop={"8.4rem"}
                    paddingBottom={"4.8em"}
                    paddingX={"6.4rem"}
                    sx={{
                      width: "100%",
                      height: "100%",
                      overflow: "visible",
                    }}
                    justifyContent={"center"}
                  >
                    {contentText.split("\n").map((line, lineIndex) => (
                      <React.Fragment key={`${lineIndex}-${line}`}>
                        {line !== "" ? (
                          textAlignType !== "justify" ? (
                            <Typography sx={getLinePositionSx()}>{line}</Typography>
                          ) : (
                            <Typography
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                maxWidth: "none",
                              }}
                            >
                              {line.split("").map((char, index) => (
                                <span key={index}>{char}</span>
                              ))}
                            </Typography>
                          )
                        ) : (
                          <Typography
                            className="empty-line"
                            sx={{ minHeight: "0.75em" }}
                          >
                            {" "}
                          </Typography>
                        )}
                      </React.Fragment>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Divider
              orientation={breakpointDownSm ? "horizontal" : "vertical"}
            />
            <Stack
              sx={{
                flex: breakpointDownSm ? "0 1 auto" : 3,
                overflowY: breakpointDownSm ? "visible" : "auto",
                position: "relative",
              }}
              spacing="3.2rem"
              justifyContent={"space-between"}
            >
              <Stack spacing="3.2rem" padding={"1.6rem"}>
                <TextField
                  label="内容"
                  value={contentText}
                  onChange={(event) => setContentText(event.target.value)}
                  multiline
                  rows={5}
                  sx={{ flex: 1 }}
                  fullWidth
                />
                <Stack
                  sx={{ flex: 1 }}
                  justifyContent={"space-between"}
                  spacing={"1.6rem"}
                >
                  <SideItemBlock label="类型">
                    <ToggleButtonGroup
                      exclusive
                      size="small"
                      value={newsType}
                      onChange={(_, newNewsType) => {
                        if (newNewsType) setNewsType(newNewsType);
                      }}
                    >
                      <ToggleButton
                        value="good-news-type"
                        aria-label="good news type"
                      >
                        <Typography>喜报</Typography>
                      </ToggleButton>
                      <ToggleButton
                        value="bad-news-type"
                        aria-label="bad news type"
                      >
                        <Typography>悲报</Typography>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </SideItemBlock>

                  <SideItemBlock label="对齐方式">
                    <ToggleButtonGroup
                      value={textAlignType}
                      exclusive
                      size="small"
                      onChange={(_, newTextAlignType) => {
                        if (newTextAlignType) setTextAlignType(newTextAlignType);
                      }}
                    >
                      <ToggleButton value="left" aria-label="left aligned">
                        <FormatAlignLeftIcon />
                      </ToggleButton>
                      <ToggleButton value="center" aria-label="centered">
                        <FormatAlignCenterIcon />
                      </ToggleButton>
                      <ToggleButton value="right" aria-label="right aligned">
                        <FormatAlignRightIcon />
                      </ToggleButton>
                      <ToggleButton value="justify" aria-label="justified">
                        <FormatAlignJustifyIcon />
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </SideItemBlock>

                  <SideItemBlock label="字号 (pt)">
                    <Stack direction="row" spacing="1.6rem" alignItems="center">
                      <Slider
                        min={8}
                        max={300}
                        step={0.5}
                        value={textSizePt}
                        valueLabelDisplay="auto"
                        onChange={(_, value) =>
                          handleTextSizeChange(value as number)
                        }
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        value={textSizePt}
                        type="number"
                        size="small"
                        inputProps={{ min: 8, max: 300, step: 0.5 }}
                        onChange={(e) => {
                          const newValue = parseFloat(e.target.value);
                          if (!isNaN(newValue)) handleTextSizeChange(newValue);
                        }}
                        sx={{ width: "9.6rem" }}
                      />
                    </Stack>
                  </SideItemBlock>

                  <SideItemBlock label="字体">
                    <TextField
                      value={fontFamily}
                      select
                      fullWidth
                      size="small"
                      onChange={(e) => {
                        setFontFamily(e.target.value as keyof Fonts);
                      }}
                    >
                      <MenuItem value="default">默认</MenuItem>
                      <MenuItem value="songTi">宋体</MenuItem>
                      <MenuItem value="heiTi">黑体</MenuItem>
                      <MenuItem value="kaiTi">楷体</MenuItem>
                      <MenuItem value="liShu">隶书</MenuItem>
                    </TextField>
                  </SideItemBlock>

                  <SideItemBlock label="字体风格">
                    <ToggleButtonGroup
                      value={fontStyle}
                      exclusive
                      size="small"
                      onChange={(_, newFontStyle) => {
                        if (newFontStyle) {
                          setFontStyle(newFontStyle as FontStyleType);
                        }
                      }}
                    >
                      <ToggleButton value="normal" aria-label="normal font style">
                        常规
                      </ToggleButton>
                      <ToggleButton value="italic" aria-label="italic font style">
                        斜体
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </SideItemBlock>
                </Stack>
              </Stack>
              {!breakpointDownSm && buttonGroup}
            </Stack>
            {breakpointDownSm && (
              <Stack justifyContent={"flex-end"} sx={{ flex: 1 }}>
                {buttonGroup}
              </Stack>
            )}
          </Stack>
        </Paper>
      </Stack>
      <Box
        width="6.4rem"
        height="6.4rem"
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
        }}
      >
        <Link
          href="https://github.com/vonbrank/good-news-generator"
          target="_blank"
        >
          <Stack
            width="12.8rem"
            height="12.8rem"
            sx={{
              backgroundColor: (theme) => theme.palette.common.black,
              color: (theme) => theme.palette.common.white,
              position: "absolute",
              top: "-125%",
              right: "-125%",
              transform: "rotate(45deg)",
              "&:hover .MuiSvgIcon-root": {
                width: "3.6rem",
                height: "3.6rem",
              },
            }}
            justifyContent={"end"}
            alignItems={"center"}
          >
            <GitHubIcon
              color="inherit"
              sx={{
                width: "3.2rem",
                height: "3.2rem",
                transition: "all 0.3s",
              }}
            />
          </Stack>
        </Link>
      </Box>
    </Container>
  );
};

interface SideItemBlockProps {
  label?: string;
  children?: React.ReactNode;
}

const SideItemBlock = (props: SideItemBlockProps) => {
  const { label = "", children = <></> } = props;
  return (
    <Stack direction={"row"} alignItems={"center"} spacing="1.6rem">
      <Box sx={{ width: "8.4rem" }}>
        <Typography sx={{ fontSize: "1.8rem" }}>{label}</Typography>
      </Box>
      <Box sx={{ flex: 1, width: 0 }}>{children}</Box>
    </Stack>
  );
};

export default Home;