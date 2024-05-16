import React, { useContext, useRef, useState } from "react";
import {
  List,
  Button,
  Input,
  Form,
  Avatar,
  Flex,
  Tooltip,
  Modal,
  Typography,
  Empty,
} from "antd";
import { Comment as AntComment } from "@ant-design/compatible";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import dayjs from "dayjs/esm";
import relativeTime from "dayjs/esm/plugin/relativeTime";
import {
  Discussion,
  createDiscussion,
  deleteDiscussion,
  updateDiscussion,
} from "../../services";
import {
  CloseOutlined,
  EditOutlined,
  SendOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useOnClickOutside } from "usehooks-ts";
import { UserDataContext } from "../../context/UserDataContext";
import { Announcement } from "../../assets/images";

dayjs.extend(relativeTime);

interface DiscussionThreadProps {
  discussions: Discussion[];
  productId: string;
  maxLevel?: number;
  currentLevel?: number;
  refetch: () => void;
}

const CommentInput: React.FC<{
  onSend: (value: string) => void;
  onCancel?: () => void;
  initValue?: string;
}> = ({ onSend, onCancel, initValue }) => {
  const [text, setText] = useState(initValue ?? "");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiBtnRef = useRef(null);

  useOnClickOutside(emojiBtnRef, () => setShowEmojiPicker(false));

  const handleEmojiSelect = (emojiObject: EmojiClickData) => {
    setText((prevText) => prevText + emojiObject.emoji);
  };

  const handleSend = () => {
    onSend(text);
    setText("");
    setShowEmojiPicker(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setText("");
  };

  return (
    <div className="w-full">
      <Form layout="vertical">
        <Typography>Let's share your ideas here!</Typography>
        <Form.Item noStyle>
          <Input
            value={text}
            size="large"
            onChange={(e) => setText(e.target.value)}
            addonAfter={
              <Flex gap={5}>
                <div className="relative" ref={emojiBtnRef}>
                  <Button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    type="text"
                    icon={<SmileOutlined />}
                  />
                  {showEmojiPicker && (
                    <EmojiPicker
                      onEmojiClick={handleEmojiSelect}
                      style={{
                        position: "absolute",
                        zIndex: 9999,
                        top: 40,
                        right: 5,
                      }}
                      emojiStyle={EmojiStyle.NATIVE}
                      previewConfig={{ showPreview: false }}
                    />
                  )}
                </div>
                <Button
                  type="text"
                  onClick={handleSend}
                  icon={<SendOutlined />}
                />
              </Flex>
            }
            addonBefore={
              onCancel ? (
                <Button
                  type="text"
                  danger
                  onClick={handleCancel}
                  icon={<CloseOutlined />}
                />
              ) : null
            }
          />
        </Form.Item>
      </Form>
    </div>
  );
};

const DiscussionThread: React.FC<DiscussionThreadProps> = ({
  discussions,
  productId,
  maxLevel = 3,
  currentLevel = 1,
  refetch,
}) => {
  const { userDataState } = useContext(UserDataContext);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);

  const handleEdit = (id: string, currentText: string) => {
    if ((editingId || replyingToId) && editingId !== id) {
      Modal.confirm({
        title: "You are currently editing or replying to another comment",
        content: "Do you want to discard changes and edit this comment?",
        onOk: () => {
          setEditingId(id);
          setReplyingToId(null); // Ensure replying is reset
        },
      });
    } else {
      setEditingId(id);
      setReplyingToId(null); // Ensure replying is reset
    }
  };

  const handleReply = (id: string) => {
    if ((editingId || replyingToId) && replyingToId !== id) {
      Modal.confirm({
        title: "You are currently editing or replying to another comment",
        content:
          "Do you want to discard your current action and reply to this comment?",
        onOk: () => {
          setReplyingToId(id);
          setEditingId(null); // Ensure editing is reset
        },
      });
    } else {
      setReplyingToId(id);
      setEditingId(null); // Ensure editing is reset
    }
  };

  const handleSendEdit = (id: string, newText: string) => {
    // console.log("Edit Comment:", id, "New Text:", newText);
    setEditingId(null); // Close edit input after sending
    updateDiscussion(id, { text: newText }).then(() => {
      refetch();
    });
  };

  const handleSendReply = (text: string, parentId: string | null) => {
    // console.log("Send Reply:", text, " to Parent ID:", parentId);
    setReplyingToId(null); // Close reply input after sending
    createDiscussion({
      productId,
      text,
      parentId: parentId ?? undefined,
    }).then(() => {
      refetch();
    });
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this comment?",
      content: "This action cannot be undone.",
      onOk: () => {
        deleteDiscussion(id).then(() => {
          refetch();
        });
      },
    });
  };

  const renderItemActions = (item: Discussion) => [
    currentLevel < maxLevel && (
      <span key="reply" onClick={() => handleReply(item.id)}>
        Reply
      </span>
    ),
    userDataState.id === item.userId && (
      <span key="edit" onClick={() => handleEdit(item.id, item.text)}>
        Edit
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

  if (!discussions.length && currentLevel !== 1) return <></>;

  return (
    <div>
      {currentLevel === 1 ? (
        <Flex gap={5} align="flex-end" className="w-full">
          <Avatar src={userDataState?.picture} size={40} />
          <CommentInput onSend={(text) => handleSendReply(text, null)} />
        </Flex>
      ) : (
        <></>
      )}
      {!discussions.length && currentLevel === 1 ? (
        <Empty
          image={
            <img
              src={Announcement}
              alt={"empty discussion"}
              className="mx-auto"
            />
          }
          imageStyle={{ height: "200px" }}
          className="my-10"
          description={
            <Typography.Text className="text-lg font-semibold">
              It's too quite here, come and start the exciting discussion!!!
            </Typography.Text>
          }
        />
      ) : (
        <List
          dataSource={discussions}
          pagination={
            currentLevel === 1
              ? {
                  pageSize: 10,
                }
              : false
          }
          itemLayout="horizontal"
          renderItem={(item) => (
            <div
              style={
                currentLevel !== 1
                  ? {
                      borderLeft: "1px solid #ccc",
                      paddingLeft: 20,
                      marginLeft: 20,
                    }
                  : {}
              }
            >
              <AntComment
                author={item.user?.name}
                avatar={<Avatar src={item.user?.picture} />}
                content={<p>{item.text}</p>}
                actions={renderItemActions(item)}
                datetime={
                  <Flex gap={2}>{dayjs().to(dayjs(item?.createdAt))}</Flex>
                }
              />
              {item.id === editingId ? (
                <CommentInput
                  onSend={(newText) => handleSendEdit(item.id, newText)}
                  initValue={item.text}
                  onCancel={() => setEditingId(null)}
                />
              ) : item.id === replyingToId ? (
                <CommentInput
                  onSend={(text) => handleSendReply(text, item.id)}
                  onCancel={() => setReplyingToId(null)}
                />
              ) : (
                <></>
              )}
              {item.replies && currentLevel < maxLevel && (
                <DiscussionThread
                  discussions={item.replies}
                  productId={productId}
                  maxLevel={maxLevel}
                  currentLevel={currentLevel + 1}
                  refetch={refetch}
                />
              )}
            </div>
          )}
        />
      )}
    </div>
  );
};

export default DiscussionThread;
