import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagType";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create comment or reply
    createComment: builder.mutation<unknown, { postId: string; content: string; parentComment?: string }>(
      {
        query: ({ postId, content, parentComment }) => ({
          url: `/comments/post/${postId}`,
          method: "POST",
          body: { content, parentComment },
        }),
        invalidatesTags: (result: any, error: any, { postId }) => [
          { type: tagTypes.post as const, id: postId },
          { type: tagTypes.comment as const, id: "LIST" },
        ],
      }
    ),

    // Get top-level comments for a post
    getPostComments: builder.query<unknown, { postId: string; page?: number; limit?: number }>({
      query: ({ postId, page = 1, limit = 10 }) => ({
        url: `/comments/post/${postId}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: (result: any, error: any, { postId }) =>
        result?.data
          ? result.data.map((c: any) => ({ type: tagTypes.comment as const, id: c._id }))
          : [{ type: tagTypes.comment as const, id: `POST_${postId}` }],
    }),

    // Get replies for a comment
    getCommentReplies: builder.query<unknown, { commentId: string; page?: number; limit?: number }>({
      query: ({ commentId, page = 1, limit = 10 }) => ({
        url: `/comments/${commentId}/replies?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: (result: any, error: any, { commentId }) =>
        result?.data
          ? result.data.map((c: any) => ({ type: tagTypes.comment as const, id: c._id }))
          : [{ type: tagTypes.comment as const, id: `COMMENT_${commentId}` }],
    }),

    // Toggle like on comment
    toggleCommentLike: builder.mutation<unknown, { commentId: string }>({
      query: ({ commentId }) => ({
        url: `/comments/${commentId}/like`,
        method: "POST",
      }),
      invalidatesTags: (result: any, error: any, { commentId }) => [
        { type: tagTypes.comment as const, id: commentId },
      ],
    }),

    // Get comment likes
    getCommentLikes: builder.query<unknown, { commentId: string; page?: number; limit?: number }>({
      query: ({ commentId, page = 1, limit = 20 }) => ({
        url: `/comments/${commentId}/likes?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetPostCommentsQuery,
  useGetCommentRepliesQuery,
  useToggleCommentLikeMutation,
  useGetCommentLikesQuery,
} = commentApi;

export default commentApi;
