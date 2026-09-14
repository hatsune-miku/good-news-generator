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
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
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
const fontFamilyFangSong = `"STFangsong","FangSong","仿宋",serif`;
const fontFamilyYouYuan = `"YouYuan","幼圆","Microsoft YaHei",sans-serif`;
const fontFamilyMono = `"SFMono-Regular","Consolas","Liberation Mono",monospace`;

interface Fonts {
  default: string;
  songTi: string;
  heiTi: string;
  kaiTi: string;
  liShu: string;
  fangSong: string;
  youYuan: string;
  mono: string;
}

type FontStyleType = "normal" | "italic";
type TextDecorationLineType = "underline" | "line-through" | "overline";
type TextDecorationStyleType = "solid" | "double" | "dotted" | "dashed" | "wavy";
type TextShadowPresetType = "none" | "soft" | "hard" | "glow";
type TextStyleToggleType = "bold" | "italic" | TextDecorationLineType;

const fonts: Fonts = {
  default: fontFamilyDefault,
  songTi: fontFamilySongTi,
  heiTi: fontFamilyHeiti,
  kaiTi: fontFamilyKaiti,
  liShu: fontFamilyLiShu,
  fangSong: fontFamilyFangSong,
  youYuan: fontFamilyYouYuan,
  mono: fontFamilyMono,
};

const getTextShadow = (preset: TextShadowPresetType, color: string) => {
  switch (preset) {
    case "soft":
      return "0.08em 0.1em 0.16em rgba(0, 0, 0, 0.38)";
    case "hard":
      return "0.08em 0.08em 0 rgba(0, 0, 0, 0.55)";
    case "glow":
      return `0 0 0.12em #fff, 0 0 0.3em ${color}`;
    default:
      return "none";
  }
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
  const defaultTextColor = newsType === "good-news-type" ? "#dc3023" : "#5a5a5a";
  const [customTextColor, setCustomTextColor] = useState("");
  const textColor = customTextColor || defaultTextColor;

  const [textAlignType, setTextAlignType] = useState<
    "left" | "center" | "right" | "justify"
  >("center");
  const [fontFamily, setFontFamily] = useState<keyof Fonts>("default");
  const [fontWeight, setFontWeight] = useState(400);
  const [fontStyle, setFontStyle] = useState<FontStyleType>("normal");
  const [textDecorationLines, setTextDecorationLines] = useState<
    TextDecorationLineType[]
  >([]);
  const [textDecorationStyle, setTextDecorationStyle] =
    useState<TextDecorationStyleType>("solid");
  const [letterSpacingPx, setLetterSpacingPx] = useState(0);
  const [lineHeight, setLineHeight] = useState(0.75);
  const [textShadowPreset, setTextShadowPreset] =
    useState<TextShadowPresetType>("none");
  const [strokeWidthPx, setStrokeWidthPx] = useState(0);
  const [strokeColor, setStrokeColor] = useState("#ffffff");

  const handleTextSizeChange = (value: number) => {
    setTextSizePt(Math.min(300, Math.max(8, value)));
  };

  const handleReset = () => {
    setNewsType("good-news-type");
    setTextAlignType("center");
    setFontFamily("default");
    setFontWeight(400);
    setFontStyle("normal");
    setTextDecorationLines([]);
    setTextDecorationStyle("solid");
    setLetterSpacingPx(0);
    setLineHeight(0.75);
    setTextShadowPreset("none");
    setStrokeWidthPx(0);
    setStrokeColor("#ffffff");
    setCustomTextColor("");
    setContentText("");
    setTextSizePt(24);
  };

  const selectedTextStyles: TextStyleToggleType[] = [
    ...(fontWeight >= 700 ? (["bold"] as const) : []),
    ...(fontStyle === "italic" ? (["italic"] as const) : []),
    ...textDecorationLines,
  ];

  const handleTextStylesChange = (styles: TextStyleToggleType[]) => {
    const isBold = styles.includes("bold");
    setFontWeight((current) => {
      if (isBold) return current >= 700 ? current : 700;
      return current >= 700 ? 400 : current;
    });
    setFontStyle(styles.includes("italic") ? "italic" : "normal");
    setTextDecorationLines(
      styles.filter((style): style is TextDecorationLineType =>
        ["underline", "line-through", "overline"].includes(style)
      )
    );
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
                      fontWeight,
                      fontStyle,
                      lineHeight,
                      letterSpacing: `${letterSpacingPx}px`,
                      textDecorationLine:
                        textDecorationLines.length > 0
                          ? textDecorationLines.join(" ")
                          : "none",
                      textDecorationStyle,
                      textDecorationColor: "currentColor",
                      textDecorationThickness: "0.08em",
                      textShadow: getTextShadow(textShadowPreset, textColor),
                      WebkitTextStroke:
                        strokeWidthPx > 0
                          ? `${strokeWidthPx}px ${strokeColor}`
                          : undefined,
                      paintOrder: "stroke fill",
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
                      <MenuItem value="fangSong">仿宋</MenuItem>
                      <MenuItem value="youYuan">幼圆</MenuItem>
                      <MenuItem value="mono">等宽字体</MenuItem>
                    </TextField>
                  </SideItemBlock>

                  <SideItemBlock label="基础样式">
                    <ToggleButtonGroup
                      value={selectedTextStyles}
                      size="small"
                      onChange={(_, newStyles) => {
                        handleTextStylesChange(
                          newStyles as TextStyleToggleType[]
                        );
                      }}
                    >
                      <ToggleButton value="bold" aria-label="加粗">
                        <FormatBoldIcon />
                      </ToggleButton>
                      <ToggleButton value="italic" aria-label="斜体">
                        <FormatItalicIcon />
                      </ToggleButton>
                      <ToggleButton value="underline" aria-label="下划线">
                        <FormatUnderlinedIcon />
                      </ToggleButton>
                      <ToggleButton value="line-through" aria-label="删除线">
                        <StrikethroughSIcon />
                      </ToggleButton>
                      <ToggleButton value="overline" aria-label="上划线">
                        <Typography sx={{ textDecoration: "overline" }}>
                          A
                        </Typography>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </SideItemBlock>

                  <SideItemBlock label="字重">
                    <TextField
                      value={fontWeight}
                      select
                      fullWidth
                      size="small"
                      onChange={(event) =>
                        setFontWeight(Number(event.target.value))
                      }
                    >
                      <MenuItem value={100}>100 极细</MenuItem>
                      <MenuItem value={200}>200 纤细</MenuItem>
                      <MenuItem value={300}>300 细体</MenuItem>
                      <MenuItem value={400}>400 常规</MenuItem>
                      <MenuItem value={500}>500 中等</MenuItem>
                      <MenuItem value={600}>600 半粗</MenuItem>
                      <MenuItem value={700}>700 粗体</MenuItem>
                      <MenuItem value={800}>800 特粗</MenuItem>
                      <MenuItem value={900}>900 黑体</MenuItem>
                    </TextField>
                  </SideItemBlock>

                  <SideItemBlock label="装饰线样式">
                    <TextField
                      value={textDecorationStyle}
                      select
                      fullWidth
                      size="small"
                      disabled={textDecorationLines.length === 0}
                      onChange={(event) =>
                        setTextDecorationStyle(
                          event.target.value as TextDecorationStyleType
                        )
                      }
                    >
                      <MenuItem value="solid">实线</MenuItem>
                      <MenuItem value="double">双线</MenuItem>
                      <MenuItem value="dotted">点线</MenuItem>
                      <MenuItem value="dashed">虚线</MenuItem>
                      <MenuItem value="wavy">波浪线</MenuItem>
                    </TextField>
                  </SideItemBlock>

                  <SideItemBlock label="文字颜色">
                    <Stack direction="row" spacing="1rem" alignItems="center">
                      <TextField
                        type="color"
                        value={textColor}
                        size="small"
                        onChange={(event) =>
                          setCustomTextColor(event.target.value)
                        }
                        inputProps={{ "aria-label": "文字颜色" }}
                        sx={{ width: "7.2rem" }}
                      />
                      <TextField
                        value={textColor}
                        size="small"
                        onChange={(event) =>
                          setCustomTextColor(event.target.value)
                        }
                        inputProps={{ "aria-label": "文字颜色值" }}
                        sx={{ flex: 1 }}
                      />
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => setCustomTextColor("")}
                      >
                        自动
                      </Button>
                    </Stack>
                  </SideItemBlock>

                  <SideItemBlock label="字间距 (px)">
                    <Stack direction="row" spacing="1.6rem" alignItems="center">
                      <Slider
                        min={-10}
                        max={40}
                        step={0.5}
                        value={letterSpacingPx}
                        valueLabelDisplay="auto"
                        onChange={(_, value) =>
                          setLetterSpacingPx(value as number)
                        }
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        value={letterSpacingPx}
                        type="number"
                        size="small"
                        inputProps={{ min: -10, max: 40, step: 0.5 }}
                        onChange={(event) => {
                          const value = Number(event.target.value);
                          if (!Number.isNaN(value)) {
                            setLetterSpacingPx(
                              Math.min(40, Math.max(-10, value))
                            );
                          }
                        }}
                        sx={{ width: "9.6rem" }}
                      />
                    </Stack>
                  </SideItemBlock>

                  <SideItemBlock label="行高">
                    <Stack direction="row" spacing="1.6rem" alignItems="center">
                      <Slider
                        min={0.5}
                        max={3}
                        step={0.05}
                        value={lineHeight}
                        valueLabelDisplay="auto"
                        onChange={(_, value) => setLineHeight(value as number)}
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        value={lineHeight}
                        type="number"
                        size="small"
                        inputProps={{ min: 0.5, max: 3, step: 0.05 }}
                        onChange={(event) => {
                          const value = Number(event.target.value);
                          if (!Number.isNaN(value)) {
                            setLineHeight(Math.min(3, Math.max(0.5, value)));
                          }
                        }}
                        sx={{ width: "9.6rem" }}
                      />
                    </Stack>
                  </SideItemBlock>

                  <SideItemBlock label="文字阴影">
                    <TextField
                      value={textShadowPreset}
                      select
                      fullWidth
                      size="small"
                      onChange={(event) =>
                        setTextShadowPreset(
                          event.target.value as TextShadowPresetType
                        )
                      }
                    >
                      <MenuItem value="none">无</MenuItem>
                      <MenuItem value="soft">柔和阴影</MenuItem>
                      <MenuItem value="hard">硬边阴影</MenuItem>
                      <MenuItem value="glow">发光</MenuItem>
                    </TextField>
                  </SideItemBlock>

                  <SideItemBlock label="文字描边">
                    <Stack direction="row" spacing="1rem" alignItems="center">
                      <Slider
                        min={0}
                        max={8}
                        step={0.25}
                        value={strokeWidthPx}
                        valueLabelDisplay="auto"
                        onChange={(_, value) =>
                          setStrokeWidthPx(value as number)
                        }
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        value={strokeWidthPx}
                        type="number"
                        size="small"
                        inputProps={{ min: 0, max: 8, step: 0.25 }}
                        onChange={(event) => {
                          const value = Number(event.target.value);
                          if (!Number.isNaN(value)) {
                            setStrokeWidthPx(Math.min(8, Math.max(0, value)));
                          }
                        }}
                        sx={{ width: "8rem" }}
                      />
                      <TextField
                        type="color"
                        value={strokeColor}
                        size="small"
                        disabled={strokeWidthPx === 0}
                        onChange={(event) => setStrokeColor(event.target.value)}
                        inputProps={{ "aria-label": "描边颜色" }}
                        sx={{ width: "7.2rem" }}
                      />
                    </Stack>
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
