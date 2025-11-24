'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  ImageIcon, 
  Video, 
  Calendar, 
  Newspaper,
  Send 
} from 'lucide-react';

export default function PostComposer() {
  const [postText, setPostText] = useState('');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 my-6">
      <div className="flex gap-3">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
            <Image
              src="/images/avatar.png" // Replace with your avatar or use current user
              alt="Your profile"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Textarea + Buttons */}
        <div className="flex-1">
          <Textarea
            placeholder="Write something..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full resize-none border-0 focus:ring-0 focus-visible:ring-0 p-0 text-lg placeholder:text-gray-500 hover:bg-gray-50 rounded-lg min-h-24"
            rows={3}
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4 md:gap-6">
              <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 rounded-lg px-3 py-2 transition">
                <ImageIcon className="w-5 h-5 text-green-600" />
                <span className="hidden md:inline text-sm font-medium">Photo</span>
              </button>

              <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 rounded-lg px-3 py-2 transition">
                <Video className="w-5 h-5 text-blue-600" />
                <span className="hidden md:inline text-sm font-medium">Video</span>
              </button>

              <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 rounded-lg px-3 py-2 transition">
                <Calendar className="w-5 h-5 text-orange-600" />
                <span className="hidden md:inline text-sm font-medium">Event</span>
              </button>

              <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 rounded-lg px-3 py-2 transition">
                <Newspaper className="w-5 h-5 text-purple-600" />
                <span className="hidden md:inline text-sm font-medium">Article</span>
              </button>
            </div>

            {/* Post Button */}
            <Button
              disabled={!postText.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 mr-2 md:hidden" />
              <span className="hidden md:inline">Post</span>
              <span className="md:hidden">Post</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}