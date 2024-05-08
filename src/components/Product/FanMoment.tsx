import React, { createElement, useContext, useState } from "react";
import {
  Avatar,
  Form,
  Button,
  Rate,
  Upload,
  message,
  List,
  Typography,
  Image as AntdImage,
  Flex,
  Tooltip,
  Modal,
  Input,
  Empty,
} from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Comment as AntComment } from "@ant-design/compatible";
import {
  DislikeFilled,
  DislikeOutlined,
  InboxOutlined,
  LikeFilled,
  LikeOutlined,
  SendOutlined,
} from "@ant-design/icons";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  createComment,
  deleteComment,
  useReactToComment,
  useReportComment,
} from "../../services/comment.api";
import { UserDataContext } from "../../context/UserDataContext";
import RatingStar from "../shared/RatingStar";
import { Comment } from "../../services";
import { useBoolean } from "usehooks-ts";
import GifLoading from "../shared/GifLoading";
import { Robin } from "../../assets/images";
import ImgCrop from "antd-img-crop";

dayjs.extend(relativeTime);

interface FanMomentProps {
  productId: string;
  comments: Comment[];
  refetch: () => void;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const FanMoment: React.FC<FanMomentProps> = ({
  productId,
  comments,
  refetch,
}) => {
  const [form] = Form.useForm();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [rating, setRating] = useState(0);
  const loading = useBoolean(false);
  const [isReporting, setIsReporting] = useState(false);
  const [reportCommentId, setReportCommentId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const reactMutation = useReactToComment(refetch);
  const reportMutation = useReportComment(refetch);

  const { userDataState } = useContext(UserDataContext);

  const handleSubmit = async () => {
    await form.validateFields().then(async () => {
      const formData = new FormData();
      formData.append("productId", productId);
      formData.append(
        "text",
        JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      );
      formData.append("rating", String(rating));
      fileList.forEach((file: any) =>
        formData.append("imageFiles", file.originFileObj)
      );

      loading.setTrue();
      try {
        await createComment(formData);
        refetch();
        message.success("Comment added successfully");
      } catch (error) {
        message.error("Failed to add comment");
      } finally {
        loading.setFalse();
        form?.resetFields();
      }
    });
  };

  const handleReaction = (commentId: string, type: "like" | "dislike") => {
    reactMutation.mutate({ commentId, type });
  };

  const showReportModal = (commentId: string) => {
    setIsReporting(true);
    setReportCommentId(commentId);
  };

  const handleCancel = () => {
    setIsReporting(false);
    setReportCommentId(null);
    setReportReason("");
  };

  const submitReport = () => {
    if (reportCommentId) {
      reportMutation.mutate(
        { commentId: reportCommentId, reason: reportReason },
        {
          onSuccess: () => {
            message.success("Report submitted successfully.");
            handleCancel();
            refetch();
          },
          onError: (error: any) => {
            message.error(
              `Error: ${
                error.response?.data?.message || "Could not submit report."
              }`
            );
          },
        }
      );
    }
  };

  const userHasCommented = comments.some(
    (comment) => comment.userId === userDataState.id
  );

  const handleDelete = (id: string) => {
    loading.setTrue();
    deleteComment(id)
      .then(() => refetch())
      .finally(() => loading.setFalse());
  };

  const renderItemActions = (item: Comment) => [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={() => handleReaction(item.id, "like")}>
        {createElement(
          item.currentUserReaction === "like" ? LikeFilled : LikeOutlined
        )}
        <span className="cursor-auto pl-2">{item.likeCount}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={() => handleReaction(item.id, "dislike")}>
        {React.createElement(
          item.currentUserReaction === "dislike"
            ? DislikeFilled
            : DislikeOutlined
        )}
        <span className="cursor-auto pl-2">{item.dislikeCount}</span>
      </span>
    </Tooltip>,
    !item.isCurrentUserReported && item.userId !== userDataState?.id && (
      <span key="comment-basic-report" onClick={() => showReportModal(item.id)}>
        Report
      </span>
    ),
    userDataState.id === item.userId && (
      <span
        key="delete"
        onClick={() => handleDelete(item.id)}
        style={{ color: "red" }}
      >
        Delete
      </span>
    ),
  ];

  const onPreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleFileChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    const doneFileList = newFileList.map((file) => ({
      ...file,
      status: "done",
    }));

    setFileList(doneFileList as UploadFile[]);
  };

  return (
    <div>
      {loading.value && <GifLoading />}
      {!userHasCommented && (
        <Form
          form={form}
          onFinish={handleSubmit}
          onError={(e) => console.log(e)}
          layout="vertical"
        >
          <Typography.Title level={5}>
            Let's share your reviews and moments
          </Typography.Title>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: "Please select a rating!" }]}
          >
            <Rate onChange={setRating} value={rating} />
          </Form.Item>
          <Form.Item name="text" label="Description">
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              editorStyle={{
                border: "1px solid gainsboro",
                padding: "5px",
                borderRadius: "3px",
              }}
              hashtag={{
                separator: " ",
                trigger: "#",
              }}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "list",
                  "textAlign",
                  "link",
                  "emoji",
                  "remove",
                  "history",
                  "colorPicker",
                ],
                inline: {
                  options: ["bold", "italic", "underline", "strikethrough"],
                },
                list: { options: ["unordered", "ordered"] },
                textAlign: { options: ["left", "center", "right"] },
                emoji: true,
                image: false, // Disabling image button
              }}
            />
          </Form.Item>
          <Form.Item
            name="imageFiles"
            label="Images"
            tooltip="Maximum 3 images"
            rules={[
              {
                validator: (_, value) =>
                  fileList.length > 0
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Please upload at least one image!")
                      ),
              },
            ]}
          >
            <ImgCrop rotationSlider showReset aspectSlider>
              <Upload.Dragger
                name="files"
                onChange={handleFileChange}
                multiple={true}
                accept="image/*"
                maxCount={3}
                listType="picture"
                onPreview={onPreview}
                fileList={fileList}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag files to this area to upload
                </p>
              </Upload.Dragger>
            </ImgCrop>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            icon={<SendOutlined />}
            loading={loading.value}
          >
            Submit Comment
          </Button>
        </Form>
      )}
      {!comments.length ? (
        <Empty
          image={
            <img src={Robin} alt={"empty fan moments"} className="mx-auto" />
          }
          imageStyle={{ height: "200px" }}
          className="my-10"
          description={
            <Typography.Text className="text-lg font-semibold">
              Let's share you fantastic moment captures and feedback with
              everyone!
            </Typography.Text>
          }
        />
      ) : (
        <List
          dataSource={comments}
          itemLayout="horizontal"
          pagination={{ pageSize: 5 }}
          renderItem={(comment) => (
            <AntComment
              key={comment.id}
              author={comment.user?.name}
              avatar={<Avatar src={comment.user?.picture} />}
              content={
                <Flex vertical gap={5}>
                  <RatingStar rating={comment?.rating} disabled />

                  <Editor
                    editorState={EditorState.createWithContent(
                      convertFromRaw(JSON.parse(comment.text))
                    )}
                    readOnly={true}
                    toolbarHidden={true}
                  />
                  <Flex gap={5}>
                    {comment?.images.map((image) => (
                      <AntdImage
                        width={200}
                        height={200}
                        src={image.imageUrl}
                        key={image.id}
                      />
                    ))}
                  </Flex>
                </Flex>
              }
              actions={renderItemActions(comment)}
              datetime={dayjs().to(dayjs(comment?.createdAt))}
            />
          )}
        />
      )}

      <Modal
        title="Report Comment"
        open={isReporting}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={reportMutation.isLoading}
            onClick={submitReport}
          >
            Submit Report
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Reason for reporting">
            <Input.TextArea
              rows={4}
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>

      {previewImage && (
        <AntdImage
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default FanMoment;
