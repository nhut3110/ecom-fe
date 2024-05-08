import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Comment, ReactionData, ReportData } from "./types.api";
import { authApi } from "./api";

interface FetchCommentListProps {
  productId: string;
  enabled?: boolean;
}

const getComments = async (
  productId: string
): Promise<AxiosResponse<Comment[]>> => {
  return await authApi.get("/comments", { params: { productId } });
};

const createComment = async (
  commentData: FormData
): Promise<AxiosResponse<Comment>> => {
  return await authApi.post("/comments", commentData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const updateComment = async (
  commentId: string,
  updateData: FormData
): Promise<AxiosResponse<Comment>> => {
  return await authApi.put(`/comments/${commentId}`, updateData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const deleteComment = async (
  commentId: string
): Promise<AxiosResponse<void>> => {
  return await authApi.delete(`/comments/${commentId}`);
};

const fetchCommentList = ({
  productId,
  enabled = true,
}: FetchCommentListProps) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [`comments-${productId}`],
    queryFn: () => getComments(productId),
    enabled,
  });

  return {
    comments: data?.data,
    error,
    isLoading,
    refetchCommentList: refetch,
  };
};

const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });
};

// Hook to handle like and dislike reactions
const useReactToComment = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (reactionData: ReactionData) =>
      authApi.post("/comments/reaction", reactionData), // Ensure type is specified
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
        if (onSuccess) {
          onSuccess();
        }
      },
    }
  );
};

// Hook to handle reporting comments
const useReportComment = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (reportData: ReportData) => authApi.post("/comments/report", reportData), // Ensure type is specified
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (error: any) => {
        console.error(
          "Error reporting comment:",
          error?.response?.data?.message
        );
      },
    }
  );
};

export {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  fetchCommentList,
  useCreateComment,
  useReactToComment,
  useReportComment,
};
