'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, MoreHorizontal, ThumbsUp } from 'lucide-react';

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
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(9);
  const [commentText, setCommentText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState<number | null>(null);

  const comments: Comment[] = [
    {
      id: 1,
      author: "Radoovan SkillArena",
      avatar: "/images/img10.png",
      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      time: "2h",
      likes: 198,
    }
  ];

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        {/* Post Header */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                <Image
                  src="/images/f5.png"
                  alt="Karim Saif"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Karim Saif</h3>
                <p className="text-xs text-gray-500">5 minute ago · Public</p>
              </div>
            </div>
            <button className="text-gray-500 hover:bg-gray-100 rounded-full p-2">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-3 text-gray-800">- Healthy Tracking App</p>
        </div>

        {/* Post Image */}
        <div className="relative aspect-[4/3] bg-gray-100">
          <Image
            src="/images/timeline_img.png"
            alt="Healthy Tracking App"
            fill
            className="object-cover"
          />
        </div>

        {/* Reactions Summary */}
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center">
                  <ThumbsUp className="w-4 h-4 text-white" />
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-white bg-red-500 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" fill="white" />
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-white bg-yellow-500 flex items-center justify-center text-xs font-bold">
                  Haha
                </div>
              </div>
              <span className="text-sm text-gray-600">9+</span>
            </div>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>12 Comment</span>
              <span>122 Share</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 py-2 border-t border-gray-200">
          <div className="flex items-center justify-around">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                liked ? 'text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-blue-600' : ''}`} />
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
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/images/img10.png"
                alt="You"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Write a comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* View Previous Comments */}
        <div className="px-4 py-2 text-sm text-blue-600 font-medium cursor-pointer hover:bg-gray-50">
          View 4 previous comments
        </div>

        {/* Comments List */}
        {comments.map((comment) => (
          <div key={comment.id} className="px-4 pb-3">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={comment.avatar}
                  alt={comment.author}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-2xl px-4 py-2">
                  <h4 className="font-semibold text-sm">{comment.author}</h4>
                  <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <button className="font-medium hover:underline">Like</button>
                  <button
                    onClick={() => setShowReplyInput(showReplyInput === comment.id ? null : comment.id)}
                    className="font-medium hover:underline"
                  >
                    Reply
                  </button>
                  <button className="font-medium hover:underline">Share</button>
                  <span>{comment.time}</span>
                  <div className="flex items-center gap-1 ml-2">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    <span className="font-medium text-gray-700">{comment.likes}</span>
                  </div>
                </div>

                {/* Reply Input */}
                {showReplyInput === comment.id && (
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
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}