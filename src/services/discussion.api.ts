import { AxiosResponse } from "axios";
import { Discussion } from "./types.api";
import { authApi, publicApi } from "./api";
import { useQuery } from "@tanstack/react-query";

interface FetchDiscussionListProps {
  productId: string;
  enabled?: boolean;
}

const getDiscussions = async (
  productId: string
): Promise<AxiosResponse<Discussion[]>> => {
  return await publicApi.get("/discussions", {
    params: { productId },
  });
};

const createDiscussion = async (
  discussionData: Partial<Discussion>
): Promise<AxiosResponse<Discussion>> => {
  return await authApi.post("/discussions", discussionData);
};

const updateDiscussion = async (
  discussionId: string,
  updateData: Partial<Discussion>
): Promise<AxiosResponse<Discussion>> => {
  return await authApi.put(`/discussions/${discussionId}`, updateData);
};

const deleteDiscussion = async (
  discussionId: string
): Promise<AxiosResponse<void>> => {
  return await authApi.delete(`/discussions/${discussionId}`);
};

const fetchDiscussionList = ({
  productId,
  enabled = true,
}: FetchDiscussionListProps) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [`discussions-${productId}`],
    queryFn: () => getDiscussions(productId),
    enabled,
  });

  return {
    discussions: data?.data,
    error,
    isLoading,
    refetchDiscussionList: refetch,
  };
};

export {
  getDiscussions,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  fetchDiscussionList,
};
