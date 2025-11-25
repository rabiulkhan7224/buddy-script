import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagType";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<unknown, { content?: string; image?: string | null; visibility?: string }>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
    }),
    // Get all posts (public feed)
    getPosts: builder.query<unknown, { page?: number; limit?: number; visibility?: string } | void>({
      query: (args) => {
        const page = args?.page ?? 1;
        const limit = args?.limit ?? 10;
        const visibility = args?.visibility ?? "public";
        return {
          url: `/posts?page=${page}&limit=${limit}&visibility=${visibility}`,
          method: "GET",
        };
      },
      providesTags: (result: any) =>
        result?.data
          ? result.data.map((post: any) => ({ type: tagTypes.post as const, id: post._id }))
          : [{ type: tagTypes.post as const, id: "LIST" }],
    }),

    // Get single post
    getPost: builder.query<unknown, string>({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "GET",
      }),
      providesTags: (result: any, error: any, id: string) => [{ type: tagTypes.post as const, id }],
    }),

    // User feed (auth)
    getUserFeed: builder.query<unknown, { page?: number; limit?: number } | void>({
      query: (args) => {
        const page = args?.page ?? 1;
        const limit = args?.limit ?? 10;
        return {
          url: `/posts/feed/user?page=${page}&limit=${limit}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: (result: any) =>
        result?.data
          ? result.data.map((post: any) => ({ type: tagTypes.post as const, id: post._id }))
          : [{ type: tagTypes.post as const, id: "LIST" }],
    }),

    // Toggle like on post
    togglePostLike: builder.mutation<unknown, { postId: string }>({
      query: ({ postId }) => ({
        url: `/posts/${postId}/like`,
        method: "POST",
      }),
      invalidatesTags: (result: any, error: any, { postId }) => [
        { type: tagTypes.post as const, id: postId },
        { type: tagTypes.me as const, id: "ME" },
      ],
    }),

    // Get post likes
    getPostLikes: builder.query<unknown, { postId: string; page?: number; limit?: number }>({
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
