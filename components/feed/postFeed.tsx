"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  ThumbsUp,
} from "lucide-react";
import { useGetPostsQuery } from "@/lib/redux/features/post/postApi";
import {
  useCreateCommentMutation,
  useGetPostCommentsQuery,
  useToggleCommentLikeMutation,
} from "@/lib/redux/features/comment/commentApi";
import { useTogglePostLikeMutation } from "@/lib/redux/features/post/postApi";
import { useCurrentUser } from "@/lib/hooks/auth";

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
  replies?: Comment[];
}

export default function PostFeed() {
  const { data: postsRes, isLoading } = useGetPostsQuery({
    page: 1,
    limit: 10,
    visibility: "public",
  });
  const posts: any[] = (postsRes as any)?.data ?? [];
  const { user } = useCurrentUser();
  console.log("user", user);
  // PostItem component handles per-post hooks (comments, likes, replies)
  function PostItem({ post }: { post: any }) {
    const getDisplayName = (user: any) => {
      if (!user) return "User";
      if (typeof user === "string") return user;
      const first = user.firstName || user.first_name || "";
      const last = user.lastName || user.last_name || "";
      const full = `${first} ${last}`.trim();
      return full || user.username || user.email || "User";
    };
    const [togglePostLike] = useTogglePostLikeMutation();
    const [createComment] = useCreateCommentMutation();
    const [toggleCommentLike] = useToggleCommentLikeMutation();

    // Local optimistic UI state for like
    const [liked, setLiked] = useState<boolean>(!!post.liked);
    const [likeCount, setLikeCount] = useState<number>(post.likeCount ?? 0);

    const { data: commentsRes } = useGetPostCommentsQuery({
      postId: post._id,
      page: 1,
      limit: 5,
    });
    const comments: any[] = (commentsRes as any)?.data ?? post.comments ?? [];

    const [commentText, setCommentText] = useState("");
    const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>(
      {}
    );
    const [showReplyInput, setShowReplyInput] = useState<string | null>(null);

    const handleLike = async (postId: string) => {
      // optimistic UI
      // const prevLiked = liked;
      // const prevCount = likeCount;
      // setLiked(!prevLiked);
      // setLikeCount(prevLiked ? Math.max(0, prevCount - 1) : prevCount + 1);

      try {
        await togglePostLike({ postId }).unwrap();
      } catch (err) {
        // rollback on error
        console.error("Toggle like error", err);
        // setLiked(prevLiked);
        // setLikeCount(prevCount);
      }
    };

    const handleSubmitComment = async (postId: string) => {
      const content = commentText.trim();
      if (!content) return;
      try {
        await createComment({ postId, content }).unwrap();
        setCommentText("");
      } catch (err) {
        console.error("Create comment error", err);
      }
    };

    const handleSubmitReply = async (
      postId: string,
      parentCommentId: string
    ) => {
      const content = (replyTextMap[parentCommentId] || "").trim();
      if (!content) return;
      try {
        await createComment({
          postId,
          content,
          parentComment: parentCommentId,
        }).unwrap();
        setReplyTextMap((p) => ({ ...p, [parentCommentId]: "" }));
        setShowReplyInput(null);
      } catch (err) {
        console.error("Create reply error", err);
      }
    };

    const handleCommentLike = async (commentId: string) => {
      try {
        await toggleCommentLike({ commentId }).unwrap();
      } catch (err) {
        console.error("Toggle comment like error", err);
      }
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        {/* Post Header */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                <Image
                  src={post.author?.profilePicture || "/images/f5.png"}
                  alt={post.author?.firstName || "User"}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {getDisplayName(post.author)}
                </h3>
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleString()} ·{" "}
                  {post.visibility}
                </p>
              </div>
            </div>
            <button className="text-gray-500 hover:bg-gray-100 rounded-full p-2">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-3 text-gray-800">{post.content}</p>
        </div>

        {/* Post Image (if any) */}
        {post.image && (
          <div className="relative aspect-4/3 bg-gray-100">
            <Image
              src={post.image}
              alt={post.content ?? "post image"}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Reactions Summary */}
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center">
                  <ThumbsUp className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="text-sm" data-testid="like-count">
                {likeCount}
              </span>
            </div>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>{post.commentCount ?? 0} Comment</span>
              <span>{post.shares ?? 0} Share</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 py-2 border-t border-gray-200">
          <div className="flex items-center justify-around">
            <button
              onClick={() => handleLike(post._id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                post.likes.includes(user?._id)
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ThumbsUp
                className={`w-5 h-5 ${
                  liked ? "fill-current text-blue-600" : ""
                }`}
              />
              <span>Like</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
              <MessageCircle className="w-5 h-5" />
              <span>Comment</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Comment Input */}
        <div className="px-4 py-3 border-t border-gray-200">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
              <Image
                src="/images/img10.png"
                alt="You"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Write a comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleSubmitComment(post._id)}
                  className="text-blue-600 font-medium"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View Previous Comments */}
        <div className="px-4 py-2 text-sm text-blue-600 font-medium cursor-pointer hover:bg-gray-50">
          View comments
        </div>

        {/* Comments List (use comments from query) */}
        {comments &&
          comments.map((comment: any, index) => (
            <div key={comment?._id || index} className="px-4 pb-3">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={
                      comment.author?.profilePicture ||
                      comment.avatar ||
                      "/images/img10.png"
                    }
                    alt={comment.author?.firstName || "User"}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <h4 className="font-semibold text-sm">
                      {getDisplayName(comment.author)}
                    </h4>
                    <p className="text-sm text-gray-700 mt-1">
                      {comment.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <button
                      onClick={() =>
                        handleCommentLike(comment._id || comment.id)
                      }
                      className="font-medium hover:underline"
                    >
                      Like
                    </button>
                    <button
                      onClick={() =>
                        setShowReplyInput(
                          showReplyInput === (comment._id || comment.id)
                            ? null
                            : comment._id || comment.id
                        )
                      }
                      className="font-medium hover:underline"
                    >
                      Reply
                    </button>
                    <button className="font-medium hover:underline">
                      Share
                    </button>
                    <span>{comment.time}</span>
                    <div className="flex items-center gap-1 ml-2">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                      <span className="font-medium text-gray-700">
                        {comment.likes ?? 0}
                      </span>
                    </div>
                  </div>

                  {/* Reply Input */}
                  {showReplyInput === (comment._id || comment.id) && (
                    <div className="mt-3 flex gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src="/images/your-avatar.jpg"
                          alt="You"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          placeholder="Write a reply..."
                          value={replyTextMap[comment._id || comment.id] ?? ""}
                          onChange={(e) =>
                            setReplyTextMap((p) => ({
                              ...p,
                              [comment._id || comment.id]: e.target.value,
                            }))
                          }
                          className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() =>
                            handleSubmitReply(
                              post._id,
                              comment._id || comment.id
                            )
                          }
                          className="text-blue-600 font-medium"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto  w-full">
      {isLoading && <div className="text-center py-6">Loading posts...</div>}
      {posts &&
        posts.map((post, index) => (
          <PostItem key={post._id || index} post={post} />
        ))}
    </div>
  );
}
