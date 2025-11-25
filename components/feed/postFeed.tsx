"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, MoreHorizontal, ThumbsUp } from 'lucide-react';
import {
  useGetPostsQuery,
  useTogglePostLikeMutation,
} from '@/lib/redux/features/post/postApi';
import { useCreateCommentMutation } from '@/lib/redux/features/comment/commentApi';

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
  const { data: postsRes, isLoading } = useGetPostsQuery({ page: 1, limit: 10, visibility: 'public' });
  const [togglePostLike] = useTogglePostLikeMutation();
  const [createComment] = useCreateCommentMutation();

  const [commentTextMap, setCommentTextMap] = useState<Record<string, string>>({});
  const [showReplyInput, setShowReplyInput] = useState<string | null>(null);

  const posts: any[] = (postsRes as any)?.data ?? [];

  const handleLike = async (postId: string) => {
    try {
      await togglePostLike({ postId }).unwrap();
    } catch (err) {
      console.error('Toggle like error', err);
    }
  };

  const handleSubmitComment = async (postId: string) => {
    const content = commentTextMap[postId]?.trim();
    if (!content) return;
    try {
      await createComment({ postId, content }).unwrap();
      setCommentTextMap((p) => ({ ...p, [postId]: '' }));
    } catch (err) {
      console.error('Create comment error', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {isLoading && <div className="text-center py-6">Loading posts...</div>}
      {posts.map((post) => (
        <div key={post._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          {/* Post Header */}
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                  <Image
                    src={post.author?.profilePicture || '/images/f5.png'}
                    alt={post.author?.firstName || 'User'}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{post.author?.firstName ?? post.author?.username}</h3>
                  <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()} · {post.visibility}</p>
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
              <Image src={post.image} alt={post.content ?? 'post image'} fill className="object-cover" />
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
                <span className="text-sm text-gray-600">{post.likeCount ?? 0}</span>
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition text-gray-600 hover:bg-gray-100`}
              >
                <ThumbsUp className={`w-5 h-5`} />
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
                <Image src="/images/img10.png" alt="You" width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Write a comment"
                    value={commentTextMap[post._id] ?? ''}
                    onChange={(e) => setCommentTextMap((p) => ({ ...p, [post._id]: e.target.value }))}
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

          {/* Comments List (use post.comments if available) */}
          {(post.comments ?? []).map((comment: any) => (
            <div key={comment._id || comment.id} className="px-4 pb-3">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <Image src={comment.author?.profilePicture || comment.avatar || '/images/img10.png'} alt={comment.author?.firstName || 'User'} width={40} height={40} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <h4 className="font-semibold text-sm">{comment.author?.firstName ?? comment.author?.username ?? comment.author ?? 'User'}</h4>
                    <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <button className="font-medium hover:underline">Like</button>
                    <button
                      onClick={() => setShowReplyInput(showReplyInput === (comment._id || comment.id) ? null : (comment._id || comment.id))}
                      className="font-medium hover:underline"
                    >
                      Reply
                    </button>
                    <button className="font-medium hover:underline">Share</button>
                    <span>{comment.time}</span>
                    <div className="flex items-center gap-1 ml-2">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                      <span className="font-medium text-gray-700">{comment.likes ?? 0}</span>
                    </div>
                  </div>

                  {/* Reply Input */}
                  {showReplyInput === (comment._id || comment.id) && (
                    <div className="mt-3 flex gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image src="/images/your-avatar.jpg" alt="You" width={32} height={32} className="object-cover" />
                      </div>
                      <input type="text" placeholder="Write a reply..." className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}