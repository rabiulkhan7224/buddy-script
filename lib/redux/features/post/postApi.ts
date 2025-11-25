import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagType";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ⬆ Create post
    createPost: builder.mutation<
      unknown,
      { content?: string; image?: string | null; visibility?: string }
    >({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: [{ type: tagTypes.post, id: "LIST" }],
    }),

    // ⬆ All posts
    getPosts: builder.query<
      unknown,
      { page?: number; limit?: number; visibility?: string } | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const limit = args?.limit ?? 10;
        const visibility = args?.visibility ?? "public";
        return {
          url: `/posts?page=${page}&limit=${limit}&visibility=${visibility}`,
          method: "GET",
        };
      },
      providesTags: (result: any) => [
        ...(result?.data
          ? result.data.map((post: any) => ({
              type: tagTypes.post,
              id: post._id,
            }))
          : []),
        { type: tagTypes.post, id: "LIST" },
      ],
    }),

    // ⬆ Single post
    getPost: builder.query<unknown, string>({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "GET",
      }),
      providesTags: (_r, _e, postId) => [
        { type: tagTypes.post, id: postId },
      ],
    }),

    // ⬆ User feed
    getUserFeed: builder.query<
      unknown,
      { page?: number; limit?: number } | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const limit = args?.limit ?? 10;
        return {
          url: `/posts/feed/user?page=${page}&limit=${limit}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: (result: any) => [
        ...(result?.data
          ? result.data.map((post: any) => ({
              type: tagTypes.post,
              id: post._id,
            }))
          : []),
        { type: tagTypes.post, id: "LIST" },
      ],
    }),

    // ⬆ Like post
    togglePostLike: builder.mutation<
      unknown,
      { postId: string }
    >({
      query: ({ postId }) => ({
        url: `/posts/${postId}/like`,
        method: "POST",
      }),
      invalidatesTags: (_r, _e, { postId }) => [
        { type: tagTypes.post, id: postId },
        { type: tagTypes.me, id: "ME" },
      ],
    }),

    // ⬆ Likes list
    getPostLikes: builder.query<
      unknown,
      { postId: string; page?: number; limit?: number }
    >({
      query: ({ postId, page = 1, limit = 20 }) => ({
        url: `/posts/${postId}/likes?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetPostQuery,
  useGetUserFeedQuery,
  useTogglePostLikeMutation,
  useGetPostLikesQuery,
} = postApi;

export default postApi;
