import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagType";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ⬆ Create comment or reply
    createComment: builder.mutation<
      unknown,
      { postId: string; content: string; parentComment?: string }
    >({
      query: ({ postId, content, parentComment }) => ({
        url: `/comments/post/${postId}`,
        method: "POST",
        body: { content, parentComment },
      }),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: tagTypes.post, id: postId },
        { type: tagTypes.comment, id: `POST_${postId}` },
      ],
    }),

    // ⬆ Get post comments
    getPostComments: builder.query<
      unknown,
      { postId: string; page?: number; limit?: number }
    >({
      query: ({ postId, page = 1, limit = 10 }) => ({
        url: `/comments/post/${postId}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: (result: any, _err, { postId }) => [
        ...(result?.data
          ? result.data.map((c: any) => ({
              type: tagTypes.comment,
              id: c._id,
            }))
          : []),
        { type: tagTypes.comment, id: `POST_${postId}` },
      ],
    }),

    // ⬆ Replies
    getCommentReplies: builder.query<
      unknown,
      { commentId: string; page?: number; limit?: number }
    >({
      query: ({ commentId, page = 1, limit = 10 }) => ({
        url: `/comments/${commentId}/replies?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: (result: any, _err, { commentId }) => [
        ...(result?.data
          ? result.data.map((c: any) => ({
              type: tagTypes.comment,
              id: c._id,
            }))
          : []),
        { type: tagTypes.comment, id: `REPLIES_${commentId}` },
      ],
    }),

    // ⬆ Like toggle
    toggleCommentLike: builder.mutation<
      unknown,
      { commentId: string }
    >({
      query: ({ commentId }) => ({
        url: `/comments/${commentId}/like`,
        method: "POST",
      }),
      invalidatesTags: (_r, _e, { commentId }) => [
        { type: tagTypes.comment, id: commentId },
      ],
    }),

    // ⬆ Update
    updateComment: builder.mutation<
      unknown,
      { commentId: string; content: string }
    >({
      query: ({ commentId, content }) => ({
        url: `/comments/${commentId}`,
        method: "PATCH",
        body: { content },
      }),
      invalidatesTags: (_r, _e, { commentId }) => [
        { type: tagTypes.comment, id: commentId },
      ],
    }),

    // ⬆ Delete comment (FIXED: now takes postId)
    deleteComment: builder.mutation<
      unknown,
      { commentId: string; postId: string }
    >({
      query: ({ commentId }) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),

      invalidatesTags: (_r, _e, { commentId, postId }) => [
        { type: tagTypes.comment, id: commentId },
        { type: tagTypes.comment, id: `POST_${postId}` },
        { type: tagTypes.post, id: postId },
      ],
    }),

    // ⬆ Likes list
    getCommentLikes: builder.query<
      unknown,
      { commentId: string; page?: number; limit?: number }
    >({
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
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentLikesQuery,
} = commentApi;

export default commentApi;
